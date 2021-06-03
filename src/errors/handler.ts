import { ErrorRequestHandler, RequestHandler } from 'express';
import { ValidationError } from 'yup';
import AppError from 'errors/AppError';

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof AppError)
        return res.status(error.status).json(error.message);

    if (error instanceof ValidationError)
        return res.status(400).json(error.errors);

    console.log(error);
    return res.status(500).json(error);
};

const notFoundHandler: RequestHandler = (req, res) => {
    res.status(404).json('Resource not found');
};

export default [errorHandler, notFoundHandler];