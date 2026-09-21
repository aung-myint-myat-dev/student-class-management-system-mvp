import { api } from "@/lib/api";
import type { Student } from "../types";

export async function getStudents(): Promise<Student[] | []> {
  const res = await api.get('students')
  return res.data.data
}