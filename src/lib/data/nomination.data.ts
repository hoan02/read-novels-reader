"use server";

import { auth } from "@clerk/nextjs/server";

import connectToDB from "../mongodb/mongoose";
import Nomination from "../models/nomination.model";
import createResponse from "@/utils/createResponse";

export const checkNomination = async (novelSlug: string) => {
  try {
    await connectToDB();
    const { userId } = auth();
    if (!userId) return false;
    const nominated = await Nomination.findOne({
      clerkId: userId,
      novelSlug,
    });
    if (!nominated) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getNominations = async (novelSlug: string) => {
  try {
    await connectToDB();
    const nominations = await Nomination.aggregate([
      { $match: { novelSlug } },
      {
        $lookup: {
          from: 'users', // replace 'users' with the actual name of your User collection
          localField: 'clerkId',
          foreignField: 'clerkId',
          as: 'user'
        }
      },
      { $unwind: '$user' }
    ]);
    
    return createResponse(nominations, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
