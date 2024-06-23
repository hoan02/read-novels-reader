"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import connectToDB from "@/lib/mongodb/mongoose";
import Nomination from "../models/nomination.model";
import Novel from "../models/novel.model";
import MonthlyStats from "../models/monthlyStats.model";

const getCurrentDateDetails = () => {
  const currentDate = new Date();
  return {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };
};

export const createNomination = async (novelSlug: string) => {
  const { month, year } = getCurrentDateDetails();

  try {
    const { userId } = auth();
    await connectToDB();

    const [nomination, novelUpdate] = await Promise.all([
      Nomination.create({ clerkId: userId, novelSlug }),
      Novel.findOneAndUpdate(
        { novelSlug },
        { $inc: { nominationCount: 1 } },
        { new: true, upsert: true }
      ),
    ]);

    await MonthlyStats.findOneAndUpdate(
      { month, year, clerkId: novelUpdate.uploader },
      { $inc: { nominationCount: 1 } },
      { new: true, upsert: true }
    );

    revalidatePath(`/truyen/${novelSlug}`);
    return { success: true, message: "Đề cử thành công!" };
  } catch (error) {
    console.error("Create Nomination Error:", error);
    throw new Error("Không thể đề cử!");
  }
};

export const deleteNomination = async (novelSlug: string) => {
  const { month, year } = getCurrentDateDetails();

  try {
    const { userId } = auth();
    await connectToDB();

    const [nominationDeletion, novelUpdate] = await Promise.all([
      Nomination.findOneAndDelete({ clerkId: userId, novelSlug }),
      Novel.findOneAndUpdate(
        { novelSlug },
        { $inc: { nominationCount: -1 } },
        { new: true }
      ),
    ]);

    await MonthlyStats.findOneAndUpdate(
      { month, year, clerkId: novelUpdate.uploader },
      { $inc: { nominationCount: -1 } },
      { new: true }
    );

    revalidatePath(`/truyen/${novelSlug}`);
    return { success: true, message: "Xóa đề cử thành công!" };
  } catch (error) {
    console.error("Delete Nomination Error:", error);
    throw new Error("Không thể xóa đề cử!");
  }
};
