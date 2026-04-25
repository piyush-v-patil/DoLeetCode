import { STORE_KEY, STATE_VERSION, SOLVELOG_MAX_AGE_YEARS } from "./config.js";
import { PROBLEMS } from "./data.js";

export let STATE;

export function setSTATE(s) {
  STATE = s;
}

let _syncCallback = null;
export function registerSyncCallback(fn) {
  _syncCallback = fn;
}

export function dayKey() {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

export function defaultProblemState() {
  return {
    status: "todo",
    doneAt: null,
    revisionStage: 0,
    nextRevision: null,
    xpEarned: 0,
  };
}

export function defaultState() {
  return {
    version: STATE_VERSION,
    xp: 0,
    streak: 0,
    lastSolveDate: null,
    problems: PROBLEMS.reduce((acc, p) => {
      acc[p.n] = defaultProblemState();
      return acc;
    }, {}),
    settings: { audio: true, missionDiff: "Medium" },
    filters: { status: "all", diff: "all", cat: "all", pattern: "all" },
    combo: { count: 0, lastTime: 0, active: false },
    missions: {
      daily: { key: null, progress: 0, done: false },
      weekly: { key: null, progress: 0, done: false },
    },
    solveLog: {},
    achievements: {},
    starredProblems: {},
    dailyBounties: { date: "", counts: {} },
    recentSolves: [],
    profileName: null,
    ui: { activeScheduleId: null, schedTimer: null, activeRevId: null, revDays: null },
  };
}

function migrateState(s) {
  if (!s.version || s.version < 1) {
    if (s.lastSolveDate && !/^\d{4}-\d{2}-\d{2}$/.test(s.lastSolveDate)) {
      const d = new Date(s.lastSolveDate);
      if (!isNaN(d))
        s.lastSolveDate =
          d.getFullYear() +
          "-" +
          String(d.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(d.getDate()).padStart(2, "0");
      else s.lastSolveDate = null;
    }
    if (!s.starredProblems) s.starredProblems = {};
    if (!s.achievements) s.achievements = {};
    if (!s.solveLog) s.solveLog = {};
    if (!s.dailyBounties) s.dailyBounties = { date: "", counts: {} };
    if (!s.recentSolves) s.recentSolves = [];

    if (s.dailyBounties.date !== dayKey()) {
      s.dailyBounties = { date: dayKey(), counts: {} };
      s.recentSolves = [];
    }

    if (s.filters && !s.filters.pattern) s.filters.pattern = "all";
    s.version = 1;
  }
  return s;
}

function pruneSolveLog(solveLog) {
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - SOLVELOG_MAX_AGE_YEARS);
  const cutoffKey =
    cutoff.getFullYear() +
    "-" +
    String(cutoff.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(cutoff.getDate()).padStart(2, "0");
  for (const key in solveLog) {
    if (key < cutoffKey) delete solveLog[key];
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    const fresh = defaultState();

    s.problems = { ...fresh.problems, ...s.problems };
    s.settings = { ...fresh.settings, ...s.settings };
    s.filters = { ...fresh.filters, ...s.filters };
    s.combo = { ...fresh.combo, ...s.combo };

    s.missions = s.missions || fresh.missions;
    if (s.missions.daily === undefined || typeof s.missions.daily.progress !== "number")
      s.missions.daily = fresh.missions.daily;
    if (s.missions.weekly === undefined || typeof s.missions.weekly.progress !== "number")
      s.missions.weekly = fresh.missions.weekly;

    if (!s.solveLog) s.solveLog = {};
    if (!s.achievements) s.achievements = {};
    if (!s.starredProblems) s.starredProblems = {};
    if (!s.dailyBounties) s.dailyBounties = { date: "", counts: {} };

    migrateState(s);
    pruneSolveLog(s.solveLog);

    s.stats = s.stats || { highScore: 0 };
    let recalculatedMax = s.stats.highScore || 0;
    Object.values(s.solveLog || {}).forEach((val) => {
      if (typeof val === "number" && val > recalculatedMax) recalculatedMax = val;
    });
    s.stats.highScore = recalculatedMax;

    if (!s.ui)
      s.ui = { activeScheduleId: null, schedTimer: null, activeRevId: null, revDays: null };
    else {
      s.ui.activeRevId = null;
      s.ui.revDays = null;
    }

    return s;
  } catch (e) {
    return defaultState();
  }
}

export function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(STATE));
  _syncCallback?.();
}

STATE = loadState();
