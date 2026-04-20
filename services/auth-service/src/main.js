import dotenv from 'dotenv';
dotenv.config();

import app from "./app.js";
import { authenticate, sync } from './config/database.js';
import seed from './seeders/seed.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
      await authenticate();
      await sync();
      console.log('Base de données connectée et modèles synchronisés avec succès.');

      await seed();

      app.listen(PORT, () => console.log(`auth-service running on port ${PORT}`));
    } catch (err) {
      console.error('Impossible de se connecter :', err);
    }
  };
  
  startServer();