"use client";

import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaPlay, FaCheckCircle, FaStar } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-20 md:pt-20 md:pb-20 overflow-hidden bg-white">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4">
        <div className="w-[600px] h-[600px] rounded-full bg-indigo-50/70 blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/4">
        <div className="w-[500px] h-[500px] rounded-full bg-slate-50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Content (Text) */}
          <div className="flex-1 w-full text-center lg:text-left space-y-8 animate-in slide-in-from-bottom-6 fade-in duration-700">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-2">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <span>The #1 platform for skill building</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Unlock Your <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
                True Potential
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Master in-demand skills with expert-led courses designed for your career growth. Join thousands of learners achieving their dreams today.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/courses">
                <button className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all active:scale-95 w-full sm:w-auto cursor-pointer">
                  Explore Courses
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/about">
                <button className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-slate-700 bg-white border-2 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all active:scale-95 w-full sm:w-auto cursor-pointer">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <FaPlay size={10} className="ml-0.5" />
                  </div>
                  How it works
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6 text-sm text-slate-500 font-medium border-t border-slate-100 mt-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                </div>
                <span><strong className="text-slate-700">10k+</strong> Happy Students</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <span><strong className="text-slate-700">4.9/5</strong> Reviews</span>
              </div>
            </div>
          </div>

          {/* Right Content (Image/Illustration) */}
          <div className="flex-1 w-full relative animate-in slide-in-from-right-8 fade-in duration-1000 delay-150 fill-mode-both hidden lg:block">
            {/* Main Visual Container */}
            <div className="relative w-full aspect-[4/3] max-w-[600px] mx-auto flex items-center justify-center">
              
              {/* Background glowing blob */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-slate-50 rounded-full blur-3xl opacity-50" />
              
              {/* Image using Next.js Image Component */}
              <div className="relative w-full h-full z-10 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/10 border border-slate-100/50 group">
                <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500 z-20 mix-blend-overlay"></div>
                <Image 
                  src="/images/hero-3d.png" 
                  alt="3D Student learning online" 
                  fill
                  priority
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
