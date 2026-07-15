import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CallToAction from "@/components/home/CallToAction";
import { db } from "@/lib/auth";

export const revalidate = 60; // Revalidate home page every 60 seconds

export default async function Home() {
  let topCategories: { name: string; count: number }[] = [];
  let featuredCourses: any[] = [];

  try {
    // 1. Fetch Top Categories by course count
    const categoriesAggregation = await db.collection("courses").aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 }
    ]).toArray();

    topCategories = categoriesAggregation.map(cat => ({
      name: cat._id,
      count: cat.count
    }));

    // 2. Fetch Featured Courses (Latest 10)
    const coursesCursor = await db.collection("courses")
      .find({})
      .sort({ createdAt: -1 }) // Newest first
      .limit(10)
      .toArray();

    // Serialize _id to string for Client Components
    featuredCourses = coursesCursor.map(course => ({
      _id: course._id.toString(),
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      price: course.price,
      duration: course.duration,
      thumbnailUrl: course.thumbnailUrl,
      instructorName: course.instructorName,
      instructorEmail: course.instructorEmail,
      createdAt: course.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: course.updatedAt?.toISOString() || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
  }

  return (
    <>
      <Hero />
       <FeaturedCourses courses={featuredCourses} />
      <Features />
      <Categories categories={topCategories} />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </>
  );
}
