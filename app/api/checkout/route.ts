import { NextResponse } from "next/server";

export async function POST() {
  // TODO: integrate payment gateway
  return NextResponse.json({ message: "Checkout endpoint" });
}
