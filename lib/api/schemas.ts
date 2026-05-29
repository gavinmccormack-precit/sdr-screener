import { z } from "zod";

export const strengthWeaknessItemSchema = z.object({
  dimension: z.string().min(1),
  score: z.number().int().min(0).max(10),
  evidence: z.string().min(1),
});

export const createJobDescriptionSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export const createCandidateSchema = z.object({
  candidateName: z.string().min(1),
  jobDescriptionId: z.string().uuid(),
  resumePath: z.string().min(1),
  audioPath: z.string().min(1),
});

export const screeningCallbackSchema = z.object({
  candidateId: z.string().uuid(),
  status: z.enum(["complete", "failed"]),
  overall_score: z.number().int().min(0).max(100).optional(),
  summary: z.string().optional(),
  strengths: z.array(strengthWeaknessItemSchema).optional(),
  weaknesses: z.array(strengthWeaknessItemSchema).optional(),
  transcript: z.string().optional(),
  raw: z.unknown().optional(),
});
