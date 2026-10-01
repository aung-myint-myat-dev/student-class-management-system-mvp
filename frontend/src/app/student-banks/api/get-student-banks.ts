import { api } from "@/lib/api";

export async function getStudentBanks() {
  const res = await api.get('/student-banks');
  return res
}