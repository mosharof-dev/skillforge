"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Button,
  Description,
  FieldError,
  Form,
  Label,
  TextField,
} from "@heroui/react";
import {
  FaUser,
  FaEnvelope,
  FaLink,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaArrowRight,
} from "react-icons/fa";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");
type FormData = {
  name: string;
  email: string;
  image?: string;
  password: string;
  confirmPassword: string;
};

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      const response = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: data.image || undefined,
        callbackURL: "/",
      });

      if (response?.error) {
        toast.error(response.error.message || "Registration failed.", {
          id: toastId,
        });
      } else {
        toast.success("Account created successfully! Redirecting...", {
          id: toastId,
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || "Something went wrong. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    const toastId = toast.loading("Connecting with Google...");
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to register with Google.", {
        id: toastId,
      });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Blur Spheres */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-50/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Contained Card */}
      <div className="relative w-full max-w-md bg-white border border-slate-200/80 shadow-2xl rounded-3xl overflow-hidden flex flex-col z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 p-8 sm:p-10">
          
          {/* Header elements */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-xs text-slate-500 mt-1">
              Start your journey today. Join thousands of members building real-world skills.
            </p>
          </div>

          {/* Form */}
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            {/* Full Name */}
            <TextField isRequired isInvalid={!!errors.name}>
              <Label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                Full Name <span className="text-rose-500">*</span>
              </Label>
              <div className="relative flex items-center w-full">
                <FaUser className="absolute left-4 text-slate-400" size={13} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all duration-200 focus:outline-none shadow-sm"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>
              <FieldError className="text-[10px] text-rose-500 mt-0.5 font-medium">
                {errors.name?.message}
              </FieldError>
            </TextField>

            {/* Email Address */}
            <TextField isRequired isInvalid={!!errors.email}>
              <Label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                Email Address <span className="text-rose-500">*</span>
              </Label>
              <div className="relative flex items-center w-full">
                <FaEnvelope className="absolute left-4 text-slate-400" size={13} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all duration-200 focus:outline-none shadow-sm"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>
              <FieldError className="text-[10px] text-rose-500 mt-0.5 font-medium">
                {errors.email?.message}
              </FieldError>
            </TextField>

            {/* Profile Image (Optional) */}
            <TextField isInvalid={!!errors.image}>
              <Label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                Profile Image (Optional)
              </Label>
              <div className="relative flex items-center w-full">
                <FaLink className="absolute left-4 text-slate-400" size={13} />
                <input
                  type="text"
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all duration-200 focus:outline-none shadow-sm"
                  {...register("image", {
                    validate: (val) => {
                      if (!val) return true;
                      try {
                        new URL(val);
                        return true;
                      } catch {
                        return "Please enter a valid URL";
                      }
                    },
                  })}
                />
              </div>
              <FieldError className="text-[10px] text-rose-500 mt-0.5 font-medium">
                {errors.image?.message}
              </FieldError>
            </TextField>

            {/* Password */}
            <TextField isRequired isInvalid={!!errors.password}>
              <Label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                Password <span className="text-rose-500">*</span>
              </Label>
              <div className="relative flex items-center w-full">
                <FaLock className="absolute left-4 text-slate-400" size={13} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all duration-200 focus:outline-none shadow-sm"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: {
                      hasNumber: (value) =>
                        /[0-9]/.test(value) ||
                        "Password must contain at least one number",
                      hasLetter: (value) =>
                        /[a-zA-Z]/.test(value) ||
                        "Password must contain at least one letter",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
              <Description className="text-[9px] text-slate-400 mt-0.5 leading-none">
                Must be at least 8 characters with 1 letter and 1 number.
              </Description>
              <FieldError className="text-[10px] text-rose-500 mt-0.5 font-medium">
                {errors.password?.message}
              </FieldError>
            </TextField>

            {/* Confirm Password */}
            <TextField isRequired isInvalid={!!errors.confirmPassword}>
              <Label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                Confirm Password <span className="text-rose-500">*</span>
              </Label>
              <div className="relative flex items-center w-full">
                <FaLock className="absolute left-4 text-slate-400" size={13} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your password again"
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all duration-200 focus:outline-none shadow-sm"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={14} />
                  ) : (
                    <FaEye size={14} />
                  )}
                </button>
              </div>
              <FieldError className="text-[10px] text-rose-500 mt-0.5 font-medium">
                {errors.confirmPassword?.message}
              </FieldError>
            </TextField>

            {/* Create Account Submit Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="w-full mt-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-650/25 hover:shadow-indigo-650/35 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" size={14} />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <FaArrowRight size={11} className="ml-1" />
                </>
              )}
            </Button>

            {/* OR CONTINUE WITH Separator */}
            <div className="relative flex py-1.5 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                OR CONTINUE WITH
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Google Social Signup Button at the bottom */}
            <Button
              type="button"
              isDisabled={isGoogleLoading}
              onClick={handleGoogleSignUp}
              className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 transition-all flex items-center justify-center gap-2.5 active:scale-98 shadow-sm cursor-pointer hover:border-slate-300 text-xs"
            >
              {isGoogleLoading ? (
                <FaSpinner className="animate-spin text-slate-400" size={14} />
              ) : (
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none">
                  <path
                    fill="#EA4335"
                    d="M5.2662 9.76452C6.19875 6.97003 8.81845 5 11.9091 5C13.7381 5 15.3905 5.66682 16.6575 6.75836L20.1634 3.25255C18.0052 1.23873 15.1103 0 11.9091 0C7.27182 0 3.28473 2.67209 1.34864 6.58136L5.2662 9.76452Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407 18.013C14.9509 18.668 13.5291 19.0909 11.9091 19.0909C8.81845 19.0909 6.19875 17.1209 5.2662 14.3264L1.34864 17.5095C3.28473 21.4188 7.27182 24.0909 11.9091 24.0909C14.9509 24.0909 17.7335 23.0816 19.8267 21.3623L16.0407 18.013Z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.2727C23.49 11.4545 23.4182 10.6818 23.2727 10H11.9091V14.5455H18.4168C18.1268 16.0682 17.2625 17.2273 16.0407 18.013L19.8267 21.3623C22.038 19.3273 23.49 16.0795 23.49 12.2727Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.2662 9.76452C4.98854 10.5973 4.83636 11.489 4.83636 12.4091C4.83636 13.3292 4.98854 14.2208 5.2662 15.0537L1.34864 17.5095C0.485455 15.7727 0 13.8273 0 11.7727C0 9.71818 0.485455 7.77273 1.34864 6.03636L5.2662 9.76452Z"
                  />
                </svg>
              )}
              <span>Sign up with Google</span>
            </Button>
          </Form>

          {/* Already have an account link */}
          <p className="text-center text-xs text-slate-500 mt-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>
      </div>
    </div>
  );
}
