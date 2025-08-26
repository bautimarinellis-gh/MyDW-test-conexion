import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    code: {type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, required: true }
});

export default mongoose.model("Product", productSchema);