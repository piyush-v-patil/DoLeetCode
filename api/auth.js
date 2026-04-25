// Vercel Serverless API - Authentication with Upstash KV & JWT
import bcrypt from "bcryptjs";
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

// Validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate password strength (min 8 chars)
function validatePassword(password) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  return true;
}

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      return handleAuth(req, res);
    case "GET":
      return getUser(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

async function handleAuth(req, res) {
  try {
    const { action, email, password, name } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (action === "register") {
      validatePassword(password);

      if (!name) {
        return res.status(400).json({ error: "Name required for registration" });
      }

      // Check if user exists
      const existingUser = await kv("GET", `user:${email}`);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);
      const userId = Date.now().toString();
      const user = {
        id: userId,
        email,
        name,
        createdAt: new Date().toISOString(),
      };

      // Store user in KV (without password hash in response)
      await kv("SET", `user:${email}`, JSON.stringify({ ...user, passwordHash }));

      return res.status(201).json({
        message: "User registered successfully",
        user: { email, name },
      });
    }

    if (action === "login") {
      // Get user from KV
      const userJson = await kv("GET", `user:${email}`);
      if (!userJson) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = JSON.parse(userJson);
      const passwordValid = await bcrypt.compare(password, user.passwordHash);

      if (!passwordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        token,
        user: { id: user.id, email: user.email, name: user.name },
        message: "Login successful",
      });
    }

    return res.status(400).json({ error: "Invalid action" });
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getUser(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.slice(7);

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Get user from KV using email from JWT token
    const userJson = await kv("GET", `user:${decoded.email}`);

    if (!userJson) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = JSON.parse(userJson);
    return res.status(200).json({
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Get User Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
