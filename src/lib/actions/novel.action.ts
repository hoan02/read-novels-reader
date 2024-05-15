"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";
import MonthlyStats from "../models/monthlyStats.model";

export const updateReadNovel = async (novelId: string) => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  try {
    await connectToDB();
    const novel = await Novel.findByIdAndUpdate(novelId, {
      $inc: { readCount: 1 },
    });
    await MonthlyStats.findOneAndUpdate(
      { clerkId: novel.uploader, month, year },
      { $inc: { readCount: 1 } },
      { upsert: true, setDefaultsOnInsert: true }
    );
  } catch (err) {
    return new Error("Không thể cập nhật truyện!");
  }
};
