require('dotenv');
import express from 'express';
import routes from 'routes';
import mongoose from 'mongoose';

const db_url = process.env.DB_URL || 'mongodb://localhost:27017/test';
mongoose.connect(db_url, { useNewUrlParser: true, });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));

const app = express();

app.use(express.json());
app.use(routes);

export default app;
