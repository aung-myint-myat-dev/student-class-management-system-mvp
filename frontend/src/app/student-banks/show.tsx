import { CreditCard } from "lucide-react"
import { useParams } from "react-router"

export function BankDetail() {
  const { studentCode } = useParams()
  return (
    <div className="flex flex-col gap-4 shadow-sm rounded-md p-2">
      <div className="flex gap-3 items-center">
        <div className="size-12 bg-green-700 text-white flex items-center justify-center rounded-md">
          <CreditCard />
        </div>
        <div>
          <h2 className="font-bold text-2xl">Bank Detail</h2>
          <p className="text-xs text-zinc-500">Bank information in detail.</p>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div>
          Student Information
        </div>
      </div>
    </div>
  )
}