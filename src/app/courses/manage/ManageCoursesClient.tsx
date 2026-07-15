"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaEye, FaPen, FaTrash, FaPlus, FaClock, FaLayerGroup } from "react-icons/fa";
import { Course } from "@/components/courses/CourseCard";
import { AlertDialog, Button } from "@heroui/react";

export default function ManageCoursesClient() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  useEffect(() => {
    const fetchManagedCourses = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/courses/manage");
        if (res.ok) {
          const data = await res.json();
          setCourses(data.courses);
        } else {
          toast.error("Failed to load your courses");
        }
      } catch {
        toast.error("An error occurred while fetching courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchManagedCourses();
  }, []);

  const handleDeleteConfirm = () => {
    if (!courseToDelete) return;

    const id = courseToDelete._id;
    const deletePromise = fetch(`/api/courses/${id}`, { method: "DELETE" }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    });

    toast.promise(deletePromise, {
      loading: "Deleting course...",
      success: () => {
        setCourses((prev) => prev.filter((course) => course._id !== id));
        setCourseToDelete(null);
        return "Course deleted successfully!";
      },
      error: (err) => {
        setCourseToDelete(null);
        return err.message || "Failed to delete course";
      },
    });
  };

  return (
    <div className=" bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manage Courses</h1>
            <p className="text-slate-500 mt-1">
              You have published <span className="font-bold text-indigo-600">{courses.length}</span> courses.
            </p>
          </div>
          <Link href="/courses/add">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95">
              <FaPlus />
              Add New Course
            </button>
          </Link>
        </div>

        {/* Premium Courses List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-500 shadow-sm border border-slate-200/60">
              Loading your courses...
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center flex flex-col items-center justify-center shadow-sm border border-slate-200/60">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-6 text-3xl">
                📂
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No courses yet</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">
                You haven&apos;t published any courses yet. Start sharing your knowledge with the world by creating your first course.
              </p>
              <Link href="/courses/add">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 text-lg">
                  Create First Course
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-md transition-all hover:border-indigo-200 group flex flex-col md:flex-row gap-6 items-center">
                  
                  {/* Thumbnail */}
                  <div className="w-full md:w-64 aspect-video rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative border border-slate-200">
                    <Image 
                      src={course.thumbnailUrl} 
                      alt={course.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 w-full flex flex-col justify-between py-2 space-y-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                          {course.level}
                        </span>
                        <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                          <FaLayerGroup className="text-slate-400" size={12} />
                          {course.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-2xl font-black text-slate-900">
                        ${course.price.toFixed(2)}
                      </div>
                      <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
                        <FaClock className="text-slate-400" />
                        {course.duration}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="w-full md:w-auto flex flex-row md:flex-col gap-3 shrink-0 py-2 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 pt-4 md:pt-2 mt-4 md:mt-0">
                    <Link href={`/courses/${course._id}`} className="flex-1 md:flex-none">
                      <button className="w-full h-11 px-4 rounded-xl flex items-center justify-center gap-2 bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-bold text-sm border border-slate-200/60 hover:border-indigo-200">
                        <FaEye /> View
                      </button>
                    </Link>

                    <Link href={`/courses/edit/${course._id}`} className="flex-1 md:flex-none">
                      <button className="w-full h-11 px-4 rounded-xl flex items-center justify-center gap-2 bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors font-bold text-sm border border-slate-200/60 hover:border-emerald-200">
                        <FaPen size={12} /> Edit
                      </button>
                    </Link>

                    <button 
                      onClick={() => setCourseToDelete(course)}
                      className="flex-1 md:flex-none h-11 px-4 rounded-xl flex items-center justify-center gap-2 bg-slate-50 text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors font-bold text-sm border border-slate-200/60 hover:border-rose-200" 
                    >
                      <FaTrash size={12} /> Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* HeroUI AlertDialog for Deletion */}
        <AlertDialog isOpen={!!courseToDelete} onOpenChange={(isOpen) => !isOpen && setCourseToDelete(null)}>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[420px] rounded-3xl p-2">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header className="pt-6 pb-2 px-6">
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4 text-xl">
                    <FaTrash />
                  </div>
                  <AlertDialog.Heading className="text-2xl font-bold text-slate-900">Delete Course?</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body className="px-6 text-slate-600 leading-relaxed pb-6">
                  <p>
                    Are you sure you want to permanently delete <strong>{courseToDelete?.title}</strong>? 
                    This action cannot be undone and all data associated with this course will be lost.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer className="px-6 pb-6 pt-0 flex gap-3">
                  <Button 
                    slot="close" 
                    variant="tertiary" 
                    className="flex-1 font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 h-12 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button 
                    slot="close" 
                    onPress={handleDeleteConfirm}
                    variant="danger"
                    className="flex-1 font-bold bg-rose-600 text-white hover:bg-rose-700 h-12 rounded-xl shadow-md shadow-rose-600/20"
                  >
                    Yes, Delete
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>

      </div>
    </div>
  );
}
