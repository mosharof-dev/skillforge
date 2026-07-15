import { Metadata } from "next";
import ManageCoursesClient from "./ManageCoursesClient";

export const metadata: Metadata = {
  title: "Manage Courses | SkillForge",
  description: "Manage your published courses, view stats, edit details, or delete courses from the SkillForge platform.",
};

export default function ManageCoursesPage() {
  return <ManageCoursesClient />;
}
