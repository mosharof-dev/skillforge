"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = session?.user
    ? [
        { name: "Explore Courses", path: "/courses" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Add Course", path: "/courses/add" },
        { name: "Manage Course", path: "/courses/manage" },
      ]
    : [
        { name: "Explore Courses", path: "/courses" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              Skill<span className="text-indigo-600">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 relative py-2 ${
                    isActive ? "text-indigo-600" : "text-slate-600"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-9 h-9 rounded-full bg-slate-200 animate-pulse" />
            ) : session?.user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-100 shadow-sm shrink-0">
                    <Image 
                      src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name || "U"}&background=c7d2fe&color=4f46e5`}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-700 hidden sm:block truncate max-w-[150px]">
                    {session.user.name || "User"}
                  </span>
                </div>
                <button
                  onClick={async () => {
                    await signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push("/");
                        },
                      },
                    });
                  }}
                  className="px-4 py-2 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors active:scale-95"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-5 py-2.5 text-sm font-semibold hover:bg-indigo-200 bg-indigo-50 text-indigo-600 rounded-lg transition-all active:scale-95">
                    Log In
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-all active:scale-95">
                    Sign Up Free
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-xl">
          <div className="px-4 py-5 space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={toggleMobileMenu}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col gap-3">
              {isPending ? (
                <div className="w-full h-10 rounded-lg bg-slate-200 animate-pulse" />
              ) : session?.user ? (
                <button
                  onClick={async () => {
                    toggleMobileMenu();
                    await signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push("/");
                        },
                      },
                    });
                  }}
                  className="w-full px-4 py-3 text-base font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors active:scale-95"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={toggleMobileMenu}>
                    <button className="w-full px-4 py-3 text-base font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors active:scale-95">
                      Log In
                    </button>
                  </Link>
                  <Link href="/register" onClick={toggleMobileMenu}>
                    <button className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors active:scale-95">
                      Sign Up Free
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
