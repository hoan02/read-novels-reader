"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import Rating from "@/lib/models/review.model";
import Novel from "@/lib/models/novel.model";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createOrUpdateRating = async (formData: any) => {
  const { novelSlug, valueCharacter, valuePlot, valueWorld, ratingContent } =
    formData;
  try {
    const { userId } = auth();
    await connectToDB();

    let existingRating = await Rating.findOne({ novelSlug, clerkId: userId });

    if (existingRating) {
      existingRating.valueCharacter = valueCharacter;
      existingRating.valuePlot = valuePlot;
      existingRating.valueWorld = valueWorld;
      existingRating.ratingContent = ratingContent;
      await existingRating.save();
    } else {
      await Rating.create({
        novelSlug,
        clerkId: userId,
        valueCharacter,
        valuePlot,
        valueWorld,
        ratingContent,
      });
      await Novel.updateOne(
        { slug: novelSlug },
        { $inc: { numberOfRating: 1 } }
      );
    }

    revalidatePath(`/truyen/${novelSlug}`);
    return { success: true, message: "Đánh giá thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể đánh giá!");
  }
};
