import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(config.port, () =>
      console.log(`🚀 Server running at http://${config.host}:${config.port}`)
    );
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
