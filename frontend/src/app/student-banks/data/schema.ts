export interface _studentBankSchema {
  id: string
  student_code: string
  student_name: string
  father_name: string
  grade: string
  balance: number
  transcations?: _studentBankTranscation[]
}

export interface _studentSchema {
  id: string
  student_code: string
  name: string
  father_name: string
  email: string
  phone: string
  class: {
    id: string
    name: string
  }
}

export interface _studentBankTranscation {
  id: string,
  student_bank_id: string,
  transcation_type: 'cash_out' | 'cash_in',
  date: string,
  amount: number,
  description: string,
  payment_method: string,
  created_at: string,
  updated_at: string
}