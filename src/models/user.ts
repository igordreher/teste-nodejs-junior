import { Schema, model } from 'mongoose';

interface User {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: String,
    password: String
});

export default model<User>('User', userSchema);