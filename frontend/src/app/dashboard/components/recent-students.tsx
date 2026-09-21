import { Link } from "react-router"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

import type { DashboardStudent } from "../api/get-dashboard-stats"

interface RecentStudentsProps {
  students: DashboardStudent[]
}

export function RecentStudents({
  students,
}: RecentStudentsProps) {
  const recentStudents = students.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Students</CardTitle>

        <CardDescription>
          Recently added students.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {recentStudents.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No students found.
            </p>
          ) : (
            recentStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-3"
              >
                <Avatar>
                  <AvatarFallback>
                    {student.name
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {student.name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {student.email}
                  </p>
                </div>

                <Link
                  to={`/students/${student.id}`}
                  className="text-xs font-medium hover:underline"
                >
                  View
                </Link>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}