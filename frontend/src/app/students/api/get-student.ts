import { api } from "@/lib/api"
import type { Student } from "../types"

export async function getStudent(
  id: number | string | undefined
): Promise<Student> {
  const response = await api.get(`/students/${id}`)
  return response.data.data
}