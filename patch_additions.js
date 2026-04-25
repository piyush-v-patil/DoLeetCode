const fs = require('fs');
const file = 'doleet.html';
let html = fs.readFileSync(file, 'utf8');

// 1. ADD PROFILE BUTTON
html = html.replace(
  /<button class="hud-btn" id="btnSettings">/,
  `<button class="hud-btn" id="btnProfile">👤 PROFILE</button>\n        <button class="hud-btn" id="btnSettings">`
);

// 2. ADD PROFILE MODAL
const profileModalStr = `
<div class="modal-overlay" id="profileModal">
  <div class="modal-inner" style="max-width: 400px; padding: 0;">
    <div class="modal-head" style="padding: 16px 20px;">
      <div class="modal-title">USER AUTHENTICATION</div>
      <button class="modal-close" onclick="document.getElementById('profileModal').classList.remove('open')">×</button>
    </div>
    <div style="text-align:center; padding: 40px; border-bottom: 1px solid var(--border-light); background: var(--bg);">
      <div style="font-size: 60px; margin-bottom: 20px; text-shadow: 0 0 20px rgba(0, 229, 255, 0.4);">👤</div>
      <div style="font-size: 18px; font-weight: 800; color: var(--neon-cyan); margin-bottom: 8px; letter-spacing:1px;">GUEST USER</div>
      <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Local Save File Active</div>
    </div>
    <div style="padding: 24px; text-align:center; background: var(--surface);">
       <div style="font-size:11px; font-weight:700; color:var(--text-main); margin-bottom:16px;">Link to cloud for true cross-device persistence.</div>
       <button class="btn" style="width:100%; border-color:var(--success); color:var(--success); padding:12px; font-weight:800; font-size:13px; text-shadow: 0 0 8px rgba(0,255,102,0.4); box-shadow: inset 0 0 10px rgba(0,255,102,0.1);">LOGIN VIA GMAIL</button>
    </div>
  </div>
</div>
`;
// Insert before settingsModal
html = html.replace(/<div class="modal-overlay" id="settingsModal">/, profileModalStr + "\n<div class=\"modal-overlay\" id=\"settingsModal\">");

// Add event listener for profileModal
html = html.replace(
  /document.getElementById\("btnSettings"\).addEventListener/,
  `document.getElementById("btnProfile").addEventListener("click", () => { AudioSys.blip(); document.getElementById("profileModal").classList.add("open"); });\ndocument.getElementById("btnSettings").addEventListener`
);

// 3. SEPARATE CATEGORIES IN DROPDOWN
html = html.replace(
  /<option value="Arrays">ARRAYS \/ STRINGS<\/option>/,
  `<option value="Arrays">ARRAYS</option>\n      <option value="Strings">STRINGS</option>`
);
html = html.replace(
  /<option value="Design">HEAPS \/ DESIGN<\/option>/,
  `<option value="Design">DESIGN</option>\n      <option value="Heap">HEAP</option>`
);

// 4. ADD TO TREE VIEW
html = html.replace(
  /(<div class="tree-node" data-cat="DP".*?<\/div>)/,
  `$1\n      <div class="tree-node" data-cat="Strings" style="--pct:0%; --node-color:var(--neon-green);"><div class="inner"><div class="pct" id="tree-str">0%</div><div class="lbl">STRINGS</div></div></div>`
);
html = html.replace(
  /(<div class="tree-node" data-cat="Linked List".*?<\/div>)/,
  `$1\n      <div class="tree-node" data-cat="Heap" style="--pct:0%; --node-color:var(--neon-yellow);"><div class="inner"><div class="pct" id="tree-heap">0%</div><div class="lbl">HEAP</div></div></div>`
);

// 5. UPDATE RAW DATA (c values)
const stringPatterns = ["String Parsing", "Rolling Hash", "KMP/Z", "String Greedy", "Palindrome DP"];
const heapPatterns = ["Top-K Heap", "Two-Heap Median"];

html = html.replace(/c:"Arrays"/g, (match, offset) => {
  const lineStr = html.substring(offset - 100, offset + 15);
  for (let p of stringPatterns) {
    if (lineStr.includes('p:"' + p + '"')) return 'c:"Strings"';
  }
  return match;
});

html = html.replace(/c:"Greedy"/g, (match, offset) => {
  const lineStr = html.substring(offset - 100, offset + 15);
  for (let p of stringPatterns) {
    if (lineStr.includes('p:"' + p + '"')) return 'c:"Strings"';
  }
  return match;
});

html = html.replace(/c:"Design"/g, (match, offset) => {
  const lineStr = html.substring(offset - 100, offset + 15);
  for (let p of heapPatterns) {
    if (lineStr.includes('p:"' + p + '"')) return 'c:"Heap"';
  }
  if (lineStr.includes('p:"Heap + Design"')) return 'c:"Heap"';
  return match;
});

// 6. UPDATE CATEGORIES CONSTANT
html = html.replace(
  /const CATEGORIES = \["Arrays", "Greedy", "Trees", "Graphs", "Design", "DP", "Math"\];/,
  `const CATEGORIES = ["Arrays", "Strings", "Linked List", "Greedy", "Trees", "Graphs", "Heap", "Design", "DP", "Math"];`
);

// 7. UPDATE TROPHIES ENGINE TO REMOVE < 3
html = html.replace(
  /PATTERNS\.forEach\(pat => {([\s\S]*?)const target = Math\.max\(1, Math\.min\(3, Math\.floor\(total \* 0\.5\)\)\);/,
  `PATTERNS.forEach(pat => {$1if(total < 3) return; \n  const target = Math.max(1, Math.min(3, Math.floor(total * 0.5)));`
);

// 8. UPDATE updateSkillTree() MAPPINGS
html = html.replace(
  /const catMap = \{ Arrays: "arr", "Linked List": "ll", Math: "math", Trees: "tree", Graphs: "graph", Greedy: "greedy", Design: "design", DP: "dp" \};/,
  `const catMap = { Arrays: "arr", "Linked List": "ll", Strings: "str", Heap: "heap", Math: "math", Trees: "tree", Graphs: "graph", Greedy: "greedy", Design: "design", DP: "dp" };`
);
html = html.replace(
  /const cats = \{ Arrays:0, "Linked List":0, Math:0, Trees:0, Graphs:0, Greedy:0, Design:0, DP:0 \};/g,
  `const cats = { Arrays:0, "Linked List":0, Strings:0, Heap:0, Math:0, Trees:0, Graphs:0, Greedy:0, Design:0, DP:0 };`
);
html = html.replace(
  /const totals = \{ Arrays:0, "Linked List":0, Math:0, Trees:0, Graphs:0, Greedy:0, Design:0, DP:0 \};/g,
  `const totals = { Arrays:0, "Linked List":0, Strings:0, Heap:0, Math:0, Trees:0, Graphs:0, Greedy:0, Design:0, DP:0 };`
);

// SAVE
fs.writeFileSync(file, html);
console.log("PATCH COMPLETE!");
