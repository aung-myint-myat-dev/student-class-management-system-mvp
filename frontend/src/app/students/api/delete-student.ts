import { api } from "@/lib/api"

export async function deleteStudent(
  id: number | string
) {
  return api.delete(`/students/${id}`)
}