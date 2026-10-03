import { ImageIcon, Pencil, RotateCcwClock, Trash2 } from 'lucide-react'
import { isCreditBalance } from '../lib/is-credit-balance';
import { type _studentBankTranscationImage, type _studentBankTranscation } from '../data/schema';
import { useState } from 'react';
import { ImageDialog } from './images-dialog';
import { DescriptionDialog } from './description-dialog';
import { DeleteConfirmationDialog } from './delete-confirmation-dialog';
import { api } from '@/lib/api';

interface TranscationHistoriesTableProps {
  histories: _studentBankTranscation[]
  mainBalance: number
  onEdit: (transcation: _studentBankTranscation) => void
  fetchBank: () => void
}

export function TranscationHistoriesTable({ histories, mainBalance, onEdit, fetchBank }: TranscationHistoriesTableProps) {
  const [showImages, setShowImages] = useState<boolean>(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
  const [showDescription, setShowDescription] = useState<boolean>(false)

  const [selectedImages, setSelectedImages] = useState<_studentBankTranscationImage[] | null>(null)
  const [selectedDescription, setSelectedDescription] = useState<string>('')
  const [selectedTranscationId, setSelectedTranscationId] = useState<number | null>(null)

  const handleShowImageDialog = (images: _studentBankTranscationImage[]) => {
    setSelectedImages(images)
    setShowImages(true)
  }

  const handleCloseImageDialog = () => {
    setSelectedImages(null)
    setShowImages(false)
  }

  const handleShowDescription = (des: string) => {
    setSelectedDescription(des)
    setShowDescription(true)
  }

  const handleCloseDescriptionDialog = () => {
    setSelectedDescription('')
    setShowDescription(false)
  }

  const handleShowDeleteConfirmationDialog = (id: number) => {
    setShowDeleteConfirmation(true)
    setSelectedTranscationId(id)
  }

  const handleCloseDeleteConfirmationDialog = () => {
    setShowDeleteConfirmation(false)
    setSelectedTranscationId(null)
  }

  const deleteTranscation = async () => {
    if(selectedTranscationId) {
      await api.delete(`transcations/${selectedTranscationId}`)
    }
    fetchBank()
    handleCloseDeleteConfirmationDialog()
  }

  return (
    <>
      <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center gap-2 text-zinc-500 text-sm'>
          <RotateCcwClock className='size-4' />
          <span>Transcation Histories</span>
        </div>

        <div className='flex items-center gap-1'>
          <h2 className='font-bold text-zinc-600 text-sm'>Main Balance </h2>
          <span className={`inline-block font-bold text-md py-1.5 px-4 ${isCreditBalance(mainBalance) ? 'text-red-500' : 'text-zinc-500'}`}>{Number(mainBalance).toLocaleString()} MMK</span>
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
                    <button className='line-clamp-2 text-start hover:underline' onClick={() => handleShowDescription(history.description)}>
                      {history.description}
                    </button>
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {history.transcation_type === 'cash_in' ? Number(history.amount).toLocaleString() + ' MMK' : '-'}
                  </td>

                  <td className="px-4 py-3 text-sm text-red-600">
                    {history.transcation_type === 'cash_out' ? Number(history.amount).toLocaleString().replace('-', '') + ' MMK' : '-'}
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {history.payment_method?.toLocaleUpperCase() ?? '-'}
                  </td>

                  <td className={`px-4 py-3 font-semibold text-right text-sm ${isCreditBalance(history.amount) ? 'text-red-500' : 'text-zinc-600'}`}>
                    <span>
                      {Number(history.remaing_balance).toLocaleString().replace('-', '')}
                    </span> {' '}
                    MMK
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    <div className='relative size-12 overflow-hidden rounded-sm border ml-auto'>
                      {history.images.length > 0 ? (
                        <>
                          <img src={history.images[0].image_url} alt="" className='w-full h-full object-cover' />
                          {history.images.length > 1 && (
                            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6 bg-green-500 text-white text-xs flex items-center justify-center rounded-full'>+{history.images.length}</span>
                          )}
                          <button onClick={() => handleShowImageDialog(history.images)} className='absolute top-0 left-0 w-full h-full cursor-pointer'></button>
                        </>
                      ) : (
                        <ImageIcon className='w-full h-full text-zinc-300' />
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => onEdit(history)}
                        type="button">
                        <Pencil className="size-4 cursor-pointer text-yellow-500" />
                      </button>

                      <button
                        onClick={() => handleShowDeleteConfirmationDialog(Number(history.id))}
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

      {showImages && (
        <ImageDialog images={selectedImages} closeDialog={handleCloseImageDialog} />
      )}

      {showDescription && (
        <DescriptionDialog description={selectedDescription} closeDialog={handleCloseDescriptionDialog} />
      )}

      <DeleteConfirmationDialog
        title='Delete transcation!'
        onClose={handleCloseDeleteConfirmationDialog}
        open={showDeleteConfirmation}
        onConfirm={deleteTranscation}
      />

    </>
  )
}