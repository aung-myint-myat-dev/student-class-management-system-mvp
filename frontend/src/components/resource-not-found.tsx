import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileQuestion } from "lucide-react"
import { useNavigate } from "react-router"

interface ResourceNotFoundProps {
  resource?: string
  backTo?: string
}

export function ResourceNotFound({
  resource = "Resource",
  backTo,
}: ResourceNotFoundProps) {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card size="sm" className="mx-auto w-full max-w-2xl">
        <CardHeader className="flex flex-col items-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="size-6 text-muted-foreground" />
          </div>

          <CardTitle className="mt-2 font-bold">
            {resource} not found
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="h-full text-center text-sm text-muted-foreground">
            The {resource.toLowerCase()} you are looking for
            could not be found or may have been deleted.
          </p>
        </CardContent>

        <CardFooter className="justify-center">
          {backTo ? (
            <Button
              variant="outline"
              onClick={() => navigate(backTo)}
            >
              Go back
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Go back
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}