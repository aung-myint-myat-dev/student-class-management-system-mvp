import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { StudentBank } from '../data/student-banks'
import { isCreditBalance } from '../lib/is-credit-balance'
import { useNavigate } from 'react-router'
import { Eye, Pencil, Trash2 } from 'lucide-react'
interface BanksTableProps {
  banks: StudentBank[]
  onEditBank: (bank: StudentBank) => void
  onDeleteBank: (code: string) => void
}
export function BanksTable({
  banks,
  onEditBank,
  onDeleteBank,
}: BanksTableProps) {
  const navigate = useNavigate()
  return (
    <div className="h-full overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-75 ps-3"> Code </TableHead>
            <TableHead> Student Name </TableHead>
            <TableHead> Father's Name </TableHead>
            <TableHead> Current Grade </TableHead>
            <TableHead> Balance </TableHead>
            <TableHead className="pe-3 text-right"> Actions </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table body */}
        {banks.length > 0 && (
          <TableBody>

            {banks.map(
              (bank) => (
                <TableRow key={bank.studentCode} >

                  <TableCell className="ps-3 font-medium"> {bank.studentCode} </TableCell>
                  <TableCell> {bank.name} </TableCell>
                  <TableCell> {bank.fatherName} </TableCell>
                  <TableCell> {bank.current_grade} </TableCell>
                  <TableCell className={isCreditBalance(bank.balance,) ? 'text-red-500' : 'text-green-500'}>
                    {bank.balance}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <div className="flex items-center justify-end gap-3 pe-3">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/student-banks/${bank.studentCode.toLowerCase()}`,
                          )
                        }
                        className="transition-opacity hover:opacity-70"
                      >
                        <Eye className="size-4 text-blue-500" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          onEditBank(bank)
                        }
                        className="transition-opacity hover:opacity-70"
                      >
                        <Pencil className="size-4 text-yellow-500" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          onDeleteBank(
                            bank.studentCode,
                          )
                        }
                        className="transition-opacity hover:opacity-70"
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </button>

                    </div>
                  </TableCell>

                </TableRow>
              ),
            )}

          </TableBody>
        )}

        {/* No banks */}
        {banks.length === 0 && (
          <TableCaption className="mb-4">
            No banks found.
          </TableCaption>
        )}
      </Table>
    </div>
  )
}