require('dotenv');
import express from 'express';
import routes from 'routes';
import connect from 'mongo';

connect();
const app = express();

app.use(express.json());
app.use(routes);

export default app;
