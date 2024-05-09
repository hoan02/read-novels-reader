"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import connectToDB from "@/lib/mongodb/mongoose";
import Review from "@/lib/models/review.model";
import Novel from "@/lib/models/novel.model";

export const createOrUpdateReview = async (formData: any) => {
  const {
    rating,
    novelSlug,
    valueCharacter,
    valuePlot,
    valueWorld,
    reviewContent,
  } = formData;

  try {
    const { userId } = auth();
    await connectToDB();

    let diffReviewCharacter = valueCharacter;
    let diffReviewPlot = valuePlot;
    let diffReviewWorld = valueWorld;

    let existingReview = await Review.findOne({ novelSlug, clerkId: userId });
    let existingNovelReviews = await Novel.findOne(
      { novelSlug },
      { reviews: 1 }
    );
    let newReviewsCount = existingNovelReviews.reviews.count;

    if (existingReview) {
      // If review already exists, calculate the differences
      diffReviewCharacter -= existingReview.valueCharacter;
      diffReviewPlot -= existingReview.valuePlot;
      diffReviewWorld -= existingReview.valueWorld;

      // Update existing review
      existingReview.avgScore = rating;
      existingReview.valueCharacter = valueCharacter;
      existingReview.valuePlot = valuePlot;
      existingReview.valueWorld = valueWorld;
      existingReview.reviewContent = reviewContent;

      await existingReview.save();
    } else {
      // If review doesn't exist, create it
      newReviewsCount++;
      await Review.create({
        avgScore: rating,
        novelSlug,
        clerkId: userId,
        valueCharacter,
        valuePlot,
        valueWorld,
        reviewContent,
      });
    }

    // Update total scores in Novel document
    const newTotalCharacter =
      existingNovelReviews.reviews.totalScoreCharacter + diffReviewCharacter;
    const newTotalPlot =
      existingNovelReviews.reviews.totalScorePlot + diffReviewPlot;
    const newTotalWorld =
      existingNovelReviews.reviews.totalScoreWorld + diffReviewWorld;

    // Update average scores in Novel document
    const newAvgCharacter = newTotalCharacter / newReviewsCount;
    const newAvgPlot = newTotalPlot / newReviewsCount;
    const newAvgWorld = newTotalWorld / newReviewsCount;
    const newAvgScore =
      (newTotalCharacter + newTotalPlot + newTotalWorld) / 3 / newReviewsCount;

    await Novel.updateOne(
      { novelSlug },
      {
        $set: {
          "reviews.count": newReviewsCount,
          "reviews.avgScore": newAvgScore.toFixed(1),
          "reviews.totalScoreCharacter": newTotalCharacter,
          "reviews.totalScorePlot": newTotalPlot,
          "reviews.totalScoreWorld": newTotalWorld,
          "reviews.avgScoreCharacter": newAvgCharacter.toFixed(1),
          "reviews.avgScorePlot": newAvgPlot.toFixed(1),
          "reviews.avgScoreWorld": newAvgWorld.toFixed(1),
        },
      }
    );

    // Revalidate cache for novel page
    revalidatePath(`/truyen/${novelSlug}`);
    return { success: true, message: "Đánh giá thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể đánh giá!");
  }
};

export const deleteReview = async (novelSlug: string) => {
  try {
    const { userId } = auth();
    await connectToDB();
    const existingReview = await Review.findOneAndDelete({
      novelSlug,
      clerkId: userId,
    });
    let existingNovelReviews = await Novel.findOne(
      { novelSlug },
      { reviews: 1 }
    );
    const newTotalCharacter =
      existingNovelReviews.reviews.totalScoreCharacter -
      existingReview.valueCharacter;
    const newTotalPlot =
      existingNovelReviews.reviews.totalScorePlot - existingReview.valuePlot;
    const newTotalWorld =
      existingNovelReviews.reviews.totalScoreWorld - existingReview.valueWorld;
    const newReviewsCount = existingNovelReviews.reviews.count - 1;
    const newAvgCharacter = newTotalCharacter / newReviewsCount;
    const newAvgPlot = newTotalPlot / newReviewsCount;
    const newAvgWorld = newTotalWorld / newReviewsCount;
    const newAvgScore =
      (newTotalCharacter + newTotalPlot + newTotalWorld) / 3 / newReviewsCount;
    await Novel.updateOne(
      { novelSlug },
      {
        $set: {
          "reviews.count": newReviewsCount,
          "reviews.avgScore": newAvgScore.toFixed(1),
          "reviews.totalScoreCharacter": newTotalCharacter,
          "reviews.totalScorePlot": newTotalPlot,
          "reviews.totalScoreWorld": newTotalWorld,
          "reviews.avgScoreCharacter": newAvgCharacter.toFixed(1),
          "reviews.avgScorePlot": newAvgPlot.toFixed(1),
          "reviews.avgScoreWorld": newAvgWorld.toFixed(1),
        },
      }
    );

    // Revalidate cache for novel page
    revalidatePath(`/truyen/${novelSlug}`);
    return { success: true, message: "Đánh giá thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể đánh giá!");
  }
};
