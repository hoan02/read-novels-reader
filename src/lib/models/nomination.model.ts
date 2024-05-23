import mongoose from "mongoose";

const nominationSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      index: true,
    },
    novelSlug: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Nomination =
  mongoose.models?.Nomination || mongoose.model("Nomination", nominationSchema);

export default Nomination;
