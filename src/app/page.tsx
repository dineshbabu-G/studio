import {
  Activity,
  Award,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PublicHeader } from '@/components/layout/public-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const features = [
    {
      icon: <GraduationCap className="size-8 text-primary" />,
      title: 'Student Profiles',
      description:
        'Create a comprehensive digital profile to showcase your academic journey.',
    },
    {
      icon: <Activity className="size-8 text-primary" />,
      title: 'Activity Uploads',
      description:
        'Easily upload and document all your achievements, from hackathons to internships.',
    },
    {
      icon: <ShieldCheck className="size-8 text-primary" />,
      title: 'Faculty Verification',
      description:
        'Get your activities verified by faculty to ensure authenticity and credibility.',
    },
    {
      icon: <Sparkles className="size-8 text-primary" />,
      title: 'AI Skill Analysis',
      description:
        'Our AI automatically analyzes your activities to identify and suggest relevant skills.',
    },
    {
      icon: <Award className="size-8 text-primary" />,
      title: 'Digital Portfolio',
      description:
        'Generate a shareable digital portfolio to impress recruiters and employers.',
    },
    {
      icon: <Users className="size-8 text-primary" />,
      title: 'Placement Cell Access',
      description:
        'Connect with placement officers who can search for students based on specific skills.',
    },
  ];

  const heroImage = placeholderImages.find(
    (img) => img.id === 'landing-hero'
  )!;

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AcademiaVault: Your Verified Digital Career Portfolio
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Unlock your potential. Centralize achievements, get them
                    verified, and let our AI build a skill profile that gets you
                    noticed.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/login">Student Login</Link>
                  </Button>
                </div>
              </div>
              <Image
                src={heroImage.imageUrl}
                width={600}
                height={400}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline">Key Features</Badge>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                  A New Standard for Academic Achievement
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AcademiaVault provides a complete ecosystem for students,
                  faculty, and placement cells to manage and verify academic and
                  extracurricular accomplishments.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-6 md:px-8">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AcademiaVault. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
