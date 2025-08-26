import mongoose, { Document, Schema } from "mongoose";

// Interfaz para el documento Product
export interface IProduct extends Document {
    code: string;
    name: string;
    description?: string;
    stock: number;
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, required: true }
});

export default mongoose.model<IProduct>("Product", productSchema);
