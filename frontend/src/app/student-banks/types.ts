export type TranscationFormType = {
  transcation_type: 'cash_in' | 'cash_out' | ''
  date: string
  amount: string
  description: string
  payment_method: string
  images: [{ url: string }] | []
}