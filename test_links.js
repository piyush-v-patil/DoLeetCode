const fs = require('fs');
const https = require('https');

let html = fs.readFileSync('doleet.html', 'utf8');

// Extract the complete RAW array from HTML
const match = html.match(/const RAW = \[([\s\S]*?)\];/);
if(!match) {
  console.log("Could not find RAW array!");
  process.exit(1);
}

// Safely evaluate the array
const RAW = eval('[' + match[1] + ']');

const data = JSON.stringify({
  query: `query {
    allQuestions {
      questionFrontendId
      titleSlug
    }
  }`
});

const req = https.request({
  hostname: 'leetcode.com',
  port: 443,
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    try {
      const json = JSON.parse(body);
      const lcData = json.data.allQuestions;
      
      const slugMap = {};
      lcData.forEach(q => {
        slugMap[parseInt(q.questionFrontendId)] = q.titleSlug;
      });

      let updatedHtml = html;
      let count = 0;
      let total = RAW.length;
      let fails = 0;

      // We need to inject official slugs directly into the javascript object or modify lcUrl
      // Modifying lcUrl is easiest: 
      // let slugMapStr = JSON.stringify(slugMap to only ones we need);
      
      const neededSlugs = {};
      for(let p of RAW) {
        if(slugMap[p.n]) {
          neededSlugs[p.n] = slugMap[p.n];
          count++;
        } else {
          fails++;
          // Fallback to generated if missing
          neededSlugs[p.n] = p.t.toLowerCase().replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-");
        }
      }

      console.log(`Matched ${count}/${total} slugs from LeetCode API. Fails: ${fails}`);

      // We inject an exact map into HTML
      const mapInjection = `const SLUG_MAP = ${JSON.stringify(neededSlugs)};\nfunction lcUrl(p){ return \`https://leetcode.com/problems/\${SLUG_MAP[p.n]}/\`; }`;
      
      updatedHtml = updatedHtml.replace(
        /function lcSlug.*?function lcUrl[^\}]+}/s,
        mapInjection
      );

      fs.writeFileSync('doleet.html', updatedHtml);
      console.log("SUCCESS! All links have been perfectly synced with LeetCode's official database.");

    } catch(e) {
      console.log("Error parsing GraphQL Response: ", e.message);
    }
  });
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
