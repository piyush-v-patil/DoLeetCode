// Vercel Serverless API - Authentication
// This handles user authentication with JWT tokens

const users = new Map();

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return handleAuth(req, res);
    case 'GET':
      return getUser(req, res);
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

function handleAuth(req, res) {
  const { action, email, password, name } = req.body;

  if (action === 'register') {
    if (users.has(email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = { id: Date.now().toString(), email, name, createdAt: new Date().toISOString() };
    users.set(email, { ...user, password: hash(password) });
    return res.status(201).json({ message: 'User registered', user: { email, name } });
  }

  if (action === 'login') {
    const user = users.get(email);
    if (!user || user.password !== hash(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user.id, email);
    return res.status(200).json({ token, user: { id: user.id, email, name: user.name } });
  }

  return res.status(400).json({ error: 'Invalid action' });
}

function getUser(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.slice(7);
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const user = Array.from(users.values()).find(u => u.id === decoded.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json({ user: { id: user.id, email: user.email, name: user.name } });
}

// Simple hash function (use bcrypt in production)
function hash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16);
}

// Simple JWT-like token (use jsonwebtoken in production)
function generateToken(userId, email) {
  const payload = Buffer.from(JSON.stringify({ userId, email, exp: Date.now() + 86400000 })).toString('base64');
  return payload;
}

function verifyToken(token) {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp < Date.now()) return null;
    return { userId: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}