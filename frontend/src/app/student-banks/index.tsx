import {
  Plus,
  Search,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { PageHeader } from './components/page-header'
import { Paginator, type LaravelPaginator } from './components/paginator'
import { Button } from './components/ui/buttom'
import { DeleteConfirmationDialog } from './components/delete-confirmation-dialog'
import { BanksTable } from './components/banks-table'
import { api } from '@/lib/api'
import type { _studentBankSchema } from './data/schema'
import { BankAction } from './components/bank-actions'

export function StudentBanks() {
  const [banks, setBanks] = useState<_studentBankSchema[]>([])
  const [loading, setLoading] = useState(false)
  const [paginator, setPaginator] = useState<LaravelPaginator<_studentBankSchema> | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [selectedBank, setSelectedBank] = useState<_studentBankSchema | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [showActionForm, setShowActionForm] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const fetchBanks = async (page = currentPage, limit = perPage, search = searchInput,) => {
    try {
      setLoading(true)
      const res = await api.get('/student-banks', {
        params: {
          page,
          per_page: limit,
          search: search.trim() || undefined,
        },
      })

      const paginatorData = res.data.meta as LaravelPaginator<_studentBankSchema>

      setBanks(res.data.data)
      setPaginator(paginatorData)
    } catch (error) {
      console.error('Failed to fetch student banks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBanks()
  }, [currentPage, perPage])

  console.log(paginator)
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>,) => {
    const value = event.target.value
    setSearchInput(value)
    setCurrentPage(1)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBanks(1, perPage, searchInput)
    }, 400)
    return () => clearTimeout(timeout)
  }, [searchInput])

  const handleEditBank = (
    bank: _studentBankSchema,
  ) => {
    setSelectedBank(bank)

    // Edit dialog logic here
  }

  // --------------------------------------------------
  // Open Delete Confirmation
  // --------------------------------------------------
  const handleDeleteBank = (code: string) => {
    const bank = banks.find(
      (item) => item.student_code === code,
    )

    if (!bank) {
      return
    }

    setSelectedBank(bank)
    setShowDeleteConfirmation(true)
  }

  const handleShowActionForm = () => {
    setShowActionForm(true)
    setSelectedBank(null)
  }

  const deleteBank = async () => {
    if (!selectedBank) {
      return
    }

    try {
      await api.delete(
        `/student-banks/${selectedBank.student_code}`,
      )
      setSelectedBank(null)
      setShowDeleteConfirmation(false)
      await fetchBanks()

      if (
        paginator &&
        paginator.current_page > 1 &&
        paginator.data.length === 1
      ) {
        setCurrentPage((prev) => prev - 1)
      }

    } catch (error) {
      console.error('Failed to delete student bank:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-md p-2 shadow-sm">

      {/* Header */}
      <PageHeader
        isDetail={false}
        title="Student Bank Accounts"
        des="You can see your student bank accounts list here."
      />

      {/* Table Action */}
      <div className="flex items-center justify-between gap-4">

        {/* Search */}
        <div className="flex w-full max-w-75 items-center rounded-full border border-zinc-300 px-3 py-1.5 transition-colors duration-200 focus-within:border-zinc-500">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInput}
            placeholder="Search by name or student code..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />

          <Search className="size-4 text-zinc-500" />
        </div>

        {/* Add */}
        <Button
          icon={Plus}
          onClick={handleShowActionForm}
        >
          Add New Account
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-10 text-center text-sm text-zinc-500">
          Loading student bank accounts...
        </div>
      ) : banks.length === 0 ? (
        <div className="py-10 text-center text-sm text-zinc-500">
          No student bank accounts found.
        </div>
      ) : (
        <BanksTable
          banks={banks}
          onEditBank={handleEditBank}
          onDeleteBank={handleDeleteBank}
        />
      )}

      {/* Pagination */}
      {paginator && (
        <Paginator
          paginator={paginator}
          onPageChange={(page) => {
            setCurrentPage(page)
          }}
          onPerPageChange={(value) => {
            setPerPage(value)
            setCurrentPage(1)
          }}
          label="Student Bank Accounts"
        />
      )}

      <BankAction
        open={showActionForm}
        setOpen={setShowActionForm}
        selectedBank={selectedBank}
        isEdit={isEdit}
        onSave={() => console.log('helo')}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationDialog
        open={showDeleteConfirmation}
        onClose={() => {
          setShowDeleteConfirmation(false)
          setSelectedBank(null)
        }}
        onConfirm={deleteBank}
        title="Delete bank?"
        description={
          selectedBank
            ? `Are you sure you want to delete the bank record for ${selectedBank.student_name}? This action cannot be undone.`
            : undefined
        }
      />
    </div>
  )
}