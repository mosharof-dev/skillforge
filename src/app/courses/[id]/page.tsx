import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { Metadata } from "next";
import EnrollButton from "@/components/courses/EnrollButton";
import { FaArrowLeft, FaCompass, FaClock, FaTag, FaUser, FaCheckCircle, FaStar } from "react-icons/fa";

// Next.js 15 requires awaiting params
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const course = await db.collection("courses").findOne({ _id: new ObjectId(id) });
    if (!course) return { title: "Course Not Found" };
    
    return {
      title: `${course.title} | SkillForge`,
      description: course.description,
    };
  } catch (error) {
    return { title: "Course | SkillForge" };
  }
}

export default async function CourseDetailsPage({ params }: Props) {
  const { id } = await params;

  let course;
  try {
    course = await db.collection("courses").findOne({ _id: new ObjectId(id) });
  } catch (error) {
    // Invalid ObjectId format
    notFound();
  }

  if (!course) {
    notFound();
  }

  // Fetch Related Courses
  let relatedCourses: any[] = [];
  try {
    const rawRelated = await db.collection("courses")
      .find({ category: course.category, _id: { $ne: new ObjectId(id) } })
      .limit(3)
      .toArray();
      
    relatedCourses = rawRelated.map(c => ({
      ...c,
      _id: c._id.toString(),
      createdAt: c.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: c.updatedAt?.toISOString() || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch related courses");
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-[64px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
            <FaArrowLeft />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <Link href="/courses" className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-4 py-2 rounded-lg">
            <span className="hidden sm:inline">Explore All Courses</span>
            <FaCompass />
          </Link>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-slate-900 to-slate-900" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {course.category}
              </span>
              <span className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {course.level}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              {course.description.substring(0, 150)}...
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <FaUser className="text-indigo-400" />
                Created by <span className="text-white font-bold">{course.instructorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-indigo-400" />
                {course.duration}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Course Image */}
            <div className="w-full aspect-video rounded-3xl overflow-hidden relative shadow-2xl shadow-indigo-900/10 border-4 border-white">
              <Image 
                src={course.thumbnailUrl} 
                alt={course.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>

            {/* About Course */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">About This Course</h2>
              <div className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap">
                {course.description}
              </div>
            </div>

            {/* What you'll learn (Dummy Data for design) */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What You Will Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Master the core concepts from scratch",
                  "Build real-world projects for your portfolio",
                  "Understand best practices and industry standards",
                  "Get lifetime access to all course updates",
                  "Join a private community of learners",
                  "Receive a certificate of completion"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <FaCheckCircle className="text-indigo-600 mt-1 shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Profile */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-indigo-50 border-4 border-indigo-100 shrink-0">
                <Image 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructorName)}&size=150&background=c7d2fe&color=4f46e5`}
                  alt={course.instructorName}
                  width={96}
                  height={96}
                  unoptimized
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{course.instructorName}</h3>
                <p className="text-indigo-600 font-semibold mb-4">Course Instructor</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Experienced professional dedicated to helping students learn and master new skills. Bringing years of real-world industry experience directly into the classroom.
                </p>
              </div>
            </div>

            {/* Student Reviews (Static Demo) */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Student Reviews</h2>
                <div className="flex items-center gap-2">
                  <FaStar className="text-amber-400" size={24} />
                  <span className="text-2xl font-black text-slate-900">4.9</span>
                  <span className="text-slate-500">(128 ratings)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  { name: "Alex Johnson", text: "This course is exactly what I needed. The concepts are explained perfectly and the projects are very hands-on.", date: "1 week ago" },
                  { name: "Sarah Williams", text: "I've taken many courses, but this one stands out. The instructor is knowledgeable and the pace is just right for beginners.", date: "3 weeks ago" }
                ].map((review, idx) => (
                  <div key={idx} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{review.name}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-400 text-xs">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                          </div>
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-[140px] bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-6 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
              
              <div className="text-center pb-6 border-b border-slate-100">
                <span className="text-5xl font-black text-slate-900 tracking-tighter">
                  ${course.price.toFixed(2)}
                </span>
              </div>

              {/* Client Component Button */}
              <EnrollButton />

              <div className="mt-6 space-y-4 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-3">
                  <FaClock className="text-indigo-500" size={18} />
                  Duration: {course.duration}
                </div>
                <div className="flex items-center gap-3">
                  <FaTag className="text-indigo-500" size={18} />
                  Category: {course.category}
                </div>
                <div className="flex items-center gap-3">
                  <FaStar className="text-amber-400" size={18} />
                  Level: {course.level}
                </div>
              </div>
              
              <div className="mt-8 bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  30-Day Guarantee
                </p>
                <p className="text-xs text-slate-400">
                  Not satisfied? Get a full refund within 30 days.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Courses Section */}
      {relatedCourses.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Related Courses</h2>
            <Link href={`/courses?category=${encodeURIComponent(course.category)}`} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              View All {course.category} Courses &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Note: In a real app we'd use CourseCard, but this is a Server Component and CourseCard expects Course type. We'll render simplified cards here. */}
            {relatedCourses.map((related: any) => (
              <Link href={`/courses/${related._id}`} key={related._id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-indigo-200 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <Image 
                    src={related.thumbnailUrl} 
                    alt={related.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                    {related.level}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
                    {related.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                    <span className="font-bold text-slate-900">${related.price.toFixed(2)}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><FaStar className="text-amber-400"/> 4.8</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
