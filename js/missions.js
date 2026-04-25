import { STATE } from "./state.js";
import { MISSION_CONFIG, CATEGORIES } from "./config.js";
import { PROBLEMS } from "./data.js";
import { dayKey, weekKey } from "./logic.js";
import { toast } from "./fx.js";

export function getMissionData(type) {
  const k = type === "daily" ? dayKey() : weekKey();
  const diffSetting = STATE.settings.missionDiff || "Medium";
  const conf = MISSION_CONFIG[diffSetting] || MISSION_CONFIG["Medium"];

  let h = 0;
  for (let i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) | 0;

  let target, reward, title, name, objType, objVal;
  if (type === "daily") {
    reward = conf.dReward;
    title = "DAILY BOUNTY";
    const cat = CATEGORIES[Math.abs(h) % CATEGORIES.length];
    const maxPossible = PROBLEMS.filter((p) => p.c === cat).length;
    target = Math.min(conf.dTarget, maxPossible);
    objType = "cat";
    objVal = cat;
    name = `Solve ${target} ${cat} Quests`;
  } else {
    target = conf.wTarget;
    reward = conf.wReward;
    title = "WEEKLY CRUSADE";
    const types = ["any", "diff"];
    objType = types[Math.abs(h) % 2];
    if (objType === "diff") {
      const diffs = ["Easy", "Medium", "Hard"];
      objVal = diffs[Math.abs(h + 1) % 3];
      if (objVal === "Hard") target = Math.max(1, Math.floor(target / 2));
      name = `Solve ${target} ${objVal} Quests`;
    } else {
      objVal = "any";
      name = `Complete ${target} Quests Total`;
    }
  }

  return { key: k, title, target, reward, name, objType, objVal };
}

export function progressMissions(solvedProb) {
  const dm = getMissionData("daily");
  const wm = getMissionData("weekly");

  if (STATE.missions.daily.key !== dm.key)
    STATE.missions.daily = { key: dm.key, progress: 0, done: false };
  if (STATE.missions.weekly.key !== wm.key)
    STATE.missions.weekly = { key: wm.key, progress: 0, done: false };

  let dKilled = false, wKilled = false;

  const matches = (prob, mission) => {
    if (mission.objType === "cat") return prob.c === mission.objVal;
    if (mission.objType === "diff") return prob.d === mission.objVal;
    return true;
  };

  if (!STATE.missions.daily.done && matches(solvedProb, dm)) {
    STATE.missions.daily.progress = Math.min(dm.target, STATE.missions.daily.progress + 1);
    if (STATE.missions.daily.progress >= dm.target) {
      STATE.missions.daily.done = true;
      dKilled = true;
      toast(`DAILY MISSION COMPLETE: ${dm.name}`);
    } else {
      toast(`PROGRESS: ${dm.title} [${STATE.missions.daily.progress}/${dm.target}]`);
    }
  }
  if (!STATE.missions.weekly.done && matches(solvedProb, wm)) {
    STATE.missions.weekly.progress = Math.min(wm.target, STATE.missions.weekly.progress + 1);
    if (STATE.missions.weekly.progress >= wm.target) {
      STATE.missions.weekly.done = true;
      wKilled = true;
      toast(`WEEKLY CRUSADE COMPLETE: ${wm.name}`);
    } else {
      toast(`PROGRESS: ${wm.title} [${STATE.missions.weekly.progress}/${wm.target}]`);
    }
  }
  return { dKilled, wKilled, dm, wm };
}

export function recalcMissions() {
  const dm = getMissionData("daily");
  const wm = getMissionData("weekly");
  const todayStr = dayKey();
  const wk = weekKey();

  const matches = (prob, mission) => {
    if (mission.objType === "cat") return prob.c === mission.objVal;
    if (mission.objType === "diff") return prob.d === mission.objVal;
    return true;
  };

  let dProg = 0, wProg = 0;
  PROBLEMS.forEach((p) => {
    const ps = STATE.problems[p.n];
    if (ps.status === "todo" || !ps.doneAt) return;
    const d = new Date(ps.doneAt);
    const dk =
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0");
    if (STATE.missions.daily.key === dm.key && dk === todayStr && matches(p, dm)) dProg++;
    if (STATE.missions.weekly.key === wk && matches(p, wm)) wProg++;
  });

  STATE.missions.daily.progress = Math.min(dm.target, dProg);
  STATE.missions.daily.done = STATE.missions.daily.progress >= dm.target;
  STATE.missions.weekly.progress = Math.min(wm.target, wProg);
  STATE.missions.weekly.done = STATE.missions.weekly.progress >= wm.target;
}
