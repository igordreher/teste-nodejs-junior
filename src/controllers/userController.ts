import { Request, Response, NextFunction } from "express";
import User from 'models/user';
import * as yup from 'yup';
import { ValidationError } from "yup";


export default {

    list: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    find: async (req: Request, res: Response, next: NextFunction) => {
        const { user_id } = req.params;
        try {
            const user = await User.findOne({ _id: user_id });
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required()
        });

        try {
            await schema.validate({ email, password });
            const user = await User.create({ email, password });
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const { user_id } = req.params;

        if (!(email || password))
            return next(new ValidationError('Email or password required to update'));

        const schema = yup.object().shape({
            email: yup.string().email(),
            password: yup.string()
        });

        try {
            await schema.validate({ email, password });
            const user = await User.updateOne({ _id: user_id }, { email, password });
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response) => {

    },

    deleteAll: async (req: Request, res: Response) => {

    },
};
