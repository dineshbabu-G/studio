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
import { pendingActivities } from '@/lib/data';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function FacultyDashboardPage() {
  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-3xl font-bold font-headline">Activity Verification</h1>
          <p className="text-muted-foreground">
            Review and approve or reject student-submitted activities.
          </p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Pending Submissions</CardTitle>
          <CardDescription>{pendingActivities.length} activities are awaiting your review.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="font-medium">{activity.studentName}</div>
                    <div className="text-sm text-muted-foreground">{activity.studentId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{activity.name}</div>
                    <p className="text-sm text-muted-foreground max-w-xs truncate">{activity.description}</p>
                  </TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" className="text-green-600 hover:text-green-600 hover:bg-green-50 border-green-200 hover:border-green-600">
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Approve</span>
                    </Button>
                    <Button variant="outline" size="icon" className="text-red-600 hover:text-red-600 hover:bg-red-50 border-red-200 hover:border-red-600">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Reject</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
               {pendingActivities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No pending activities.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
