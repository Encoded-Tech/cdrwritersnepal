import { z } from "zod";

export const agentApplicationSchema = z.object({
  // Section 1: Personal Info
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),

  // Section 2: Background
  country: z.string().min(2, "Please enter your country"),

  profession: z.enum(
    ["Engineer", "IT Professional", "Trades", "Business", "Healthcare", "Finance", "Other"],
    { message: "Please select your profession" }
  ),

  hasMigrationKnowledge: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),

  // Section 3: Agent Capability
  hasExistingClients: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),

  expectedClientsPerMonth: z.enum(["1-5", "5-10", "10+"], {
    message: "Please select expected clients",
  }),

  targetAudience: z.string().min(5, "Please describe your target audience"),

  // Section 4: Additional
  message: z.string().optional(),
});

export type AgentApplicationData = z.infer<typeof agentApplicationSchema>;