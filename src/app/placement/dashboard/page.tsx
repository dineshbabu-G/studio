import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { allStudents } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function PlacementDashboardPage() {
  const uniqueSkills = [...new Set(allStudents.flatMap(s => s.activities.flatMap(a => a.skills)))];

  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-3xl font-bold font-headline">Find Talent</h1>
          <p className="text-muted-foreground">
            Search for students by skills, department, and more.
          </p>
        </div>
        <Card>
            <CardHeader>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search by skill, name, or department..." className="pl-10" />
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="text-sm font-medium">Popular Skills:</span>
                  {uniqueSkills.slice(0, 7).map(skill => (
                    <Badge key={skill} variant="outline" className="cursor-pointer">{skill}</Badge>
                  ))}
                </div>
            </CardHeader>
        </Card>
      <Card>
        <CardHeader>
          <CardTitle>Student Database</CardTitle>
          <CardDescription>
            Showing all students in the system. Use filters to narrow your search.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Top Skills</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.id}</div>
                  </TableCell>
                  <TableCell>
                    {student.department}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.activities.flatMap(a => a.skills).slice(0,3).map((skill, i) => (
                        <Badge key={`${skill}-${i}`} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/portfolio/${student.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Portfolio
                        </Link>
                    </Button>
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
