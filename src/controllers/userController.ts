import { Request, Response, NextFunction } from "express";
import User from 'models/user';
import * as yup from 'yup';


export default {

    list: async (req: Request, res: Response) => {

    },

    find: async (req: Request, res: Response) => {

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

    update: async (req: Request, res: Response) => {

    },

    delete: async (req: Request, res: Response) => {

    },

    deleteAll: async (req: Request, res: Response) => {

    },
};
