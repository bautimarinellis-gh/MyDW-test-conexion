import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // relación con User
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Post", postSchema);
