import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: string, required: true },
    text: { type: string, required: true, trim: true },
  },
  { timestamps: true },
);
const eventSchema = new mongoose.Schema({
  title: { type: string, required: true, trim: true },
  description: { type: string, required: true },
  category: {
    type: string,
    required: true,
    enum: [
      "Music",
      "Sports",
      "Tech",
      "Education",
      "Community",
      "Food",
      "Other",
    ],
  },
  date: { type: Date, required: true },
  time: { type: string, required: true },
  location: { type: string, required: true, trim: true },
  image: { type: string, default: "" },
  capacity: {type:Number, defualt:0},
  organizer:{ type: mongoose.Schema.Types.ObjectId,ref="User",required:true},
  attendees: [{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
  comments: [commentSchema],
},
{timestamps:true}
);
export default mongoose.model("Event",eventSchema);
