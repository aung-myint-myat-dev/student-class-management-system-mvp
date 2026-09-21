export type Classroom = {
  id: number
  name: string
  created_at?: string
  updated_at?: string
}

export interface ClassroomFormData {
  name: string
}