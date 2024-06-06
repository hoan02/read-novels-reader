import { NextResponse } from "next/server";

import connectToDB from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";

export async function GET() {
  try {
    await connectToDB();
    const novels = await Novel.find({ isPublic: true }).select(
      "novelName novelSlug chapterCount reviews.count nominationCount readCount commentCount"
    );
    return NextResponse.json(novels, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Something error!", { status: 500 });
  }
}
