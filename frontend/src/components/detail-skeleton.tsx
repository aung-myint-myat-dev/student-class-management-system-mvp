import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface DetailItemSkeletonProps {
  valueWidth?: string
}

function DetailItemSkeleton({
  valueWidth = "w-40",
}: DetailItemSkeletonProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Skeleton className="size-10 rounded-md" />

      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className={`h-4 ${valueWidth}`} />
      </div>
    </div>
  )
}

interface DetailSkeletonProps {
  valueCount?: number
  valueWidths?: string[]
}

export function DetailSkeleton({
  valueCount = 4,
  valueWidths = [],
}: DetailSkeletonProps) {
  return (
    <Card size="sm" className="mx-auto w-full">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>

      <CardContent>
        <div className="flex w-full flex-col gap-6">
          {Array.from({ length: valueCount }).map((_, index) => (
            <DetailItemSkeleton
              key={index}
              valueWidth={valueWidths[index] ?? "w-40"}
            />
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-3">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  )
}