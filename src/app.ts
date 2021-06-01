require('dotenv');
import express, { Request, Response, NextFunction } from 'express';
import routes from 'routes';
import connect from 'mongo';
import { ValidationError } from 'yup';

connect();
const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError)
        return res.status(400).json(error.errors);

    return res.status(500).json(error);
});

export default app;
