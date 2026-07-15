import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaTag, FaUser } from "react-icons/fa";

export type Course = {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  duration: string;
  thumbnailUrl: string;
  instructorName: string;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col h-full group">
      
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
        <Image 
          src={course.thumbnailUrl} 
          alt={course.title}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-indigo-600/90 text-white backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        
        {/* Category & Duration */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            <FaTag className="text-indigo-400" />
            {course.category}
          </div>
          <div className="flex items-center gap-1.5">
            <FaClock className="text-slate-400" />
            {course.duration}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
          {course.description}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 my-4" />

        {/* Footer: Instructor & Price & Button */}
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500">
                <FaUser size={12} />
              </div>
              <span className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">
                {course.instructorName}
              </span>
            </div>
            <div className="text-xl font-black text-slate-900 tracking-tight">
              ${course.price.toFixed(2)}
            </div>
          </div>
          
          <Link href={`/courses/${course._id}`} className="block w-full">
            <button className="w-full py-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white font-bold text-sm rounded-xl transition-all border border-slate-200 hover:border-indigo-600 active:scale-95 text-center">
              View Details
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
