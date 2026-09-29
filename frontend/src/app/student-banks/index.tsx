import {
  Plus,
  Search,
} from 'lucide-react'
import { useState } from 'react'
import {
  student_banks,
  type StudentBank,
} from './data/student-banks'
import { PageHeader } from './components/page-header'
import { Paginator } from './components/paginator'
import { Button } from './components/ui/buttom'
import { DeleteConfirmationDialog } from './components/delete-confirmation-dialog'
import { BankAction } from './components/bank-actions'
import { BanksTable } from './components/banks-table'

export function StudentBanks() {
  // --------------------------------------------------
  // Bank Data
  // --------------------------------------------------
  const [banks, setBanks] = useState<StudentBank[]>(student_banks)

  // --------------------------------------------------
  // Search
  // --------------------------------------------------
  const [searchInput, setSearchInput] = useState('')

  // --------------------------------------------------
  // Selected Bank
  // --------------------------------------------------
  const [selectedBank, setSelectedBank] = useState<StudentBank | null>(null)

  // --------------------------------------------------
  // Dialog State
  // --------------------------------------------------
  const [showBankAction, setShowBankAction] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  // --------------------------------------------------
  // Search
  // --------------------------------------------------
  const filteredStudentBanks = banks.filter((bank) => {
    const searchValue = searchInput.trim().toLowerCase()
    return (
      bank.studentCode.toLowerCase().includes(searchValue) ||
      bank.name.toLowerCase().includes(searchValue)
    )
  },
  )

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const totalItems = filteredStudentBanks.length
  const totalPages = Math.ceil(totalItems / perPage)
  const paginatedStudentBanks = filteredStudentBanks.slice((currentPage - 1) * perPage, currentPage * perPage,)

  // --------------------------------------------------
  // Search Handler
  // --------------------------------------------------
  const handleSearchInput = ( event: React.ChangeEvent<HTMLInputElement>, ) => {
    setSearchInput(event.target.value)
    setCurrentPage(1)
  }

  // --------------------------------------------------
  // Create Bank
  // --------------------------------------------------
  const handleCreateBank = () => {
    setSelectedBank(null)
    setIsEdit(false)
    setShowBankAction(true)
  }

  // --------------------------------------------------
  // Edit Bank
  // --------------------------------------------------
  const handleEditBank = ( bank: StudentBank, ) => {
    setSelectedBank(bank)
    setIsEdit(true)
    setShowBankAction(true)
  }

  // --------------------------------------------------
  // Create and update bank
  // --------------------------------------------------
  const handleBankSave = ( bank: StudentBank, ) => {
    setBanks((prev) => {
      if (isEdit) {
        return prev.map((item) => item.studentCode === bank.studentCode ? bank : item)
      }
      return [...prev, bank]
    })
    closeBankAction()
  }

  // --------------------------------------------------
  // Close Create / Edit
  // --------------------------------------------------
  const closeBankAction = () => {
    setShowBankAction(false)
    setSelectedBank(null)
    setIsEdit(false)
  }

  // --------------------------------------------------
  // Open Delete Confirmation
  // --------------------------------------------------

  const handleDeleteBank = ( code: string, ) => {
    const bank = banks.find( (item) => item.studentCode === code, )
    if (!bank) {
      return
    }
    setSelectedBank(bank)
    setShowDeleteConfirmation(true)
  }

  // --------------------------------------------------
  // Delete Bank
  // --------------------------------------------------
  const deleteBank = () => {
    if (!selectedBank) {
      return
    }

    setBanks((prev) =>
      prev.filter( (bank) => bank.studentCode !== selectedBank.studentCode, ),
    )

    setSelectedBank(null)
    setShowDeleteConfirmation(false)

    // Current page မှာ item မရှိတော့ရင်
    // previous page ကို ပြန်သွား
    if (
      paginatedStudentBanks.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-md p-2 shadow-sm">
      {/* Header */}
      <PageHeader />

      {/* Table Action */}
      <div className="flex items-center justify-between gap-4">

        {/* Search */}
        <div className="flex w-full max-w-75 items-center rounded-full border border-zinc-300 px-3 py-1.5 transition-colors duration-200 focus-within:border-zinc-500">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInput}
            placeholder="Search by name, id"
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />

          <Search className="size-4 text-zinc-500" />
        </div>

        {/* Add */}
        <Button
          icon={Plus}
          onClick={handleCreateBank}
        >
          Add New Bank
        </Button>
      </div>

      {/* Table */}
      <BanksTable
        banks={paginatedStudentBanks}
        onEditBank={handleEditBank}
        onDeleteBank={handleDeleteBank}
      />

      {/* Pagination */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        perPage={perPage}
        onPageChange={setCurrentPage}
        onPerPageChange={(value) => {
          setPerPage(value)
          setCurrentPage(1)
        }}
        label="Students"
      />

      
      {/* Bank Action Dialog */}
      <BankAction
        open={showBankAction}
        setOpen={closeBankAction}
        isEdit={isEdit}
        selectedBank={selectedBank}
        onSave={handleBankSave}
      />

      {/* Delete Confirmation Dialog */}
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
            ? `Are you sure you want to delete the bank record for ${selectedBank.name}? This action cannot be undone.`
            : undefined
        }
      />
    </div>
  )
}