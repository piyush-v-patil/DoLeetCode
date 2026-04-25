import { STATE, setSTATE, saveState, defaultState } from "./state.js";
import { PROBLEMS, lcUrl } from "./data.js";
import { AudioSys } from "./audio.js";
import { toast } from "./fx.js";
import { render, populateProfileStats, applySettings } from "./render.js";
import { markDone, pickSchedule, undoProblem, commitRev, toggleStar } from "./actions.js";
import {
  showAuthModal,
  loginWithGoogle,
  signOutUser,
  submitSetup,
  handleAuthAction,
} from "./firebase.js";

// ── Pattern dropdown ──────────────────────────────────────────────────────────
function updatePatternDropdown() {
  const c = STATE.filters.cat || "all";
  const pats = [
    ...new Set(PROBLEMS.filter((p) => c === "all" || p.c === c).map((p) => p.p)),
  ].sort();
  const dd = document.getElementById("ddPattern");
  const current = STATE.filters.pattern || "all";
  dd.innerHTML =
    `<option value="all">ALL PATTERNS</option>` +
    pats.map((p) => `<option value="${p}">${p.toUpperCase()}</option>`).join("");
  if (current !== "all" && !pats.includes(current)) {
    STATE.filters.pattern = "all";
    dd.value = "all";
    saveState();
  } else {
    dd.value = current;
  }
}
updatePatternDropdown();

// ── Filter dropdowns ──────────────────────────────────────────────────────────
["ddStatus", "ddDiff", "ddCat", "ddPattern", "ddSort"].forEach((id) => {
  const el = document.getElementById(id);
  const key = id.replace("dd", "").toLowerCase();
  el.value = STATE.filters[key] || "all";
  el.addEventListener("change", (e) => {
    STATE.filters[key] = e.target.value;
    if (key === "cat") updatePatternDropdown();
    saveState();
    render();
  });
});

// ── View toggle ───────────────────────────────────────────────────────────────
document.getElementById("viewToggle").addEventListener("click", () => {
  AudioSys.blip();
  STATE.filters.view = STATE.filters.view === "tree" ? "grid" : "tree";
  saveState();
  render();
});

document.querySelectorAll(".tree-node").forEach((node) => {
  node.addEventListener("click", () => {
    AudioSys.success();
    STATE.filters.cat = node.dataset.cat;
    STATE.filters.view = "grid";
    document.getElementById("ddCat").value = STATE.filters.cat;
    saveState();
    render();
  });
});

// ── Star filter ───────────────────────────────────────────────────────────────
const stToggle = document.getElementById("starToggle");
stToggle.classList.toggle("active", STATE.filters.star === "starred");
stToggle.addEventListener("click", () => {
  AudioSys.blip();
  STATE.filters.star = STATE.filters.star === "starred" ? "all" : "starred";
  stToggle.classList.toggle("active", STATE.filters.star === "starred");
  saveState();
  render();
});

// ── Search ────────────────────────────────────────────────────────────────────
document.getElementById("searchBox").addEventListener("input", (e) => {
  STATE.filters.search = e.target.value;
  render();
});

// ── Modal buttons ─────────────────────────────────────────────────────────────
document.getElementById("trophyBtn").addEventListener("click", () => {
  AudioSys.modal();
  document.getElementById("trophyModal").classList.add("open");
});

document.getElementById("btnReviewsDue").addEventListener("click", () => {
  AudioSys.blip();
  STATE.filters.status = "revise";
  document.getElementById("ddStatus").value = "revise";
  saveState();
  render();
  document.getElementById("grimoire").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("btnProfile").addEventListener("click", () => {
  try {
    AudioSys.modal();
    populateProfileStats();
    document.getElementById("profileModal").classList.add("open");
  } catch (e) {
    Vanguard.alert("PROFILE ERROR", e.message);
  }
});

document.getElementById("btnSettings").addEventListener("click", () => {
  AudioSys.modal();
  document.getElementById("settingsModal").classList.add("open");
});

document.getElementById("toggleCrt").addEventListener("click", () => {
  AudioSys.blip();
  STATE.settings.crt = !STATE.settings.crt;
  saveState();
  applySettings();
});

document.getElementById("toggleAudio").addEventListener("click", () => {
  STATE.settings.audio = !STATE.settings.audio;
  saveState();
  applySettings();
  AudioSys.blip();
});

document.getElementById("ddMissionDiff").addEventListener("change", (e) => {
  AudioSys.blip();
  STATE.settings.missionDiff = e.target.value;
  saveState();
  render();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  Vanguard.confirm(
    "FORMAT MEMORY",
    "This will erase ALL progress, solves, and trophies. Proceed with nuclear reset?",
    () => {
      AudioSys.hit();
      setSTATE(defaultState());
      saveState();
      render();
      toast("MEMORY FORMATTED.", true);
      document.getElementById("settingsModal").classList.remove("open");
    },
  );
});

// ── Grimoire click delegation ─────────────────────────────────────────────────
document.getElementById("grimoire").addEventListener("click", (e) => {
  const actionBtn = e.target.closest("[data-action]");
  if (actionBtn) {
    const action = actionBtn.dataset.action;
    const n = parseInt(actionBtn.dataset.n);
    const row = actionBtn.closest(".row");
    if (action === "markDone") markDone(n, row);
    else if (action === "commitRev") commitRev(n, actionBtn.dataset.diff, row);
    else if (action === "undo") undoProblem(n);
    else if (action === "startReview") {
      const prob = PROBLEMS.find((p) => p.n === n);
      if (!prob) return;
      lcTracked = { n, leftAt: Date.now(), isReview: true };
      AudioSys.blip();
      window.open(lcUrl(prob), "_blank");
    }
    return;
  }

  const starEl = e.target.closest(".col-star");
  if (starEl && starEl.dataset.star) {
    toggleStar(parseInt(starEl.dataset.star));
    return;
  }

  const lcLink = e.target.closest(".lc-link");
  if (lcLink) trackLCOpen(lcLink);
});

// ── LC Return Flow ────────────────────────────────────────────────────────────
const LC_RETURN_DELAY = 15000;
let lcTracked = null;

function trackLCOpen(linkEl) {
  const row = linkEl.closest(".row");
  if (!row || !row.dataset.n) return;
  lcTracked = { n: parseInt(row.dataset.n), leftAt: Date.now() };
}

function closeReturnModal() {
  document.getElementById("returnModal").classList.remove("open");
  lcTracked = null;
}

function showReturnModal() {
  if (!lcTracked) return;
  const n = lcTracked.n;
  const isReview = lcTracked.isReview === true;
  const prob = PROBLEMS.find((p) => p.n === n);
  if (!prob) { lcTracked = null; return; }
  const ps = STATE.problems[n];
  lcTracked = null;

  if (ps.status === "mastered") return;
  AudioSys.blip();

  if (isReview) {
    STATE.ui.activeRevId = n;
    render();
    const row = document.querySelector('.row[data-n="' + n + '"]');
    if (row) row.scrollIntoView({ behavior: "smooth", block: "center" });
    toast("Grade your review for #" + n + " — " + prob.t);
    return;
  }

  if (ps.status !== "todo") return;

  const body = document.getElementById("returnBody");
  document.querySelector("#returnModal .modal-title").textContent = "MISSION DEBRIEF";
  body.innerHTML =
    '<div class="return-problem">#' + n + " — " + prob.t + "</div>" +
    '<div class="return-question">Did you solve this problem?</div>' +
    '<div class="return-actions">' +
    '<button class="return-btn yes" id="retYes">YES, SOLVED</button>' +
    '<button class="return-btn no" id="retNo">NOT YET</button>' +
    "</div>";

  document.getElementById("retYes").addEventListener("click", () => {
    closeReturnModal();
    const row = document.querySelector('.row[data-n="' + n + '"]');
    if (row) markDone(n, row);
  });
  document.getElementById("retNo").addEventListener("click", closeReturnModal);
  document.getElementById("returnModal").classList.add("open");
}

document.getElementById("returnModalClose").addEventListener("click", closeReturnModal);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && lcTracked) {
    const elapsed = Date.now() - lcTracked.leftAt;
    if (elapsed >= LC_RETURN_DELAY) setTimeout(() => showReturnModal(), 300);
    else lcTracked = null;
  }
});

// ── Keyboard shortcuts ────────────────────────────────────────────────────────
let _selectedRowIdx = -1;

function highlightRow(rows) {
  rows.forEach((r) => r.classList.remove("kb-selected"));
  if (_selectedRowIdx >= 0 && _selectedRowIdx < rows.length) {
    rows[_selectedRowIdx].classList.add("kb-selected");
    rows[_selectedRowIdx].scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach((modal) => modal.classList.remove("open"));
    _selectedRowIdx = -1;
    document.querySelectorAll(".row.kb-selected").forEach((r) => r.classList.remove("kb-selected"));
    return;
  }
  if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "SELECT") return;
  if (document.querySelector(".modal-overlay.open")) return;

  const rows = document.querySelectorAll("#grimoire .row");
  if (!rows.length) return;

  if (e.key === "j" || e.key === "ArrowDown") {
    e.preventDefault();
    _selectedRowIdx = Math.min(_selectedRowIdx + 1, rows.length - 1);
    highlightRow(rows);
  } else if (e.key === "k" || e.key === "ArrowUp") {
    e.preventDefault();
    _selectedRowIdx = Math.max(_selectedRowIdx - 1, 0);
    highlightRow(rows);
  } else if (e.key === "Enter" && _selectedRowIdx >= 0 && _selectedRowIdx < rows.length) {
    e.preventDefault();
    const row = rows[_selectedRowIdx];
    const btn = row.querySelector(".btn-slay") || row.querySelector(".btn-forge");
    if (btn) btn.click();
  } else if (e.key === "/") {
    e.preventDefault();
    document.getElementById("searchBox").focus();
  }
});

// ── Vanguard Modal System ─────────────────────────────────────────────────────
const Vanguard = {
  _onConfirm: null,
  _onCancel: null,

  confirm(title, text, onConfirm, onCancel) {
    this.show({ title: title || "CONFIRM ACTION", text, confirmText: "PROCEED", cancelText: "CANCEL", onConfirm, onCancel });
  },

  alert(title, text) {
    this.show({ title: title || "SYSTEM ALERT", text, confirmText: "DISMISS", showCancel: false });
  },

  show({ title, text, confirmText, cancelText, onConfirm, onCancel, showCancel = true }) {
    AudioSys.modal();
    const overlay = document.getElementById("vanguardModal");
    overlay.querySelector(".v-modal-header").textContent = title.toUpperCase();
    overlay.querySelector(".v-modal-body").textContent = text;
    const confirmBtn = overlay.querySelector(".v-btn-primary");
    const cancelBtn = overlay.querySelector(".v-btn-secondary");
    confirmBtn.textContent = confirmText || "PROCEED";
    cancelBtn.textContent = cancelText || "CANCEL";
    cancelBtn.style.display = showCancel ? "block" : "none";
    this._onConfirm = () => { overlay.classList.remove("open"); if (onConfirm) onConfirm(); };
    this._onCancel = () => { overlay.classList.remove("open"); if (onCancel) onCancel(); };
    overlay.classList.add("open");
  },
};

document.getElementById("vConfirm").addEventListener("click", () => Vanguard._onConfirm());
document.getElementById("vCancel").addEventListener("click", () => Vanguard._onCancel());

// ── Window globals (for inline HTML handlers and cross-module access) ─────────
window.render = render;
window.pickSchedule = pickSchedule;
window.loginWithGoogle = loginWithGoogle;
window.handleAuthAction = handleAuthAction;
window.signOutUser = signOutUser;
window.submitSetup = submitSetup;
window.Vanguard = Vanguard;
window.confirmReview = function (n, conf) {
  const diff = conf === "struggled" ? "hard" : conf === "gotit" ? "norm" : "easy";
  STATE.ui.activeRevId = null;
  const row = document.querySelector('.row[data-n="' + n + '"]');
  commitRev(n, diff, row);
};

// ── Startup ───────────────────────────────────────────────────────────────────
render();

setTimeout(() => {
  const lastPrompt = localStorage.getItem("auth_last_prompted") || 0;
  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
  if (!window._currentUser && Date.now() - lastPrompt > ONE_WEEK) {
    showAuthModal();
  }
}, 1500);

const skipBtnEl = document.getElementById("btnSkipAuth");
if (skipBtnEl) {
  skipBtnEl.addEventListener("click", () => {
    const modal = document.getElementById("welcomeModal");
    if (modal) modal.classList.remove("open");
    localStorage.setItem("auth_last_prompted", Date.now());
  });
}

setInterval(() => render(), 60000);
