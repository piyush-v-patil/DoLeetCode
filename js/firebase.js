import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { STATE, setSTATE, saveState, defaultState, registerSyncCallback } from "./state.js";
import { toast } from "./fx.js";
import { render } from "./render.js";

// REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "API_KEY_HERE",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

async function syncToCloud() {
  if (!currentUser) return;
  try {
    await setDoc(doc(db, "users", currentUser.uid), { state: STATE }, { merge: true });
    document.getElementById("syncIndicator")?.classList.add("synced");
  } catch (e) {
    console.error("Cloud Sync Error:", e);
  }
}

async function syncFromCloud() {
  if (!currentUser) return;
  try {
    const snap = await getDoc(doc(db, "users", currentUser.uid));
    if (snap.exists()) {
      const cloudState = snap.data().state;
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

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  const loginBtn = document.getElementById("btnGoogleLogin");
  const profileName = document.getElementById("profileUsername");
  const signOutBtn = document.getElementById("btnSignOut");
  const hudProfileBtn = document.getElementById("btnProfile");

  if (user) {
    if (loginBtn) {
      loginBtn.textContent = "SYNCED: " + (STATE.profileName || user.displayName).toUpperCase();
      loginBtn.style.color = "var(--success)";
      loginBtn.disabled = true;
    }
    if (signOutBtn) signOutBtn.style.display = "block";
    if (profileName) profileName.textContent = (STATE.profileName || user.displayName).toUpperCase();
    if (hudProfileBtn) hudProfileBtn.innerHTML = "👤 PROFILE";

    if (!STATE.profileName) {
      document.getElementById("setupModal").classList.add("open");
      const input = document.getElementById("setupNameInput");
      if (input) input.value = user.displayName || "";
    }

    const lastToast = localStorage.getItem("last_welcome_toast") || 0;
    const now = Date.now();
    if (now - lastToast > 3 * 60 * 60 * 1000) {
      toast(`WELCOME BACK, OPERATOR ${(STATE.profileName || user.displayName).toUpperCase()}!`);
      localStorage.setItem("last_welcome_toast", now);
    }

    syncFromCloud();
  } else {
    if (loginBtn) {
      loginBtn.textContent = "LOGIN VIA GOOGLE";
      loginBtn.style.color = "var(--success)";
      loginBtn.disabled = false;
    }
    if (signOutBtn) signOutBtn.style.display = "none";
    if (profileName) profileName.textContent = "GUEST USER";
    if (hudProfileBtn) hudProfileBtn.innerHTML = "🔑 LOGIN";
  }
});

export function showAuthModal() {
  document.getElementById("welcomeModal").classList.add("open");
}

export async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    toast("Login Failed", true);
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    toast("Logged Out");
    setSTATE(defaultState());
    render();
  } catch (e) {
    toast("Logout Failed", true);
  }
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
