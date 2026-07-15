import { Metadata } from "next";
import AddCourseForm from "./AddCourseForm";

export const metadata: Metadata = {
  title: "Add New Course | SkillForge",
  description: "Publish your new course on SkillForge and share your knowledge with thousands of students worldwide.",
};

export default function AddCoursePage() {
  return <AddCourseForm />;
}
