import { CreditCard } from "lucide-react";

export function PageHeader() {
  return (
    <div className="flex gap-3 items-center">
      <div className="size-12 bg-green-700 text-white flex items-center justify-center rounded-md">
        <CreditCard />
      </div>
      <div>
        <h2 className="font-bold text-2xl">Student Bank List</h2>
        <p className="text-xs text-zinc-500">You can see your student banks here.</p>
      </div>
    </div>
  )
}