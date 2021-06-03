require('dotenv');
import express from 'express';
import routes from 'routes';
import connect from 'mongo';
import errorHandler from 'errors/handler';

connect();
const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
