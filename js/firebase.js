// API-based Authentication (Vercel Backend)
// Uses the /api/auth and /api/state endpoints

import { STATE, setSTATE, saveState, defaultState, registerSyncCallback } from "./state.js";
import { toast } from "./fx.js";
import { render } from "./render.js";

const API_BASE = "/api";

let currentUser = null;
let authToken = null;

// Save token to localStorage
function saveToken(token) {
  localStorage.setItem("auth_token", token);
  authToken = token;
}

// Get token from localStorage
function getToken() {
  if (!authToken) {
    authToken = localStorage.getItem("auth_token");
  }
  return authToken;
}

// Clear auth data
function clearAuth() {
  localStorage.removeItem("auth_token");
  authToken = null;
  currentUser = null;
}

// API helper
async function apiCall(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "API Error");
  }

  return response.json();
}

// Cloud sync functions
async function syncToCloud() {
  if (!currentUser) return;
  try {
    await apiCall("/state", {
      method: "POST",
      body: JSON.stringify({ state: STATE }),
    });
    document.getElementById("syncIndicator")?.classList.add("synced");
  } catch (e) {
    console.error("Cloud Sync Error:", e);
  }
}

async function syncFromCloud() {
  if (!currentUser) return;
  try {
    const { state: cloudState } = await apiCall("/state");
    if (cloudState && Object.keys(cloudState).length > 0) {
      setSTATE({ ...STATE, ...cloudState });
      if (!STATE.achievements) STATE.achievements = {};
      if (!STATE.starredProblems) STATE.starredProblems = {};
      if (!STATE.solveLog) STATE.solveLog = {};
      saveState();
      render();
      toast("PROGRESS SYNCED FROM CLOUD");
    } else {
      syncToCloud();
    }
  } catch (e) {
    console.error("Cloud Load Error:", e);
  }
}

// Register the sync callback so saveState() triggers cloud sync when logged in
registerSyncCallback(() => { if (currentUser) syncToCloud(); });

// Check for existing session on load
async function checkSession() {
  const token = getToken();
  if (!token) return;

  try {
    const { user } = await apiCall("/auth");
    currentUser = user;
    // Set profileName from server data on first load
    if (!STATE.profileName && currentUser?.name) {
      STATE.profileName = currentUser.name;
    }
    updateUI(true);
    syncFromCloud();
  } catch (e) {
    clearAuth();
  }
}

// Update UI based on auth state
function updateUI(isLoggedIn) {
  const loginBtn = document.getElementById("btnGoogleLogin");
  const profileName = document.getElementById("profileUsername");
  const signOutBtn = document.getElementById("btnSignOut");
  const hudProfileBtn = document.getElementById("btnProfile");

  if (isLoggedIn && currentUser) {
    if (loginBtn) {
      loginBtn.textContent = "SYNCED: " + (STATE.profileName || currentUser.name || "USER").toUpperCase();
      loginBtn.style.color = "var(--success)";
      loginBtn.disabled = true;
    }
    if (signOutBtn) signOutBtn.style.display = "block";
    if (profileName) profileName.textContent = (STATE.profileName || currentUser.name || "USER").toUpperCase();
    if (hudProfileBtn) hudProfileBtn.innerHTML = "👤 PROFILE";
  } else {
    if (loginBtn) {
      loginBtn.textContent = "LOGIN / REGISTER";
      loginBtn.style.color = "var(--success)";
      loginBtn.disabled = false;
    }
    if (signOutBtn) signOutBtn.style.display = "none";
    if (profileName) profileName.textContent = "GUEST USER";
    if (hudProfileBtn) hudProfileBtn.innerHTML = "🔑 LOGIN";
  }
}

// Initialize session check
checkSession();

export function showAuthModal() {
  document.getElementById("welcomeModal").classList.add("open");
}

export async function loginWithGoogle() {
  // Show the auth modal for email/password login
  showAuthModal();
}

export async function signOutUser() {
  clearAuth();
  toast("Logged Out");
  setSTATE(defaultState());
  updateUI(false);
  render();
}

export async function submitSetup() {
  const name = document.getElementById("setupNameInput").value.trim();
  if (!name) return toast("Identity required", true);
  STATE.profileName = name;
  saveState();
  await syncToCloud();
  document.getElementById("setupModal").classList.remove("open");
  render();
  toast("IDENTITY ESTABLISHED");
}

// Export for modal forms
export async function handleAuthAction(action, email, password, name) {
  try {
    const { token, user, message } = await apiCall("/auth", {
      method: "POST",
      body: JSON.stringify({ action, email, password, name }),
    });

    if (token) {
      saveToken(token);
      currentUser = user;
      updateUI(true);
      document.getElementById("welcomeModal")?.classList.remove("open");
      toast(message || "Welcome!");

      // Use server name if available, only show setup if name is missing
      if (!currentUser?.name) {
        document.getElementById("setupModal").classList.add("open");
      } else {
        STATE.profileName = currentUser.name;
        syncFromCloud();
      }
    } else {
      toast(message || message);
    }
  } catch (e) {
    toast(e.message, true);
  }
}
