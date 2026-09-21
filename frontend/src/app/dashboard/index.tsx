import { useEffect, useState } from "react"
import { Link } from "react-router"

import {
  BookOpen,
  GraduationCap,
  Plus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  getDashboardStats,
  type DashboardClassroom,
  type DashboardStudent,
} from "./api/get-dashboard-stats"

import { DashboardStatCard } from "./components/dashboard-stat-card"
import { RecentStudents } from "./components/recent-students"
import { ClassroomOverview } from "./components/classroom-overview"

export default function Dashboard() {
  const [students, setStudents] = useState<
    DashboardStudent[]
  >([])

  const [classrooms, setClassrooms] = useState<
    DashboardClassroom[]
  >([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)

        const data =
          await getDashboardStats()

        setStudents(data.students)
        setClassrooms(data.classrooms)
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading dashboard...
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="text-sm text-muted-foreground">
            Overview of your students and classrooms.
          </p>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/classrooms/create">
              <Plus />
              Classroom
            </Link>
          </Button>

          <Button asChild>
            <Link to="/students/create">
              <Plus />
              Student
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="Total Students"
          value={students.length}
          description="Students currently registered"
          icon={GraduationCap}
        />

        <DashboardStatCard
          title="Total Classrooms"
          value={classrooms.length}
          description="Available classrooms"
          icon={BookOpen}
        />

        <DashboardStatCard
          title="Active Students"
          value={students.length}
          description="Currently registered students"
          icon={Users}
        />

        <DashboardStatCard
          title="Avg. Students / Class"
          value={
            classrooms.length
              ? Math.round(
                  students.length /
                    classrooms.length
                )
              : 0
          }
          description="Average students per classroom"
          icon={GraduationCap}
        />
      </div>

      {/* Main content */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentStudents
          students={students}
        />

        <ClassroomOverview
          classrooms={classrooms}
          students={students}
        />
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>
            Quick Actions
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              asChild
              variant="outline"
              className="h-auto justify-start p-4"
            >
              <Link to="/students">
                <GraduationCap />
                <div className="text-left">
                  <p className="font-medium">
                    Manage Students
                  </p>
                  <p className="text-xs text-muted-foreground">
                    View and manage all students
                  </p>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto justify-start p-4"
            >
              <Link to="/classrooms">
                <BookOpen />
                <div className="text-left">
                  <p className="font-medium">
                    Manage Classrooms
                  </p>
                  <p className="text-xs text-muted-foreground">
                    View and manage classrooms
                  </p>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}