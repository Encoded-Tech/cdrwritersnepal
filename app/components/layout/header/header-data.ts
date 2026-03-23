// ─── Header Data Constants ────────────────────────────────────────────────────

export interface ServiceItem {
  label: string;
  href: string;
  tagline: string;
  description: string;
  icon: string;
  badge?: string;
  highlights: string[];
  accentColor: string;
}

export interface AnzscoCategory {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  href: string;
  assessingBody: string;
  accentColor: string;
}

export interface Occupation {
  code: string;
  title: string;
  category: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  dropdownType?: "services" | "anzsco";
}

export type DropdownType = "services" | "anzsco" | null;

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    label: "CDR Writing (Engineers Australia)",
    href: "/services/ea",
    tagline: "100% Approval Success",
    description: "Professional Competency Demonstration Reports tailored to meet Engineers Australia standards.",
    icon: "📄",
         accentColor: "#10b981",
    highlights: ["Engineers Australia", "100% Success"]
  },
   {
    label: "VETASSESS Assessment",
    href: "/services/vetassess",
    tagline: "Professional Skills",
    description: "End-to-end support for VETASSESS skill assessments across various occupations.",
    icon: "📊",
         accentColor: "#10b981",
    highlights: ["Skills Assessment", "Various Occupations"]
  },
  
  {
    label: "TRA Skill Assessment",
    href: "/services/tra",
    tagline: "Trade Recognition",
    description: "Guidance and documentation support for Trade Recognition Australia assessments.",
    icon: "🛠️",
          accentColor: "#10b981",
    highlights: ["Trade Assessment", "Documentation"]
  },
 
  {
    label: "RPL Report Writing",
    href: "/services/rpl",
    tagline: "Prior Learning",
    description: "High-quality Recognition of Prior Learning reports that clearly showcase your skills and experience.",
    icon: "📝",
           accentColor: "#10b981",
    highlights: ["RPL Reports", "Showcase Skills"]
  },
  {
    label: "ACS Skill Assessment",
    href: "/services/acs",
    tagline: "With/Without RPL",
    description: "Complete assistance for ACS assessments, including RPL for candidates without ICT qualifications.",
    icon: "💻",
         accentColor: "#10b981",
    highlights: ["ICT Assessment", "RPL Included"]
  },
  {
    label: "ANMAC Skill Assessment",
    href: "/services/anmac",
    tagline: "Nursing & Midwifery",
    description: "Comprehensive support for nurses and midwives seeking skill assessment with ANMAC.",
    icon: "⚕️",
           accentColor: "#10b981",
    highlights: []
  },
  {
    label: "AITSL Skill Assessment",
    href: "/services/aitsl",
    tagline: "Teaching Professionals",
    description: "Skill assessment guidance for teachers migrating to Australia through AITSL.",
    icon: "🏫",
         accentColor: "#10b981",
    highlights: []
  },
  {
    label: "CPA / CA ANZ / IPA",
    href: "/services/accounting",
    tagline: "Accounting & Finance",
    description: "Skill assessment support for accountants through CPA, CA ANZ, and IPA.",
    icon: "📈",
          accentColor: "#10b981",
    highlights: []
  },
  {
    label: "AMC Skill Assessment",
    href: "/services/amc",
    tagline: "Medical Practitioners",
    description: "Guidance for medical practitioners seeking assessment through the Australian Medical Council.",
    icon: "🩺",
         accentColor: "#10b981",
    highlights: []
  },
  {
    label: "EOI Application Assistance",
    href: "/services/eoi",
    tagline: "Maximize Selection Chances",
    description: "Expert help in submitting Expression of Interest (EOI) to maximize your chances of selection.",
    icon: "📌",
          accentColor: "#10b981",
    highlights: ["Expression of Interest", "Points Strategy"]
  },
];

export const ANZSCO_CATEGORIES: AnzscoCategory[] = [
  {
    id: "engineers",
    name: "Engineers",
    subtitle: "ANZSCO 2331–2339",
    description: "CDR writing for all engineering disciplines assessed by Engineers Australia",
    icon: "⚙️",
    href: "/anzsco-codes/engineers",
    assessingBody: "Engineers Australia",
        accentColor: "#10b981",
  },
  {
    id: "it",
    name: "IT Professionals",
    subtitle: "ANZSCO 2611–2631",
    description: "ACS RPL reports for software engineers, developers & ICT roles",
    icon: "💻",
    href: "/anzsco-codes/it-professionals",
    assessingBody: "ACS",
       accentColor: "#10b981",
  },
  {
    id: "trades",
    name: "Trades",
    subtitle: "ANZSCO 3111–3999",
    description: "TRA skills assessment for electricians, plumbers & trade workers",
    icon: "🔧",
    href: "/anzsco-codes/trades",
    assessingBody: "TRA",
       accentColor: "#10b981",
  },
  {
    id: "business",
    name: "Business & Management",
    subtitle: "ANZSCO 1111–2299",
    description: "Skills assessment for managers, HR, marketing & business professionals",
    icon: "💼",
    href: "/anzsco-codes/business",
    assessingBody: "VETASSESS",
     accentColor: "#10b981",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    subtitle: "ANZSCO 2511–2544",
    description: "Assessment for nurses, pharmacists, therapists & health professionals",
    icon: "🏥",
    href: "/anzsco-codes/healthcare",
    assessingBody: "AHPRA / ANMAC",
    accentColor: "#10b981",
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    subtitle: "ANZSCO 2211–2242",
    description: "Skills assessment for accountants, auditors & financial analysts",
    icon: "📊",
    href: "/anzsco-codes/finance",
    assessingBody: "CPA / CA / IPA",
       accentColor: "#10b981",
  },
];

export const ALL_OCCUPATIONS: Occupation[] = [
  // Engineers
  { code: "133211", title: "Engineering Manager", category: "engineers" },
  { code: "233111", title: "Chemical Engineer", category: "engineers" },
  { code: "233112", title: "Materials Engineer", category: "engineers" },
  { code: "233211", title: "Civil Engineer", category: "engineers" },
  { code: "233212", title: "Geotechnical Engineer", category: "engineers" },
  { code: "233213", title: "Quantity Surveyor", category: "engineers" },
  { code: "233214", title: "Structural Engineer", category: "engineers" },
  { code: "233215", title: "Transport Engineer", category: "engineers" },
  { code: "233311", title: "Electrical Engineer", category: "engineers" },
  { code: "233411", title: "Electronics Engineer", category: "engineers" },
  { code: "233511", title: "Industrial Engineer", category: "engineers" },
  { code: "233512", title: "Mechanical Engineer", category: "engineers" },
  { code: "233513", title: "Production or Plant Engineer", category: "engineers" },
  { code: "233611", title: "Mining Engineer", category: "engineers" },
  { code: "233612", title: "Petroleum Engineer", category: "engineers" },
  { code: "233911", title: "Aeronautical Engineer", category: "engineers" },
  { code: "233913", title: "Biomedical Engineer", category: "engineers" },
  { code: "233914", title: "Engineering Technologist", category: "engineers" },
  { code: "233915", title: "Environmental Engineer", category: "engineers" },
  { code: "233999", title: "Engineering Professionals nec", category: "engineers" },
  // IT
  { code: "135111", title: "Chief Information Officer", category: "it" },
  { code: "135112", title: "ICT Project Manager", category: "it" },
  { code: "261111", title: "ICT Business Analyst", category: "it" },
  { code: "261112", title: "Systems Analyst", category: "it" },
  { code: "261211", title: "Multimedia Specialist", category: "it" },
  { code: "261212", title: "Web Developer", category: "it" },
  { code: "261311", title: "Analyst Programmer", category: "it" },
  { code: "261312", title: "Developer Programmer", category: "it" },
  { code: "261313", title: "Software Engineer", category: "it" },
  { code: "261314", title: "Software Tester", category: "it" },
  { code: "261399", title: "Software and Applications Programmers nec", category: "it" },
  { code: "262111", title: "Database Administrator", category: "it" },
  { code: "262112", title: "ICT Security Specialist", category: "it" },
  { code: "262113", title: "Systems Administrator", category: "it" },
  { code: "263111", title: "Computer Network & Systems Engineer", category: "it" },
  { code: "263311", title: "Telecommunications Engineer", category: "it" },
  { code: "263312", title: "Telecommunications Network Planner", category: "it" },
  
  // Trades
  { code: "321211", title: "Motor Mechanic", category: "trades" },
  { code: "321212", title: "Diesel Motor Mechanic", category: "trades" },

  { code: "322311", title: "Metal Fabricator", category: "trades" },
  { code: "323211", title: "Fitter (General)", category: "trades" },
  { code: "323214", title: "Metal Machinist", category: "trades" },
  { code: "331111", title: "Bricklayer", category: "trades" },
  { code: "331212", title: "Carpenter", category: "trades" },
  { code: "332211", title: "Painting Trades Worker", category: "trades" },
  { code: "333411", title: "Wall and Floor Tiler", category: "trades" },
  { code: "334111", title: "Plumber (General)", category: "trades" },
  { code: "341111", title: "Electrician (General)", category: "trades" },
  { code: "341112", title: "Electrician (Special Class)", category: "trades" },
  { code: "342111", title: "Airconditioning & Refrigeration Mechanic", category: "trades" },
  { code: "351311", title: "Chef", category: "trades" },
  // Business
  { code: "111111", title: "Chief Executive / Managing Director", category: "business" },
  { code: "132111", title: "Corporate Services Manager", category: "business" },
  { code: "132311", title: "Human Resource Manager", category: "business" },
  { code: "132411", title: "Policy and Planning Manager", category: "business" },
  { code: "224711", title: "Management Consultant", category: "business" },
  { code: "225111", title: "Advertising Specialist", category: "business" },
  { code: "225113", title: "Marketing Specialist", category: "business" },
  { code: "225311", title: "Public Relations Professional", category: "business" },
  // Healthcare
  { code: "251211", title: "Medical Diagnostic Radiographer", category: "healthcare" },
  { code: "251411", title: "Optometrist", category: "healthcare" },
  { code: "252311", title: "Dental Specialist", category: "healthcare" },
  { code: "252411", title: "Occupational Therapist", category: "healthcare" },
  { code: "252511", title: "Physiotherapist", category: "healthcare" },
  { code: "253111", title: "General Practitioner", category: "healthcare" },
  { code: "254111", title: "Midwife", category: "healthcare" },
  { code: "254411", title: "Nurse Practitioner", category: "healthcare" },
  { code: "254412", title: "Registered Nurse (Medical)", category: "healthcare" },
{ code: "254415", title: "Registered Nurse (Critical Care and Emergency)", category: "healthcare" },
  { code: "254421", title: "Registered Nurse (Aged Care)", category: "healthcare" },
  // Finance
  { code: "221111", title: "Accountant (General)", category: "finance" },
  { code: "221112", title: "Management Accountant", category: "finance" },
  { code: "221113", title: "Taxation Accountant", category: "finance" },
  { code: "221213", title: "External Auditor", category: "finance" },
  { code: "221214", title: "Internal Auditor", category: "finance" },
  { code: "222311", title: "Financial Investment Adviser", category: "finance" },
  { code: "224111", title: "Actuary", category: "finance" },
];

export const NAV_LINKS: NavLink[] = [
  { id: "Home",     label: "Home",         href: "/" },
  { id: "About",    label: "About Us",        href: "/about" },
  { id: "services", label: "Our Services",     href: "/services",     dropdownType: "services" },
  { id: "anzsco",   label: "ANZSCO Codes", href: "/anzsco-codes", dropdownType: "anzsco" },
  { id: "pricing",  label: "Pricing",      href: "/pricing" },
  { id: "contact",  label: "Contact Us",      href: "/contact" },
];
