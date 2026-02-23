"use client";

import { motion } from "framer-motion";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  quote: string;
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative flex flex-col gap-5 rounded-3xl bg-white p-7 shadow-[0_2px_16px_rgba(0,0,0,0.06)] ring-1 ring-neutral-100 transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)]"
    >
      {/* Decorative quote mark */}
      <span
        aria-hidden="true"
        className="absolute right-7 top-6 select-none font-serif text-6xl leading-none text-neutral-100"
      >
        &ldquo;
      </span>

      {/* Stars */}
      <div
        className="flex gap-0.5"
        role="img"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating ? "text-amber-400" : "text-neutral-200"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="relative z-10 text-[15px] leading-relaxed text-neutral-600">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <footer className="mt-auto flex items-center gap-3 border-t border-neutral-100 pt-5">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-neutral-100">
          {/* Using <img> intentionally — src is an external SVG avatar service */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={testimonial.image}
            alt={`Portrait of ${testimonial.name}`}
            width={44}
            height={44}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-900">
            {testimonial.name}
          </p>
          <p className="truncate text-xs text-neutral-500">
            {testimonial.role} &middot;{" "}
            <span className="font-medium text-neutral-700">
              {testimonial.company}
            </span>
          </p>
        </div>
      </footer>
    </motion.article>
  );
}