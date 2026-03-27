/* ─── constants.ts ─────────────────────────────────────────────────────
   All shared data: country list, phrases, form steps, engineering fields.
   Import from here in any sub-component that needs them.
──────────────────────────────────────────────────────────────────────── */

export const COUNTRIES = [
  { code: "AU", name: "Australia",     flag: "🇦🇺", dial: "+61",  ph: "4XX XXX XXX"     },
  { code: "NP", name: "Nepal",         flag: "🇳🇵", dial: "+977", ph: "98XXXXXXXX"      },
  { code: "IN", name: "India",         flag: "🇮🇳", dial: "+91",  ph: "98765 43210"     },
  { code: "GB", name: "United Kingdom",flag: "🇬🇧", dial: "+44",  ph: "7911 123456"     },
  { code: "US", name: "United States", flag: "🇺🇸", dial: "+1",   ph: "(555) 000-0000"  },
  { code: "CA", name: "Canada",        flag: "🇨🇦", dial: "+1",   ph: "(416) 000-0000"  },
  { code: "NZ", name: "New Zealand",   flag: "🇳🇿", dial: "+64",  ph: "21 123 4567"     },
  { code: "SG", name: "Singapore",     flag: "🇸🇬", dial: "+65",  ph: "9123 4567"       },
  { code: "AE", name: "UAE",           flag: "🇦🇪", dial: "+971", ph: "50 123 4567"     },
  { code: "MY", name: "Malaysia",      flag: "🇲🇾", dial: "+60",  ph: "12-345 6789"     },
  { code: "PK", name: "Pakistan",      flag: "🇵🇰", dial: "+92",  ph: "300 1234567"     },
  { code: "BD", name: "Bangladesh",    flag: "🇧🇩", dial: "+880", ph: "171 234 5678"    },
  { code: "LK", name: "Sri Lanka",     flag: "🇱🇰", dial: "+94",  ph: "71 234 5678"     },
  { code: "DE", name: "Germany",       flag: "🇩🇪", dial: "+49",  ph: "151 12345678"    },
  { code: "FR", name: "France",        flag: "🇫🇷", dial: "+33",  ph: "6 12 34 56 78"   },
  { code: "SA", name: "Saudi Arabia",  flag: "🇸🇦", dial: "+966", ph: "50 123 4567"     },
  { code: "QA", name: "Qatar",         flag: "🇶🇦", dial: "+974", ph: "5512 3456"       },
  { code: "ZA", name: "South Africa",  flag: "🇿🇦", dial: "+27",  ph: "71 123 4567"     },
];

export type Country = (typeof COUNTRIES)[number];

export const PHRASES = [
  "CDR Writing for Engineers Australia",
  "ACS (RPL & Non-RPL) Assistance",
  "VETASSESS | TRA | AMC Support",
  "ANMAC | AITSL | CPA / CA ANZ support",
  "Complete Skill Assessment Solutions",
  
];
export const ENG_FIELDS = [
  "Civil Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Chemical Engineering",
  "Structural Engineering",
  "Mechanical & Mechatronic Engineering",
  "Other Engineering Field",
];

export const OTHER_FIELD_VALUE = "Other Engineering Field";

export const AGENT_STEPS = [
  { id: "name", label: "What's your full name?", type: "text", ph: "e.g. Jon Snow" },

  { id: "email", label: "Your best email address?", type: "email", ph: "you@example.com" },

  { id: "phone", label: "A phone number we can reach you on?", type: "phone", ph: "" },

  {
    id: "assessmentType",
    label: "Which skill assessment are you applying for?",
    type: "select",
    ph: ""
  },

  {
    id: "background",
    label: "Tell us about your background (education, experience, etc.)",
    type: "textarea",
    ph: "Your degree, work experience, target country..."
  },
] as const;

export const ASSESSMENT_TYPES = [
  "CDR (Engineers Australia)",
  "ACS (IT Professionals)",
  "VETASSESS",
  "TRA (Trades)",
  "ANMAC (Nursing)",
  "AITSL (Teaching)",
  "CPA / CA ANZ",
  "Not Sure / Need Guidance",
];

export type AgentStep = (typeof AGENT_STEPS)[number];

export const SPARKS = [
  { x: 4,  delay: 0,   dur: 9,  size: 7 },
  { x: 14, delay: 3.2, dur: 11, size: 5 },
  { x: 26, delay: 1.5, dur: 8,  size: 9 },
  { x: 40, delay: 4,   dur: 12, size: 6 },
  { x: 57, delay: 2.1, dur: 10, size: 8 },
  { x: 70, delay: 5,   dur: 9,  size: 5 },
  { x: 83, delay: 1.1, dur: 11, size: 7 },
  { x: 94, delay: 3.8, dur: 8,  size: 6 },
];

export const SHOOTING_STARS = [
  { top: "8%",  delay: 0,  dur: 5   },
  { top: "27%", delay: 9,  dur: 6   },
  { top: "52%", delay: 3,  dur: 4.5 },
  { top: "74%", delay: 13, dur: 5.5 },
];

export const TRUST_BADGES = [
  { icon: "✓", label: "CDR Specialists (EA)" },
  { icon: "✓", label: "ACS(with/without RPL) | VETASSESS | TRA" },
  { icon: "✓", label: "ANMAC | AMC | AITSL | CPA / CA ANZ" },
  { icon: "✓", label: "EOI Application Assistance" },
];

export const MARQUEE_ITEMS = [
  { text: "✦ CDR Writing (Engineers Australia)", accent: true },



  { text: "✦ ACS (RPL / Non-RPL)", accent: true },
  { text: "✦ VETASSESS | TRA Assessments", accent: true },
  { text: "✦ ANMAC | AITSL | CPA Support", accent: true },

  { text: "✦ Skilled Migration Assistance", accent: true },
  { text: "✦ EOI Application Support", accent: true },

  { text: "✦ Zero Plagiarism", accent: true },
  { text: "✦ First-Attempt Approval", accent: true },
  { text: "✦ 100% Success Rate From EA", accent: true },
];