"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CourseSearchFilter from "@/components/courses/CourseSearchFilter";
import CourseCard, { Course } from "@/components/courses/CourseCard";
import { CoursePagination } from "@/components/courses/CoursePagination";
import { FaGraduationCap } from "react-icons/fa";

export default function ExploreCoursesClient() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paginationData, setPaginationData] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 9,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const query = searchParams.toString();
        const url = `/api/courses${query ? `?${query}` : ""}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setCourses(data.courses);
          setPaginationData({
            totalItems: data.totalItems,
            totalPages: data.totalPages,
            currentPage: data.currentPage,
            itemsPerPage: 9,
          });
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [searchParams]);

  return (
    <div className=" bg-slate-50">
      {/* Header Banner */}
      <div className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-slate-900 to-slate-900" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <FaGraduationCap className="mx-auto text-indigo-400 w-12 h-12 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-200">Our Courses</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover a wide range of courses taught by industry experts. Find the perfect path for your career growth.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CourseSearchFilter />

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse border border-slate-200/60 p-4 flex flex-col gap-4">
                <div className="w-full h-48 bg-slate-200 rounded-xl" />
                <div className="h-6 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-full mt-2" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />
                <div className="mt-auto h-10 bg-slate-200 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
            
            {/* Pagination Component */}
            {paginationData.totalPages > 1 && (
              <CoursePagination 
                currentPage={paginationData.currentPage}
                totalPages={paginationData.totalPages}
                totalItems={paginationData.totalItems}
                itemsPerPage={paginationData.itemsPerPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
            <h3 className="text-xl font-bold text-slate-900 mb-2">No courses found</h3>
            <p className="text-slate-500">We couldn&apos;t find any courses matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
