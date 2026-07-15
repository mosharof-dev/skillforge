import { NextRequest, NextResponse } from "next/server";
import { db, auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { error: "Invalid course ID" },
        { status: 400 }
      );
    }

    const course = await db.collection("courses").findOne({ _id: new ObjectId(id) });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch course details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id || id.length !== 24) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    // Check ownership before deleting
    const course = await db.collection("courses").findOne({ _id: new ObjectId(id) });
    
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    if (course.instructorEmail !== session.user.email) {
      return NextResponse.json({ error: "Forbidden: You can only delete your own courses" }, { status: 403 });
    }

    await db.collection("courses").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Course deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete course:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id || id.length !== 24) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    // Check ownership before updating
    const course = await db.collection("courses").findOne({ _id: new ObjectId(id) });
    
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    if (course.instructorEmail !== session.user.email) {
      return NextResponse.json({ error: "Forbidden: You can only update your own courses" }, { status: 403 });
    }

    const body = await req.json();
    
    // Remove fields that shouldn't be updated directly
    delete body._id;
    delete body.instructorEmail; // Prevent transferring ownership maliciously
    
    body.updatedAt = new Date();

    await db.collection("courses").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    return NextResponse.json({ success: true, message: "Course updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update course:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
