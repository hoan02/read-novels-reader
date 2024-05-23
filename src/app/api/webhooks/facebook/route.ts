import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log(req);
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = "make-up-a-token";

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new NextResponse(challenge, { status: 200 });
    } else {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return new NextResponse("Bad Request", { status: 400 });
}

export async function POST(req: Request) {
  const payload = await req.json();
  console.log("no-json", req);
  console.log("json", payload);
  return new NextResponse("OK", { status: 200 });
}
