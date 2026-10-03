import { X } from "lucide-react";
import type { _studentBankTranscationImage } from "../data/schema";
import { Button } from "./ui/buttom";

interface ImageDialogProps {
  images: _studentBankTranscationImage[] | null
  closeDialog: () => void
}
export function ImageDialog({ images, closeDialog }: ImageDialogProps) {
  return (
    <div className="fixed top-0 left-0 bg-zinc-900/50 backdrop-blur-sm w-full h-full flex items-center p-2">
      <button onClick={closeDialog} className="flex-1 h-full"></button>

      <div className="relative w-full h-full flex flex-col gap-6 bg-white max-w-2xl border shadow-xs rounded-md p-6 overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Transcation images</h2>
            <p className="text-sm text-zinc-500">Here are your transcation images.</p>
          </div>

          <Button onClick={closeDialog} variant="ghost" className="size-12 rounded-full">
            <X className="size-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 p-1">
          <div className="grid grid-cols-2 gap-2 auto-rows-fr">
            {images?.map((image, index) => (
              <div
                key={image.id || index}
                className="relative aspect-square w-full rounded-md border shadow-xs overflow-hidden bg-muted"
              >
                <img
                  src={image.image_url}
                  alt="Transaction attachment"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button onClick={closeDialog} variant="danger">Close</Button>
        </div>
      </div>
    </div>
  )
}