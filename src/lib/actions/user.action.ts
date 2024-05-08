import User from "@/lib/models/user.model";
import connectToDB from "@/lib/mongodb/mongoose";
import { UserType } from "../../types/types";

export const getUserById = async (id: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId: id });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    await connectToDB();
    const users = await User.find();
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users!");
  }
};

export const createOrUpdateUser = async ({
  clerkId,
  firstName,
  lastName,
  username,
  email,
  avatar,
}: UserType) => {
  try {
    await connectToDB();

    const user = await User.findOneAndUpdate(
      { clerkId },
      {
        $set: {
          username,
          firstName,
          lastName,
          avatar,
          email,
        },
      },
      { upsert: true, new: true } // if user doesn't exist, create a new one
    );
    console.log(user);
    await user.save();
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create or update user!");
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDB();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete user!");
  }
};
