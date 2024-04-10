"use server";

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";
import Chapter from "@/lib/models/chapter.model";

export const GET = async ({
  params,
}: {
  params: { novelSlug: string; chapterIndex: number };
}) => {
  try {
    await connectToDB();
    const novel = await Novel.findOne({ novelSlug: params.novelSlug });
    if (!novel) {
      return new NextResponse("Novel not found", { status: 404 });
    }
    const chapter = await Chapter.findOne({
      novelSlug: params.novelSlug,
      chapterIndex: params.chapterIndex,
      isPublic: true,
    });
    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }
    return NextResponse.json(
      { chapter: chapter, chapterCount: novel.chapterCount },
      { status: 200 }
    );
  } catch (err) {
    console.log("novel_error", err);
    return NextResponse.json(
      { error: "Error in fetching novel" },
      {
        status: 500,
      }
    );
  }
};
