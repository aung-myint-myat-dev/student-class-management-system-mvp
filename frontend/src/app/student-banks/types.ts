// export type TranscationFormType = {
//   student_bank_id: string,
//   transcation_type: 'cash_in' | 'cash_out' | ''
//   date: string
//   amount: string
//   description: string
//   payment_method: string
//   images: TranscationImage[]
// }

import type { _studentBankTranscationImage } from "./data/schema"

// export type TranscationImage = {
//   id: string
//   transcation_id: string
//   image_url: string
// }

export type TranscationFormType = {
  student_bank_id: string
  date: string
  transcation_type: 'cash_in' | 'cash_out'
  amount: string
  description: string
  payment_method: string
  images: (File | _studentBankTranscationImage)[]
  existing_image_ids?: number[]
}

export type TranscationFormErrorType = {
  student_bank_id: string
  date: string
  transcation_type: string
  amount: string
  description: string
  payment_method: string
  images: string
}

export type StudentBankActionFormType = {
  student_code: string
  student_name: string
  father_name: string
  grade: string
  balance: number
  payment_method: 'cash' | 'kpay' | 'wave'
  opening_amount_type: 'debit' | 'credit'
}

export type StudentBankActionFormErrorType = {
  student_code: string
  student_name: string
  father_name: string
  grade: string
  balance: string
  payment_method: string
  opening_amount_type: string
}