import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";

export async function GET() {
  const users = await User.find();
  for (const user of users) {
    await user.updatePremiumState();
  }

  return NextResponse.json({ message: "Success!" });
}
