import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import type {
  DashboardClassroom,
  DashboardStudent,
} from "../api/get-dashboard-stats"

interface ClassroomOverviewProps {
  classrooms: DashboardClassroom[]
  students: DashboardStudent[]
}

export function ClassroomOverview({
  classrooms,
  students,
}: ClassroomOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Classroom Overview</CardTitle>

        <CardDescription>
          Students grouped by classroom.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {classrooms.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No classrooms found.
            </p>
          ) : (
            classrooms.map((classroom) => {
              const studentCount =
                students.filter(
                  (student) =>
                    student.class?.id ===
                    classroom.id
                ).length

              return (
                <div
                  key={classroom.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {classroom.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Classroom
                    </p>
                  </div>

                  <div className="text-sm font-semibold">
                    {studentCount} students
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}