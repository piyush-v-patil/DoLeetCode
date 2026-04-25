// Vercel Serverless API - User State Management with Upstash KV
import jwt from "jsonwebtoken";

const UPSTASH_REST_API_URL = process.env.KV_REST_API_URL;
const UPSTASH_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;
const JWT_SECRET = process.env.JWT_SECRET;

// Validate environment variables
if (!UPSTASH_REST_API_URL || !UPSTASH_REST_API_TOKEN || !JWT_SECRET) {
  throw new Error("Missing required environment variables: KV_REST_API_URL, KV_REST_API_TOKEN, JWT_SECRET");
}

// Upstash REST API helper
async function kv(command, ...args) {
  const response = await fetch(`${UPSTASH_REST_API_URL}/exec`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${UPSTASH_REST_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command, ...args]),
  });

  if (!response.ok) {
    throw new Error(`KV Error: ${response.status}`);
  }

  const result = await response.json();
  if (result.error) throw new Error(result.error);
  return result.result;
}

// Verify JWT token and extract userId
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { userId: decoded.userId, email: decoded.email };
  } catch {
    return null;
  }
}

// Extract userId from request headers
function getUserId(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);
  const decoded = verifyToken(token);
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

async function getState(req, res) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const stateJson = await kv("GET", `userstate:${userId}`);

    // If no state exists, return empty state
    if (!stateJson) {
      return res.status(200).json({ state: {} });
    }

    const state = JSON.parse(stateJson);
    return res.status(200).json({ state });
  } catch (error) {
    console.error("Get State Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function saveState(req, res) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { state } = req.body;
    if (!state || typeof state !== "object") {
      return res.status(400).json({ error: "State object required" });
    }

    const stateWithTimestamp = {
      ...state,
      updatedAt: new Date().toISOString(),
    };

    await kv("SET", `userstate:${userId}`, JSON.stringify(stateWithTimestamp));

    return res.status(200).json({
      message: "State saved",
      updatedAt: stateWithTimestamp.updatedAt,
    });
  } catch (error) {
    console.error("Save State Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteState(req, res) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    await kv("DEL", `userstate:${userId}`);

    return res.status(200).json({ message: "State deleted" });
  } catch (error) {
    console.error("Delete State Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
