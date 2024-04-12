"use server";

import { connectToDB } from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs";
import Marked from "@/lib/models/bookmark.model";
import { revalidatePath } from "next/cache";

export const createOrUpdateMark = async (
  novelSlug: string,
  chapterIndex: number
) => {
  try {
    const { userId } = auth();
    await connectToDB();
    await Marked.findOneAndUpdate(
      {
        clerkId: userId,
        novelSlug,
      },
      { $set: { chapterIndex } },
      { upsert: true }
    );
    revalidatePath("/");
    return { success: true, message: "Đánh dấu thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể đánh dấu!");
  }
};
