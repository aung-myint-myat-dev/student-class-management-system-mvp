export type Student = {
  id: number
  name: string
  email: string
  phone: string | null
  class: {
    id: number
    name: string
  }
}

export interface StudentFormData {
  name: string
  email: string
  phone: string | null
  classroom_id: string
}

export type Classroom = {
  id: number
  name: string
}

export type ClassroomOption = {
  value: string
  label: string
}
