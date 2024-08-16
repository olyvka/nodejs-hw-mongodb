import dotenv from 'dotenv';
dotenv.config();


console.log('MONGODB_USER:', process.env.MONGODB_USER); // Для перевірки

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
