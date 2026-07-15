"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs = [
    {
      id: 1,
      question: "Do I get lifetime access to the courses?",
      answer: "Yes! Once you purchase a course, you have lifetime access to its content, including all future updates and additions to that specific course material.",
    },
    {
      id: 2,
      question: "Are the certificates recognized by employers?",
      answer: "Our certificates are recognized by top tech companies. They demonstrate that you have completed rigorous, project-based training and have hands-on experience with the technologies.",
    },
    {
      id: 3,
      question: "Do I need prior coding experience?",
      answer: "It depends on the course. We offer beginner-friendly courses that require zero prior knowledge, as well as advanced courses for experienced developers looking to upskill.",
    },
    {
      id: 4,
      question: "What if I get stuck on a problem?",
      answer: "You are never alone! Our platform includes a dedicated Q&A section for each lesson, and you'll get access to our private Discord community where instructors and peers help each other.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Got questions? We&apos;ve got answers. If you have some other questions, feel free to contact us.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 ${openId === faq.id ? 'shadow-md shadow-indigo-900/5 ring-1 ring-indigo-100' : 'hover:border-indigo-100 hover:shadow-sm'}`}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer bg-white"
              >
                <span className={`font-semibold text-lg transition-colors ${openId === faq.id ? 'text-indigo-600' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${openId === faq.id ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                  <FaChevronDown size={14} />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
