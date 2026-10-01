import { useEffect, useState } from "react";
import { Button } from "./ui/buttom";
import { ClipboardPlus, Save, X } from "lucide-react";
import { type TranscationFormType } from "../types";
import { TranscationTypeRadio } from "./ui/transcation-type-radio";

const emptyForm: TranscationFormType = {
  date: '',
  transcation_type: '',
  amount: '',
  description: '',
  payment_method: '',
  images: []
}

export function TranscationForm() {
  const [enableForm, setEnableForm] = useState<boolean>(false)
  const [transcationForm, setTranscationForm] = useState<TranscationFormType>(emptyForm)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setTranscationForm((prev) => ({
      ...prev,
      [name]: value
    }))
    // console.log(transcationForm)
  }

  const handleEnableForm = () => {
    setEnableForm(true)
  }

  const handleDisableForm = () => {
    setEnableForm(false)
    setTranscationForm(emptyForm)
  }

  useEffect(() => {
    console.log(transcationForm)
  }, [transcationForm])

  return (
    <div className="col-span-3 grid h-50 w-full grid-cols-3 border rounded-md  shadow-sm p-2">
      {/* Column 1 */}
      <div className="grid h-full grid-rows-3 gap-4 overflow-hidden p-2">
        {/* Cash In / Cash Out */}
        <div className="flex items-center gap-2">
          <TranscationTypeRadio
            id="cash_in_radio"
            name="transcation_type"
            disabled={!enableForm}
            onChange={handleChange}
            checked={transcationForm.transcation_type === 'cash_in'}
            value="cash_in"
            label="Cash in" />

          <TranscationTypeRadio
            id="cash_out_radio"
            name="transcation_type"
            disabled={!enableForm}
            onChange={handleChange}
            checked={transcationForm.transcation_type === 'cash_out'}
            value="cash_out"
            label="Cash out" />
        </div>

        {/* Date */}
        <DateInput name="date" value={transcationForm.date} onChange={handleChange} enable={enableForm} />

        {/* Amount */}
        <AmountInput enable={enableForm} />
      </div>

      {/* Column 2 */}
      <div className="grid h-full grid-rows-3 gap-4 overflow-hidden  p-2">
        <DescriptionInput enable={enableForm} />
        {/* Payment Method */}
        <PaymentMethodSelect enable={enableForm} />
      </div>

      {/* Column 3 */}
      <div className="grid h-full grid-rows-3 gap-4 overflow-hidden p-2">
        {/* Image Upload */}
        <ImageUpload enable={enableForm} exisitingImages={transcationForm.images} />

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 p-2">
          {enableForm ? (
            <>
              <Button icon={X} onClick={handleDisableForm} className="flex-1" variant="danger">Cancel</Button>
              <Button icon={Save} className="flex-1" >Save</Button>
            </>
          ) : (
            <Button onClick={handleEnableForm} icon={ClipboardPlus} className="w-full">Add New Transcation</Button>
          )}
        </div>
      </div>
    </div>
  )
}

interface DateInputProps {
  enable: boolean
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}
function DateInput({ enable, value,name, onChange }: DateInputProps) {
  return (
    <div className="relative border rounded-sm shadow-xs p-2">
      <label htmlFor="date-input" className={`absolute -top-2 left-2 text-xs font-semibold ${enable ? 'text-zinc-700' : 'text-zinc-300'} bg-white px-2`}>Date</label>
      <input
        disabled={!enable}
        value={value}
        onChange={onChange}
        name={name}
        type="date"
        className={`h-full w-full bg-transparent text-sm ${enable ? 'text-zinc-700' : 'text-zinc-300'} outline-none`}
      />
    </div>
  )
}

interface AmountInputProps {
  enable: boolean
}
function AmountInput({ enable }: AmountInputProps) {
  return (
    <div className="relative border rounded-sm shadow-xs p-2">
      <label htmlFor="number-input" className={`absolute -top-2 left-2 text-xs font-semibold ${enable ? 'text-zinc-700' : 'text-zinc-300'} bg-white px-2`}>Amount</label>
      <input
        disabled={!enable}
        id="number-input"
        type="number"
        placeholder="Enter amount"
        className={`h-full w-full bg-transparent text-sm ${enable ? 'text-zinc-700' : 'text-zinc-300'} outline-none`}
      />
    </div>
  )
}

interface DescriptionInputProps {
  enable: boolean
}
function DescriptionInput({ enable }: DescriptionInputProps) {
  return (
    <div className="relative row-span-2 border rounded-sm shadow-xs p-2">
      <label htmlFor="description-input" className={`absolute -top-2 left-2 text-xs font-semibold ${enable ? 'text-zinc-700' : 'text-zinc-300'} bg-white px-2`}>Description</label>
      <div className="h-full overflow-hidden">
        <textarea
          id="description-input"
          disabled={!enable}
          placeholder="Enter description..."
          className={`h-full max-h-full w-full bg-transparent text-sm ${enable ? 'text-zinc-700' : 'text-zinc-300'} outline-none`}
        />
      </div>
    </div>
  )
}

interface PaymentMethodSelectProps {
  enable: boolean
}
function PaymentMethodSelect({ enable }: PaymentMethodSelectProps) {
  return (
    <div className="relative border rounded-sm shadow-xs p-2">
      <label htmlFor="date-input" className={`absolute -top-2 left-2 text-xs font-semibold ${enable ? 'text-zinc-700' : 'text-zinc-300'} bg-white px-2`}>Select payment method</label>
      <select
        disabled={!enable}
        defaultValue=""
        className={`h-full max-h-full w-full bg-transparent text-sm ${enable ? 'text-zinc-700' : 'text-zinc-300'} outline-none`}
      >
        <option defaultValue="cash" value="cash">Cash</option>
        <option value="kbzpay">KBZ Pay</option>
        <option value="wavepay">Wave Pay</option>
      </select>
    </div>
  )
}

type Image = {
  url: string
}
interface ImageUploadProps {
  enable: boolean
  exisitingImages: Image[]
}
function ImageUpload({ enable, exisitingImages }: ImageUploadProps) {
  return (
    <div className="row-span-2 overflow-hidden">
      <div className="grid h-full grid-cols-3 gap-2">
        {/* Uploaded Image */}
        {exisitingImages.length > 0 && (
          <div className="relative overflow-hidden rounded-md border bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
              alt="Uploaded"
              className="h-full w-full object-cover"
            />

            {/* Image Count */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-black/60 px-2 text-xs font-medium text-white">
                3
              </span>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <label className={
          `${exisitingImages.length > 0 ? 'col-span-2' : 'col-span-3'} flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed ${enable ? 'border-zinc-300 hover:bg-zinc-100' : 'border-zinc-100'} bg-zinc-50 transition`
        }>
          <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full ${enable ? 'bg-white' : 'bg-zinc-200'} shadow-sm`}>
            <span className="text-xl text-zinc-500">+</span>
          </div>

          <span className={`text-xs font-medium ${enable ? 'text-zinc-700' : 'text-zinc-300'}`}>
            Upload image
          </span>

          <span className={`mt-1 text-[10px] text-xs font-medium ${enable ? 'text-zinc-700' : 'text-zinc-300'}`}>
            PNG, JPG, WEBP
          </span>

          <input
            disabled={!enable}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />
        </label>
      </div>
    </div>
  )
}