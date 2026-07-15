"use client";

export default function FeaturedCourses() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Featured Courses
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12 text-lg">
          Explore our most popular and highly rated courses.
        </p>
        
        {/* Coming Soon Placeholder */}
        <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">⏳</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Content Coming Soon</h3>
          <p className="text-slate-500">
            Courses will be loaded from the database dynamically. Stay tuned!
          </p>
        </div>
      </div>
    </section>
  );
}
