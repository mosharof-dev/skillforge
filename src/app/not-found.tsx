"use client";

import Link from "next/link";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";


export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Animated 404 Text */}
        <div className="relative">
          <h1 className="text-[12rem] md:text-[16rem] font-extrabold text-slate-900/5 select-none tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-6 text-indigo-600 animate-bounce">
              <FaExclamationTriangle size={48} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Page Not Found
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto">
          Oops! It seems like the page you are looking for has been moved, deleted, or never existed in the first place.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link href="/">
            <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all active:scale-95 w-full sm:w-auto cursor-pointer">
              <FaArrowLeft />
              Back to Home
            </button>
          </Link>
          <Link href="/courses">
            <button className="flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-slate-700 bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 shadow-sm transition-all active:scale-95 w-full sm:w-auto cursor-pointer">
              Explore Courses
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
