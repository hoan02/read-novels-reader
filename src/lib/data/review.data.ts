"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs/server";

import createResponse from "@/utils/createResponse";
import Review from "../models/review.model";

export const checkReview = async (novelSlug: string) => {
  try {
    const { userId } = auth();
    if (!userId) return createResponse(null, "Unauthorized!", 401);
    await connectToDB();
    const review = await Review.findOne({
      clerkId: userId,
      novelSlug,
    });
    if (!review) return createResponse(null, "Notfound!", 404);
    return createResponse(review, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getReviews = async (novelSlug: string) => {
  try {
    await connectToDB();
    const aggregation: any = [
      {
        $match: {
          novelSlug,
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "users",
          localField: "clerkId",
          foreignField: "clerkId",
          as: "userInfo",
        },
      },
      {
        $addFields: {
          userInfo: {
            $arrayElemAt: ["$userInfo", 0],
          },
        },
      },
      // {
      //   $project: {
      //     reviewContent: 1,
      //     updatedAt: 1,
      //     userInfo: 1,
      //   },
      // },
    ];
    const reviews = await Review.aggregate(aggregation);
    return createResponse(reviews, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
