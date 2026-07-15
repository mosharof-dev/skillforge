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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const level = searchParams.get("level") || "";
    const sortParam = searchParams.get("sort") || "newest";

    const skip = (page - 1) * limit;

    // Build the query object
    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (level) {
      query.level = level;
    }
    
    // Build the sort object
    let sortQuery: any = { _id: -1 }; // newest by default
    if (sortParam === "oldest") sortQuery = { _id: 1 };
    if (sortParam === "price_asc") sortQuery = { price: 1 };
    if (sortParam === "price_desc") sortQuery = { price: -1 };

    const [courses, totalItems] = await Promise.all([
      db.collection("courses").find(query).sort(sortQuery).skip(skip).limit(limit).toArray(),
      db.collection("courses").countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      courses,
      totalItems,
      totalPages,
      currentPage: page,
    }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
