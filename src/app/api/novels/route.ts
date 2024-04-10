"use server";

import { NextResponse } from "next/server";
import Novel from "@/lib/models/novel.model";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async () => {
  try {
    await connectToDB();
    const novels = await Novel.find({
      isPublic: true,
    });
    return NextResponse.json(novels, { status: 200 });
  } catch (err) {
    console.log("[novels_GET]", err);
    return NextResponse.json(
      { error: "Error in fetching novels" },
      {
        status: 500,
      }
    );
  }
};
