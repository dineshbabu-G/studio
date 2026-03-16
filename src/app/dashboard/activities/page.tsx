import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockStudent } from '@/lib/data';
import { ActivityUploadDialog } from '@/components/dashboard/activity-upload-dialog';

export default function ActivitiesPage() {
  const student = mockStudent;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Activities</h1>
          <p className="text-muted-foreground">
            Manage and track all your academic and extracurricular activities.
          </p>
        </div>
        <ActivityUploadDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
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
              {student.activities.map((activity) => (
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
                  <TableCell className="max-w-[300px]">
                    <div className="flex flex-wrap gap-1">
                      {activity.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
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
