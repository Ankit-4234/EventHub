import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: string, required: true },
    text: { type: string, required: true, trim: true },
  },
  { timestamps: true },
);
