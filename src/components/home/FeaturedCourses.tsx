"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CourseCard, { Course } from "@/components/courses/CourseCard";
import { FaArrowRight } from "react-icons/fa";

type FeaturedProps = {
  courses: Course[];
};

export default function FeaturedCourses({ courses }: FeaturedProps) {
  if (!courses || courses.length === 0) {
    return null; // Don't render the section if there are no courses
  }

  return (
    <section className="py-24 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-3">
              Learn from the best
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Featured Courses
            </h3>
          </div>
          <Link href="/courses">
            <button className="group flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-6 py-3 rounded-full transition-all">
              Explore All <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16 px-4 -mx-4" // Padding bottom for pagination bullets
          >
            {courses.map((course) => (
              <SwiperSlide key={course._id} className="h-auto">
                <div className="h-full py-4">
                  <CourseCard course={course} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
