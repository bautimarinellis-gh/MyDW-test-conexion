import mongoose, { Document, Schema } from 'mongoose';

// Interfaz para el documento User
export interface IUser extends Document {
    name: string;
    lastName?: string;
    email: string;
    age: number;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 0, min: 0 }
});

export default mongoose.model<IUser>("User", userSchema);
