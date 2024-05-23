import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = "make-up-a-token";

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return NextResponse.json(challenge, { status: 200 });
    } else {
      return NextResponse.json("Forbidden", { status: 403 });
    }
  }

  return NextResponse.json("Bad Request", { status: 400 });
}
