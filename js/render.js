import { STATE } from "./state.js";
import { PROBLEMS, LEGENDARY, DIFF_CLASS, lcUrl } from "./data.js";
import { HEATMAP_DAYS, COMBO_MULTIPLIER, MASTERY_STAGE, REVISION_INTERVAL_DAYS, DAY_MS } from "./config.js";
import {
  computeLevel,
  rankTitle,
  checkRevisions,
  countSlain,
  countDue,
  dayKey,
  formatRemaining,
  getDailyResetMs,
  getWeeklyResetMs,
} from "./logic.js";
import { getMissionData } from "./missions.js";
import { DAILY_BOUNTIES, LIFETIME_TROPHIES, checkTrophies } from "./trophies.js";
import { toast } from "./fx.js";

export function populateProfileStats() {
  const lv = computeLevel(STATE.xp);
  document.getElementById("profileRankText").textContent = `${rankTitle(lv.level)} [LEVEL ${lv.level}]`;
  const pct = Math.min(100, Math.floor((lv.xpInLevel / lv.xpNeeded) * 100));
  document.getElementById("profileXpBar").style.width = pct + "%";
  document.getElementById("profileXpCur").textContent = lv.xpInLevel + " XP";
  document.getElementById("profileXpNext").textContent = lv.xpNeeded + " XP";

  const probs = Object.values(STATE.problems || {});
  document.getElementById("profileSolvedCount").textContent = countSlain();
  document.getElementById("profileEasy").textContent = probs.filter(
    (p) => p.status !== "todo" && PROBLEMS.find((x) => x.n === p.n)?.d === "Easy",
  ).length;
  document.getElementById("profileMed").textContent = probs.filter(
    (p) => p.status !== "todo" && PROBLEMS.find((x) => x.n === p.n)?.d === "Medium",
  ).length;
  document.getElementById("profileHard").textContent = probs.filter(
    (p) => p.status !== "todo" && PROBLEMS.find((x) => x.n === p.n)?.d === "Hard",
  ).length;
  document.getElementById("profileBestCount").textContent = STATE.stats?.highScore || 0;
  document.getElementById("profileStreak").textContent = STATE.streak || 0;
  document.getElementById("profileTrophyCount").textContent = Object.keys(STATE.achievements || {}).length;
}

export function applySettings() {
  document.body.className = STATE.settings.crt ? "crt" : "";
  document.getElementById("toggleCrt").textContent = STATE.settings.crt ? "ON" : "OFF";
  document.getElementById("toggleAudio").textContent = STATE.settings.audio ? "ON" : "OFF";
  document.getElementById("ddMissionDiff").value = STATE.settings.missionDiff || "Medium";
}

function updateSkillTree() {
  const catMap = {
    Arrays: "arr", "Linked List": "ll", Strings: "str", Heap: "heap",
    Math: "math", Trees: "tree", Graphs: "graph", Greedy: "greedy", Design: "design", DP: "dp",
  };
  const cats = { Arrays: 0, "Linked List": 0, Strings: 0, Heap: 0, Math: 0, Trees: 0, Graphs: 0, Greedy: 0, Design: 0, DP: 0 };
  const totals = { Arrays: 0, "Linked List": 0, Strings: 0, Heap: 0, Math: 0, Trees: 0, Graphs: 0, Greedy: 0, Design: 0, DP: 0 };
  PROBLEMS.forEach((p) => {
    if (totals[p.c] !== undefined) {
      totals[p.c]++;
      if (STATE.problems[p.n].status !== "todo") cats[p.c]++;
    }
  });
  Object.keys(cats).forEach((k) => {
    const el = document.getElementById(`tree-${catMap[k]}`);
    if (el) {
      const pct = Math.round((cats[k] / totals[k]) * 100);
      el.textContent = pct + "%";
      const node = el.parentElement.parentElement;
      node.style.setProperty("--pct", pct + "%");
      node.style.boxShadow =
        pct === 100
          ? `0 0 20px ${node.style.getPropertyValue("--node-color")}`
          : "0 0 10px rgba(0,0,0,0.5)";
    }
  });
}

function renderGrid() {
  const f = STATE.filters;
  const STATUS_MAP = { active: "todo", done: "done", revise: "revise", mastered: "mastered" };
  let filtered = PROBLEMS.filter((p) => {
    const ps = STATE.problems[p.n];
    if (f.status !== "all" && ps.status !== STATUS_MAP[f.status]) return false;
    if (f.diff !== "all" && p.d !== f.diff) return false;
    if (f.cat !== "all" && p.c !== f.cat) return false;
    if (f.pattern && f.pattern !== "all" && p.p !== f.pattern) return false;
    if (f.star === "starred" && !LEGENDARY.has(p.n) && !STATE.starredProblems[p.n]) return false;
    if (f.search && !p.t.toLowerCase().includes(f.search.toLowerCase()) && !String(p.n).includes(f.search))
      return false;
    return true;
  });

  document.getElementById("foundCount").textContent = filtered.length + " FOUND";

  const diffOrder = { Easy: 0, Medium: 1, Hard: 2 };
  filtered.sort((a, b) => {
    if (f.sort === "diff") return diffOrder[a.d] - diffOrder[b.d] || a.n - b.n;
    if (f.sort === "num") return a.n - b.n;
    return a.c.localeCompare(b.c) || a.n - b.n;
  });

  document.getElementById("grimoire").innerHTML = filtered
    .map((p, i) => {
      const ps = STATE.problems[p.n];
      const isStarred = LEGENDARY.has(p.n) || STATE.starredProblems[p.n];
      let sText = "UNPLAYED", sCls = "status-todo", next = "—",
        undoSlot = "<span></span>", actionSlot = "";

      if (ps.status === "mastered") {
        sText = "MAX RANK";
        sCls = "status-mastered";
        undoSlot = `<button class="btn-action btn-undo" data-action="undo" data-n="${p.n}">↺</button>`;
        actionSlot = `<span></span>`;
      } else if (ps.status === "revise" || ps.status === "done") {
        if (ps.status === "revise") {
          sText = "REVIEW!"; sCls = "status-overdue"; next = "NOW";
        } else {
          sText = "CLEARED"; sCls = "status-done";
          if (ps.nextRevision)
            next = Math.max(0, Math.ceil((ps.nextRevision - Date.now()) / DAY_MS)) + "d";
        }
        undoSlot = `<button class="btn-action btn-undo" data-action="undo" data-n="${p.n}">↺</button>`;
        if (STATE.ui.activeRevId === p.n) {
          const stage = ps.revisionStage || 0;
          const pips = Array.from({ length: MASTERY_STAGE }, (_, j) => {
            const cls = j < stage ? (stage >= MASTERY_STAGE - 1 ? "pip filled near" : "pip filled") : "pip";
            return '<span class="' + cls + '"></span>';
          }).join("");
          actionSlot =
            '<div class="sched-inline">' +
            '<div class="sched-inline-label">How did it go?</div>' +
            '<div class="sched-inline-btns">' +
            '<button class="btn-sr btn-conf-struggled" onclick="confirmReview(' + p.n + ',&quot;struggled&quot;)">STRUGGLED · 1d</button>' +
            '<button class="btn-sr btn-conf-gotit" onclick="confirmReview(' + p.n + ',&quot;gotit&quot;)">GOT IT · 7d</button>' +
            '<button class="btn-sr btn-conf-easy" onclick="confirmReview(' + p.n + ',&quot;easy&quot;)">EASY · ' + REVISION_INTERVAL_DAYS + "d</button>" +
            "</div>" +
            '<div class="mastery-pips">' + pips + '<span style="margin-left:4px">' + stage + "/" + MASTERY_STAGE + " to mastery</span></div>" +
            "</div>";
        } else {
          actionSlot = '<button class="btn-action btn-forge" data-action="startReview" data-n="' + p.n + '">REVIEW</button>';
        }
      } else {
        if (STATE.ui.activeScheduleId === p.n) {
          actionSlot =
            '<div class="sched-inline">' +
            '<div class="sched-inline-label">When to revisit?</div>' +
            '<div class="sched-inline-btns">' +
            '<button class="btn-sr btn-conf-struggled" onclick="pickSchedule(' + p.n + ',&quot;struggled&quot;)">STRUGGLED · 1d</button>' +
            '<button class="btn-sr btn-conf-gotit" onclick="pickSchedule(' + p.n + ',&quot;gotit&quot;)">GOT IT · 7d</button>' +
            '<button class="btn-sr btn-conf-easy" onclick="pickSchedule(' + p.n + ',&quot;easy&quot;)">EASY · ' + REVISION_INTERVAL_DAYS + "d</button>" +
            "</div></div>";
        } else {
          actionSlot = '<button class="btn-action btn-slay" data-action="markDone" data-n="' + p.n + '">DONE</button>';
        }
      }

      return `<div class="row ${ps.status}" data-n="${p.n}">
  <div class="col-num">${i + 1}</div>
  <div class="col-diff ${DIFF_CLASS[p.d]}">${p.d}</div>
  <div class="col-star${isStarred ? " starred" : ""}" data-star="${p.n}">${isStarred ? "★" : "☆"}</div>
  <div class="col-title">${p.t}</div>
  <div class="col-pattern">${p.p}</div>
  <div class="col-status ${sCls}">${sText}</div>
  <div class="col-next">${next}</div>
  <div class="col-action">${undoSlot}${actionSlot}<a class="lc-link" href="${lcUrl(p)}" target="_blank">LC ↗</a></div>
</div>`;
    })
    .join("");
}

export function render() {
  try {
    checkRevisions();
    applySettings();

    const lv = computeLevel(STATE.xp);
    document.getElementById("lvlRoman").textContent = lv.level;
    document.getElementById("lvlTitle").textContent = rankTitle(lv.level);
    document.getElementById("xpCur").textContent = lv.xpInLevel;
    document.getElementById("xpNext").textContent = lv.xpNeeded;
    document.getElementById("xpBar").style.width =
      Math.min(100, (lv.xpInLevel / lv.xpNeeded) * 100) + "%";
    const comboBadge = document.getElementById("comboBadge");
    comboBadge.textContent = COMBO_MULTIPLIER + "x COMBO!";
    comboBadge.classList.toggle("active", STATE.combo.active);
    document.getElementById("streakVal").textContent = STATE.streak;
    document.getElementById("slainVal").textContent = countSlain();
    const due = countDue();
    document.getElementById("dueVal").textContent = due;
    document.getElementById("orbDue").classList.toggle("has-due", due > 0);
    const dueBtn = document.getElementById("btnReviewsDue");
    dueBtn.style.display = due > 0 ? "" : "none";
    document.getElementById("btnDueCount").textContent = due;
    document.getElementById("pctVal").textContent =
      Math.round((countSlain() / PROBLEMS.length) * 100) + "%";

    const counts = { Easy: { d: 0, t: 0 }, Medium: { d: 0, t: 0 }, Hard: { d: 0, t: 0 } };
    PROBLEMS.forEach((p) => {
      counts[p.d].t++;
      if (STATE.problems[p.n].status !== "todo") counts[p.d].d++;
    });
    document.getElementById("diffTracker").innerHTML = ["Easy", "Medium", "Hard"]
      .map((d) => {
        const c = counts[d];
        const cls = d === "Medium" ? "med" : d.toLowerCase();
        const pct = c.t ? Math.round((c.d / c.t) * 100) : 0;
        return `<div class="diff-card ${cls}"><div class="head"><span class="label">${d}</span><span class="nums"><b>${c.d}</b>/${c.t}</span></div><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div></div>`;
      })
      .join("");

    const dm = getMissionData("daily");
    const wm = getMissionData("weekly");
    if (STATE.missions.weekly.key !== wm.key)
      STATE.missions.weekly = { key: wm.key, progress: 0, done: false };

    const md = STATE.missions.daily;
    const mw = STATE.missions.weekly;
    const dTimer = formatRemaining(getDailyResetMs());
    const wTimer = formatRemaining(getWeeklyResetMs());

    const allDailies = [
      { icon: "🎯", title: dm.title, name: dm.name, reward: dm.reward, prog: md.progress, tar: dm.target, done: md.done },
      ...DAILY_BOUNTIES.map((b) => ({
        icon: b.icon, title: "DAILY BOUNTY", name: b.name, reward: b.xp,
        prog: b.progress(), tar: b.target, done: b.progress() >= b.target,
      })),
    ];

    document.getElementById("missions").innerHTML = `
<div style="display: flex; flex-direction: column; gap: 8px;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
    ${allDailies.map((m) => `
    <div class="mission ${m.done ? "done" : ""}">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
        <div style="display: flex; gap: 6px; align-items: center; overflow: hidden;">
          <span style="font-size: 11px;">${m.icon}</span>
          <span style="font-size: 9px; font-weight: 800; color: var(--text-main); letter-spacing: 0.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${m.name.toUpperCase()}</span>
        </div>
        <span style="font-size: 9px; font-weight: 900; color: var(--neon-cyan);">${m.done ? "OK" : `${m.prog}/${m.tar}`}</span>
      </div>
      <div style="height: 4px; background: var(--surface-hover); border-radius: 2px; overflow: hidden;">
        <div style="width:${(m.prog / m.tar) * 100}%; background: ${m.done ? "var(--success)" : "var(--neon-cyan)"}; height: 100%; box-shadow: 0 0 5px ${m.done ? "var(--success)" : "var(--neon-cyan)"};"></div>
      </div>
    </div>`).join("")}
  </div>
  <div class="mission weekly ${mw.done ? "done" : ""}">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
      <div style="display: flex; gap: 6px; align-items: center; overflow: hidden;">
        <span style="font-size: 11px;">🏆</span>
        <span style="font-size: 9px; font-weight: 800; color: var(--text-main); letter-spacing: 0.5px;">WEEKLY CRUSADE</span>
      </div>
      <span style="font-size: 9px; font-weight: 900; color: var(--neon-purple);">${mw.done ? "CLEARED" : `${mw.progress}/${wm.target}`}</span>
    </div>
    <div style="height: 4px; background: var(--surface-hover); border-radius: 2px; overflow: hidden;">
      <div style="width:${(mw.progress / wm.target) * 100}%; background: ${mw.done ? "var(--success)" : "var(--neon-purple)"}; height: 100%; box-shadow: 0 0 5px ${mw.done ? "var(--success)" : "var(--neon-purple)"};"></div>
    </div>
    <div style="font-size: 8px; color: var(--text-muted); font-weight: 700; margin-top: 2px; text-transform: uppercase;">${wm.name}</div>
  </div>
  <div style="display: flex; justify-content: space-between; padding: 2px 4px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 6px;">
    <span style="font-size: 7px; font-weight: 900; color: var(--text-muted); letter-spacing: 1px;">DAILY RESET IN ${dTimer}</span>
    <span style="font-size: 7px; font-weight: 900; color: var(--text-muted); letter-spacing: 1px;">CRUSADE ENDS IN ${wTimer}</span>
  </div>
</div>
${countDue() > 0 ? `<div class="due-footer">[ ${countDue()} REVIEWS PENDING ]</div>` : ""}`;

    // Heatmap
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(start.getDate() - HEATMAP_DAYS);
    start.setDate(start.getDate() - start.getDay());
    let html = "", week = 0, month = 0, best = 0, total = 0;
    const wStart = new Date(today); wStart.setDate(wStart.getDate() - 6);
    const mStart = new Date(today); mStart.setDate(mStart.getDate() - 29);
    for (let i = 0; i <= HEATMAP_DAYS; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const k = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      const c = STATE.solveLog[k] || 0;
      total += c;
      if (c > best) best = c;
      if (d >= wStart) week += c;
      if (d >= mStart) month += c;
    }
    const hDays = Math.ceil((today - start) / DAY_MS) + 1;
    for (let i = 0; i < hDays; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const k = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      const c = STATE.solveLog[k] || 0;
      let l = 0;
      if (c >= 1) l = 1;
      if (c >= 3) l = 2;
      if (c >= 5) l = 3;
      if (c >= 8) l = 4;
      html += `<div class="hm-cell lvl${l}" ${d > today ? 'style="opacity:0.1"' : ""} data-tip="${c} Solves on ${k}"></div>`;
    }
    document.getElementById("heatmap").innerHTML = html;

    const hmWrap = document.querySelector(".heatmap-wrap");
    hmWrap.querySelectorAll(".heatmap-stats, .hm-legend, .hm-empty").forEach((e) => e.remove());
    if (total === 0) {
      hmWrap.insertAdjacentHTML("afterbegin", `<div class="hm-empty">No activity yet.<br>Solve your first problem to light up the grid.</div>`);
    } else {
      hmWrap.insertAdjacentHTML("afterbegin", `<div class="heatmap-stats"><div class="stat"><b>${week}</b><div class="lbl">7 days</div></div><div class="stat"><b>${month}</b><div class="lbl">30 days</div></div><div class="stat"><b>${total}</b><div class="lbl">all time</div></div><div class="stat"><b>${best}</b><div class="lbl">best day</div></div></div>`);
    }
    hmWrap.insertAdjacentHTML("beforeend", `<div class="hm-legend"><span>Idle</span><div class="scale"><span style="background:var(--surface-hover)"></span><span style="background:rgba(0, 255, 102, 0.3)"></span><span style="background:rgba(0, 255, 102, 0.6)"></span><span style="background:var(--success)"></span><span style="background:var(--neon-cyan); box-shadow:0 0 5px var(--neon-cyan)"></span></div><span>Active</span></div>`);

    if (STATE.filters.view === "tree") {
      document.getElementById("grimoire").style.display = "none";
      document.getElementById("treeView").style.display = "block";
      document.getElementById("viewToggle").textContent = "☰ GRID VIEW";
      updateSkillTree();
    } else {
      document.getElementById("grimoire").style.display = "flex";
      document.getElementById("treeView").style.display = "none";
      document.getElementById("viewToggle").textContent = "☍ TREE VIEW";
      renderGrid();
    }

    checkTrophies();

    document.getElementById("trophies").innerHTML = `
<div class="achieve-section">
  <div class="achieve-section-title">DAILY BOUNTIES</div>
  <div class="achieve-grid">
    ${DAILY_BOUNTIES.map((b) => {
      const count = STATE.dailyBounties.counts[b.id] || 0;
      return `<div class="trophy bounty ${count > 0 ? "unlocked" : "locked"}">
        <div class="icon">${b.icon}</div>
        <div class="info"><div class="name">${b.name}</div><div class="desc">${b.desc}</div></div>
        ${count > 1 ? `<div class="badge">x${count}</div>` : ""}
      </div>`;
    }).join("")}
  </div>
</div>
<div class="achieve-section" style="margin-top:20px;">
  <div class="achieve-section-title">LIFETIME MILESTONES</div>
  <div class="achieve-grid">
    ${LIFETIME_TROPHIES.map((t) => {
      const unlocked = !!STATE.achievements[t.id];
      return `<div class="trophy ${unlocked ? "unlocked" : "locked"}">
        <div class="icon">${t.icon}</div>
        <div class="info"><div class="name">${t.name}</div><div class="desc">${t.desc}</div></div>
      </div>`;
    }).join("")}
  </div>
</div>`;
  } catch (error) {
    console.error("FATAL RENDER ERROR:", error);
    toast("A render error occurred. Please check console.", true);
  }
}
