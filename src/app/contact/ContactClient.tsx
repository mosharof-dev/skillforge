"use client";

import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate API request call
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset form status back to idle after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  const contactDetails = [
    {
      title: "Email Support",
      value: "support@skillforge.com",
      description: "Our support team answers within 24 hours.",
      icon: <FaEnvelope className="text-indigo-600 w-5 h-5" />,
      href: "mailto:support@skillforge.com",
    },
    {
      title: "Call Us",
      value: "+1 (234) 567-890",
      description: "Mon-Fri from 9:00 AM to 6:00 PM.",
      icon: <FaPhoneAlt className="text-indigo-600 w-5 h-5" />,
      href: "tel:+1234567890",
    },
    {
      title: "Visit Our Office",
      value: "Dhaka, Bangladesh",
      description: "123 Knowledge Lane, Tech City, TC 94821",
      icon: <FaMapMarkerAlt className="text-indigo-600 w-5 h-5" />,
      href: "#map",
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
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            We’d Love to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-200">
              Hear From You
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Have questions about our tech courses, pricing, or partnerships?
            Reach out and our team will get right back to you.
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Cards + Map */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactDetails.map((detail, idx) => (
                  <a
                    href={detail.href}
                    key={idx}
                    className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-150 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-indigo-100 group-hover:text-white transition-colors duration-300">
                      {detail.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        {detail.title}
                      </h3>
                      <p className="font-semibold text-indigo-600 text-sm mt-1">
                        {detail.value}
                      </p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        {detail.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Working Mock Map Embed */}
              <div
                id="map"
                className="w-full h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group mt-6"
              >
                <iframe
                  src="https://maps.google.com/maps?q=Dhaka%20Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
                {/* Visual Location Tag Overlay */}
                <div className="absolute bottom-4 left-4 bg-slate-950/90 text-white backdrop-blur px-4 py-2 rounded-lg text-xs font-semibold shadow-md flex items-center gap-2 border border-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                  <span>SkillForge HQ - Dhaka</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-250/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10" />

                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-slate-500 text-sm mb-8">
                  Feel free to send a detailed inquiry and we will get back to
                  you as soon as possible.
                </p>

                {formStatus === "success" ? (
                  <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-scaleIn">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <FaCheckCircle size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-950">
                      Thank You!
                    </h3>
                    <p className="text-emerald-700 text-sm leading-relaxed max-w-sm mx-auto">
                      Your message has been sent successfully. We will review
                      your inquiry and get in touch with you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="name"
                          className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Your Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject input */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="subject"
                        className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        placeholder="Inquiry about Digital Marketing / Web Development Course"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="message"
                        className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us what you'd like to learn or how we can help you..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <FaSpinner className="animate-spin" size={16} />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane size={14} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
