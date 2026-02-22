"use client";

import { motion } from "framer-motion";
import { Counter, ScrollReveal } from "./ui";
import { staggerContainer, staggerItem, zoomIn } from "../animations/animations";
import { STATS } from "@/data/data";


export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollReveal variant={zoomIn}>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-customRed mb-3 px-3 py-1 bg-red-50 rounded-full border border-red-100">
              Our Track Record
            </span>
            <h2 className="centered-heading">Proven Results</h2>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              variants={staggerItem}
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative bg-white rounded-2xl py-8 px-4 shadow-md border border-gray-100 text-center overflow-hidden group"
            >
              {/* Hover accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-customRed to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />

              <div
                className="text-4xl sm:text-5xl font-extrabold mb-2"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: i % 2 === 0 ? "var(--red)" : "var(--green)",
                }}
              >
                <Counter end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="text-gray-500 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}