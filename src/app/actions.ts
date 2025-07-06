
'use server';

import { generateResumeSummary, GenerateResumeSummaryInput } from '@/ai/flows/generate-resume-summary';

export async function handleGenerateSummary(input: GenerateResumeSummaryInput) {
  const result = await generateResumeSummary(input);
  return result;
}
