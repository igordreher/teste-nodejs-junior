import { Request, Response } from 'express';
import User from 'models/userModel';
import view from 'views/userView';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { Types } from 'mongoose';
import AppError from 'errors/AppError';


export default {

    list: async (req: Request, res: Response) => {
        const users = await User.find();
        res.status(200).json(view.renderMany(users));
    },

    find: async (req: Request, res: Response) => {
        const { user_id } = req.params;

        validateIdType(user_id);

        const user = await User.findOne({ _id: user_id });
        if (!user)
            throw new AppError('User not found', 404);

        res.status(200).json(view.render(user));
    },

    create: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        await validateUserData({ email, password });

        const user = await User.create({ email, password });
        res.status(201).json(view.render(user));
    },

    replace: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { user_id } = req.params;

        validateIdType(user_id);
        await validateUserData({ email, password, user_id });

        await User.replaceOne({ _id: user_id }, { email, password });
        res.status(204).json();
    },

    delete: async (req: Request, res: Response) => {
        const { user_id } = req.params;
        validateIdType(user_id);

        await User.deleteOne({ _id: user_id });
        res.status(200).json();
    },

    deleteAll: async (req: Request, res: Response) => {
        await User.deleteMany();
        res.status(200).json();
    },
};

interface User {
    email: string;
    password: string;
    user_id?: string;
}


function validateIdType(id: string) {
    if (!Types.ObjectId.isValid(id))
        throw new ValidationError('Invalid ID: should be 24 hex string');
}

async function validateUserData({ email, password, user_id }: User) {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    });
    await schema.validate({ email, password }, { abortEarly: false });

    const user = await User.findOne({ _id: { $ne: user_id }, email });
    if (user)
        throw new ValidationError('Invalid email: already used');
}