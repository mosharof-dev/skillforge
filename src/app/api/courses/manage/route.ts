import { NextRequest, NextResponse } from "next/server";
import { db, auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const courses = await db
      .collection("courses")
      .find({ instructorEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch managed courses:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
