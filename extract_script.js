const fs = require('fs');
const content = fs.readFileSync('doleet.html', 'utf8');
const match = content.match(/<script>([\s\S]*?)<\/script>/);
if (match) {
    fs.writeFileSync('extracted_script.js', match[1]);
    console.log('Script extracted to extracted_script.js');
} else {
    console.log('No script tag found');
}
