import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    novelSlug: {
      type: String,
      required: true,
    },
    chapterName: {
      type: String,
      required: true,
    },
    chapterIndex: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: "chưa duyệt",
    },
    isApprove: {
      type: Boolean,
      default: false,
    },
    isLock: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Chapter =
  mongoose.models?.Chapter || mongoose.model("Chapter", chapterSchema);

export default Chapter;
