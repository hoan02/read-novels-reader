import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    novelSlug: {
      type: String,
      required: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      index: true,
      default: null,
    },
    likes: [
      {
        clerkId: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Comment =
  mongoose.models?.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
