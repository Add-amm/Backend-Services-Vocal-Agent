import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';
import { hashToken } from '../utils/hashtoken.js';

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Jeton d'accès manquant" });
  }

  try {
    // Verify token first
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const tokenHash = hashToken(token);

    const isAllowed = await redisClient.sIsMember(
      `user:${decoded.id}:tokens`,
      tokenHash
    );

    if (!isAllowed) {
      return res.status(401).json({ message: 'Token non autorisé' });
    }

    req.user = decoded; // Make decoded token data available in req
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Jeton invalide ou expiré' });
  }
}

export default authenticateToken;