'use server';

import { suggestStudentSkills } from '@/ai/flows/student-skill-suggestion';
import { z } from 'zod';

const skillSuggestionSchema = z.object({
  activityTitle: z.string().min(1, 'Activity title is required'),
  activityDescription: z.string().min(1, 'Activity description is required'),
});

type SuggestionResult = {
  skills?: string[];
  error?: string;
};

export async function getSkillSuggestions(
  formData: FormData
): Promise<SuggestionResult> {
  const rawData = {
    activityTitle: formData.get('activityTitle'),
    activityDescription: formData.get('activityDescription'),
  };

  const validatedData = skillSuggestionSchema.safeParse(rawData);

  if (!validatedData.success) {
    return { error: 'Invalid input. Please provide a title and description.' };
  }

  try {
    const result = await suggestStudentSkills(validatedData.data);
    return { skills: result.skills };
  } catch (e) {
    console.error('AI suggestion failed:', e);
    return { error: 'Failed to get suggestions from AI model.' };
  }
}
