
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <FeaturedCourses />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </>
  );
}

