"use client";

import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Frontend Developer at TechCorp",
      image: "https://i.pravatar.cc/150?img=5",
      content: "SkillForge completely transformed my career. The React Mastery course gave me the practical knowledge I needed to ace my interviews and land my dream job.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "UI/UX Designer",
      image: "https://i.pravatar.cc/150?img=11",
      content: "The project-based approach is what sets this platform apart. I wasn't just watching videos; I was actually building things I could show to employers.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Full Stack Engineer",
      image: "https://i.pravatar.cc/150?img=9",
      content: "The community support is incredible. Whenever I got stuck on a complex backend problem, the instructors and peers were there to help me out immediately.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Loved by Thousands of Students
          </h2>
          <p className="text-lg text-slate-600">
            Don't just take our word for it. Read what our successful graduates have to say about their learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex gap-1 text-amber-400 mb-6">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-slate-700 mb-8 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
