import { Metadata } from "next";
import ExploreCoursesClient from "./ExploreCoursesClient";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Explore Courses | SkillForge",
  description: "Browse our extensive catalog of tech courses. Learn from industry experts and take your skills to the next level.",
};

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading courses...</div>}>
      <ExploreCoursesClient />
    </Suspense>
  );
}
