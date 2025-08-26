import mongoose, { Document, Schema } from "mongoose";

// Interfaz para el documento Post
export interface IPost extends Document {
    title: string;
    content?: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
}

const postSchema: Schema<IPost> = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPost>("Post", postSchema);
