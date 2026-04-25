import { NextResponse } from "next/server";

export async function POST() {
  // TODO: verify payment
  return NextResponse.json({ message: "Verify endpoint" });
}
