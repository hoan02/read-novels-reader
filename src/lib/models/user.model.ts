import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    publicMetadata: {
      frameAvatar: {
        type: String,
        default: null,
      },
      premium: {
        state: {
          type: Boolean,
          default: false,
        },
        startDate: {
          type: Date,
          default: null,
        },
        endDate: {
          type: Date,
          default: null,
        },
      },
    },
    role: {
      type: String,
      enum: ["reader", "writer", "admin"],
      default: "reader",
    },
  },
  { timestamps: true }
);

UserSchema.methods.updatePremiumState = async function () {
  const now = new Date();
  if (this.publicMetadata.premium.endDate) {
    if (now > this.premium.endDate) {
      this.publicMetadata.premium.endDate = null;
      this.publicMetadata.premium.startDate = null;
      this.publicMetadata.premium.state = false;
    }
    await this.save();
  }
};

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
