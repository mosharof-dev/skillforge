import { Metadata } from "next";
import EditCourseForm from "./EditCourseForm";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Edit Course | SkillForge",
  description: "Update the details of your published course on the SkillForge platform.",
};

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading editor...</div>}>
      <EditCourseForm courseId={id} />
    </Suspense>
  );
}
