"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const CATEGORIES = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Mobile App Development",
  "UI/UX Design",
  "Data Science",
  "Artificial Intelligence (AI)",
  "Cyber Security",
  "DevOps & Cloud Computing",
  "Digital Marketing",
];

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function CourseSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [level, setLevel] = useState(searchParams.get("level") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  // Update state when URL changes (e.g. going back/forward)
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
    setLevel(searchParams.get("level") || "");
    setSort(searchParams.get("sort") || "newest");
  }, [searchParams]);

  const updateQueryParams = (params: Record<string, string>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });

    const searchStr = current.toString();
    const query = searchStr ? `?${searchStr}` : "";
    
    router.push(`/courses${query}`);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200/60 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search for courses..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              updateQueryParams({ search: e.target.value, category, level, sort, page: "1" });
            }}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap w-full md:w-auto gap-4">
          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              updateQueryParams({ search, category: e.target.value, level, sort, page: "1" });
            }}
            className="flex-1 min-w-[140px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Level Dropdown */}
          <select
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
              updateQueryParams({ search, category, level: e.target.value, sort, page: "1" });
            }}
            className="flex-1 min-w-[120px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Levels</option>
            {LEVELS.map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              updateQueryParams({ search, category, level, sort: e.target.value, page: "1" });
            }}
            className="flex-1 min-w-[140px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer font-medium"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
