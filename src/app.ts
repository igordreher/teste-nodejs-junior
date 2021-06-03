require('dotenv');
import express, { Request, Response, NextFunction } from 'express';
import routes from 'routes';
import connect from 'mongo';
import { ValidationError } from 'yup';
import AppError from 'errors/AppError';

connect();
const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError)
        return res.status(error.status).json({ error: error.message });

    if (error instanceof ValidationError)
        return res.status(400).json(error.errors);

    console.log(error);
    return res.status(500).json(error);
});

export default app;
