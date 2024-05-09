"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs/server";

import Novel from "../models/novel.model";
import createResponse from "@/utils/createResponse";
import Reading from "../models/reading.model";

export const getReading = async (novelSlug: string) => {
  try {
    await connectToDB();
    const { userId } = auth();
    if (!userId) return createResponse(null, "Unauthorized!", 401);
    let reading = await Reading.findOne({
      clerkId: userId,
      novelSlug,
    });

    if (!reading) {
      const newReading = {
        clerkId: userId,
        novelSlug,
        chapterIndex: 0,
      };
      return createResponse(newReading, "Success!", 200);
    }

    return createResponse(reading, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getRecentlyReading = async (limit?: number) => {
  try {
    await connectToDB();
    const { userId } = auth();
    let query = Reading.find({
      clerkId: userId,
    }).sort({ updatedAt: -1 });

    if (limit) {
      query = query.limit(limit);
    }

    let reading = await query.exec();

    const readingWithNovels = await Promise.all(
      reading.map(async (mark: any) => {
        const novel = await Novel.findOne({ novelSlug: mark.novelSlug });
        return {
          ...mark._doc,
          novelName: novel.novelName,
          chapterCount: novel.chapterCount,
          urlCover: novel.urlCover,
        };
      })
    );

    return createResponse(readingWithNovels, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
