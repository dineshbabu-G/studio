'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting skills based on student activity details.
 *
 * - suggestStudentSkills - A function that analyzes activity title and description to suggest relevant skills.
 * - StudentSkillSuggestionInput - The input type for the suggestStudentSkills function.
 * - StudentSkillSuggestionOutput - The return type for the suggestStudentSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudentSkillSuggestionInputSchema = z.object({
  activityTitle: z.string().describe('The title of the student activity.'),
  activityDescription: z
    .string()
    .describe('A detailed description of the student activity.'),
});
export type StudentSkillSuggestionInput = z.infer<
  typeof StudentSkillSuggestionInputSchema
>;

const StudentSkillSuggestionOutputSchema = z.object({
  skills: z.array(z.string()).describe('An array of suggested skills.'),
});
export type StudentSkillSuggestionOutput = z.infer<
  typeof StudentSkillSuggestionOutputSchema
>;

export async function suggestStudentSkills(
  input: StudentSkillSuggestionInput
): Promise<StudentSkillSuggestionOutput> {
  return studentSkillSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studentSkillSuggestionPrompt',
  input: {schema: StudentSkillSuggestionInputSchema},
  output: {schema: StudentSkillSuggestionOutputSchema},
  prompt: `You are an AI assistant specialized in extracting relevant skills from activity descriptions.

Analyze the following student activity title and description and suggest a list of relevant skills. Focus on soft skills and technical skills that would be valuable in a professional context. Do not include introductory or concluding remarks, just the JSON output.

Activity Title: {{{activityTitle}}}
Activity Description: {{{activityDescription}}}
`,
});

const studentSkillSuggestionFlow = ai.defineFlow(
  {
    name: 'studentSkillSuggestionFlow',
    inputSchema: StudentSkillSuggestionInputSchema,
    outputSchema: StudentSkillSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
