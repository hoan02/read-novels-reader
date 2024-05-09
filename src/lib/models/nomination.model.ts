import mongoose from "mongoose";

const nominationSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    novelSlug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Nomination =
  mongoose.models?.Nomination || mongoose.model("Nomination", nominationSchema);

export default Nomination;
