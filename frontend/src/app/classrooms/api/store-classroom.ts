import { api } from "@/lib/api"
import type { ClassroomFormData } from "../types"

export async function storeClassroom(
  data: ClassroomFormData
) {
  const response = await api.post("/classrooms", data)

  return response.data
}