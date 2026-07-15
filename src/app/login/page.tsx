"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Button,
  FieldError,
  Form,
  Label,
  TextField,
} from "@heroui/react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaArrowRight,
} from "react-icons/fa";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  type FormData = {
    email: string;
    password: string;
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const toastId = toast.loading("Logging you in...");

    try {
      const response = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (response?.error) {
        toast.error(response.error.message || "Invalid credentials.", {
          id: toastId,
        });
      } else {
        toast.success("Welcome back! Redirecting...", {
          id: toastId,
        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || "Something went wrong. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const toastId = toast.loading("Connecting with Google...");
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to login with Google.", {
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
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">
            Log in to your account to continue building your skills.
          </p>
        </div>

        {/* Form */}
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
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

          {/* Password */}
          <TextField isRequired isInvalid={!!errors.password}>
            <div className="flex items-center justify-between mb-1">
              <Label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                Password <span className="text-rose-500">*</span>
              </Label>
              <Link href="#" className="text-[10px] font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center w-full">
              <FaLock className="absolute left-4 text-slate-400" size={13} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all duration-200 focus:outline-none shadow-sm"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
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
            <FieldError className="text-[10px] text-rose-500 mt-0.5 font-medium">
              {errors.password?.message}
            </FieldError>
          </TextField>

          {/* Sign In Submit Button */}
          <Button
            type="submit"
            isDisabled={isLoading}
            className="w-full mt-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-650/25 hover:shadow-indigo-650/35 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" size={14} />
                <span>Logging In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
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

          {/* Google Social Login Button */}
          <Button
            type="button"
            isDisabled={isGoogleLoading}
            onClick={handleGoogleSignIn}
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
            <span>Sign in with Google</span>
          </Button>
        </Form>

        {/* Don't have an account link */}
        <p className="text-center text-xs text-slate-500 mt-5">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
