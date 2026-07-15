"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { uploadToImgBB } from "@/lib/action/image-upload";
import {
  FaBook,
  FaAlignLeft,
  FaTags,
  FaSignal,
  FaDollarSign,
  FaClock,
  FaImage,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

type CourseFormData = {
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  duration: string;
  instructorName: string;
  instructorEmail: string;
};

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

export default function AddCourseForm() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>();

  // Pre-fill instructor info when session is available
  useEffect(() => {
    if (session?.user) {
      setValue("instructorName", session.user.name || "Unknown");
      setValue("instructorEmail", session.user.email);
    }
  }, [session, setValue]);

  // If not logged in and session checking is done, redirect
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to add a course");
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: CourseFormData) => {
    if (!imageFile) {
      toast.error("Please upload a thumbnail image");
      return;
    }

    try {
      setIsSubmitting(true);
      toast.loading("Uploading image...");

      // 1. Upload image via Server Action
      const formData = new FormData();
      formData.append("image", imageFile);
      const imageUrl = await uploadToImgBB(formData);

      if (!imageUrl) {
        toast.dismiss();
        toast.error("Image upload failed");
        setIsSubmitting(false);
        return;
      }

      toast.dismiss();
      toast.loading("Saving course data...");

      // 2. Save Course to DB
      const coursePayload = {
        ...data,
        thumbnailUrl: imageUrl,
      };

      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coursePayload),
      });

      const result = await response.json();

      toast.dismiss();

      if (response.ok) {
        toast.success("Course published successfully!");
        router.push("/courses/manage"); // Redirect to manage courses page
      } else {
        toast.error(result.error || "Failed to publish course");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) return null; // Let the useEffect handle redirect

  return (
    <div className=" bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-8 py-10 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Publish a New Course</h1>
          <p className="text-indigo-100 max-w-2xl mx-auto">
            Share your expertise with the world. Fill out the details below to
            add your course to SkillForge.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Course Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Course Title <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaBook />
                  </div>
                  <input
                    {...register("title", {
                      required: "Course title is required",
                    })}
                    type="text"
                    placeholder="e.g. Master Modern React from Scratch"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                {errors.title && (
                  <p className="mt-1 text-sm text-rose-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400">
                    <FaAlignLeft />
                  </div>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={4}
                    placeholder="Provide a detailed description of what students will learn..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-y"
                  />
                </div>
                {errors.description && (
                  <p className="mt-1 text-sm text-rose-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaTags />
                  </div>
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-rose-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Level <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaSignal />
                  </div>
                  <select
                    {...register("level", { required: "Level is required" })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                  >
                    <option value="">Select level</option>
                    {LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.level && (
                  <p className="mt-1 text-sm text-rose-500">
                    {errors.level.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Price ($) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaDollarSign />
                  </div>
                  <input
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price cannot be negative" },
                    })}
                    type="number"
                    step="0.01"
                    placeholder="49.99"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-rose-500">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Duration <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaClock />
                  </div>
                  <input
                    {...register("duration", {
                      required: "Duration is required",
                    })}
                    type="text"
                    placeholder="e.g. 12 weeks or 45 hours"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                {errors.duration && (
                  <p className="mt-1 text-sm text-rose-500">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* Thumbnail Image */}
              <div className="md:col-span-2 p-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl">
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Course Thumbnail <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100 shrink-0 overflow-hidden relative">
                    {imageFile ? (
                      <Image
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        fill
                        className="object-cover rounded-xl"
                        unoptimized
                      />
                    ) : (
                      <FaImage size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="thumbnail"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="thumbnail"
                      className="inline-block px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors shadow-sm"
                    >
                      Browse Files
                    </label>
                    <p className="mt-2 text-xs text-slate-500">
                      {imageFile ? imageFile.name : "PNG, JPG, GIF up to 5MB"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructor Name (Readonly) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Instructor Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaUser />
                  </div>
                  <input
                    {...register("instructorName")}
                    type="text"
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-slate-100/50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Instructor Email (Readonly) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Instructor Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaEnvelope />
                  </div>
                  <input
                    {...register("instructorEmail")}
                    type="email"
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-slate-100/50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto md:min-w-[200px] px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none shadow-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Publish Course"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
