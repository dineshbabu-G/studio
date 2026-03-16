'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  CheckCircle2,
  List,
  Sparkles,
  BarChart,
} from 'lucide-react';
import { mockStudent } from '@/lib/data';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, CartesianGrid, XAxis, YAxis, BarChart as RechartsBarChart } from 'recharts';

export default function DashboardPage() {
  const student = mockStudent;
  const totalActivities = student.activities.length;
  const verifiedActivities = student.activities.filter(
    (a) => a.status === 'approved'
  ).length;
  const uniqueSkills = [
    ...new Set(student.activities.flatMap((a) => a.skills)),
  ].length;

  const chartData = [
    { type: 'Hackathon', count: 2, fill: "hsl(var(--chart-1))" },
    { type: 'Workshop', count: 1, fill: "hsl(var(--chart-2))" },
    { type: 'Sports', count: 1, fill: "hsl(var(--chart-3))" },
    { type: 'Internship', count: 1, fill: "hsl(var(--chart-4))" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome, {student.name}!</h1>
        <p className="text-muted-foreground">
          Here&apos;s a summary of your achievements and activities.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Activities
            </CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActivities}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Achievements
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedActivities}</div>
            <p className="text-xs text-muted-foreground">
              Approved by faculty
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Skills Acquired
            </CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueSkills}</div>
            <p className="text-xs text-muted-foreground">
              Identified by AI
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Activity Distribution
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-[60px] flex items-center justify-center">
             <ChartContainer config={{}} className="h-full w-full p-0 m-0">
               <RechartsBarChart accessibilityLayer data={chartData} layout="vertical" margin={{left: -60, top: 10, bottom: 10}}>
                <XAxis type="number" hide />
                <YAxis dataKey="type" type="category" tickLine={false} tick={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="count" layout="vertical" stackId="a" radius={5} />
               </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Activities</CardTitle>
          <CardDescription>
            A log of your most recently added activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Skills</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student.activities.slice(0, 5).map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.name}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        activity.status === 'approved'
                          ? 'default'
                          : activity.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className="capitalize"
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-1">
                    {activity.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
