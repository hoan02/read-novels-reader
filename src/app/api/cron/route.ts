import { NextResponse } from "next/server";

export async function GET() {
  const result = await fetch(
    'https://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh',
    {
      cache: 'no-store',
    },
  );
  const data = await result.json();
 
  return NextResponse.json({ datetime: data.datetime });
}