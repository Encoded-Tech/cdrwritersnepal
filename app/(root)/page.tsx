import { Metadata } from "next";
import HeroSection from "../components/home/landing/hero";
import WhatIsCDR from "../components/home/whatIsCdr";
import WhyExpert from "../components/home/whyExpert";
import WhyCDRWritersNepal from "../components/home/whyCdrWritersNepal";

import SuccessfulOutcomes from "../components/home/successfulOutcomes";
import ProcessSteps from "../components/home/processSteps";
import FAQSection from "../components/home/faqSection";
import TestimonialSection from "../components/home/testimonial/testimonialSection";
 






export const metadata: Metadata = {
  title: "CDR Writers Nepal - 100% Positive Assessment Guaranteed",
  description:
    "Expert CDR writing services for Engineers Australia skill assessment. Career Episodes, Summary Statement, CPD — all handled by professional engineers.",
};

export default function Home() {
  return (
    <main>
      {/* 1. Hero — split red/white layout with typewriter + contact form */}
      <HeroSection />

      {/* 2. What is CDR — interactive info cards */}
      <WhatIsCDR />

      {/* 3. Why Expert — feature grid card */}
      <WhyExpert />

      {/* 4. Why CDR Writers Nepal — content + image */}
      <WhyCDRWritersNepal />

  
   {/* 6. Process Steps — 6-step card grid */}
      <ProcessSteps />

      {/* 7. Successful Outcomes — image gallery + lightbox */}
      <SuccessfulOutcomes />

   <TestimonialSection />

      {/* 8. FAQs — accordion */}
      <FAQSection />
    </main>
  );
}