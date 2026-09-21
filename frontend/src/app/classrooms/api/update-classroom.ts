import { api } from "@/lib/api"
import type { ClassroomFormData } from "../types"

export async function updateClassroom(
  id: number | string,
  data: ClassroomFormData
) {
  const response = await api.put(
    `/classrooms/${id}`,
    data
  )

  return response.data
}