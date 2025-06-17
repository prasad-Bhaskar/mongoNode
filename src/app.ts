import express from 'express';
import userRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import { sanitizeRequest } from './middlewares/sanatize.middleware';

const app = express();

app.use(express.json());
app.use(sanitizeRequest);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;
