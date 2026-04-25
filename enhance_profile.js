const fs = require('fs');
let html = fs.readFileSync('Doleet.html', 'utf8');

// 1. Fix the tree-view HTML anomaly from the last replace
html = html.replace(
  /<div class="tree-node" data-cat="DP".*?<\/div>\n\s*<div class="tree-node" data-cat="Strings"[\s\S]*?<\/div><div class="lbl">LINKED LIST<\/div><\/div><\/div>/,
  `
      <div class="tree-node" data-cat="DP" style="--pct:0%; --node-color:var(--neon-purple);"><div class="inner"><div class="pct" id="tree-dp">0%</div><div class="lbl">DYN. PROG</div></div></div>
      <div class="tree-node" data-cat="Strings" style="--pct:0%; --node-color:var(--neon-green);"><div class="inner"><div class="pct" id="tree-str">0%</div><div class="lbl">STRINGS</div></div></div>
    </div>
    <div class="tree-row">
      <div class="tree-node" data-cat="Linked List" style="--pct:0%; --node-color:var(--neon-orange);"><div class="inner"><div class="pct" id="tree-ll">0%</div><div class="lbl">LINKED LIST</div></div></div>
      <div class="tree-node" data-cat="Heap" style="--pct:0%; --node-color:var(--neon-yellow);"><div class="inner"><div class="pct" id="tree-heap">0%</div><div class="lbl">HEAP</div></div></div>`
);

// 2. Upgraded Modal
const upgradedModal = `
<div class="modal-overlay" id="profileModal">
  <div class="modal-inner" style="max-width: 440px; padding: 0;">
    <div class="modal-head" style="padding: 16px 20px;">
      <div class="modal-title">USER DASHBOARD</div>
      <button class="modal-close" onclick="document.getElementById('profileModal').classList.remove('open')">×</button>
    </div>
    <div style="padding: 30px 20px 20px 20px; text-align:center; background: var(--bg); border-bottom: 1px solid var(--border-light); position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent); opacity: 0.5;"></div>
      <div style="font-size: 64px; margin-bottom: 15px; text-shadow: 0 0 20px rgba(0, 229, 255, 0.4);">👤</div>
      <div style="font-size: 22px; font-weight: 800; color: var(--neon-cyan); margin-bottom: 4px; letter-spacing: 2px; text-transform: uppercase;">GUEST USER</div>
      <div style="font-size: 13px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 20px;" id="profileRankText">NOVICE [LEVEL 1]</div>
      <div style="text-align: left; background: var(--surface); padding: 15px; border-radius: var(--btn-radius); border: 1px solid var(--border-light);">
        <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">LIFETIME XP PROGRESSION</div>
        <div class="xp-bar-wrap" style="width: 100%; margin: 0; background: var(--bg); height: 8px;">
          <div class="xp-bar" id="profileXpBar" style="width: 0%; background: var(--neon-cyan); box-shadow: 0 0 10px rgba(0, 229, 255, 0.5); height: 100%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 11px; font-weight: 700;">
          <span style="color:var(--neon-cyan);" id="profileXpCur">0 XP</span>
          <span style="color:var(--text-muted);" id="profileXpNext">100 XP</span>
        </div>
      </div>
    </div>
    <div style="padding: 20px; background: var(--surface); display: grid; grid-template-columns: 1fr 1fr; gap: 15px; border-bottom: 1px solid var(--border-light);">
      <div class="stat-card" style="background:var(--bg); border: 1px solid var(--border-light); padding: 15px;">
        <div class="val" id="profileSolvedCount" style="color:var(--text-main); font-size:24px;">0</div>
        <div class="lbl" style="margin-top:5px;">TOTAL SOLVED</div>
      </div>
      <div class="stat-card" style="background:var(--bg); border: 1px solid var(--border-light); padding: 15px;">
        <div class="val" id="profileMasteryCount" style="color:var(--neon-yellow); font-size:24px;">0</div>
        <div class="lbl" style="margin-top:5px;">MAX RANKED</div>
      </div>
      <div class="stat-card" style="background:var(--bg); border: 1px solid var(--border-light); padding: 15px;">
        <div class="val" id="profileStreak" style="color:var(--neon-pink); font-size:24px;">0</div>
        <div class="lbl" style="margin-top:5px;">DAY STREAK</div>
      </div>
      <div class="stat-card" style="background:var(--bg); border: 1px solid var(--border-light); padding: 15px;">
        <div class="val" id="profileTrophyCount" style="color:var(--neon-purple); font-size:24px;">0</div>
        <div class="lbl" style="margin-top:5px;">ACHIEVEMENTS</div>
      </div>
    </div>
    <div style="padding: 20px; text-align:center; background: var(--bg);">
       <div style="font-size:11px; font-weight:700; color:var(--text-main); margin-bottom:12px; letter-spacing: 1px;">DATABASE LINK (OFFLINE)</div>
       <button class="btn" style="width:100%; border-color:var(--success); color:var(--success); padding:12px; font-weight:800; font-size:13px; text-shadow: 0 0 8px rgba(0,255,102,0.4); box-shadow: inset 0 0 10px rgba(0,255,102,0.1);">CONNECT TO GOOGLE CLOUD</button>
    </div>
  </div>
</div>`;

html = html.replace(/<div class="modal-overlay" id="profileModal">[\s\S]*?<div class="modal-overlay" id="settingsModal">/, upgradedModal + '\n\n<div class="modal-overlay" id="settingsModal">');

// 3. Inject JS Logic
const populateFn = `
function populateProfileStats() {
  const lv = getLevel(STATE.xp);
  document.getElementById('profileRankText').textContent = \`\${lv.title} [LEVEL \${lv.lv}]\`;
  const pct = Math.min(100, Math.floor((lv.xpInLevel / lv.xpNeeded) * 100));
  document.getElementById('profileXpBar').style.width = pct + "%";
  document.getElementById('profileXpCur').textContent = lv.xpInLevel + " XP";
  document.getElementById('profileXpNext').textContent = lv.xpNeeded + " XP";

  document.getElementById('profileSolvedCount').textContent = countSlain();
  document.getElementById('profileMasteryCount').textContent = Object.values(STATE.problems).filter(p=>p.status==="mastered").length;
  document.getElementById('profileStreak').textContent = STATE.streak;
  document.getElementById('profileTrophyCount').textContent = Object.keys(STATE.achievements).length;
}

function applySettings() {`;

html = html.replace(/function applySettings\(\) \{/, populateFn);

html = html.replace(
  /document\.getElementById\("btnProfile"\)\.addEventListener\("click", \(\) => \{ AudioSys\.blip\(\); document\.getElementById\("profileModal"\)\.classList\.add\("open"\); \}\);/,
  `document.getElementById("btnProfile").addEventListener("click", () => { AudioSys.blip(); populateProfileStats(); document.getElementById("profileModal").classList.add("open"); });`
);

fs.writeFileSync('Doleet.html', html);
console.log("Profile visual overhaul successful!");
