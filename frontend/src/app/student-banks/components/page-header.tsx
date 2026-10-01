import { ChevronLeft, CreditCard } from "lucide-react";

interface PageHeaderProps {
  title?: string
  des?: string
  isDetail: boolean
}
export function PageHeader({
  title = 'Student Bank List',
  des = 'You can see your student banks here.',
  isDetail = false
}: PageHeaderProps) {
  return (
    <div className="flex gap-3 items-center">
      {isDetail ? (
        <button onClick={() => history.back()} className="rounded-md size-12 flex items-center justify-center group hover:bg-zinc-100 cursor-pointer transition-colors duration-200">
          <ChevronLeft className="size-6 text-zinc-500 group-hover:text-zinc-900" />
        </button>

      ) : (
        <div className="size-12 bg-green-700 text-white flex items-center justify-center rounded-md">
          <CreditCard />
        </div>
      )}
      <div>
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-xs text-zinc-500">{des}</p>
      </div>
    </div>
  )
}