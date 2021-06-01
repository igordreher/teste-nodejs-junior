import { Request, Response } from "express";
import User from 'models/user';


export default {

    list: async (req: Request, res: Response) => {

    },

    find: async (req: Request, res: Response) => {

    },

    create: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.create({ email, password });
            res.status(201).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    },

    update: async (req: Request, res: Response) => {

    },

    delete: async (req: Request, res: Response) => {

    },

    deleteAll: async (req: Request, res: Response) => {

    },
};