import { api } from "@/lib/api";
import type { Student } from "../types";

type Response = {
  data: Student[] | []
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

interface GetStudentProps {
  page: number
  perPage: number
}
export async function getStudents({ page, perPage }: GetStudentProps): Promise<Response> {
  const res = await api.get('students', {
    params: {
      page: page,
      per_page: perPage,
    }
  })
  return res.data
}