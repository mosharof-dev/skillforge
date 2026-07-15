"use client";

import { FaLaptopCode, FaChalkboardTeacher, FaCertificate, FaUsers } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      id: 1,
      icon: <FaChalkboardTeacher className="text-3xl text-indigo-600" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience and deep subject matter expertise.",
    },
    {
      id: 2,
      icon: <FaLaptopCode className="text-3xl text-indigo-600" />,
      title: "Project-Based Learning",
      description: "Build real-world projects that you can showcase in your portfolio to potential employers.",
    },
    {
      id: 3,
      icon: <FaUsers className="text-3xl text-indigo-600" />,
      title: "Community Support",
      description: "Join a thriving community of learners. Get help, collaborate, and network with peers globally.",
    },
    {
      id: 4,
      icon: <FaCertificate className="text-3xl text-indigo-600" />,
      title: "Verified Certificates",
      description: "Earn recognizable certificates upon completion to prove your skills and boost your resume.",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Why Choose SkillForge</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Transform Your Career Path
          </h3>
          <p className="text-lg text-slate-600">
            We provide everything you need to master new skills, build amazing projects, and land your dream job in tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 border border-transparent hover:border-slate-100"
            >
              <div className="w-16 h-16 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
