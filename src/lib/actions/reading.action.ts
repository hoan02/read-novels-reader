"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import connectToDB from "@/lib/mongodb/mongoose";
import Reading from "../models/reading.model";

export const createOrUpdateReading = async (
  novelSlug: string,
  chapterIndex: number
) => {
  try {
    const { userId } = auth();
    await connectToDB();
    await Reading.findOneAndUpdate(
      {
        clerkId: userId,
        novelSlug,
      },
      { $set: { chapterIndex } },
      { upsert: true }
    );
    revalidatePath("/");
    return { success: true, message: "Đánh dấu đang đọc thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể đánh dấu đang đọc!");
  }
};
