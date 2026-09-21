import { api } from "@/lib/api"

export type DashboardStudent = {
  id: number
  name: string
  email: string
  phone: string | null
  class: {
    id: number
    name: string
  }
}

export type DashboardClassroom = {
  id: number
  name: string
}

export async function getDashboardStats() {
  const [studentsResponse, classroomsResponse] =
    await Promise.all([
      api.get("/students"),
      api.get("/classrooms"),
    ])

  const students: DashboardStudent[] =
    studentsResponse.data.data ?? []

  const classrooms: DashboardClassroom[] =
    classroomsResponse.data.data ?? []

  return {
    students,
    classrooms,
    totalStudents: students.length,
    totalClassrooms: classrooms.length,
  }
}