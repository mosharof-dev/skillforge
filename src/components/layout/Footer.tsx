"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  const exploreLinks = [
    { name: "Explore Courses", path: "/courses" },
    { name: "Web Development", path: "/courses?category=web-development" },
    {
      name: "Mobile Development",
      path: "/courses?category=mobile-development",
    },
    { name: "UI/UX Design", path: "/courses?category=ui-ux" },
    { name: "Data Science", path: "/courses?category=data-science" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "FAQ", path: "#" },
    { name: "Terms of Service", path: "#" },
    { name: "Privacy Policy", path: "#" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-900/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-900">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group self-start">
              <svg
                className="w-8 h-8 text-indigo-500 transition-transform duration-300 group-hover:rotate-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="font-extrabold text-2xl tracking-tighter text-white">
                Skill<span className="text-indigo-500">Forge</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empower your future with industry-relevant skills. Access top-tier
              online courses, hands-on projects, and expert mentorship on
              SkillForge.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-2">
              {[
                {
                  icon: <FaFacebookF size={14} />,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  icon: <FaTwitter size={14} />,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  icon: <FaLinkedinIn size={14} />,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: <FaGithub size={14} />,
                  href: "https://github.com",
                  label: "GitHub",
                },
                {
                  icon: <FaYoutube size={14} />,
                  href: "https://youtube.com",
                  label: "YouTube",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column 1 - Explore */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">
              Explore
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {exploreLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2 - Company */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">
              Company
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Dashboard Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Newsletter Subscription */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-semibold text-sm tracking-wider uppercase">
                Newsletter
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Subscribe to receive updates, new course announcements, and
                special offers.
              </p>

              <form onSubmit={handleSubscribe} className="relative mt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors pr-12"
                />
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-emerald-600 text-white rounded-md transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                  aria-label="Subscribe"
                >
                  {isSubscribed ? (
                    <FaCheck className="w-4 h-4 animate-scaleIn" />
                  ) : (
                    <FaPaperPlane className="w-3.5 h-3.5" />
                  )}
                </button>
              </form>

              {isSubscribed && (
                <p className="text-emerald-500 text-xs font-medium animate-fadeIn">
                  Thanks for subscribing! Check your inbox soon.
                </p>
              )}
            </div>

            {/* Direct Contact Info */}
            <div className="flex flex-col gap-3 text-sm pt-2 border-t border-slate-900/50">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt
                  className="text-indigo-500 shrink-0"
                  size={14}
                />
                <span>123 Knowledge Lane, Tech City, TC 94821</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-indigo-500 shrink-0" size={14} />
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-500 shrink-0" size={14} />
                <a
                  href="mailto:support@skillforge.com"
                  className="hover:text-white transition-colors"
                >
                  support@skillforge.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} SkillForge. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
