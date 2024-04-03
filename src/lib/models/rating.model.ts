import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    novelSlug: {
      type: String,
      required: true,
    },
    valueCharacter: {
      type: Number,
      required: true,
    },
    valuePlot: {
      type: Number,
      required: true,
    },
    valueWorld: {
      type: Number,
      required: true,
    },
    ratingContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

export default Rating;
