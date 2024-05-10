"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import Chapter from "@/lib/models/chapter.model";
import createResponse from "@/utils/createResponse";
import Novel from "../models/novel.model";

export const getChapter = async (novelSlug: string, chapterIndex: number) => {
  try {
    await connectToDB();
    const chapter = await Chapter.findOne({
      novelSlug,
      chapterIndex,
    });
    await Novel.findOneAndUpdate(
      {
        novelSlug,
      },
      {
        $inc: { readCount: 1 },
      }
    );

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
    });
    return createResponse(chapters, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
