import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import projectRoutes from './routes/project.routes.js';
import aiRoutes from './routes/ai.routes.js';
import path from "path";
import { fileURLToPath } from "url";

console.log("🔥 APP.JS CORS LOADED");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connect();

const app = express();

const corsOptions = {
  origin: ['http://localhost:3001',
    'https://toks-thox.vercel.app'
  ], // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // This is the missing piece
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;