import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Award,
  Book,
  Briefcase,
  Calendar,
  Mail,
  QrCode,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react';

import { allStudents } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PublicHeader } from '@/components/layout/public-header';

export default function PortfolioPage({
  params,
}: {
  params: { studentId: string };
}) {
  const student = allStudents.find((s) => s.id === params.studentId);

  if (!student) {
    notFound();
  }

  const verifiedActivities = student.activities.filter(
    (a) => a.status === 'approved'
  );
  const allSkills = [...new Set(verifiedActivities.flatMap((a) => a.skills))];
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/portfolio/${student.id}`;

  return (
    <>
      <PublicHeader />
      <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        <main className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <aside className="md:col-span-1 space-y-8">
            <Card className="overflow-hidden">
              <CardContent className="p-0 flex flex-col items-center text-center">
                <div className="bg-primary/10 w-full h-24" />
                <Avatar className="size-24 -mt-12 border-4 border-background">
                  <AvatarImage src={student.avatarUrl} />
                  <AvatarFallback>
                    {student.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="p-6">
                  <h1 className="text-2xl font-headline font-bold">
                    {student.name}
                  </h1>
                  <p className="text-muted-foreground">{student.department}</p>
                  <p className="text-sm text-muted-foreground">
                    {student.year}rd Year Student
                  </p>
                </div>
                <Separator />
                <div className="p-6 w-full space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 text-muted-foreground" />
                    <a
                      href={`mailto:${student.email}`}
                      className="text-primary hover:underline"
                    >
                      {student.email}
                    </a>
                  </div>
                   <div className="flex items-center gap-3">
                    <Book className="size-4 text-muted-foreground" />
                    <span>Student ID: {student.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <QrCode className="text-primary" />
                  Share Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Image
                  src={qrCodeUrl}
                  width={150}
                  height={150}
                  alt="QR Code"
                />
              </CardContent>
            </Card>
          </aside>

          <section className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Award className="text-primary" />
                  Verified Achievements
                </CardTitle>
                <CardDescription>
                  All activities are verified by faculty members.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {verifiedActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-primary/10 rounded-full">
                         {activity.type === 'Hackathon' && <Trophy className="size-5 text-primary" />}
                         {activity.type === 'Internship' && <Briefcase className="size-5 text-primary" />}
                         {activity.type === 'Workshop' && <Book className="size-5 text-primary" />}
                         {(activity.type === 'Certification' || activity.type === 'Sports') && <Award className="size-5 text-primary" />}
                      </div>
                      <div className="flex-1 w-px bg-border my-2" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{activity.name}</h3>
                        <ShieldCheck className="size-4 text-green-500" />
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="size-3" /> {activity.date}
                      </p>
                      <p className="mt-2 text-sm">{activity.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activity.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {verifiedActivities.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No verified achievements yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </>
  );
}
