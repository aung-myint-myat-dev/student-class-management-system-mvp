import { api } from "@/lib/api"
import type { Classroom } from "../types"

export async function getClassroom(
  id: number | string | undefined
): Promise<Classroom> {
  const response = await api.get(`/classrooms/${id}`)

  return response.data.data
}