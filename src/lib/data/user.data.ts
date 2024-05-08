"use server";

import createResponse from "@/utils/createResponse";
import connectToDB from "../mongodb/mongoose";
import User from "../models/user.model";
import { auth } from "@clerk/nextjs/server";

export const getUserInfo = async () => {
  try {
    await connectToDB();
    const { userId } = auth();
    if (!userId) return createResponse(null, "Unauthorized!", 401);
    const userInfo = await User.findOne({
      clerkId: userId,
    });
    return createResponse(userInfo, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
