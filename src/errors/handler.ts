import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import AppError from 'errors/AppError';

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof AppError)
        return res.status(error.status).json({ error: error.message });

    if (error instanceof ValidationError)
        return res.status(400).json(error.errors);

    console.log(error);
    return res.status(500).json(error);
};

export default errorHandler;