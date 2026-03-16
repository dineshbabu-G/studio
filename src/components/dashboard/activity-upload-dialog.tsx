'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Upload,
  Sparkles,
  Calendar as CalendarIcon,
  Loader2,
} from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getSkillSuggestions } from '@/lib/actions';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  activityTitle: z.string().min(3, 'Title must be at least 3 characters'),
  activityDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters'),
  date: z.date({ required_error: 'A date is required.' }),
  skills: z.string().optional(),
  certificate: z.any().optional(),
});

export function ActivityUploadDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityTitle: '',
      activityDescription: '',
      skills: '',
    },
  });

  const handleSuggestion = async () => {
    const title = form.getValues('activityTitle');
    const description = form.getValues('activityDescription');

    if (!title || !description) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both activity title and description.',
      });
      return;
    }

    setIsSuggesting(true);
    setSuggestedSkills([]);
    const formData = new FormData();
    formData.append('activityTitle', title);
    formData.append('activityDescription', description);

    const result = await getSkillSuggestions(formData);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Suggestion Failed',
        description: result.error,
      });
    } else if (result.skills) {
      setSuggestedSkills(result.skills);
      toast({
        title: 'Skills Suggested!',
        description:
          'Click on the suggested skills to add them to your activity.',
      });
    }
    setIsSuggesting(false);
  };

  const addSkill = (skill: string) => {
    const currentSkills = form.getValues('skills') || '';
    const skillSet = new Set(
      currentSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    );
    if (!skillSet.has(skill)) {
      skillSet.add(skill);
      form.setValue('skills', Array.from(skillSet).join(', '));
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: 'Activity Submitted',
      description: 'Your activity is now pending faculty verification.',
    });
    setIsOpen(false);
    form.reset();
    setSuggestedSkills([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload />
          Upload Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Upload New Activity</DialogTitle>
          <DialogDescription>
            Add details about your achievement for faculty verification.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="activityTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., National Hackathon 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activityDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the activity and your role..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Activity</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <FormLabel>Skills</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSuggestion}
                  disabled={isSuggesting}
                >
                  {isSuggesting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Sparkles />
                  )}
                  Suggest with AI
                </Button>
              </div>
              {suggestedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 rounded-md border p-2">
                  {suggestedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => addSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="e.g., Problem Solving, Teamwork, Python"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="certificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" {...form.register('certificate')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit for Verification</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
