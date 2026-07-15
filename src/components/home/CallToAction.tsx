"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with Brand Color */}
      <div className="absolute inset-0 bg-indigo-600" />
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Ready to Start Your <br className="hidden sm:block" /> Learning Journey?
        </h2>
        <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of other students and get access to top-quality courses, expert instructors, and a supportive community.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <button className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-indigo-600 bg-white hover:bg-slate-50 shadow-xl shadow-black/10 transition-all active:scale-95 w-full sm:w-auto cursor-pointer">
              Get Started for Free
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/courses">
            <button className="px-8 py-4 rounded-full font-semibold text-white bg-indigo-700 hover:bg-indigo-800 border border-indigo-500 shadow-xl shadow-black/10 transition-all active:scale-95 w-full sm:w-auto cursor-pointer">
              Browse Courses
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
