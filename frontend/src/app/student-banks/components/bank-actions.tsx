import { useEffect, useState } from 'react'
import { Save, Search, X, XIcon } from 'lucide-react'
import { students, type Student } from '../data/students'
import type { StudentBank } from '../data/student-banks'
import { Button } from './ui/buttom'
import { api } from '@/lib/api'

type FormData = {
  amountType: 'credit' | 'debit' | ''
  amount: string
}

type FormErrors = {
  studentCode?: string
  amountType?: string
  amount?: string
}

interface BankActionProps {
  open: boolean
  setOpen: (value: boolean) => void
  isEdit?: boolean
  selectedBank: StudentBank | null
  onSave: (bank: StudentBank) => void
}

const emptyFormData: FormData = {
  amountType: '',
  amount: '',
}

export function BankAction({
  open,
  setOpen,
  selectedBank,
  isEdit = false,
  onSave,
}: BankActionProps) {
  const [studentCode, setStudentCode] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [formData, setFormData] = useState<FormData>(emptyFormData)
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (!open) {
      return
    }

    if (isEdit && selectedBank) {
      // const student = students.find(
      //   (student) =>
      //     student.studentCode.toLowerCase() ===
      //     selectedBank.studentCode.toLowerCase(),
      // )

      // setStudentCode(selectedBank.studentCode)
      // setSelectedStudent(student ?? null)

      // setFormData({
      //   amountType: selectedBank.balance < 0 ? 'credit' : 'debit',
      //   amount: String(Math.abs(selectedBank.balance)),
      // })
      // setErrors({})
      // return
    }

    setStudentCode('')
    setSelectedStudent(null)
    setFormData(emptyFormData)
    setErrors({})
  }, [open, isEdit, selectedBank])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const searchStudent = async () => {
    const code = studentCode.trim().toLowerCase()

    if (!code) {
      setSelectedStudent(null)
      setErrors((prev) => ({
        ...prev,
        studentCode: 'Student code is required.',
      }))
      return
    }

    const res = await api.get(`students/find/${code}`)

    console.log(res.data.data)

    const student = students.find((student) => student.studentCode.toLowerCase() === code,)

    if (!student) {
      setSelectedStudent(null)

      setErrors((prev) => ({
        ...prev,
        studentCode: 'Student not found.',
      }))
      return
    }

    setSelectedStudent(student)

    setErrors((prev) => ({
      ...prev,
      studentCode: '',
    }))
  }

  const validate = () => {
    const newErrors: FormErrors = {}

    if (!selectedStudent) {
      newErrors.studentCode =
        'Please search and select a student.'
    }

    if (!formData.amountType) {
      newErrors.amountType =
        'Transaction type is required.'
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required.'
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount =
        'Amount must be greater than 0.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const closeForm = () => {
    setOpen(false)
  }

  const submitForm = () => {
    if (!validate() || !selectedStudent) {
      return
    }

    const amount = Number(formData.amount)
    const balance = formData.amountType === 'credit' ? -amount : amount

    // const bank: StudentBank = {
    //   studentCode: selectedStudent.studentCode,
    //   name: selectedStudent.name,
    //   fatherName: selectedStudent.fatherName,
    //   current_grade: selectedStudent.current_grade,
    //   balance: balance,
    // }
    // onSave()
    closeForm()
  }

  // useEffect(() => {
  //   if (selectedBank) {
  //     setSelectedStudent({
  //       studentCode: selectedBank.studentCode,
  //       name: selectedBank.name,
  //       fatherName: selectedBank.fatherName,
  //       current_grade: selectedBank.current_grade
  //     })
  //   }
  // }, [selectedBank])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-zinc-900/30 p-2 backdrop-blur-sm">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close form"
        onClick={closeForm}
        className="absolute inset-0 cursor-default"
      />

      {/* Form */}
      <div className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">
              {isEdit ? 'Edit Account' : 'Create New Account'}
            </h2>

            <p className="text-sm text-zinc-500">
              {isEdit
                ? 'Update the student bank transaction.'
                : 'Search student and fill the form to create a student bank account.'}
            </p>
          </div>

          <button
            type="button"
            onClick={closeForm}
            className="flex size-9 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-3">

          {/* Student Search */}
          <section className="space-y-3">
            <div>
              <label
                htmlFor="student-search"
                className="text-sm font-semibold text-zinc-800"
              >
                {isEdit ? 'Selected' : 'Search'} Student
              </label>

              <p className="mt-1 text-xs text-zinc-500">
                {isEdit ? 'Fill in the available inputs.' : 'Enter the student code to find a student.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`flex h-9 flex-1 items-center rounded-full border bg-white px-3 transition-colors duration-200 ${errors.studentCode
                  ? 'border-red-400 focus-within:border-red-500'
                  : 'border-zinc-300 focus-within:border-zinc-500'
                  }`}
              >
                <input
                  id="student-search"
                  type="text"
                  value={studentCode}
                  disabled={isEdit}
                  onChange={(e) => {
                    setStudentCode(e.target.value)

                    if (errors.studentCode) {
                      setErrors((prev) => ({
                        ...prev,
                        studentCode: '',
                      }))
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      searchStudent()
                    }
                  }}
                  placeholder="e.g. STU-0011"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:text-zinc-500"
                />
              </div>

              {!isEdit && (
                <Button
                  type="button"
                  icon={Search}
                  onClick={searchStudent}
                >
                  Search
                </Button>
              )}
            </div>

            {errors.studentCode && (
              <p className="text-xs text-red-500">
                {errors.studentCode}
              </p>
            )}

            {selectedStudent && !errors.studentCode && !isEdit && (
              <p className="text-xs text-green-600">
                Student matched and auto filled successfully.
              </p>
            )}
          </section>

          {/* Student Information */}
          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-800">
              Student Information
            </h4>

            <p className='text-xs text-zinc-500'>Information will be automatacally filled.</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-600"
                >
                  Name
                </label>

                <input
                  id="name"
                  value={selectedStudent?.name ?? ''}
                  disabled
                  placeholder="Student name"
                  className="w-full cursor-not-allowed rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-600 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="father-name"
                  className="text-sm font-medium text-zinc-600"
                >
                  Father Name
                </label>

                <input
                  id="father-name"
                  value={selectedStudent?.fatherName ?? ''}
                  disabled
                  placeholder="Father name"
                  className="w-full cursor-not-allowed rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-600 outline-none"
                />
              </div>

              <div className="col-span-2 space-y-1.5">
                <label
                  htmlFor="current-grade"
                  className="text-sm font-medium text-zinc-600"
                >
                  Current Grade
                </label>

                <input
                  id="current-grade"
                  value={selectedStudent?.current_grade ?? ''}
                  disabled
                  placeholder="Current Grade"
                  className="w-full cursor-not-allowed rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-600 outline-none"
                />
              </div>

            </div>
          </section>

          {/* Transaction */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-800">
              Amount Information
            </h3>

            {/* Transaction Type */}
            <div className="space-y-1.5">
              <label
                htmlFor="transaction-type"
                className="text-sm font-medium text-zinc-700"
              >
                Opening Amount Type
              </label>

              <select
                id="transaction-type"
                name="amountType"
                value={formData.amountType}
                onChange={handleChange}
                className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none transition ${errors.amountType
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-zinc-300 focus:border-zinc-500'
                  }`}
              >
                <option value="">
                  Select Amount Type
                </option>

                <option value="debit">
                  Debit (+)
                </option>
                <option value="credit">
                  Credit (-)
                </option>

              </select>

              {errors.amountType && (
                <p className="text-xs text-red-500">
                  {errors.amountType}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <label
                htmlFor="amount"
                className="text-sm font-medium text-zinc-700"
              >
                Amount
              </label>

              <div
                className={`flex items-center rounded-md border px-3 transition ${errors.amount
                  ? 'border-red-400 focus-within:border-red-500'
                  : 'border-zinc-300 focus-within:border-zinc-500'
                  }`}
              >
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className={`w-full bg-transparent py-2 text-sm outline-none ${formData.amountType === 'credit' ? 'text-red-500' : 'text-zinc-950'}`}
                />

                <span className="text-xs text-zinc-400">
                  MMK
                </span>
              </div>

              {errors.amount && (
                <p className="text-xs text-red-500">
                  {errors.amount}
                </p>
              )}
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 py-2">
            <Button
              type="button"
              onClick={closeForm}
              icon={XIcon}
              variant="danger"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={submitForm}
              icon={Save}
            >
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}