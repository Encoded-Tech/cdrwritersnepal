"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ui";
import { fadeDown, staggerContainer, staggerItem } from "../animations/animations";


const PLANS = [
  {
    name: "Standard",
    delivery: "30 Days",
    price: "NPR 25,000",
    usd: "~$185",
    popular: false,
    color: "#1a7a4a",
    features: [
      "3 Career Episodes",
      "Summary Statement",
      "CPD Document",
      "CV Review",
      "1 Free Revision",
      "Email Support",
    ],
    cta: "Get Started",
  },
  {
    name: "Express",
    delivery: "15 Days",
    price: "NPR 35,000",
    usd: "~$260",
    popular: true,
    color: "#c8102e",
    features: [
      "3 Career Episodes",
      "Summary Statement",
      "CPD Document",
      "CV Writing",
      "3 Free Revisions",
      "Priority Support",
      "Plagiarism Report",
    ],
    cta: "Most Popular →",
  },
  {
    name: "Rush",
    delivery: "10 Days",
    price: "NPR 45,000",
    usd: "~$335",
    popular: false,
    color: "#1a7a4a",
    features: [
      "3 Career Episodes",
      "Summary Statement",
      "CPD Document",
      "CV Writing",
      "Unlimited Revisions",
      "24/7 Priority Support",
      "Plagiarism Report",
      "Dedicated Engineer",
    ],
    cta: "Get Rush Service",
  },
  {
    name: "Royal",
    delivery: "Flexible",
    price: "Custom",
    usd: "Contact us",
    popular: false,
    color: "#0f5233",
    features: [
      "Everything in Rush",
      "Personal CDR Consultant",
      "Direct EA Liaison",
      "Interview Preparation",
      "Visa Guidance",
      "Lifetime Support",
      "Money-back Guarantee",
    ],
    cta: "Contact for Quote",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">

        <ScrollReveal variant={fadeDown}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label section-label-green mb-4">Transparent Pricing</span>
            <h2 className="section-heading mt-3 mb-4">Simple, Honest Pricing Plans</h2>
            <p className="body-text">
              Choose the package that fits your timeline. All plans include direct communication
              with your assigned engineer and full EA compliance.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              className={`relative flex flex-col rounded-3xl border overflow-hidden ${
                plan.popular
                  ? "pricing-popular shadow-red-glow scale-[1.03]"
                  : "bg-white border-cdrBorder shadow-sm hover:shadow-premium transition-shadow"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-customRed text-[10px] font-black px-2.5 py-1 rounded-full tracking-wider uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Plan header */}
                <div className="mb-6">
                  <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${plan.popular ? "text-red-200" : "text-inkFaint"}`}>
                    {plan.delivery} Delivery
                  </p>
                  <h3 className={`text-2xl font-bold mb-3 ${plan.popular ? "text-white" : "text-ink"}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-end gap-2">
                    <span className={`text-3xl font-black font-serif ${plan.popular ? "text-white" : "text-ink"}`}>
                      {plan.price}
                    </span>
                  </div>
                  <p className={`text-sm mt-0.5 ${plan.popular ? "text-red-200" : "text-inkFaint"}`}>
                    {plan.usd}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{ color: plan.popular ? "#86efac" : "#1a7a4a" }}
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className={`text-sm font-medium ${plan.popular ? "text-red-100" : "text-inkMuted"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <button
                    className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${
                      plan.popular
                        ? "bg-white text-customRed hover:bg-red-50"
                        : "bg-customRed text-white hover:bg-customRedDark"
                    }`}
                    style={{ boxShadow: plan.popular ? "none" : "0 4px 14px rgba(200,16,46,0.2)" }}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Money-back note */}
        <ScrollReveal variant={fadeDown} delay={0.15}>
          <p className="text-center text-inkFaint text-sm mt-8">
            💯 All plans come with a satisfaction guarantee. Not happy? We revise until you are.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}