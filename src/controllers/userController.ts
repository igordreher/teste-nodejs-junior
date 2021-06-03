import { Request, Response } from 'express';
import User from 'models/user';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { Types } from 'mongoose';
import AppError from 'errors/AppError';


export default {

    list: async (req: Request, res: Response) => {
        const users = await User.find();
        res.status(200).json(users);
    },

    find: async (req: Request, res: Response) => {
        const { user_id } = req.params;

        validateIdType(user_id);
        await validateExistingUser(user_id);

        const user = await User.findOne({ _id: user_id });
        res.status(200).json(user);
    },

    create: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required()
        });

        await schema.validate({ email, password });
        await validateNoExistingEmail(email);

        const newUser = await User.create({ email, password });
        res.status(201).json(newUser);
    },

    update: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { user_id } = req.params;

        if (!(email || password))
            throw new ValidationError('Email or password required to update');

        const schema = yup.object().shape({
            email: yup.string().email(),
            password: yup.string()
        });

        validateIdType(user_id);
        await schema.validate({ email, password });
        await validateExistingUser(user_id);
        await validateNoExistingEmail(email);

        await User.updateOne({ _id: user_id }, { email, password });
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

async function validateNoExistingEmail(email: string) {
    const user = await User.findOne({ email });
    if (user)
        throw new ValidationError('Invalid email: already used');
}

function validateIdType(id: string) {
    if (!Types.ObjectId.isValid(id))
        throw new ValidationError('Invalid ID: should be 24 hex string');
}

async function validateExistingUser(id: string) {
    const user = await User.findOne({ _id: id });
    if (!user)
        throw new AppError('User not found', 404);
}