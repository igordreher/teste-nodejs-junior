import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: String,
    password: String
});

export default model<User>('User', userSchema);