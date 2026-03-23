import mongoose, { Schema, Document } from "mongoose";

export interface IAgentApplication extends Document {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  profession: string;
  hasMigrationKnowledge: "yes" | "no";
  hasExistingClients: "yes" | "no";
  expectedClientsPerMonth: "1-5" | "5-10" | "10+";
  targetAudience: string;
  message?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const AgentApplicationSchema = new Schema<IAgentApplication>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    profession: { type: String, required: true },
    hasMigrationKnowledge: { type: String, enum: ["yes", "no"], required: true },
    hasExistingClients: { type: String, enum: ["yes", "no"], required: true },
    expectedClientsPerMonth: { type: String, enum: ["1-5", "5-10", "10+"], required: true },
    targetAudience: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

// Prevent model re-compilation in dev
export const AgentApplication =
  mongoose.models.AgentApplication ||
  mongoose.model<IAgentApplication>("AgentApplication", AgentApplicationSchema);
