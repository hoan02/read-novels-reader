"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import connectToDB from "@/lib/mongodb/mongoose";
import Nomination from "../models/nomination.model";
import Novel from "../models/novel.model";

export const createNomination = async (novelSlug: string) => {
  try {
    const { userId } = auth();
    await connectToDB();
    await Nomination.create({
      clerkId: userId,
      novelSlug,
    });
    await Novel.findOneAndUpdate(
      {
        novelSlug,
      },
      { $inc: { nominationCount: 1 } }
    );
    revalidatePath("/");
    return { success: true, message: "Đề cử thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể đề cử!");
  }
};

export const deleteNomination = async (novelSlug: string) => {
  try {
    const { userId } = auth();
    await connectToDB();
    await Nomination.findOneAndDelete({
      clerkId: userId,
      novelSlug,
    });
    await Novel.findOneAndUpdate(
      {
        novelSlug,
      },
      { $inc: { nominationCount: -1 } }
    );
    revalidatePath("/");
    return { success: true, message: "Xóa đề cử thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể xóa đề cử!");
  }
};
