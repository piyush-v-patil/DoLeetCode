// Vercel Serverless API - User State
// In-memory store (replace with Vercel KV / MongoDB / Postgres for persistence)
const userStates = new Map();

function verifyToken(token) {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());
    if (payload.exp < Date.now()) return null;
    return { userId: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}

function getUserId(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;
  const decoded = verifyToken(authHeader.slice(7));
  return decoded?.userId ?? null;
}

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return getState(req, res);
    case "POST":
    case "PUT":
      return saveState(req, res);
    case "DELETE":
      return deleteState(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

function getState(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const state = userStates.get(userId);
  if (!state) return res.status(200).json({ state: {} });

  return res.status(200).json({ state });
}

function saveState(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const { state } = req.body;
  userStates.set(userId, { ...state, updatedAt: new Date().toISOString() });

  return res.status(200).json({ message: "State saved", updatedAt: new Date().toISOString() });
}

function deleteState(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  userStates.delete(userId);
  return res.status(200).json({ message: "State deleted" });
}
