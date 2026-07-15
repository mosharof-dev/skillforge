"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { uploadToImgBB } from "@/lib/action/image-upload";
import { 
  FaBook, FaAlignLeft, FaTag, FaLayerGroup, 
  FaDollarSign, FaClock, FaImage, FaUser, FaEnvelope 
} from "react-icons/fa";

type EditCourseFormData = {
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

export default function EditCourseForm({ courseId }: { courseId: string }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EditCourseFormData>();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (res.ok) {
          const data = await res.json();
          reset({
            title: data.title,
            description: data.description,
            category: data.category,
            level: data.level,
            price: data.price,
            duration: data.duration,
            instructorName: data.instructorName,
            instructorEmail: data.instructorEmail,
          });
          setCurrentImageUrl(data.thumbnailUrl);
        } else {
          toast.error("Failed to load course details");
          router.push("/courses/manage");
        }
      } catch (error) {
        toast.error("Error loading course");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, reset, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: EditCourseFormData) => {
    if (!session?.user) {
      toast.error("You must be logged in to update a course.");
      return;
    }

    setIsSubmitting(true);
    let thumbnailUrl = currentImageUrl;

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        
        const imgUrl = await uploadToImgBB(formData);
        if (imgUrl) {
          thumbnailUrl = imgUrl;
        } else {
          toast.error("Image upload failed");
          setIsSubmitting(false);
          return;
        }
      }

      const courseData = {
        ...data,
        price: Number(data.price),
        thumbnailUrl,
      };

      const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Course updated successfully!");
        router.push("/courses/manage");
      } else {
        toast.error(result.error || "Failed to update course");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading course data...</div>;
  }

  if (!session?.user) {
    router.push("/login");
    return null;
  }

  return (
    <div className=" bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Edit Course</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Update your course details. Changes will be reflected immediately across the platform.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6 md:p-10 space-y-8">
          
          {/* Form fields identical to AddCourseForm but using reset() from hook-form to populate default values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">Course Title <span className="text-rose-500">*</span></label>
              <div className="relative">
                <div className="absolute top-3 left-4 text-slate-400"><FaBook /></div>
                <input type="text" {...register("title", { required: "Title is required" })} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">Description <span className="text-rose-500">*</span></label>
              <div className="relative">
                <div className="absolute top-4 left-4 text-slate-400"><FaAlignLeft /></div>
                <textarea {...register("description", { required: "Description is required" })} rows={4} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Category <span className="text-rose-500">*</span></label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 text-slate-400"><FaLayerGroup /></div>
                <select {...register("category", { required: "Category is required" })} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Level <span className="text-rose-500">*</span></label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 text-slate-400"><FaTag /></div>
                <select {...register("level", { required: "Level is required" })} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none">
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Price ($) <span className="text-rose-500">*</span></label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 text-slate-400"><FaDollarSign /></div>
                <input type="number" step="0.01" {...register("price", { required: "Price is required", min: 0 })} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Duration <span className="text-rose-500">*</span></label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 text-slate-400"><FaClock /></div>
                <input type="text" placeholder="e.g. 8 weeks" {...register("duration", { required: "Duration is required" })} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">Course Thumbnail (Leave empty to keep current)</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-indigo-50 border border-indigo-100 overflow-hidden relative shrink-0">
                  {imageFile ? (
                    <Image src={URL.createObjectURL(imageFile)} alt="Preview" fill className="object-cover" unoptimized />
                  ) : currentImageUrl ? (
                    <Image src={currentImageUrl} alt="Current Thumbnail" fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-indigo-400"><FaImage size={24} /></div>
                  )}
                </div>
                <div className="flex-1">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition-colors" />
                </div>
              </div>
            </div>
            
            {/* Readonly Instructor Fields */}
            <div className="space-y-2 opacity-70">
              <label className="text-sm font-bold text-slate-700">Instructor Name</label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 text-slate-400"><FaUser /></div>
                <input type="text" {...register("instructorName")} readOnly className="w-full pl-11 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl cursor-not-allowed" />
              </div>
            </div>

            <div className="space-y-2 opacity-70">
              <label className="text-sm font-bold text-slate-700">Instructor Email</label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 text-slate-400"><FaEnvelope /></div>
                <input type="email" {...register("instructorEmail")} readOnly className="w-full pl-11 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl cursor-not-allowed" />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col-reverse sm:flex-row gap-4">
            <button 
              type="button" 
              onClick={() => router.push("/courses/manage")}
              disabled={isSubmitting} 
              className="w-full sm:w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg py-4 rounded-xl transition-all active:scale-95 flex justify-center items-center"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full sm:w-2/3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex justify-center items-center gap-2"
            >
              {isSubmitting ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Update Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
