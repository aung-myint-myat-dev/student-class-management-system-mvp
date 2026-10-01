import { Eye, ImageIcon, Pencil, RotateCcwClock, Trash2 } from 'lucide-react'
import { isCreditBalance } from '../lib/is-credit-balance';
import type { _studentBankTranscation } from '../data/schema';

interface TranscationHistoriesTableProps {
  histories: _studentBankTranscation[]
  mainBalance: number
}
export function TranscationHistoriesTable({ histories, mainBalance }: TranscationHistoriesTableProps) {
  return (
    <>
      <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center gap-2 text-zinc-500 text-sm'>
          <RotateCcwClock className='size-4' />
          <span>Transcation Histories</span>
        </div>

        <div className='flex items-center gap-1'>
          <h2 className='font-bold text-zinc-800 text-sm'>Main Balance </h2>
          <span className={`inline-block font-semibold py-1.5 px-4 ${isCreditBalance(mainBalance) ? 'text-red-500' : 'text-zinc-500'} text-sm`}>{mainBalance.toLocaleString()} MMK</span>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border border-zinc-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-zinc-50">
                <th className="px-6 py-2.5 text-left text-sm font-medium text-zinc-700">
                  Date
                </th>

                <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                  Description
                </th>

                <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                  Cash-in
                </th>

                <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                  Cash-out
                </th>

                <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                  Payment Method
                </th>

                <th className="px-4 py-2.5 text-right text-sm font-medium text-zinc-700">
                  Balance
                </th>

                <th className="px-6 py-2.5 text-right text-sm font-medium text-zinc-700">
                  Images
                </th>

                <th className="px-6 py-2.5 text-right text-sm font-medium text-zinc-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {histories.map((history, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-zinc-50">
                  <td className="px-6 py-3 text-sm text-zinc-600 max-w-32">
                    {history.date}
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600 max-w-60">
                    <p className='line-clamp-2'>
                    {history.description}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {history.transcation_type === 'cash_in' ? history.amount.toLocaleString() + ' MMK' : '-'}
                  </td>

                  <td className="px-4 py-3 text-sm text-red-600">
                    {history.transcation_type === 'cash_out' ? history.amount.toLocaleString() + ' MMK' : '-'}
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {history.payment_method?.toLocaleUpperCase() ?? '-'}
                  </td>

                  <td className={`px-4 py-3 font-semibold text-right text-sm ${isCreditBalance(history.amount) ? 'text-red-500' : 'text-zinc-600'}`}>
                    <span>
                      {history.amount.toLocaleString()}
                    </span> {' '}
                    MMK
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {/* <div className='relative size-12 overflow-hidden rounded-sm border ml-auto'>
                      {history.images.length > 0 ? (
                        <>
                          <img src={history.images[0]} alt="" className='w-full h-full object-cover' />
                          {history.images.length > 1 && (
                            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6 bg-green-500 text-white text-xs flex items-center justify-center rounded-full'>+{history.images.length}</span>
                          )}
                        </>
                      ) : (
                        <ImageIcon className='w-full h-full text-zinc-300' />
                      )}
                    </div> */}
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => alert('hello')}
                        type="button">
                        <Pencil className="size-4 cursor-pointer text-yellow-500" />
                      </button>

                      <button
                        onClick={() => alert('hello')}
                        type="button">
                        <Trash2 className="size-4 cursor-pointer text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}