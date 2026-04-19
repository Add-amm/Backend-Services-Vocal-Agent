import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { generateUserId } from '../utils/generate_id.js';
import { addUserToken, blacklistUserTokens } from '../middlewares/tokens.js';

dotenv.config();

// ==================== LOGIN ====================

export const login = async (req, res) => {
    try {
      const { email, mdp } = req.body;
      if (!email || !mdp) {
        return res.status(400).json({ message: 'Email et mot de passe requis' });
      }

      if (!mdp) return res.status(400).json({ message: 'Mot de passe manquant' });

      const user = await User.findOne({ where: { email, bloquer: false } });
      if (!user) return res.status(401).json({ message: 'Identifiants incorrects' });

      const isMatch = await bcrypt.compare(mdp, user.mdp);
      if (!isMatch) return res.status(401).json({ message: 'Identifiants incorrects' });
  
      const token = jwt.sign({
        id: user.id,
      }, process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
      );

      addUserToken(user.id, token);
      
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// ==================== SIGN-UP ====================

export const singup = async (req, res) => {
    try {
      const {
        nom_complet,
        email,
        phone_num,
        mdp,
        confirm_password
      } = req.body;

      // Verification de l'unicité du username et email
      const existingUser = await User.findOne({
        where: { email }
      });

      if (existingUser){
        return res.status(400).json({message: "Email déjà utilisé."})
      }

      if (mdp !== confirm_password){
        return res.status(400).json({message: "Les mots de passe ne correspondent pas."})
      }

      const hashedPassword = await bcrypt.hash(mdp, 10);

      // Insértion dans la base de données
      const newUser = await User.create({
        id: await generateUserId(),
        nom_complet,
        email,
        phone_num,
        mdp: hashedPassword
      });

      // Retourne uniquement le mot de passe généré
      res.status(201).json({ message: "Utilisateur créer avec succés." });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// ==================== GET PROFILE ====================

export const profile = async (req, res) => {
    try {
      // req.user set by authenticateToken middleware
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['mdp', 'bloquer', 'updatedAt'] }, // exclude
      });
      if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// ==================== UPDATE User ====================
export const updateUser = async (req, res) => {
  try {
      const { id } = req.params;

      // Récupération des champs à mettre à jour
      const {
        nom_complet,
        email,
        phone_num,
    } = req.body;

      // Vérifie que l'utilisateur existe
      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Vérifie si username ou email sont déjà utilisés par un autre utilisateur
      const existingUser = await User.findOne({ where: { email, bloquer: false }});

      if (existingUser) {
          return res.status(400).json({ message: "Email déjà utilisé." });
      };

      // Mise à jour des champs
      await user.update({
          nom_complet,
          email,
          phone_num,
      });

      res.status(200).json({ message: "Utilisateur mis à jour avec succès." });

  } catch(error) {
      res.status(500).json({ message : error.message });
  }
};

// ==================== UPDATE Password ====================
export const updateThisUserPassword = async (req, res) => {
  try {
      const { currentPassword, newPassword, confirmNewPassword } = req.body;

      // 1. Validation
      if (!currentPassword || !newPassword || !confirmNewPassword) {
          return res.status(400).json({ message: 'Tous les champs sont requis.' });
      };

      if (newPassword !== confirmNewPassword) {
          return res.status(400).json({ message: 'Les nouveaux mots de passe ne correspondent pas.' });
      };

      // 2. Avoir l'utilisateur actuel en utilisant le token
      const user = await User.findByPk(req.user.id);
      if (!user){
          return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      };

      // 3. Vérifier le mot de passe
      const isMatch = await bcrypt.compare(currentPassword, user.mdp);
      if (!isMatch){
          return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
      }

      // 4. Vérifier que le nouveau mot de passe est différent de l'ancien
      if (currentPassword === newPassword){
          return res.status(400).json({ message: "Le nouveau mot de passe doit être différent de l'ancien" });
      };

      // 5. Hashage et modification dans la base de données
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.mdp = hashedPassword;
      user.save();

      return res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });

  } catch(error) {
      res.status(500).json({ message : error.message });
  }
};

// ==================== Logout ====================

export const logout = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(400).json({ message: 'Jeton manquant' });
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    blacklistUserTokens(userId);
    res.json({ message: 'Vous avez été déconnecté avec succès.' });
};