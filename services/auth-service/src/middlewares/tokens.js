import jwt from "jsonwebtoken";
import { hashToken } from "../utils/hashtoken.js";
import redisClient from "../config/redis.js";

export async function addUserToken(userId, token) {
    const tokenHash = hashToken(token);
    const decoded = jwt.decode(token);
    const expiresAt = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    const ttl = expiresAt - now;
  
    // Ajoute token hash
    await redisClient.sAdd(`user:${userId}:tokens`, tokenHash);
  
    // Met un TTL sur la clé set, au max TTL du token (ou renouvelé à chaque ajout)
    await redisClient.expire(`user:${userId}:tokens`, ttl);
}

export async function blacklistUserTokens(userId) {
    // Supprime le token hash de la liste Redis
    await redisClient.del(`user:${userId}:tokens`);
}