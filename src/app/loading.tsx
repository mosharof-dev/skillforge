import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        
        {/* Pro-Level Spinning Rings */}
        <div className="relative w-20 h-20">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
          
          {/* Animated Gradient Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 border-r-indigo-500 rounded-full animate-spin" />
          
          {/* Inner Pulsing Circle */}
          <div className="absolute inset-4 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight animate-pulse">
            SkillForge
          </h2>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </div>
  );
}
