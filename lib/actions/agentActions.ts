"use server";

import { connectToDatabase } from "@/lib/db/mongodb";
import { AgentApplication } from "@/lib/models/AgentApplication";
import { agentApplicationSchema, type AgentApplicationData } from "@/lib/validation/agentSchema";

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitAgentApplication(data: AgentApplicationData): Promise<ActionResult> {
  // Validate on server
  const parsed = agentApplicationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await connectToDatabase();

    // Check for duplicate email
    const existing = await AgentApplication.findOne({ email: parsed.data.email });
    if (existing) {
      return {
        success: false,
        message: "An application with this email already exists. We'll get back to you soon!",
      };
    }

    // Save to DB
    await AgentApplication.create(parsed.data);

    console.log("[Agent Application] New application received:", parsed.data.email);

    return {
      success: true,
      message: "Application received successfully! Our team will contact you within 24 hours.",
    };
  } catch (error) {
    console.error("[Agent Application] Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
