import AgentPageContent from "@/app/components/agent/AgentPageComponent";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Become an Agent | CDR Writers Nepal",
  description:
    "Partner with CDR Writers Nepal. Earn high commissions by referring clients for Skill Assessment & Migration Services.",
};

export default function BecomeAnAgentPage() {
  return <AgentPageContent />;
}