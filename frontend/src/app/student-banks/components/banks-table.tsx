import { isCreditBalance } from '../lib/is-credit-balance'
import { useNavigate } from 'react-router'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import type { _studentBankSchema } from '../data/schema'
interface BanksTableProps {
  banks: _studentBankSchema[] | []
  onEditBank: (bank: _studentBankSchema) => void
  onDeleteBank: (code: string) => void
}
export function BanksTable({
  banks,
  onEditBank,
  onDeleteBank,
}: BanksTableProps) {
  const navigate = useNavigate()
  return (
    <div className="overflow-hidden rounded-md border border-zinc-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-zinc-50">
              <th className="px-6 py-2.5 text-left text-sm font-medium text-zinc-700">
                Student Code
              </th>

              <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                Student Name
              </th>

              <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                Father Name
              </th>

              <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                Grade
              </th>

              <th className="px-4 py-2.5 text-right text-sm font-medium text-zinc-700">
                Balance
              </th>

              <th className="px-6 py-2.5 text-right text-sm font-medium text-zinc-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {banks.map((bank, index) => {
              const amount = Number(bank.balance).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })

              return (
                <tr key={index} className="border-b last:border-0 hover:bg-zinc-50">
                  <td className="px-6 py-3 text-sm text-zinc-600 w-40">
                    {bank.student_code}
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {bank.student_name}
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {bank.father_name}
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {bank.grade}
                  </td>

                  <td className={`px-4 py-3 text-right text-sm text-zinc-600`}>
                    <span className={isCreditBalance(Number(bank.balance)) ? 'text-red-500' : 'text-zinc-600'}>
                      {/* {bank.balance.toLocaleString('en-US', { maximumFractionDigits: 1, minimumFractionDigits: 0 })} MMK */}
                      {amount} MMK
                    </span>
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => navigate(`/student-banks/${bank.id}`)}
                        type="button">
                        <Eye className="size-4 cursor-pointer text-blue-500" />
                      </button>

                      <button
                        onClick={() => onEditBank(bank)}
                        type="button">
                        <Pencil className="size-4 cursor-pointer text-yellow-500" />
                      </button>

                      <button
                        onClick={() => onDeleteBank(bank.student_code)}
                        type="button">
                        <Trash2 className="size-4 cursor-pointer text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}