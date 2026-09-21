import { api } from "@/lib/api"
import type { Classroom } from "../types"

type Response = {
  data: Classroom[] | []
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

interface GetClassroomProps {
  page: number
  perPage: number
}
export async function getClassrooms({ page, perPage }: GetClassroomProps): Promise<Response> {
  const response = await api.get("classrooms", {
    params: {
      page: page,
      per_page: perPage,  
    }
  })
  return response.data
}