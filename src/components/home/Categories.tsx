"use client";

import React from "react";
import { FaLaptopCode, FaDatabase, FaPaintBrush, FaMobileAlt, FaServer, FaChartBar, FaBrain, FaShieldAlt, FaRocket, FaBullhorn } from "react-icons/fa";

type CategoryProps = {
  categories: { name: string; count: number }[];
};

// Map category names to icons dynamically
const getCategoryIcon = (name: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "Frontend Development": <FaLaptopCode />,
    "Backend Development": <FaDatabase />,
    "Full Stack Development": <FaServer />,
    "Mobile App Development": <FaMobileAlt />,
    "UI/UX Design": <FaPaintBrush />,
    "Data Science": <FaChartBar />,
    "Artificial Intelligence (AI)": <FaBrain />,
    "Cyber Security": <FaShieldAlt />,
    "DevOps & Cloud Computing": <FaRocket />,
    "Digital Marketing": <FaBullhorn />,
  };
  return iconMap[name] || <FaLaptopCode />; // Fallback icon
};

export default function Categories({ categories }: CategoryProps) {
  // If no dynamic categories are available, fallback to some defaults for UI display
  const displayCategories = categories && categories.length > 0 ? categories : [
    { name: "Frontend Development", count: 0 },
    { name: "Backend Development", count: 0 },
    { name: "UI/UX Design", count: 0 },
    { name: "Data Science", count: 0 },
  ];

  return (
    <section className="py-24 bg-slate-50 w-full relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-3">
            Explore Topics
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Top Categories
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover the most popular topics chosen by thousands of students. Whether you're a beginner or an expert, we have something for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2 hover:border-indigo-200 transition-all duration-300 group cursor-pointer text-center flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {getCategoryIcon(category.name)}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h4>
              <p className="text-sm font-semibold text-slate-500 bg-slate-50 px-4 py-1 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                {category.count} {category.count === 1 ? "Course" : "Courses"}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
