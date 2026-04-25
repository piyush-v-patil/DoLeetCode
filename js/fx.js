import { AudioSys } from "./audio.js";
import { KILL_QUOTES } from "./config.js";

export function flashScreen() {
  const f = document.createElement("div");
  f.className = "flash";
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 400);
}

export function particleBurst(el, colorHex) {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2,
    cy = r.top + r.height / 2;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.color = colorHex;
    p.style.background = "currentColor";
    p.style.width = p.style.height = 4 + Math.random() * 8 + "px";
    p.style.left = cx + "px";
    p.style.top = cy + "px";
    document.body.appendChild(p);
    const angle = Math.random() * Math.PI * 2;
    const vel = 150 + Math.random() * 300;
    p.animate(
      [
        { transform: `translate(-50%,-50%) scale(1)`, opacity: 1 },
        {
          transform: `translate(calc(-50% + ${Math.cos(angle) * vel}px),calc(-50% + ${Math.sin(angle) * vel}px)) scale(0)`,
          opacity: 0,
        },
      ],
      { duration: 800 + Math.random() * 400, easing: "cubic-bezier(.2,.7,.3,1)" },
    );
    setTimeout(() => p.remove(), 1200);
  }
}

export function floatText(el, text) {
  const r = el.getBoundingClientRect();
  const t = document.createElement("div");
  t.className = "float-text";
  t.textContent = text;
  t.style.left = r.left + r.width / 2 + "px";
  t.style.top = r.top + "px";
  document.body.appendChild(t);
  t.animate(
    [
      { transform: "translate(-50%,-50%) scale(0)", opacity: 0 },
      { transform: "translate(-50%,-100%) scale(1.5)", opacity: 1, offset: 0.15 },
      { transform: "translate(-50%,-120%) scale(1)", opacity: 1, offset: 0.3 },
      { transform: "translate(-50%,-200%) scale(1)", opacity: 0 },
    ],
    { duration: 1500 },
  );
  setTimeout(() => t.remove(), 1500);
}

export function killQuote() {
  const q = document.createElement("div");
  q.className = "kill-quote";
  q.textContent = KILL_QUOTES[Math.floor(Math.random() * KILL_QUOTES.length)];
  document.body.appendChild(q);
  setTimeout(() => q.remove(), 2000);
}

const TOAST_QUEUE = [];
let ACTIVE_TOASTS = 0;
let LAST_TOAST_TIME = 0;

export function toast(text, isDanger = false) {
  TOAST_QUEUE.push({ text, isDanger });
  processToastQueue();
}

function processToastQueue() {
  const now = Date.now();
  if (ACTIVE_TOASTS >= 3 || TOAST_QUEUE.length === 0) return;

  if (now - LAST_TOAST_TIME < 800) {
    setTimeout(processToastQueue, 800 - (now - LAST_TOAST_TIME));
    return;
  }

  const { text, isDanger } = TOAST_QUEUE.shift();
  ACTIVE_TOASTS++;
  LAST_TOAST_TIME = Date.now();

  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const t = document.createElement("div");
  t.className = "toast";
  if (isDanger) t.classList.add("danger");
  t.textContent = text;
  container.appendChild(t);

  setTimeout(() => {
    t.remove();
    ACTIVE_TOASTS--;
    processToastQueue();
  }, 3200);
}
