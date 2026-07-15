import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const newCourse = {
      title: body.title,
      description: body.description,
      category: body.category,
      level: body.level,
      price: parseFloat(body.price),
      duration: body.duration,
      thumbnailUrl: body.thumbnailUrl,
      instructorName: session.user.name || "Unknown",
      instructorEmail: session.user.email,
      createdAt: new Date(),
    };
    
    // As requested by user: console log all data that will go to the database
    console.log("=========================================");
    console.log("NEW COURSE DATA TO SAVE IN DATABASE:");
    console.log(newCourse);
    console.log("=========================================");

    const result = await db.collection("courses").insertOne(newCourse);

    return NextResponse.json(
      { message: "Course added successfully", courseId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add course:", error);
    return NextResponse.json(
      { error: "Failed to add course" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const courses = await db.collection("courses").find({}).sort({ _id: -1 }).toArray();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
