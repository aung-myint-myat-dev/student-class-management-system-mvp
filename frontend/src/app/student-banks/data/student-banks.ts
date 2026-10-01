export type StudentBank = {
  student_code: string
  student_name: string
  father_name: string
  grade: string
  balance: number
}

export type TransactionHistory = {
  id: number
  studentCode: string
  date: string
  transaction_type: 'cashin' | 'cashout'
  payment_method?: 'kpay' | 'aya' | 'wavemoney' | 'cash' | ''
  remaining_balance: number
  amount: number
  description: string
  images: string[]
}

// export const student_banks: StudentBank[] = [
//   {
//     studentCode: 'STU-0001',
//     name: 'Aung Myint Myat Zayar Kyaw',
//     fatherName: 'U Aung Aung Thiha Zaw',
//     current_grade: 'Grade 1',
//     balance: 150000,
//   },
//   {
//     studentCode: 'STU-0002',
//     name: 'Kyaw Zin Htet',
//     fatherName: 'U Ko Ko',
//     current_grade: 'Grade 2',
//     balance: -25000,
//   },
//   {
//     studentCode: 'STU-0003',
//     name: 'Min Thant Zaw Naing',
//     fatherName: 'U Min Min',
//     current_grade: 'Grade 3',
//     balance: 125000,
//   },
//   {
//     studentCode: 'STU-0004',
//     name: 'Hla Myo Aung Thu Kyaw',
//     fatherName: 'U Hla Hla',
//     current_grade: 'Grade 4',
//     balance: -45000,
//   },
//   {
//     studentCode: 'STU-0005',
//     name: 'Kyaw Min Htet',
//     fatherName: 'U Kyaw Kyaw Moe Win',
//     current_grade: 'Grade 5',
//     balance: 210000,
//   },
//   {
//     studentCode: 'STU-0006',
//     name: 'Tun Lin Aung',
//     fatherName: 'U Tun Tun',
//     current_grade: 'Grade 6',
//     balance: 95000,
//   },
//   {
//     studentCode: 'STU-0007',
//     name: 'Zaw Min Htet',
//     fatherName: 'U Zaw Zaw',
//     current_grade: 'Grade 7',
//     balance: -15000,
//   },
//   {
//     studentCode: 'STU-0008',
//     name: 'Myint Naing Kyaw',
//     fatherName: 'U Myint Myat',
//     current_grade: 'Grade 8',
//     balance: 120000,
//   },
//   {
//     studentCode: 'STU-0009',
//     name: 'Myo Thant Min',
//     fatherName: 'U Myo Min',
//     current_grade: 'Grade 9',
//     balance: -75000,
//   },
//   {
//     studentCode: 'STU-0010',
//     name: 'Thet Naing Htet',
//     fatherName: 'U Thet Naing',
//     current_grade: 'Grade 10',
//     balance: 250000,
//   },
//   {
//     studentCode: 'STU-0011',
//     name: 'Thura Aung Min',
//     fatherName: 'U Than Htut',
//     current_grade: 'Grade 1',
//     balance: 85000,
//   },
//   {
//     studentCode: 'STU-0012',
//     name: 'Htet Htet Aung',
//     fatherName: 'U Htet Aung',
//     current_grade: 'Grade 2',
//     balance: -30000,
//   },
//   {
//     studentCode: 'STU-0013',
//     name: 'Phyo Min Zaw',
//     fatherName: 'U Win Naing',
//     current_grade: 'Grade 3',
//     balance: 175000,
//   },
//   {
//     studentCode: 'STU-0014',
//     name: 'Nay Lin Aung',
//     fatherName: 'U Nay Win',
//     current_grade: 'Grade 4',
//     balance: 60000,
//   },
//   {
//     studentCode: 'STU-0015',
//     name: 'Sai Min Htet',
//     fatherName: 'U Sai Aung',
//     current_grade: 'Grade 5',
//     balance: -20000,
//   },
//   {
//     studentCode: 'STU-0016',
//     name: 'Ye Min Htet',
//     fatherName: 'U Ye Htut',
//     current_grade: 'Grade 6',
//     balance: 135000,
//   },
//   {
//     studentCode: 'STU-0017',
//     name: 'Kaung Htet Zaw',
//     fatherName: 'U Kaung Zaw',
//     current_grade: 'Grade 7',
//     balance: 220000,
//   },
//   {
//     studentCode: 'STU-0018',
//     name: 'Aung Khant Min',
//     fatherName: 'U Kyaw Win',
//     current_grade: 'Grade 8',
//     balance: -55000,
//   },
//   {
//     studentCode: 'STU-0019',
//     name: 'Thant Zin Htet',
//     fatherName: 'U Min Zaw',
//     current_grade: 'Grade 9',
//     balance: 110000,
//   },
//   {
//     studentCode: 'STU-0020',
//     name: 'Lin Htet Aung',
//     fatherName: 'U Hla Win',
//     current_grade: 'Grade 10',
//     balance: 190000,
//   },
//   {
//     studentCode: 'STU-0021',
//     name: 'Aung Pyae Min',
//     fatherName: 'U Zaw Lin',
//     current_grade: 'Grade 1',
//     balance: -10000,
//   },
//   {
//     studentCode: 'STU-0022',
//     name: 'Moe Thura Aung',
//     fatherName: 'U Kyaw Htet',
//     current_grade: 'Grade 2',
//     balance: 145000,
//   },
//   {
//     studentCode: 'STU-0023',
//     name: 'Sai Htet Min',
//     fatherName: 'U Sai Tun',
//     current_grade: 'Grade 3',
//     balance: 70000,
//   },
//   {
//     studentCode: 'STU-0024',
//     name: 'Min Khant Zaw',
//     fatherName: 'U Aung Zaw',
//     current_grade: 'Grade 4',
//     balance: -40000,
//   },
//   {
//     studentCode: 'STU-0025',
//     name: 'Htet Naing Zaw',
//     fatherName: 'U Min Hla',
//     current_grade: 'Grade 5',
//     balance: 230000,
//   },
//   {
//     studentCode: 'STU-0026',
//     name: 'Kaung Myat Htet',
//     fatherName: 'U Tun Naing',
//     current_grade: 'Grade 6',
//     balance: 100000,
//   },
//   {
//     studentCode: 'STU-0027',
//     name: 'Pyae Sone Min',
//     fatherName: 'U Myo Htet',
//     current_grade: 'Grade 7',
//     balance: -65000,
//   },
//   {
//     studentCode: 'STU-0028',
//     name: 'Zin Min Aung',
//     fatherName: 'U Aung Win',
//     current_grade: 'Grade 8',
//     balance: 155000,
//   },
//   {
//     studentCode: 'STU-0029',
//     name: 'Thant Zin Aung',
//     fatherName: 'U Kyaw Min',
//     current_grade: 'Grade 9',
//     balance: 80000,
//   },
//   {
//     studentCode: 'STU-0030',
//     name: 'Min Zaw Htet',
//     fatherName: 'U Than Win',
//     current_grade: 'Grade 10',
//     balance: -35000,
//   },
// ]

// export const transaction_histories: TransactionHistory[] = [
//   ...student_banks.flatMap((student, studentIndex) => {
//     const transactions = [
//       {
//         type: 'cashin' as const,
//         amount: 120000,
//       },
//       {
//         type: 'cashout' as const,
//         amount: 35000,
//       },
//       {
//         type: 'cashin' as const,
//         amount: 80000,
//       },
//       {
//         type: 'cashout' as const,
//         amount: 65000,
//       },
//       {
//         type: 'cashin' as const,
//         amount: 100000,
//       },
//       {
//         type: 'cashout' as const,
//         amount: 50000,
//       },
//     ]

//     const totalChange = transactions.reduce((total, transaction) => {
//       return transaction.type === 'cashin'
//         ? total + transaction.amount
//         : total - transaction.amount
//     }, 0)

//     let balance = student.balance - totalChange

//     return transactions.map((transaction, transactionIndex) => {
//       if (transaction.type === 'cashin') {
//         balance += transaction.amount
//       } else {
//         balance -= transaction.amount
//       }

//       const paymentMethods: NonNullable<
//         TransactionHistory['payment_method']
//       >[] = ['kpay', 'aya', 'wavemoney', 'cash']

//       const paymentMethod =
//         paymentMethods[
//           (studentIndex + transactionIndex) % paymentMethods.length
//         ]

//       const imageSets = [
//         [],
//         [
//           'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
//         ],
//         [
//           'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
//           'https://images.unsplash.com/photo-1556761175-b413da4baf72',
//           'https://images.unsplash.com/photo-1556742111-a301076d9d18',
//         ],
//       ]

//       const images = imageSets[
//         (studentIndex + transactionIndex) % imageSets.length
//       ] as string[]

//       const date = new Date(
//         2026,
//         8,
//         1 + transactionIndex + studentIndex
//       )

//       const formattedDate = date.toISOString().split('T')[0]

//       const description =
//         transaction.type === 'cashin'
//           ? `A cash-in transaction of ${transaction.amount.toLocaleString()} MMK was made for ${student.name}. The payment was received and recorded in the student bank account after the student code, student name, father name, and current grade were checked by the responsible staff member. The deposited amount is intended to support regular school-related expenses such as snacks, lunch, learning materials, school activities, transportation, and other approved payments. The payment was successfully received using ${paymentMethod.toUpperCase()} and the account balance was updated immediately after the transaction. The cashier reviewed the transaction details to ensure that the correct student account was selected and that the deposited amount matched the amount entered into the system. The updated balance was then stored as the remaining balance for this transaction so that the parent and authorized school staff can review the account history later. No discrepancy was reported during this transaction.`
//           : `A cash-out transaction of ${transaction.amount.toLocaleString()} MMK was recorded for ${student.name}. The amount was withdrawn for approved school-related expenses and was processed after confirming the student account information. The responsible staff member checked the student code and account balance before completing the transaction. The amount was recorded as a ${transaction.type} transaction and the remaining account balance was recalculated immediately after the withdrawal. This transaction may represent expenses such as school activities, snacks, lunch, learning materials, transportation, or other approved student expenses. The cashier reviewed the transaction information to make sure that the requested amount was correctly entered and associated with the correct student account. The resulting balance was saved as part of the transaction history for future reference. The transaction was completed successfully without any correction or adjustment.`

//       return {
//         id:
//           studentIndex * transactions.length +
//           transactionIndex +
//           1,

//         studentCode: student.studentCode,

//         date: formattedDate,

//         transaction_type: transaction.type,

//         payment_method: paymentMethod,

//         amount: transaction.amount,

//         remaining_balance: balance,

//         description,

//         images,
//       }
//     })
//   }),
// ]
