const fs = require('fs');
const content = fs.readFileSync('doleet.html', 'utf8');

// Extract RAW data
const rawMatch = content.match(/const RAW = (\[[\s\S]*?\]);/);
const raw = eval(rawMatch[1]);

// Extract SLUG_MAP
const slugMatch = content.match(/const SLUG_MAP = ({[\s\S]*?});/);
const slugMap = JSON.parse(slugMatch[1]);

const missing = [];
for (const p of raw) {
    if (!slugMap[p.n]) {
        missing.push(p.n);
    }
}

if (missing.length > 0) {
    console.log('Missing slugs for problem numbers:', missing.sort((a,b)=>a-b).join(', '));
} else {
    console.log('All problems have slugs!');
}
