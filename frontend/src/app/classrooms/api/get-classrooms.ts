import { api } from "@/lib/api"
import type { Classroom } from "../types"

export async function getClassrooms(): Promise<Classroom[]> {
  const response = await api.get("/classrooms")

  return response.data.data
}