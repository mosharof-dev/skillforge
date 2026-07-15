"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaLock } from "react-icons/fa";

export default function EnrollButton() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleEnroll = () => {
    if (isPending) return;

    if (!session?.user) {
      toast.error("Please login to enroll in this course.");
      router.push("/login");
      return;
    }

    // User is logged in, show the requested toast message
    toast.info("We are currently experiencing technical issues. Enrollment is temporarily paused. Please try again in a few days as we are working on a fix.");
  };

  return (
    <button 
      onClick={handleEnroll}
      disabled={isPending}
      className="w-full py-4 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
    >
      {isPending ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : !session?.user ? (
        <>
          <FaLock size={16} />
          Login to Enroll
        </>
      ) : (
        "Enroll Now"
      )}
    </button>
  );
}
