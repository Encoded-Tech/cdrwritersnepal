"use client";

/* ═══════════════════════════════════════════════════════════════════════════
   PricingPage.tsx  — Real pricing from cdrwritersnepal.com
   Hero     → dark #08090c, HeroBackground style
   Sections → warm off-white / white alternating
   ═══════════════════════════════════════════════════════════════════════════ */

import { useState, useRef, useCallback } from "react";
import {
  motion,
 
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const E: [number, number, number, number]    = [0.32, 0, 0.16, 1];
const EASE_FILL: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Real pricing data ────────────────────────────────────────────────────────

/** CDR Writing — Complete packages */
const CDR_PACKAGES = [
  {
    id: "cdr-30",
    tier: "Standard",
    days: "30 Days",
    badge: null,
    price: "$699",
    currency: "AUD",
    tagline: "Ideal for engineers with flexible timelines.",
    inclusions: [
      "3 Career Episodes (full EA format)",
      "1 Summary Statement",
      "1 CPD (Continuing Professional Development)",
      "Plagiarism check & originality certificate",
      "EA competency framework alignment",
    ],
  },
  {
    id: "cdr-15",
    tier: "Express",
    days: "15 Days",
    badge: "Most Popular",
    price: "$899",
    currency: "AUD",
    tagline: "Best balance of speed, quality and price.",
    inclusions: [
      "Everything in Standard",
      "Priority queue processing",
      "2 rounds of revisions included",
      "Dedicated migration writer assigned",
      "ANZSCO code verification",
    ],
  },
  {
    id: "cdr-10",
    tier: "Fast-Track",
    days: "10 Days",
    badge: null,
    price: "$1,100",
    currency: "AUD",
    tagline: "Urgent submissions with full quality assurance.",
    inclusions: [
      "Everything in Express",
      "Senior engineer review & sign-off",
      "In-depth competency element mapping",
      "Employment evidence guidance",
      "3 rounds of revisions included",
    ],
  },
  {
    id: "cdr-royal",
    tier: "Royal Package",
    days: "7 Days",
    badge: "Premium",
    price: "$1,500",
    currency: "AUD",
    tagline: "Maximum priority. No compromises.",
    inclusions: [
      "Everything in Fast-Track",
      "Guaranteed 7-day turnaround",
      "Unlimited revisions",
      "EOI points calculation assistance",
      "Post-submission query support (30 days)",
      "Documents upload on EA Portal",
    ],
  },
];

/** CDR Report Writing (3 Career Episodes, no SS/CPD) */
const REPORT_PACKAGES = [
  {
    id: "rep-15",
    tier: "Standard",
    days: "15 Days",
    badge: null,
    price: "$799",
    currency: "AUD",
    tagline: "Three career episodes written to EA standards.",
    inclusions: [
      "3 Career Episodes (up to 1,000 words each)",
      "Plagiarism check included",
      "EA competency element mapping",
      "1 revision round",
    ],
  },
  {
    id: "rep-10",
    tier: "Express",
    days: "10 Days",
    badge: "Most Popular",
    price: "$999",
    currency: "AUD",
    tagline: "Priority processing for faster submissions.",
    inclusions: [
      "3 Career Episodes (up to 1,500 words each)",
      "Priority writer assignment",
      "Plagiarism check & originality certificate",
      "2 revision rounds",
      "ANZSCO verification",
    ],
  },
  {
    id: "rep-7",
    tier: "Royal Report",
    days: "7 Days",
    badge: "Fastest",
    price: "$1,199",
    currency: "AUD",
    tagline: "Urgent deadline? Full quality, zero delays.",
    inclusions: [
      "3 Career Episodes (up to 2,000 words each)",
      "Senior engineer review",
      "Unlimited revisions",
      "Plagiarism check & originality certificate",
      "Priority queue — guaranteed 7-day delivery",
    ],
  },
];

/** Individual services */
const INDIVIDUAL_SERVICES = [
  { service: "Career Episode Writing",   "30d": "$250", "15d": "$300", "10d": "$350",  "7d": "—" },
  { service: "Summary Statement Writing", "30d": "$80",  "15d": "$150", "10d": "$200", "7d": "—" },
];

/** CDR Review services */
const REVIEW_SERVICES = [
  { service: "CDR Editing & Proofreading",        "15d": "$300", "10d": "$400", "7d": "$500" },
  { service: "CDR Proofreading",                  "15d": "$120", "10d": "$150", "7d": "$180" },
  { service: "CDR Plagiarism Check & Removal",    "15d": "$100", "10d": "$150", "7d": "$210" },
  { service: "Project Plagiarism Check & Removal","15d": "$100", "10d": "$150", "7d": "$180" },
];

/** Other services — flat fee */
const OTHER_SERVICES = [
  { service: "CDR Plagiarism Check",          price: "$100" },
  { service: "Project Plagiarism Check",      price: "$100" },
  { service: "Project Arrangement",           price: "$400" },
  { service: "Resume Writing",                price: "$100" },
  { service: "Experience Letter Writing",     price: "$100" },
  { service: "Documents Upload on EA Portal", price: "$200" },
];

const FAQ_ITEMS = [
  { q: "Do we need to pay partial payment initially?",        a: "Yes, a partial payment is required initially to secure your project and allocate resources. The remaining balance can be paid at the end or at specified milestones." },
  { q: "What are the refund guarantees?",                     a: "As we are a service-based organisation, we do not have a refund policy. But we can assure you a 100% guaranteed positive outcome — therefore, we never need to talk about refunds." },
  { q: "Can we contact the CDR experts directly?",            a: "Yes, you can contact our CDR experts via email or phone. We also offer consultation sessions for detailed guidance or complex cases." },
  { q: "How do clients receive the final report?",            a: "Clients receive the final report via email in the requested format (PDF, Word, etc.). We prefer a zipped file for convenience." },
  { q: "Do you rewrite CDR reports if not approved by EA?",  a: "Yes, we offer revision services for CDR reports if they are not approved by Engineers Australia. We review feedback and adjust accordingly to meet standards." },
  { q: "What if I provide incorrect documents?",             a: "In such a case the client may need to pay extra for the additional work caused. However, with the Royal Package you can relax — it includes unlimited revisions." },
  { q: "What payment methods are accepted?",                 a: "We accept bank transfer, credit card, and international wire transfer. A 50% deposit is taken upfront and the remainder upon delivery of your first draft." },
];

const PROCESS_STEPS = [
  { n: "01", title: "Select Package",     body: "Choose the service and delivery timeline that fits your situation. Contact us if unsure — we advise at no charge." },
  { n: "02", title: "Submit Documents",   body: "Provide your CV, academic records, and project details via our secure intake form." },
  { n: "03", title: "Expert Preparation", body: "Your assigned writer prepares all documentation and sends drafts for your review within the agreed timeframe." },
  { n: "04", title: "Deliver & Lodge",    body: "Receive submission-ready files via email. We remain available for follow-up queries after delivery." },
];


// ══════════════════════════════════════════════════════════════════════════════
// HERO BACKGROUND — mirrors HeroBackground.tsx
// ══════════════════════════════════════════════════════════════════════════════

const SPARKS = [
  { x:8,  delay:0,   dur:7,  size:3 }, { x:18, delay:1.2, dur:9,  size:2 },
  { x:28, delay:2.5, dur:6,  size:4 }, { x:38, delay:0.8, dur:8,  size:2 },
  { x:48, delay:3.1, dur:11, size:3 }, { x:55, delay:1.7, dur:7,  size:2 },
  { x:63, delay:4.0, dur:9,  size:3 }, { x:72, delay:0.4, dur:6,  size:4 },
  { x:82, delay:2.2, dur:8,  size:2 }, { x:91, delay:3.8, dur:10, size:3 },
];
const SHOOTING_STARS = [
  { top:"12%", delay:1,  dur:1.8 }, { top:"28%", delay:4,  dur:2.1 },
  { top:"55%", delay:7,  dur:1.6 }, { top:"72%", delay:11, dur:2.3 },
];

function HeroBg({ bgY }: { bgY: MotionValue<number> }) {
  return (
    <>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {[
          { size:600, top:"-10%", left:"-8%",  color:"rgba(200,16,46,0.5)",  delay:0 },
          { size:500, top:"30%",  left:"60%",  color:"rgba(26,122,74,0.35)", delay:2 },
          { size:400, top:"65%",  left:"10%",  color:"rgba(200,16,46,0.25)", delay:4 },
          { size:300, top:"-5%",  left:"70%",  color:"rgba(255,200,0,0.1)",  delay:1 },
        ].map((o, i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{ width:o.size, height:o.size, top:o.top, left:o.left, background:`radial-gradient(circle at 40% 40%, ${o.color}, transparent 70%)`, filter:"blur(40px)" }}
            animate={{ scale:[1,1.15,1], opacity:[0.35,0.55,0.35] }}
            transition={{ duration:6+o.delay, repeat:Infinity, ease:"easeInOut", delay:o.delay }} />
        ))}
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex:2 }}>
        {SPARKS.map((s,i) => (
          <motion.div key={i} style={{ position:"absolute", bottom:-10, left:`${s.x}%`, width:s.size, height:s.size, borderRadius:"50%", background:"rgba(200,16,46,0.6)", boxShadow:"0 0 6px 2px rgba(200,16,46,0.25)", pointerEvents:"none" }}
            animate={{ y:[0,-700], opacity:[0,0.75,0], scale:[1,0.3] }}
            transition={{ duration:s.dur, delay:s.delay, repeat:Infinity, ease:"easeOut" }} />
        ))}
        {SHOOTING_STARS.map((s,i) => (
          <motion.div key={i} style={{ position:"absolute", top:s.top, left:"-5%", width:100, height:1.5, borderRadius:99, background:"linear-gradient(90deg, transparent, rgba(200,16,46,0.65), rgba(255,255,255,0.4), transparent)", pointerEvents:"none" }}
            animate={{ x:["0vw","115vw"], opacity:[0,1,1,0] }}
            transition={{ duration:s.dur, delay:s.delay, repeat:Infinity, repeatDelay:4, ease:"easeInOut" }} />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")` }} />

      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize:"60px 60px" }} />

      <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <motion.div animate={{ rotate:360 }} transition={{ duration:80, repeat:Infinity, ease:"linear" }}>
          <svg width="520" height="520" viewBox="0 0 520 520" fill="none" opacity="0.07">
            <circle cx="260" cy="260" r="250" stroke="white" strokeWidth="1"/>
            <circle cx="260" cy="260" r="180" stroke="white" strokeWidth="0.5"/>
            <circle cx="260" cy="260" r="110" stroke="white" strokeWidth="1"/>
            <circle cx="260" cy="260" r="40"  stroke="white" strokeWidth="2"/>
            <line x1="10" y1="260" x2="510" y2="260" stroke="white" strokeWidth="0.5"/>
            <line x1="260" y1="10" x2="260" y2="510" stroke="white" strokeWidth="0.5"/>
            <line x1="82" y1="82" x2="438" y2="438" stroke="white" strokeWidth="0.5"/>
            <line x1="438" y1="82" x2="82" y2="438" stroke="white" strokeWidth="0.5"/>
            <circle cx="260" cy="10"  r="4" fill="white"/>
            <circle cx="260" cy="510" r="4" fill="white"/>
            <circle cx="10"  cy="260" r="4" fill="white"/>
            <circle cx="510" cy="260" r="4" fill="white"/>
          </svg>
        </motion.div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SHARED PRIMITIVES
// ══════════════════════════════════════════════════════════════════════════════

function EyebrowBadge({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
      style={{ color: dark ? "#f87171" : "var(--red, #c8102e)", background: dark ? "rgba(200,16,46,0.12)" : "rgba(200,16,46,0.05)", borderColor: dark ? "rgba(200,16,46,0.32)" : "rgba(200,16,46,0.18)" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background: dark ? "#f87171" : "var(--red, #c8102e)", display:"inline-block" }} />
      {label}
    </span>
  );
}

function RedInkButton({ href, label, onClick }: { href?: string; label: string; onClick?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [magnet, setMagnet] = useState({ x:0, y:0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    setMagnet({ x:(e.clientX-(rect.left+rect.width/2))*0.22, y:(e.clientY-(rect.top+rect.height/2))*0.22 });
  }, []);
  const handleMouseLeave = useCallback(() => { setMagnet({ x:0, y:0 }); setHovered(false); }, []);

  const baseStyle: React.CSSProperties = {
    display:"inline-flex", alignItems:"center", gap:10, padding:"13px 28px",
    borderRadius:100, border:"1.5px solid rgba(180,30,30,0.3)", background:"transparent",
    color:"#18140e", textDecoration:"none", fontFamily:"monospace", fontSize:"0.66rem",
    fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", cursor:"pointer",
    position:"relative", overflow:"hidden",
  };
  const inner = (
    <>
      <motion.span aria-hidden animate={{ scaleX:hovered?1:0 }} transition={{ duration:0.35, ease:EASE_FILL }}
        style={{ position:"absolute", inset:0, background:"#b41e1e", transformOrigin:"left", borderRadius:100, zIndex:0 }} />
      <motion.span animate={{ color:hovered?"#ffffff":"#18140e" }} transition={{ duration:0.28 }} style={{ position:"relative", zIndex:1 }}>{label}</motion.span>
      <motion.span animate={{ x:hovered?3:0, color:hovered?"#ffffff":"#18140e" }} transition={{ duration:0.25 }} style={{ position:"relative", zIndex:1, fontSize:"0.85rem" }}>→</motion.span>
    </>
  );
  if (href) return (
    <motion.a ref={ref as React.RefObject<HTMLAnchorElement>} href={href}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={()=>setHovered(true)}
      animate={{ x:magnet.x, y:magnet.y }} transition={{ type:"spring", stiffness:300, damping:22 }}
      whileHover={{ scale:1.04 }} style={baseStyle}>{inner}</motion.a>
  );
  return (
    <motion.button ref={ref as React.RefObject<HTMLButtonElement>} onClick={onClick}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={()=>setHovered(true)}
      animate={{ x:magnet.x, y:magnet.y }} transition={{ type:"spring", stiffness:300, damping:22 }}
      whileHover={{ scale:1.04 }} style={baseStyle}>{inner}</motion.button>
  );
}

function PrimaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.button onClick={onClick} whileHover={{ y:-1 }} whileTap={{ scale:0.98 }} transition={{ type:"tween", duration:0.18 }}
      style={{ background:"var(--red, #c8102e)", color:"white", border:"1.5px solid var(--red, #c8102e)", padding:"10px 22px", borderRadius:8, fontSize:"0.85rem", fontWeight:700, cursor:"pointer", letterSpacing:"0.01em", boxShadow:"0 4px 18px rgba(200,16,46,0.22)" }}>
      {children}
    </motion.button>
  );
}

function GhostBtn({ children, onClick, dark=false }: { children: React.ReactNode; onClick?: () => void; dark?: boolean }) {
  return (
    <motion.button onClick={onClick} whileHover={{ y:-1 }} whileTap={{ scale:0.98 }} transition={{ type:"tween", duration:0.18 }}
      style={{ background:"transparent", color: dark ? "rgba(255,255,255,0.8)" : "#444", border: dark ? "1px solid rgba(255,255,255,0.15)" : "1.5px solid rgba(0,0,0,0.14)", padding:"10px 22px", borderRadius:8, fontSize:"0.85rem", fontWeight:600, cursor:"pointer", transition:"border-color 0.2s, color 0.2s" }}
      onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = dark ? "#fff" : "var(--red, #c8102e)"; b.style.borderColor = dark ? "rgba(255,255,255,0.4)" : "var(--red, #c8102e)"; }}
      onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = dark ? "rgba(255,255,255,0.8)" : "#444"; b.style.borderColor = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.14)"; }}>
      {children}
    </motion.button>
  );
}

function SectionHeading({ eyebrow, pre, accent, sub }: { eyebrow:string; pre:string; accent:string; sub?:string }) {
  const v = { hidden:{ opacity:0, y:18 }, visible:(d=0)=>({ opacity:1, y:0, transition:{ duration:0.55, ease:EASE, delay:d } }) };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }}
      variants={{ visible:{ transition:{ staggerChildren:0.07 } } }} className="text-center mb-14">
      <motion.div variants={v} custom={0} className="flex justify-center mb-6"><EyebrowBadge label={eyebrow} /></motion.div>
      <motion.h2 variants={v} custom={0.05} className="font-bold leading-[1.14]"
        style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"clamp(1.8rem, 3.5vw, 2.6rem)", color:"#18140e", letterSpacing:"-0.022em", marginBottom:sub?16:0 }}>
        {pre} <em style={{ color:"var(--red, #c8102e)", fontStyle:"italic" }}>{accent}</em>
      </motion.h2>
      {sub && <motion.p variants={v} custom={0.1} style={{ fontSize:"0.96rem", color:"#5c5750", maxWidth:520, margin:"0 auto", lineHeight:1.82 }}>{sub}</motion.p>}
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5L6.5 12L13 4.5" stroke="var(--red, #c8102e)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ isOpen }: { isOpen: boolean }) {
  const col = isOpen ? "var(--red, #c8102e)" : "rgba(0,0,0,0.3)";
  return (
    <div style={{ position:"relative", width:16, height:16, marginTop:4, flexShrink:0 }}>
      <motion.span style={{ position:"absolute", top:"50%", left:0, width:"100%", height:1.5, marginTop:-0.75, borderRadius:2, background:col, transition:"background 0.2s ease" }} animate={{ rotate:isOpen?45:0 }} transition={{ duration:0.26, ease:E }} />
      <motion.span style={{ position:"absolute", left:"50%", top:0, width:1.5, height:"100%", marginLeft:-0.75, borderRadius:2, background:col, transition:"background 0.2s ease" }} animate={{ rotate:isOpen?45:0, opacity:isOpen?0:1 }} transition={{ duration:0.22, ease:E }} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 1.  H E R O — dark, matches HeroSection.tsx
// ══════════════════════════════════════════════════════════════════════════════

function PricingHero({ onOpenForm }: { onOpenForm: () => void }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden" style={{ background:"#08090c" }}>
      <HeroBg bgY={bgY} />

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-5 py-28" style={{ zIndex:10 }}>
        <motion.div initial="hidden" animate="visible" variants={{ visible:{ transition:{ staggerChildren:0.09 } } }} className="max-w-4xl mx-auto">

          <motion.div variants={{ hidden:{ opacity:0, y:-16 }, visible:{ opacity:1, y:0, transition:{ duration:0.5, ease:EASE } } }} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full"
              style={{ background:"rgba(200,16,46,0.12)", border:"1px solid rgba(200,16,46,0.32)", color:"#f87171" }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              Transparent Pricing · No Hidden Fees · Guaranteed Compliant
            </span>
          </motion.div>

          <motion.h1 variants={{ hidden:{ opacity:0, y:24 }, visible:{ opacity:1, y:0, transition:{ duration:0.7, ease:EASE } } }}
            className="font-black text-white leading-[1.04] tracking-tight mb-5"
            style={{ fontSize:"clamp(2.4rem, 6vw, 4.2rem)" }}>
            Professional CDR Writing
            <br />
            <span style={{ color:"#c8102e" }}>at Honest, Fixed Prices.</span>
          </motion.h1>

          <motion.p variants={{ hidden:{ opacity:0, y:16 }, visible:{ opacity:1, y:0, transition:{ duration:0.6, ease:EASE } } }}
            className="text-white/55 leading-relaxed mb-10 mx-auto max-w-2xl"
            style={{ fontSize:"clamp(1rem, 2vw, 1.15rem)" }}>
            From $699 AUD for a complete CDR. Every package includes 3 career episodes, summary statement, CPD, and plagiarism verification — with zero surprise charges.
          </motion.p>

          <motion.div variants={{ hidden:{ opacity:0, y:16 }, visible:{ opacity:1, y:0, transition:{ duration:0.55, ease:EASE } } }}
            className="flex flex-wrap gap-3 justify-center mb-12">
            <button onClick={onOpenForm}
              className="inline-flex items-center gap-2 font-bold text-white rounded-xl px-6 py-3.5 text-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]"
              style={{ background:"linear-gradient(135deg, #c8102e, #8b0015)", boxShadow:"0 4px 24px rgba(200,16,46,0.4), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              Get Free Consultation
            </button>
            <GhostBtn dark onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior:"smooth" })}>
              View All Pricing ↓
            </GhostBtn>
          </motion.div>

          <motion.div variants={{ hidden:{ opacity:0, y:12 }, visible:{ opacity:1, y:0, transition:{ duration:0.6, delay:0.1, ease:EASE } } }}
            className="flex flex-wrap items-center justify-center gap-5">
            {[
              { v:"From $699",  l:"Complete CDR" },
              { v:"550+",       l:"Engineers Helped" },
              { v:"100%",       l:"First-Attempt Success" },
              { v:"7 Days",     l:"Fastest Turnaround" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col items-center px-5 py-3 rounded-xl"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
                <span className="font-black text-white text-xl leading-none mb-1" style={{ letterSpacing:"-0.03em" }}>{s.v}</span>
                <span className="text-xs font-semibold tracking-wider uppercase text-white/40">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background:"linear-gradient(to bottom, transparent, #08090c)" }} />
      <style>{`@keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }`}</style>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 2.  C O M P L E T E   C D R   P A C K A G E S
// ══════════════════════════════════════════════════════════════════════════════

type PackageItem = typeof CDR_PACKAGES[number];

function PackageCard({ pkg, index, onOpenForm }: { pkg: PackageItem; index: number; onOpenForm: () => void }) {
  const [hovered, setHovered] = useState(false);
  const isPopular = pkg.badge === "Most Popular";
  const isPremium = pkg.badge === "Premium";

  const isHighlight = isPopular || isPremium;

  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-40px" }}
      transition={{ duration:0.55, ease:EASE, delay:index*0.07 }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background:"white",
        border: isHighlight ? "1.5px solid rgba(200,16,46,0.32)" : "1px solid rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? isHighlight ? "0 16px 52px rgba(200,16,46,0.16), 0 2px 0 rgba(200,16,46,0.35) inset" : "0 12px 40px rgba(0,0,0,0.10)"
          : isHighlight ? "0 4px 24px rgba(200,16,46,0.09)" : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition:"box-shadow 0.32s ease, transform 0.32s ease",
      }}>
      {pkg.badge && (
        <div className="text-center py-2 text-[0.62rem] font-black tracking-[0.18em] uppercase"
          style={{ background: isPremium ? "#18140e" : "var(--red, #c8102e)", color:"#fff" }}>
          {pkg.badge}
        </div>
      )}
      {/* Left accent bar */}
      <div style={{ position:"absolute", left:0, top:pkg.badge?32:0, bottom:0, width:2, background: isHighlight?"var(--red, #c8102e)":"rgba(200,16,46,0.12)", opacity:isHighlight?0.7:0.4, borderRadius:"0 0 0 16px" }} />

      <div className={`flex flex-col flex-1 p-7 pl-9 ${pkg.badge?"pt-6":""}`}>
        {/* Tier + days */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold leading-snug"
            style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"1.1rem", color:"#18140e", letterSpacing:"-0.018em" }}>
            {pkg.tier}
          </h3>
          <span className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0"
            style={{ background:"rgba(200,16,46,0.07)", color:"var(--red, #c8102e)", border:"1px solid rgba(200,16,46,0.14)" }}>
            {pkg.days}
          </span>
        </div>
        <p className="mb-5" style={{ fontSize:"0.82rem", color:"#6a6560", lineHeight:1.62 }}>{pkg.tagline}</p>

        {/* Price */}
        <div className="mb-5 pb-5" style={{ borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
          <div className="font-bold" style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"clamp(1.7rem, 2.8vw, 2.1rem)", color:"#18140e", letterSpacing:"-0.025em", lineHeight:1 }}>
            {pkg.price}
            <span style={{ fontSize:"0.75rem", color:"#aaa", fontWeight:500, marginLeft:6 }}>AUD</span>
          </div>
          <div style={{ fontSize:"0.7rem", color:"#aaa", fontWeight:500, letterSpacing:"0.05em", textTransform:"uppercase" as const, marginTop:4 }}>one-time, all-inclusive</div>
        </div>

        {/* Inclusions */}
        <ul className="space-y-2.5 mb-6 flex-1">
          {pkg.inclusions.map((inc) => (
            <li key={inc} className="flex items-start gap-2.5">
              <CheckIcon />
              <span style={{ fontSize:"0.85rem", color:"#5c5750", lineHeight:1.65 }}>{inc}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button onClick={onOpenForm} whileHover={{ y:-1 }} whileTap={{ scale:0.98 }} transition={{ type:"tween", duration:0.18 }}
          className="w-full rounded-xl py-3 text-sm font-bold"
          style={isHighlight
            ? { background:"var(--red, #c8102e)", color:"#fff", border:"1.5px solid var(--red, #c8102e)", boxShadow:"0 4px 16px rgba(200,16,46,0.26)", cursor:"pointer" }
            : { background:"transparent", color:"#444", border:"1.5px solid rgba(0,0,0,0.14)", cursor:"pointer", transition:"border-color 0.2s, color 0.2s" }}
          onMouseEnter={(e)=>{ if(!isHighlight){ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor="var(--red, #c8102e)"; b.style.color="var(--red, #c8102e)"; } }}
          onMouseLeave={(e)=>{ if(!isHighlight){ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor="rgba(0,0,0,0.14)"; b.style.color="#444"; } }}>
          Get Started →
        </motion.button>
      </div>
    </motion.div>
  );
}

function CompleteCDRSection({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section id="pricing" className="relative py-24 px-6" style={{ background:"white" }}>
      <div aria-hidden style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 60% 35% at 50% 0%, rgba(200,16,46,0.04) 0%, transparent 100%)", pointerEvents:"none" }} />
      <div className="relative max-w-7xl mx-auto md:px-8">
        <SectionHeading eyebrow="Complete CDR Writing" pre="Full CDR packages —" accent="choose your timeline."
          sub="Includes 3 Career Episodes, Summary Statement, and CPD. All-in. No add-ons." />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {CDR_PACKAGES.map((pkg,i) => <PackageCard key={pkg.id} pkg={pkg} index={i} onOpenForm={onOpenForm} />)}
        </div>
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.4 }}
          className="text-center mt-7" style={{ fontSize:"0.75rem", color:"#bbb", lineHeight:1.6 }}>
          All prices in Australian Dollars (AUD) · 50% deposit on commencement, balance on delivery
        </motion.p>
      </div>
    </section>
  );
}

type ReportItem = typeof REPORT_PACKAGES[number];

function ReportCard({
  pkg,
  index,
  onOpenForm,
}: {
  pkg: ReportItem;
  index: number;
  onOpenForm: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const isHighlight = pkg.badge === "Most Popular";
  const isFastest = pkg.badge === "Fastest";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "white",
        border: isHighlight
          ? "1.5px solid rgba(200,16,46,0.32)"
          : "1px solid rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? isHighlight
            ? "0 16px 52px rgba(200,16,46,0.16)"
            : "0 12px 40px rgba(0,0,0,0.10)"
          : isHighlight
          ? "0 4px 24px rgba(200,16,46,0.09)"
          : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "box-shadow 0.32s ease, transform 0.32s ease",
      }}
    >
      {pkg.badge && (
        <div
          className="text-center py-2 text-[0.62rem] font-black tracking-[0.18em] uppercase"
          style={{
            background:
              isFastest ? "#18140e" : "var(--red, #c8102e)",
            color: "#fff",
          }}
        >
          {pkg.badge}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          top: pkg.badge ? 32 : 0,
          bottom: 0,
          width: 2,
          background: isHighlight
            ? "var(--red, #c8102e)"
            : "rgba(200,16,46,0.12)",
          opacity: isHighlight ? 0.7 : 0.4,
        }}
      />

      <div className={`flex flex-col flex-1 p-7 pl-9 ${pkg.badge ? "pt-6" : ""}`}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-bold leading-snug"
            style={{
              fontFamily: "var(--font-serif, 'Georgia', serif)",
              fontSize: "1.1rem",
              color: "#18140e",
            }}
          >
            {pkg.tier}
          </h3>
          <span
            className="text-xs font-bold px-2 py-1 rounded-lg"
            style={{
              background: "rgba(200,16,46,0.07)",
              color: "var(--red, #c8102e)",
              border: "1px solid rgba(200,16,46,0.14)",
            }}
          >
            {pkg.days}
          </span>
        </div>

        <p className="mb-5" style={{ fontSize: "0.82rem", color: "#6a6560" }}>
          {pkg.tagline}
        </p>

        <div className="mb-5 pb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <div
            className="font-bold"
            style={{
              fontFamily: "var(--font-serif, 'Georgia', serif)",
              fontSize: "clamp(1.7rem, 2.8vw, 2.1rem)",
              color: "#18140e",
            }}
          >
            {pkg.price}
            <span style={{ fontSize: "0.75rem", color: "#aaa", marginLeft: 6 }}>
              AUD
            </span>
          </div>
        </div>

        <ul className="space-y-2.5 mb-6 flex-1">
          {pkg.inclusions.map((inc) => (
            <li key={inc} className="flex items-start gap-2.5">
              <CheckIcon />
              <span style={{ fontSize: "0.85rem", color: "#5c5750" }}>
                {inc}
              </span>
            </li>
          ))}
        </ul>

        <motion.button
          onClick={onOpenForm}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-xl py-3 text-sm font-bold"
          style={{
            background: isHighlight
              ? "var(--red, #c8102e)"
              : "transparent",
            color: isHighlight ? "#fff" : "#444",
            border: isHighlight
              ? "1.5px solid var(--red, #c8102e)"
              : "1.5px solid rgba(0,0,0,0.14)",
            cursor: "pointer",
          }}
        >
          Get Started →
        </motion.button>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 3.  C D R   R E P O R T   W R I T I N G  (3 CE only)
// ══════════════════════════════════════════════════════════════════════════════

function ReportSection({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section
      className="relative py-24 px-6"
      style={{ background: "#f9f8f6" }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(200,16,46,0.04) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-7xl mx-auto md:px-8">
        <SectionHeading
          eyebrow="CDR Report Writing"
          pre="Three career episodes —"
          accent="no SS or CPD."
          sub="Already have your Summary Statement? Just need the career episodes written? These packages are built for you."
        />

        {/* ✅ CLEAN MAP — NO HOOKS INSIDE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REPORT_PACKAGES.map((pkg, i) => (
            <ReportCard
              key={pkg.id}
              pkg={pkg}
              index={i}
              onOpenForm={onOpenForm}
            />
          ))}
        </div>

        {/* Individual services callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="mt-10 rounded-2xl p-6 md:p-8"
          style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}
        >
          <p
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ color: "var(--red, #c8102e)", opacity: 0.7 }}
          >
            Individual Components
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                  <th
                    className="text-left pb-3 font-bold"
                    style={{
                      color: "#18140e",
                      fontFamily: "var(--font-serif, 'Georgia', serif)",
                      fontSize: "0.85rem",
                    }}
                  >
                    Service
                  </th>
                  {["30 Days", "15 Days", "10 Days"].map((h) => (
                    <th
                      key={h}
                      className="text-center pb-3 font-bold px-4"
                      style={{
                        color: "#aaa",
                        fontSize: "0.72rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {INDIVIDUAL_SERVICES.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <td
                      className="py-3 font-semibold"
                      style={{ color: "#5c5750" }}
                    >
                      {row.service}
                    </td>

                    {[row["30d"], row["15d"], row["10d"]].map(
                      (value, ci) => (
                        <td
                          key={ci}
                          className="py-3 text-center px-4 font-bold"
                          style={{
                            color:
                              value === "—"
                                ? "#ccc"
                                : "var(--red, #c8102e)",
                            fontSize: "0.92rem",
                          }}
                        >
                          {value}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// ══════════════════════════════════════════════════════════════════════════════
// 4.  R E V I E W  +  O T H E R   S E R V I C E S
// ══════════════════════════════════════════════════════════════════════════════

function ReviewAndOtherServices({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section className="relative py-24 px-6" style={{ background:"white" }}>
      <div aria-hidden style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 50% 30% at 50% 0%, rgba(200,16,46,0.035) 0%, transparent 80%)", pointerEvents:"none" }} />
      <div className="relative max-w-7xl mx-auto md:px-8">
        <SectionHeading eyebrow="Additional Services" pre="Review, editing &" accent="other support."
          sub="Already have a CDR draft? We offer expert review, plagiarism removal, and standalone document services." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* CDR Review table */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.55, ease:EASE }}
            className="rounded-2xl overflow-hidden" style={{ border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
            <div className="px-6 py-5" style={{ background:"#f9f8f6", borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:"rgba(200,16,46,0.08)", border:"1px solid rgba(200,16,46,0.15)" }}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="var(--red, #c8102e)" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="font-bold" style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"1rem", color:"#18140e" }}>CDR Review Services</h3>
              </div>
            </div>
            <div className="overflow-x-auto" style={{ background:"white" }}>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr style={{ borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
                    <th className="text-left px-6 py-3.5 font-bold" style={{ color:"#aaa", fontSize:"0.7rem", letterSpacing:"0.06em", textTransform:"uppercase" as const }}>Service</th>
                    {["15 Days","10 Days","7 Days"].map((h) => (
                      <th key={h} className="text-center px-4 py-3.5 font-bold" style={{ color:"#aaa", fontSize:"0.7rem", letterSpacing:"0.06em", textTransform:"uppercase" as const }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REVIEW_SERVICES.map((row, i) => (
                    <motion.tr key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:i*0.06 }}
                      style={{ borderBottom:"1px solid rgba(0,0,0,0.05)", background: i%2===0 ? "#fafaf9" : "white" }}>
                      <td className="px-6 py-4 font-semibold" style={{ color:"#5c5750", fontSize:"0.85rem" }}>{row.service}</td>
                      {[row["15d"], row["10d"], row["7d"]].map((v, ci) => (
                        <td key={ci} className="px-4 py-4 text-center font-bold" style={{ color:"var(--red, #c8102e)", fontSize:"0.88rem" }}>{v}</td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Other services + CTA */}
          <div className="flex flex-col gap-5">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.55, ease:EASE, delay:0.08 }}
              className="rounded-2xl overflow-hidden flex-1" style={{ border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
              <div className="px-6 py-5" style={{ background:"#f9f8f6", borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:"rgba(200,16,46,0.08)", border:"1px solid rgba(200,16,46,0.15)" }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="var(--red, #c8102e)" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold" style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"1rem", color:"#18140e" }}>Other Services (Flat Fee)</h3>
                </div>
              </div>
              <div style={{ background:"white" }}>
                {OTHER_SERVICES.map((row, i) => (
                  <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:i*0.05 }}
                    className="flex items-center justify-between px-6 py-3.5"
                    style={{ borderBottom: i < OTHER_SERVICES.length-1 ? "1px solid rgba(0,0,0,0.05)" : "none", background: i%2===0 ? "#fafaf9" : "white" }}>
                    <span style={{ fontSize:"0.85rem", color:"#5c5750", fontWeight:500 }}>{row.service}</span>
                    <span className="font-bold" style={{ color:"var(--red, #c8102e)", fontSize:"0.9rem" }}>{row.price} <span style={{ color:"#aaa", fontSize:"0.7rem", fontWeight:500 }}>AUD</span></span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quote CTA card */}
            <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, ease:EASE, delay:0.14 }}
              className="rounded-2xl p-6" style={{ background:"rgba(200,16,46,0.04)", border:"1.5px solid rgba(200,16,46,0.16)" }}>
              <p className="font-semibold mb-1" style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"1rem", color:"#18140e" }}>Not sure which service you need?</p>
              <p className="mb-4" style={{ fontSize:"0.84rem", color:"#6a6560", lineHeight:1.7 }}>Send us your details for a free assessment. We&apos;ll recommend the exact package that fits your situation.</p>
              <PrimaryBtn onClick={onOpenForm}>Get Free Recommendation</PrimaryBtn>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 5.  P R O C E S S
// ══════════════════════════════════════════════════════════════════════════════

function ProcessOverview() {
  return (
    <section className="relative py-24 px-6" style={{ background:"#f9f8f6" }}>
      <div aria-hidden style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 50% 40% at 50% 100%, rgba(200,16,46,0.035) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div className="relative max-w-7xl mx-auto md:px-8">
        <SectionHeading eyebrow="Process" pre="How it" accent="works." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px hidden lg:block"
            style={{ background:"linear-gradient(to right, transparent, rgba(200,16,46,0.18), rgba(200,16,46,0.18), transparent)" }} />
          {PROCESS_STEPS.map((step,i) => (
            <motion.div key={step.n} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.5, ease:EASE, delay:i*0.1 }} className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 relative z-10"
                style={{ background:"rgba(200,16,46,0.05)", border:"1.5px solid rgba(200,16,46,0.18)", color:"var(--red, #c8102e)", fontFamily:"var(--font-serif, 'Georgia', serif)", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.06em" }}>
                {step.n}
              </div>
              <h3 className="font-semibold mb-2 leading-snug" style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"1rem", color:"#18140e", letterSpacing:"-0.01em" }}>{step.title}</h3>
              <p style={{ fontSize:"0.855rem", color:"#6a6560", lineHeight:1.78 }}>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 6.  G U A R A N T E E
// ══════════════════════════════════════════════════════════════════════════════

function GuaranteeSection() {
  const v = { hidden:{ opacity:0, y:16 }, visible:(d=0)=>({ opacity:1, y:0, transition:{ duration:0.55, ease:EASE, delay:d } }) };
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background:"white" }}>
      <div aria-hidden style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,16,46,0.05) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }}
          variants={{ visible:{ transition:{ staggerChildren:0.09 } } }}>
          <motion.div variants={v} custom={0} className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background:"rgba(200,16,46,0.06)", border:"1.5px solid rgba(200,16,46,0.18)" }}>
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="var(--red, #c8102e)" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
          </motion.div>
          <motion.div variants={v} custom={0.05} className="flex justify-center mb-7"><EyebrowBadge label="Our Guarantee" /></motion.div>
          <motion.h2 variants={v} custom={0.1} className="font-bold leading-[1.18] mb-6"
            style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"clamp(1.9rem, 4vw, 2.9rem)", color:"#18140e", letterSpacing:"-0.022em" }}>
            100% positive outcome.{" "}
            <em style={{ color:"var(--red, #c8102e)", fontStyle:"italic" }}>Or we rewrite it free.</em>
          </motion.h2>
          <motion.p variants={v} custom={0.14} className="leading-[1.85] mb-10 mx-auto" style={{ fontSize:"0.96rem", color:"#5c5750", maxWidth:500 }}>
            We are so confident in our work that we have never needed to talk about refunds. If Engineers Australia requests revisions, we handle it at no extra cost within our guarantee period.
          </motion.p>
          <motion.div variants={v} custom={0.18} className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {["Zero Plagiarism","100% First-Attempt Record","EA / ACS / VETASSESS Compliant","No Refund Needed — Ever"].map((g) => (
              <div key={g} className="flex items-center gap-2">
                <span style={{ width:5, height:5, borderRadius:"50%", background:"var(--red, #c8102e)", display:"inline-block", flexShrink:0 }} />
                <span style={{ fontSize:"0.85rem", color:"#5c5750", fontWeight:600 }}>{g}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 7.  F A Q — exact FAQSection.tsx pattern
// ══════════════════════════════════════════════════════════════════════════════

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number|null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number|null>(null);
  const toggle = (i:number) => setOpenIndex((prev) => (prev===i ? null : i));

  return (
    <section className="relative py-32 px-6" style={{ background:"#f9f8f6" }}>
      <div aria-hidden style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 70% 40% at 50% 0%, rgba(200,16,46,0.04) 0%, transparent 100%)", pointerEvents:"none" }} />
      <div className="relative max-w-2xl mx-auto">
        <motion.div className="mb-24" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, ease:E }}>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full border"
            style={{ color:"var(--red, #c8102e)", background:"rgba(200,16,46,0.05)", borderColor:"rgba(200,16,46,0.18)" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"var(--red, #c8102e)", display:"inline-block" }} />
            Common Questions
          </span>
          <h2 style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"clamp(2rem, 4vw, 2.75rem)", fontWeight:700, letterSpacing:"-0.03em", color:"#18140e", lineHeight:1.1, marginBottom:14 }}>
            Frequently Asked{" "}
            <span style={{ color:"var(--red, #c8102e)", opacity:0.85 }}>Questions</span>
          </h2>
          <p style={{ fontSize:"0.92rem", color:"#8a847c", maxWidth:360, lineHeight:1.8 }}>
            Real answers to the most common questions about CDR pricing, process, and guarantees.
          </p>
        </motion.div>

        <div>
          {FAQ_ITEMS.map((faq,i) => {
            const isOpen    = openIndex===i;
            const isHovered = hoveredIndex===i;
            return (
              <motion.div key={i} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-32px" }}
                transition={{ duration:0.5, ease:E, delay:i*0.05 }}
                style={{ position:"relative", borderBottom:"1px solid rgba(0,0,0,0.07)" }}
                onMouseEnter={()=>setHoveredIndex(i)} onMouseLeave={()=>setHoveredIndex(null)}>
                <motion.div aria-hidden
                  style={{ position:"absolute", left:-20, top:0, width:2, borderRadius:2, background:"var(--red, #c8102e)", transformOrigin:"top", height:"100%" }}
                  animate={{ scaleY:isOpen?1:0, opacity:isOpen?0.6:0 }} transition={{ duration:0.35, ease:E }} />
                <motion.div aria-hidden
                  style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 100% at 5% 50%, rgba(200,16,46,0.035) 0%, transparent 70%)", pointerEvents:"none", borderRadius:4 }}
                  animate={{ opacity:isOpen?1:0 }} transition={{ duration:0.3, ease:E }} />
                <button onClick={()=>toggle(i)} aria-expanded={isOpen}
                  style={{ width:"100%", textAlign:"left", padding:"1.55rem 0", display:"flex", alignItems:"flex-start", gap:"1.2rem", background:"none", border:"none", cursor:"pointer", position:"relative" }}>
                  <motion.span animate={{ color:isOpen?"var(--red, #c8102e)":"rgba(0,0,0,0.18)" }} transition={{ duration:0.25, ease:E }}
                    style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.1em", marginTop:4, minWidth:20, userSelect:"none" }}>
                    {String(i+1).padStart(2,"0")}
                  </motion.span>
                  <motion.span animate={{ x:isHovered||isOpen?3:0 }} transition={{ duration:0.22, ease:E }}
                    style={{ flex:1, fontWeight:600, fontSize:"0.97rem", lineHeight:1.55, letterSpacing:"-0.012em", color:isOpen?"#0e0b08":"#2a2620", transition:"color 0.2s ease" }}>
                    {faq.q}
                  </motion.span>
                  <PlusIcon isOpen={isOpen} />
                </button>
                <motion.div style={{ overflow:"hidden" }} animate={{ height:isOpen?"auto":0, opacity:isOpen?1:0 }} initial={false}
                  transition={{ height:{ duration:0.38, ease:E }, opacity:{ duration:isOpen?0.28:0.18, ease:E, delay:isOpen?0.05:0 } }}>
                  <div style={{ paddingBottom:"1.6rem", paddingLeft:32, paddingRight:4 }}>
                    <motion.div style={{ height:1, background:"linear-gradient(to right, rgba(200,16,46,0.3), transparent)", marginBottom:16, transformOrigin:"left center" }}
                      animate={{ scaleX:isOpen?1:0, opacity:isOpen?1:0 }} transition={{ duration:0.4, ease:E, delay:isOpen?0.14:0 }} />
                    <p style={{ fontSize:"0.92rem", color:"#6f6a63", lineHeight:1.82, letterSpacing:"0.005em" }}>{faq.a}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="mt-12 flex items-center gap-8" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.15, ease:E }}>
          <div style={{ flex:1, height:1, background:"linear-gradient(to right, transparent, rgba(0,0,0,0.07))" }} />
          <div className="text-center shrink-0">
            <p style={{ fontSize:"0.82rem", color:"#b0aa9f", marginBottom:14, letterSpacing:"0.03em" }}>Still have questions?</p>
            <RedInkButton href="/contact" label="Contact Our Experts" />
          </div>
          <div style={{ flex:1, height:1, background:"linear-gradient(to left, transparent, rgba(0,0,0,0.07))" }} />
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 8.  F I N A L   C T A
// ══════════════════════════════════════════════════════════════════════════════

function FinalCta({ onOpenForm }: { onOpenForm: () => void }) {
  const v = { hidden:{ opacity:0, y:16 }, visible:(d=0)=>({ opacity:1, y:0, transition:{ duration:0.55, ease:EASE, delay:d } }) };
  return (
    <section className="relative py-32 px-6 overflow-hidden" style={{ background:"white" }}>
      <div aria-hidden style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 80% 70% at 50% 50%, rgba(200,16,46,0.055) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }}
          variants={{ visible:{ transition:{ staggerChildren:0.09 } } }}>
          <motion.div variants={v} custom={0} className="flex justify-center mb-7"><EyebrowBadge label="Get Started Today" /></motion.div>
          <motion.h2 variants={v} custom={0.06} className="font-bold leading-[1.18] mb-6"
            style={{ fontFamily:"var(--font-serif, 'Georgia', serif)", fontSize:"clamp(2rem, 4.5vw, 3.2rem)", color:"#18140e", letterSpacing:"-0.025em" }}>
            Your migration assessment starts with{" "}
            <em style={{ color:"var(--red, #c8102e)", fontStyle:"italic" }}>one conversation.</em>
          </motion.h2>
          <motion.p variants={v} custom={0.1} className="leading-[1.85] mb-10 mx-auto" style={{ fontSize:"0.97rem", color:"#5c5750", maxWidth:500 }}>
            Book a free consultation. We&apos;ll confirm the right package, timeline, and pricing for your specific background — before you commit to anything.
          </motion.p>
          <motion.div variants={v} custom={0.14} className="flex flex-wrap gap-3 justify-center mb-8">
            <PrimaryBtn onClick={onOpenForm}>Book Free Consultation</PrimaryBtn>
            <GhostBtn>Email Us Directly</GhostBtn>
          </motion.div>
          <motion.p variants={v} custom={0.2} style={{ fontSize:"0.72rem", color:"#bbb", fontWeight:500, letterSpacing:"0.02em" }}>
            No commitment required · Response within 24 hours · Serving engineers worldwide
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════

export default function PricingPage() {
  const [agentOpen, setAgentOpen] = useState(false);
  const openForm = useCallback(() => setAgentOpen(true), []);

  return (
    <>
      {/* <AnimatePresence>{agentOpen && <AgentForm onClose={() => setAgentOpen(false)} />}</AnimatePresence> */}
      <main style={{ background:"#f9f8f6" }}>
        <PricingHero onOpenForm={openForm} />
        <CompleteCDRSection onOpenForm={openForm} />
        <ReportSection onOpenForm={openForm} />
        <ReviewAndOtherServices onOpenForm={openForm} />
        <ProcessOverview />
        <GuaranteeSection />
        <FaqSection />
        
      </main>
    </>
  );
}