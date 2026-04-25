import { STATE, dayKey } from "./state.js";
import {
  DAY_MS,
  RANK_TITLES,
  COMBO_THRESHOLD,
  COMBO_MULTIPLIER,
} from "./config.js";
import { toast } from "./fx.js";

export { dayKey };

export function weekKey() {
  const d = new Date();
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const wn = Math.ceil(
    ((t - new Date(Date.UTC(t.getUTCFullYear(), 0, 1))) / 86400000 + 1) / 7,
  );
  return t.getUTCFullYear() + "-W" + String(wn).padStart(2, "0");
}

export function formatRemaining(ms) {
  if (ms <= 0) return "RESETTING...";
  const d = Math.floor(ms / (24 * 3600000));
  const h = Math.floor((ms % (24 * 3600000)) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (d > 0) return `${d}d ${h}h`;
  return `${h}h ${m}m`;
}

export function getDailyResetMs() {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return tomorrow - now;
}

export function getWeeklyResetMs() {
  const now = new Date();
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + ((1 - now.getDay() + 7) % 7));
  if (now.getDay() === 1 && now.getHours() < 1) {
    /* already monday */
  } else if (nextMonday <= now) nextMonday.setDate(nextMonday.getDate() + 7);
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday - now;
}

export function xpForLevel(lv) {
  return Math.floor(150 + (lv - 1) * 40);
}

export function computeLevel(xp) {
  let lv = 1,
    used = 0;
  while (used + xpForLevel(lv) <= xp) {
    used += xpForLevel(lv);
    lv++;
    if (lv > 200) break;
  }
  return { level: lv, xpInLevel: xp - used, xpNeeded: xpForLevel(lv) };
}

export function rankTitle(lv) {
  return RANK_TITLES[Math.min(lv - 1, 9)] || "FELLOW";
}

export function checkRevisions() {
  const now = Date.now();
  for (const n in STATE.problems) {
    const p = STATE.problems[n];
    if (
      (p.status === "done" || p.status === "revise") &&
      p.nextRevision &&
      now > p.nextRevision
    ) {
      p.status = "revise";
    }
  }
}

export function handleCombo() {
  const now = Date.now();
  if (now - STATE.combo.lastTime < DAY_MS) {
    STATE.combo.count++;
    if (STATE.combo.count >= COMBO_THRESHOLD) STATE.combo.active = true;
  } else {
    STATE.combo.count = 1;
    STATE.combo.active = false;
  }
  STATE.combo.lastTime = now;
}

export function logSolve() {
  const key = dayKey();
  STATE.solveLog[key] = (STATE.solveLog[key] || 0) + 1;

  if (!STATE.stats) STATE.stats = {};
  if (STATE.solveLog[key] > (STATE.stats.highScore || 0)) {
    STATE.stats.highScore = STATE.solveLog[key];
    toast(`NEW PERSONAL BEST: ${STATE.stats.highScore} SOLVES IN ONE DAY!`, false, 4000);
  }

  const now = Date.now();
  if (!STATE.recentSolves) STATE.recentSolves = [];
  STATE.recentSolves.push(now);
  STATE.recentSolves = STATE.recentSolves.filter((ts) => now - ts < 5400000);
}

export function updateStreak() {
  const now = new Date();
  const todayStr = dayKey();
  const todayMs = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const last = STATE.lastSolveDate;
  if (last === todayStr) return;
  if (last && /^\d{4}-\d{2}-\d{2}$/.test(last)) {
    const parts = last.split("-").map(Number);
    const lastMs = Date.UTC(parts[0], parts[1] - 1, parts[2]);
    const diffDays = Math.round((todayMs - lastMs) / DAY_MS);
    if (diffDays === 1) STATE.streak++;
    else if (diffDays > 1) STATE.streak = 1;
  } else {
    STATE.streak = 1;
  }
  STATE.lastSolveDate = todayStr;
}

export function countSlain() {
  return Object.values(STATE.problems).filter((p) => p.status !== "todo").length;
}

export function countDue() {
  return Object.values(STATE.problems).filter((p) => p.status === "revise").length;
}
