import { useParams } from "react-router"
import { PageHeader } from "./components/page-header"
import { useEffect, useState } from "react"
import { InfoRow } from "./components/info-row"
import { TranscationForm } from "./components/transcation-form"
import { TranscationHistoriesTable } from "./components/transcation-histories-table"
import type { _studentBankSchema } from "./data/schema"
import { api } from "@/lib/api"

export function BankDetail() {
  const { id } = useParams()
  const [bank, setBank] = useState<_studentBankSchema | null>(null)
  
  const fetchBank = async () => {
    const res = await api.get(`student-banks/${id}`)
    const bank = res.data.data
    setBank(bank)
  }

  useEffect(() => {
    if(!id) return
    fetchBank()
  }, [])

  if (!bank) return <div>No account.</div>
  return (
    <div className="flex flex-col gap-4 shadow-sm rounded-md p-4">
      <PageHeader isDetail={true} title="Account Detail" des="Transcation histories and detail informations." />

      <section className="flex items-center gap-4">
        <div className="border flex flex-col justify-center gap-6 shadow-sm rounded-md col-span-2 p-6 h-50">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="size-16 bg-green-500 flex items-center justify-center text-2xl font-bold text-white rounded-full">
              U
            </div>
            <div className="space-y-1">
              <h2 className="font-bold text-zinc-700">{bank.student_name}</h2>
              <h2 className="text-xs text-zinc-600">{bank.student_code}</h2>
            </div>
          </div>

          <div className="space-y-2">
            <InfoRow label="Father Name" value={bank.father_name} />
            <InfoRow label="Grade" value={bank.grade} />
          </div>
        </div>

        <TranscationForm />
      </section>

      {/* Transcation History */}
      <TranscationHistoriesTable histories={bank.transcations ?? []} mainBalance={bank.balance} />
    </div>
  )
}