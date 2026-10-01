// import { useParams } from "react-router"
// import { PageHeader } from "./components/page-header"
// import { useEffect, useState } from "react"
// import { student_banks, transaction_histories,type TransactionHistory, type StudentBank } from "./data/student-banks"
// import { RotateCcwClock } from "lucide-react"
// import { InfoRow } from "./components/info-row"
// import { TranscationForm } from "./components/transcation-form"
// import { TranscationHistoriesTable } from "./components/transcation-histories-table"

// export function BankDetail() {
//   const { studentCode } = useParams()
//   const [bank, setBank] = useState<StudentBank | null>(null)
//   const [histories, setHistories] = useState<TransactionHistory[] | []>([])

//   useEffect(() => {
//     if (studentCode) {
//       const bank = student_banks.find((bank) => bank.studentCode === studentCode.toUpperCase())
//       const histories = transaction_histories.filter((history) => history.studentCode === bank?.studentCode)
//       setHistories(histories ?? [])
//       setBank(bank ?? null)
//     }

//     console.log(histories)
//   }, [bank])

//   if(!bank) return <div>No account.</div>
//   return (
//     <div className="flex flex-col gap-3 shadow-sm rounded-md p-2">
//       <PageHeader isDetail={true} title="Account Detail" des="Transcation histories and detail informations." />

//       <section className="flex items-center gap-2">
//         <div className="border flex flex-col justify-center gap-6 shadow-sm rounded-md col-span-2 p-6 h-50">
//           <div className="flex items-center gap-3">
//             {/* Avatar */}
//             <div className="size-16 bg-green-500 flex items-center justify-center text-2xl font-bold text-white rounded-full">
//               U
//             </div>
//             <div className="space-y-1">
//               <h2 className="font-bold text-zinc-700">{bank.name}</h2>
//               <h2 className="text-xs text-zinc-600">{bank.studentCode}</h2>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <InfoRow label="Father Name" value={bank.fatherName} />
//             <InfoRow label="Grade" value={bank.current_grade} />
//           </div>
//         </div>

//         <TranscationForm/>
//       </section>

//       {/* Transcation History */}
//       <TranscationHistoriesTable histories={histories} mainBalance={bank.balance}/>
//     </div>
//   )
// }

export function BankDetail() {
  return <div>detail</div>
}