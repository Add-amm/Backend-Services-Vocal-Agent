import express, { json } from 'express';
const app = express();
import authRoutes from './routes/authRoutes.js';
import cors from "cors";

app.use(cors({
    origin: "*", // "http://localhost:3000" URL of the ervice or frontend it will exchange with
    credentials: false,
}));

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes);

app.all('/{*any}', (req, res) => { // /{*any} fixes the parameter 1 missing argument bug, it has been placed instead of "*"
  res.status(404).json({ message: `${req.originalUrl} est introuvable sur ce serveur.` });
});

export default app;