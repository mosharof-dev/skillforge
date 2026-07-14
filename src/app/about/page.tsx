import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaAward,
  FaCheckCircle,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaRocket,
  FaTrophy,
  FaTwitter,
  FaUsers
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Us - SkillForge",
  description:
    "Discover the story behind SkillForge. We empower students to master tech skills from basic to advanced levels, including web development, digital marketing, video editing, and more.",
};

export default function AboutPage() {
  const stats = [
    { label: "Active Students", value: "10,000+", icon: <FaUsers className="text-indigo-500 w-5 h-5" /> },
    { label: "Expert Instructors", value: "50+", icon: <FaAward className="text-indigo-500 w-5 h-5" /> },
    { label: "Tech Courses", value: "150+", icon: <FaTrophy className="text-indigo-500 w-5 h-5" /> },
    { label: "Success Rate", value: "98%", icon: <FaRocket className="text-indigo-500 w-5 h-5" /> },
  ];

  const values = [
    {
      title: "Practical Learning",
      description: "No boring theory. Work on real-world projects that enhance your portfolio and job readiness.",
    },
    {
      title: "Expert Mentorship",
      description: "Learn directly from active industry professionals who know what employers are looking for.",
    },
    {
      title: "Accessible Education",
      description: "High-quality courses structured to take you from absolute beginner to career-ready professional.",
    },
    {
      title: "Lifetime Support",
      description: "Get lifetime access to course materials, updates, and our supportive student community.",
    },
  ];

  const team = [
    {
      name: "Fahim Mosharof",
      role: "Founder & Lead Developer",
      bio: "Full-stack developer passionate about building modern web applications and teaching coding.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400",
      socials: { twitter: "#", linkedin: "#", github: "#" },
    },
    {
      name: "Sarah Jenkins",
      role: "Digital Marketing Head",
      bio: "10+ years of experience managing marketing campaigns for Fortune 500 tech companies.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
      socials: { twitter: "#", linkedin: "#", github: "#" },
    },
    {
      name: "Alex Rivera",
      role: "Lead Video Editor & Producer",
      bio: "Award-winning content creator specializing in modern cinematic video editing and production workflows.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
      socials: { twitter: "#", linkedin: "#", github: "#" },
    },
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800">
      
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden text-center">
        {/* Glow overlay */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <span className="inline-block text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 border border-indigo-900/80 px-3 py-1.5 rounded-full mb-4">
            Our Journey
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Empowering the Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-200">Tech Leaders</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We bridge the gap between academic theory and practical industry demands, helping you build a future you love.
          </p>
        </div>
      </section>

      {/* 2. Company Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Bridging the Gap Between Education & Real-World Industry
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                SkillForge was founded with a single mission: to make high-quality, practical tech education affordable and accessible to everyone. We believe that learning shouldn't be confined to boring slide decks or outdated curricula.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you want to dive into <strong>Web & Software Development</strong>, master the art of <strong>Cinematic Video Editing</strong>, or design high-converting campaigns with <strong>Digital Marketing</strong>, our courses are carefully crafted to take you from absolute basics to advanced job-ready skills.
              </p>
              
              {/* Bullet checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Practical Hands-on Projects",
                  "Structured Basic to Advanced Learning",
                  "Learn from Active Industry Experts",
                  "Job Readiness & Career Focus"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FaCheckCircle className="text-indigo-600 shrink-0" />
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats block */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-650 group-hover:text-white transition-colors duration-300">
                      {stat.icon}
                    </div>
                    <div>
                      <span className="block text-3xl font-extrabold text-slate-950 tracking-tight">{stat.value}</span>
                      <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group hover:border-indigo-200 hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10 group-hover:bg-indigo-600/5 transition-colors" />
              <span className="text-xs font-extrabold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase mb-6 inline-block">
                Our Mission
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Democratizing Quality Learning</h3>
              <p className="text-slate-600 leading-relaxed">
                To empower curious minds worldwide with practical, up-to-date, and accessible learning tools. We strive to help every individual learn key technologies so they can transition into high-paying creative and tech fields, regardless of their starting background.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group hover:border-indigo-200 hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10 group-hover:bg-indigo-600/5 transition-colors" />
              <span className="text-xs font-extrabold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase mb-6 inline-block">
                Our Vision
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Building a Global Tech Community</h3>
              <p className="text-slate-600 leading-relaxed">
                To build the world's most supportive and project-centric course ecosystem. We envision a space where students, mentors, and builders collaborate to launch websites, optimize digital campaigns, produce stunning videos, and shape the technology of tomorrow together.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1.5 rounded-full mb-3 inline-block">
            What Drives Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 tracking-tight">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left flex flex-col gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-950 mt-2">{val.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Meet the Team */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1.5 rounded-full mb-3 inline-block">
            Expert Minds
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Meet the Team
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-16 text-sm md:text-base leading-relaxed">
            The skilled instructors and product leaders who compile our curriculum, support students, and guide your learning journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Image wrapper */}
                <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6 text-left flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">{member.name}</h3>
                    <span className="text-xs font-bold text-indigo-600 tracking-wide uppercase">{member.role}</span>
                    <p className="text-slate-600 text-xs mt-3 leading-relaxed">{member.bio}</p>
                  </div>

                  {/* Social Handles */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <a href={member.socials.twitter} className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <FaTwitter size={16} />
                    </a>
                    <a href={member.socials.linkedin} className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <FaLinkedin size={16} />
                    </a>
                    <a href={member.socials.github} className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <FaGithub size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA section */}
      <section className="py-16 bg-indigo-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Forge Your Career Path?</h2>
          <p className="text-indigo-100 max-w-xl mx-auto leading-relaxed">
            Gain immediate lifetime access to all core curriculum materials and jumpstart your skills now.
          </p>
          <div className="pt-2">
            <Link href="/courses">
              <button className="px-8 py-4 rounded-full font-bold bg-white text-indigo-600 hover:bg-slate-50 transition-all active:scale-95 cursor-pointer shadow-lg shadow-black/10">
                Explore Available Courses
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
