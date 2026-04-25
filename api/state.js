// Vercel Serverless API - User State
// This handles saving and loading user progress

// In-memory store (use a database like Vercel Postgres, MongoDB, or Redis in production)
const userStates = new Map();

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getState(req, res);
    case 'POST':
    case 'PUT':
      return saveState(req, res);
    case 'DELETE':
      return deleteState(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

function getState(req, res) {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const state = userStates.get(userId);
  if (!state) {
    return res.status(404).json({ error: 'No state found', state: {} });
  }

  return res.status(200).json({ state });
}

function saveState(req, res) {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { state } = req.body;
  userStates.set(userId, { ...state, updatedAt: new Date().toISOString() });

  return res.status(200).json({ message: 'State saved', updatedAt: new Date().toISOString() });
}

function deleteState(req, res) {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  userStates.delete(userId);
  return res.status(200).json({ message: 'State deleted' });
}