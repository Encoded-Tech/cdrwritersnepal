import { ReactNode } from "react";

export interface FormData {
  name: string;
  email: string;
  phone: string;
  engineeringField: string;
  message: string;
}

export interface CdrInfoContent {
  title: string;
  description: string;
  points: string[];
}

export interface CdrInfoMap {
  careerEpisodes: CdrInfoContent;
  summaryStatement: CdrInfoContent;
  cpd: CdrInfoContent;
  cv: CdrInfoContent;
}

export type CdrInfoKey = keyof CdrInfoMap;

export interface StatItem {
  id: string;
  end: number;
  suffix: string;
  label: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  color: string;
  icon: ReactNode;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ExpertLink {
  href: string;
  label: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  engineeringField: string;
  message: string;
}