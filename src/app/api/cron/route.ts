import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import connectToDB from "@/lib/mongodb/mongoose";

export async function GET() {
  await connectToDB();
  const users = await User.find({
    role: "reader",
    "publicMetadata.premiumState": true,
  });
  for (const user of users) {
    await user.updatePremiumState();
  }

  return NextResponse.json({ data: users, message: "Success!" });
}
