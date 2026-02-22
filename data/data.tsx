import { CdrInfoMap, ExpertLink, FaqItem, ProcessStep, StatItem } from "@/types/frontEnd";


export const CDR_INFO: CdrInfoMap = {
  careerEpisodes: {
    title: "Career Episodes (CE)",
    description:
      "Career Episodes are three detailed written accounts of your engineering experience. Each episode focuses on a specific project, role, or period of your career.",
    points: [
      "Each episode is 1000–2500 words long",
      "Must describe your personal engineering activity",
      "Should highlight problem-solving and technical skills",
    ],
  },
  summaryStatement: {
    title: "Summary Statement (SS)",
    description:
      "The Summary Statement is a critical document that cross-references your Career Episodes with the competency elements defined by Engineers Australia.",
    points: [
      "Maps each competency element to specific paragraphs",
      "Must cover all required competency elements",
      "Demonstrates your breadth of engineering knowledge",
    ],
  },
  cpd: {
    title: "Continuing Professional Development (CPD)",
    description:
      "CPD is a record of your ongoing professional development activities. It shows Engineers Australia your commitment to keeping your skills up to date.",
    points: [
      "List courses, conferences, and workshops attended",
      "Include dates and duration of each activity",
      "Should span the last few years of your career",
    ],
  },
  cv: {
    title: "Curriculum Vitae (CV)",
    description:
      "Your CV provides Engineers Australia with a comprehensive overview of your academic qualifications and professional work history.",
    points: [
      "Include all academic qualifications",
      "List work experience in reverse chronological order",
      "Should include professional memberships and achievements",
    ],
  },
};

export const CDR_INFO_LABELS: Record<keyof CdrInfoMap, string> = {
  careerEpisodes: "3 CE&apos;s (Career Episodes)",
  summaryStatement: "SS (Summary Statement)",
  cpd: "CPD (Continuing Professional Development)",
  cv: "CV (Curriculum Vitae)",
};

export const STATS: StatItem[] = [
  { id: "clients", end: 500, suffix: "+", label: "Clients" },
  { id: "years", end: 4, suffix: "+", label: "Years of Service" },
  { id: "projects", end: 480, suffix: "+", label: "Successful Projects" },
  { id: "outcomes", end: 100, suffix: "%", label: "Positive Outcomes" },
];

export const STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Consultation & Documentation Review",
    description:
      "We offer a free consultation and documentation review to assess your needs and help you prepare.",
    color: "#3b82f6",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Partial Payment",
    description:
      "Once you&apos;re ready to proceed, a partial payment will secure the start of the process.",
    color: "#22c55e",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    step: "03",
    title: "CDR Writing Starts",
    description:
      "We begin drafting your CDR with precision and expertise, ensuring it meets all standards.",
    color: "#f59e0b",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Client Gets the Draft",
    description:
      "Once the draft is ready, we send it to you for review and feedback to ensure complete satisfaction.",
    color: "#a855f7",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Final CDR Delivery",
    description:
      "After any necessary revisions, we deliver the final version of your CDR for submission.",
    color: "#ef4444",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    step: "06",
    title: "Final Payment",
    description:
      "After receiving the final CDR, complete the final payment and successfully submit to Engineers Australia.",
    color: "#14b8a6",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "How to Write a Successful CDR?",
    answer:
      "Writing a successful CDR requires you to follow Engineers Australia&apos;s guidelines carefully. Focus on three detailed career episodes, a well-structured summary statement, and a CPD list to demonstrate your engineering competencies.",
  },
  {
    question: "What is CDR Pathway?",
    answer:
      "The CDR Pathway allows engineers to migrate to Australia by demonstrating their skills through a CDR submission. It helps assess their qualifications and experience against Australian standards.",
  },
  {
    question: "What is CDR in Skill Assessment?",
    answer:
      "The CDR in Skill Assessment is used by Engineers Australia to evaluate your engineering qualifications and competencies against Australian standards.",
  },
  {
    question: "What to do if your CDR gets rejected?",
    answer:
      "If your CDR gets rejected, review the feedback from Engineers Australia, update your CDR accordingly, and make sure your career episodes align with the competency requirements before resubmitting.",
  },
  {
    question: "What are the possible outcomes from EA?",
    answer:
      "The outcomes from Engineers Australia can include a successful skill assessment, additional information requests, or rejection if the CDR does not meet the competency standards.",
  },
];

export const EXPERT_LINKS: ExpertLink[] = [
  { href: "/engineers-australia-guidelines", label: "Engineers Australia's Guidelines" },
  { href: "/ai-and-plagiarism-free-content", label: "AI and Plagiarism-Free Content" },
  {
    href: "/demonstrating-engineering-problem-solving",
    label: "Demonstrating Engineering Problem-Solving",
  },
  { href: "/technical-detailing", label: "Technical Detailing" },
];