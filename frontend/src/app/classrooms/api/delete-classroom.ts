import { api } from "@/lib/api"

export async function deleteClassroom(
  id: number | string
) {
  return api.delete(`/classrooms/${id}`)
}