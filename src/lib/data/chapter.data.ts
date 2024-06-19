"use server";

import { headers } from "next/headers";
import connectToDB from "@/lib/mongodb/mongoose";
import Chapter from "@/lib/models/chapter.model";
import createResponse from "@/utils/createResponse";
import { rateLimiter } from "../ratelimit/rateLimiter";

export const getChapter = async (novelSlug: string, chapterIndex: number) => {
  try {
    const headersList = headers();
    const ip = headersList.get("x-forwarded-for");
    const {
      remaining,
      limit,
      success: limitReached,
    } = await rateLimiter.limit(ip!);
    if (limitReached) {
      return createResponse(null, "Error", 429);
    }
    await connectToDB();
    const chapter = await Chapter.findOne({ novelSlug, chapterIndex });
    if (!chapter) return createResponse(null, "Không tìm thấy chương!", 404);
    return createResponse(chapter, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getChapters = async (novelSlug: string) => {
  try {
    await connectToDB();
    const chapters = await Chapter.find({
      novelSlug,
      isPublic: true,
    })
      .select("chapterIndex chapterName publishedDate isLock")
      .sort({ chapterIndex: 1 });
    return createResponse(chapters, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getNewChapters = async (limit?: number) => {
  try {
    await connectToDB();

    const pipeline: any[] = [
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "novels",
          localField: "novelSlug",
          foreignField: "novelSlug",
          as: "novelInfo",
          pipeline: [
            {
              $project: {
                novelSlug: 1,
                novelName: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$novelInfo",
      },
      {
        $project: {
          createdAt: 1,
          novelSlug: 1,
          novelInfo: 1,
          chapterIndex: 1,
          chapterName: 1,
        },
      },
    ];

    if (limit) {
      pipeline.push({ $limit: limit });
    }

    const chapters = await Chapter.aggregate(pipeline).allowDiskUse(true);
    return createResponse(chapters, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
