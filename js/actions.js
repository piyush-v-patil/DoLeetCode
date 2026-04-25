import { STATE, saveState, defaultProblemState } from "./state.js";
import { PROBLEMS } from "./data.js";
import { XP_VAL, REVISION_XP, REVISION_INTERVAL_DAYS, DAY_MS, MASTERY_STAGE, COMBO_MULTIPLIER } from "./config.js";
import { AudioSys } from "./audio.js";
import { flashScreen, particleBurst, floatText, killQuote, toast } from "./fx.js";
import { computeLevel, handleCombo, logSolve, updateStreak, countSlain } from "./logic.js";
import { progressMissions, recalcMissions } from "./missions.js";
import { checkTrophies, DAILY_BOUNTIES } from "./trophies.js";
import { render } from "./render.js";
import { lcUrl } from "./data.js";

function cacheRect(el) {
  const rect = el.getBoundingClientRect();
  return { getBoundingClientRect: () => rect };
}

export function markDone(n, el) {
  AudioSys.hit();
  const ps = STATE.problems[n];
  const prob = PROBLEMS.find((p) => p.n === n);
  if (!prob) return;
  const wasNew = ps.status === "todo";
  ps.status = "done";
  ps.doneAt = Date.now();
  ps.revisionStage = 0;
  ps.nextRevision = Date.now() + REVISION_INTERVAL_DAYS * DAY_MS;

  const dummyEl = cacheRect(el);

  handleCombo();
  let xp = XP_VAL[prob.d];
  if (STATE.combo.active) xp = Math.floor(xp * COMBO_MULTIPLIER);

  ps.xpEarned += xp;
  const oldLv = computeLevel(STATE.xp).level;
  STATE.xp += xp;

  if (wasNew) {
    const snapshots = {};
    DAILY_BOUNTIES.forEach((b) => { snapshots[b.id] = b.progress(); });
    const kills = progressMissions(prob);
    if (kills.dKilled) STATE.xp += kills.dm.reward;
    if (kills.wKilled) STATE.xp += kills.wm.reward;
    logSolve();
    DAILY_BOUNTIES.forEach((b) => {
      const cur = b.progress();
      const old = snapshots[b.id] || 0;
      if (cur > old && cur < b.target)
        toast("MILESTONE: " + b.name.toUpperCase() + " [" + cur + "/" + b.target + "]");
    });
    STATE.ui.activeScheduleId = n;
    if (STATE.ui.schedTimer) clearTimeout(STATE.ui.schedTimer);
    STATE.ui.schedTimer = setTimeout(() => {
      if (STATE.ui.activeScheduleId === n) {
        STATE.ui.activeScheduleId = null;
        saveState();
        render();
      }
    }, 30000);
  }

  flashScreen();
  particleBurst(dummyEl, "var(--neon-cyan)");
  floatText(dummyEl, "+" + xp + " XP");
  killQuote();
  updateStreak();
  checkTrophies(true);
  saveState();
  render();

  const newLv = computeLevel(STATE.xp).level;
  if (newLv > oldLv) {
    setTimeout(() => {
      const overlay = document.createElement("div");
      overlay.className = "levelup-overlay";
      overlay.innerHTML =
        '<div class="levelup-panel"><div class="top">LEVEL UP!</div><div class="main">RANK ' +
        newLv +
        '</div><div class="hint">CLICK TO CONTINUE</div></div>';
      document.body.appendChild(overlay);
      overlay.addEventListener("click", () => overlay.remove());
      setTimeout(() => AudioSys.levelUp(), 500);
    }, 5000);
  }
}

export function pickSchedule(n, conf) {
  if (STATE.ui.schedTimer) clearTimeout(STATE.ui.schedTimer);
  const days = conf === "struggled" ? 1 : conf === "gotit" ? 7 : REVISION_INTERVAL_DAYS;
  const ps = STATE.problems[n];
  ps.nextRevision = Date.now() + days * DAY_MS;
  STATE.ui.activeScheduleId = null;
  saveState();
  render();
  AudioSys.blip();
  const labels = { struggled: "1 day", gotit: "7 days", easy: REVISION_INTERVAL_DAYS + " days" };
  toast("Review scheduled in " + labels[conf]);
}

export function undoProblem(n) {
  window.Vanguard.confirm(
    "REVERT PROBLEM",
    "Are you sure you want to revert this problem? All earned XP and progress will be erased.",
    () => {
      AudioSys.undo();
      STATE.xp = Math.max(0, STATE.xp - (STATE.problems[n].xpEarned || 0));
      STATE.problems[n] = defaultProblemState();
      recalcMissions();
      saveState();
      render();
      toast("MEMORY REVERTED.", true);
    },
  );
}

export function commitRev(n, diff, el) {
  if (diff === "easy") AudioSys.revEasy();
  else if (diff === "hard") AudioSys.revHard();
  else AudioSys.success();
  const ps = STATE.problems[n];
  const dummyEl = cacheRect(el);

  if (diff === "easy") ps.revisionStage = Math.min(MASTERY_STAGE, ps.revisionStage + 2);
  else if (diff === "norm") ps.revisionStage = Math.min(MASTERY_STAGE, ps.revisionStage + 1);
  else ps.revisionStage = Math.max(0, ps.revisionStage - 1);

  if (ps.revisionStage >= MASTERY_STAGE) {
    ps.status = "mastered";
    ps.nextRevision = null;
    setTimeout(() => AudioSys.mastered(), 150);
  } else {
    ps.status = "done";
    const days = diff === "easy" ? REVISION_INTERVAL_DAYS : diff === "norm" ? 7 : 1;
    ps.nextRevision = Date.now() + days * DAY_MS;
  }

  handleCombo();
  let xp = REVISION_XP;
  if (STATE.combo.active) xp = Math.floor(xp * COMBO_MULTIPLIER);
  ps.xpEarned += xp;
  STATE.xp += xp;

  particleBurst(dummyEl, "var(--warning)");
  floatText(dummyEl, `+${xp} XP`);
  logSolve();
  updateStreak();
  checkTrophies(true);
  saveState();
  render();
}

export function toggleStar(n) {
  AudioSys.star();
  if (STATE.starredProblems[n]) delete STATE.starredProblems[n];
  else STATE.starredProblems[n] = true;
  saveState();
  render();
}
