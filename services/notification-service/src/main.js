import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sendRouter from './mailRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: "*", // "http://localhost:3000" URL of the ervice or frontend it will exchange with
    credentials: false,
  }));

app.use(bodyParser.json());

app.use('/send', sendRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Mail service running on port ${PORT}`));