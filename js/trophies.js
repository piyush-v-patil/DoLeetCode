import { STATE, saveState } from "./state.js";
import { PROBLEMS } from "./data.js";
import { AudioSys } from "./audio.js";
import { particleBurst } from "./fx.js";
import { countSlain, countDue, dayKey } from "./logic.js";

export const LIFETIME_TROPHIES = [
  {
    id: "first",
    icon: "🗡️",
    name: "First Blood",
    desc: "Slay your first quest",
    target: 1,
    check: () => countSlain() >= 1,
    progress: () => countSlain(),
  },
  {
    id: "ten",
    icon: "⚔️",
    name: "Mercenary",
    desc: "Slay 10 quests",
    target: 10,
    check: () => countSlain() >= 10,
    progress: () => countSlain(),
  },
  {
    id: "fifty",
    icon: "👑",
    name: "Realm Conqueror",
    desc: "Slay 50 quests",
    target: 50,
    check: () => countSlain() >= 50,
    progress: () => countSlain(),
  },
  {
    id: "streak3",
    icon: "🔥",
    name: "Kindled",
    desc: "3-day streak",
    target: 3,
    check: () => STATE.streak >= 3,
    progress: () => STATE.streak,
  },
  {
    id: "streak7",
    icon: "🌋",
    name: "Burning Soul",
    desc: "7-day streak",
    target: 7,
    check: () => STATE.streak >= 7,
    progress: () => STATE.streak,
  },
  {
    id: "goliath",
    icon: "💀",
    name: "David vs Goliath",
    desc: "Slay your first Hard quest",
    check: () =>
      PROBLEMS.some((p) => p.d === "Hard" && STATE.problems[p.n].status !== "todo"),
  },
  {
    id: "masochist",
    icon: "🩸",
    name: "Masochist",
    desc: "Slay 15 Hard quests",
    target: 15,
    check: () =>
      PROBLEMS.filter((p) => p.d === "Hard" && STATE.problems[p.n].status !== "todo").length >= 15,
    progress: () =>
      PROBLEMS.filter((p) => p.d === "Hard" && STATE.problems[p.n].status !== "todo").length,
  },
  {
    id: "warmup",
    icon: "☕",
    name: "Warmup Routine",
    desc: "Slay 25 Easy quests",
    check: () =>
      PROBLEMS.filter((p) => p.d === "Easy" && STATE.problems[p.n].status !== "todo").length >= 25,
  },
  {
    id: "ascension",
    icon: "🌌",
    name: "Ascension",
    desc: "Attain MAX RANK on a quest",
    check: () => Object.values(STATE.problems).some((p) => p.status === "mastered"),
  },
  {
    id: "grandmaster",
    icon: "🧠",
    name: "Grandmaster",
    desc: "Attain MAX RANK on 10 quests",
    check: () =>
      Object.values(STATE.problems).filter((p) => p.status === "mastered").length >= 10,
  },
  {
    id: "clearmind",
    icon: "🧘",
    name: "Clear Mind",
    desc: "Zero pending reviews (min 10 solved)",
    check: () => countSlain() >= 10 && countDue() === 0,
  },
  {
    id: "bloodbath",
    icon: "🧛",
    name: "Bloodlust",
    desc: "Slay 5 quests in one day",
    check: () => Object.values(STATE.solveLog).some((v) => v >= 5),
  },
];

export const DAILY_BOUNTIES = [
  {
    id: "spree",
    icon: "⚡",
    name: "Kill Spree",
    desc: "3 solves within 90 mins",
    target: 3,
    progress: () => (STATE.recentSolves || []).length,
    check: () =>
      (STATE.recentSolves || []).length >= 3 &&
      (STATE.dailyBounties.counts["spree"] || 0) === 0,
    xp: 50,
  },
  {
    id: "dominating",
    icon: "👿",
    name: "Dominating",
    desc: "5 solves today",
    target: 5,
    progress: () => STATE.solveLog[dayKey()] || 0,
    check: () =>
      (STATE.solveLog[dayKey()] || 0) >= 5 &&
      (STATE.dailyBounties.counts["dominating"] || 0) === 0,
    xp: 100,
  },
  {
    id: "overload",
    icon: "🔌",
    name: "System Overload",
    desc: "Complete all 3 Core Challenges",
    target: 3,
    progress: () => {
      const spreeDone = (STATE.dailyBounties.counts["spree"] || 0) > 0 ? 1 : 0;
      const domDone = (STATE.dailyBounties.counts["dominating"] || 0) > 0 ? 1 : 0;
      const dmDone = STATE.missions.daily.done ? 1 : 0;
      return spreeDone + domDone + dmDone;
    },
    check: () => {
      const spreeDone = (STATE.dailyBounties.counts["spree"] || 0) > 0;
      const domDone = (STATE.dailyBounties.counts["dominating"] || 0) > 0;
      const dmDone = STATE.missions.daily.done;
      return (
        spreeDone &&
        domDone &&
        dmDone &&
        (STATE.dailyBounties.counts["overload"] || 0) === 0
      );
    },
    xp: 150,
  },
];

export function showAchievement(t, bounty = false) {
  setTimeout(() => AudioSys.success(), 100);
  let container = document.getElementById("achieveContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "achieveContainer";
    container.className = "achieve-popup-container";
    document.body.appendChild(container);
  }
  const el = document.createElement("div");
  const type = t.id === "overload" ? "overload" : bounty ? "bounty" : "lifetime";
  el.className = `achieve-popup ${type}`;
  el.innerHTML = `
    <div class="achieve-icon">${t.icon}</div>
    <div class="achieve-info">
      <div class="achieve-title">${bounty ? "BOUNTY CLAIMED" : "DATA UNLOCKED"}</div>
      <div class="achieve-name">${t.name}</div>
      <div class="achieve-desc">${t.desc}</div>
    </div>
  `;
  container.appendChild(el);

  setTimeout(() => {
    particleBurst(el, bounty ? "var(--neon-cyan)" : "var(--neon-yellow)");
  }, 150);

  setTimeout(() => {
    el.style.transition = "all 0.6s ease-in";
    el.style.opacity = "0";
    el.style.transform = "translateX(50px) scale(0.9)";
    setTimeout(() => el.remove(), 600);
  }, 4000);
}

export function checkTrophies(delayed = false) {
  let unlockedAny = false;

  LIFETIME_TROPHIES.forEach((t) => {
    if (!STATE.achievements[t.id] && t.check()) {
      STATE.achievements[t.id] = Date.now();
      unlockedAny = true;
      showAchievement(t, false);
      if (delayed) AudioSys.achievement();
    }
  });

  DAILY_BOUNTIES.forEach((b) => {
    if (b.check && b.check()) {
      const day = dayKey();
      if (!STATE.dailyBounties || STATE.dailyBounties.date !== day) {
        STATE.dailyBounties = { date: day, counts: {} };
      }
      const count = (STATE.dailyBounties.counts[b.id] || 0) + 1;
      STATE.dailyBounties.counts[b.id] = count;
      showAchievement(b, true);
      unlockedAny = true;
    }
  });

  if (unlockedAny) {
    saveState();
    window.render?.();
  }
}
