import { Button } from "@/components/ui/button"
import { BookOpen, Pencil, Trash2Icon } from "lucide-react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import type { Classroom } from "./types"
import { toast } from "sonner"
import { useBreadcrumb } from "@/context/breadcrumb-context"
import { getClassroom } from "./api/get-classroom"
import { deleteClassroom } from "./api/delete-classroom"
import { DetailSkeleton } from "@/components/detail-skeleton"
import { ResourceNotFound } from "@/components/resource-not-found"

export function ClassroomDetail() {
  const { id } = useParams()
  const [isFetchingClassroom, setIsFetchingClassroom] = useState(false)
  const [isDeletingClassroom, setIsDeletingClassroom] = useState(false)
  const [classroom, setClassroom] = useState<Classroom>()
  const navigate = useNavigate()
  const { setBreadcrumbs } = useBreadcrumb()

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Dashboard",
        href: "/",
      },
      {
        label: "Classrooms",
        href: "/classrooms",
      },
      {
        label: "Detail",
      },
    ])
  }, [setBreadcrumbs])

  const fetchClassroom = async () => {
    try {
      setIsFetchingClassroom(true)

      const data = await getClassroom(id)

      setClassroom(data)
    } catch (error) {
      console.error(
        "Failed to fetch classroom:",
        error
      )

      toast.error(
        "Failed to load classroom."
      )
    } finally {
      setIsFetchingClassroom(false)
    }
  }

  useEffect(() => {
    fetchClassroom()
  }, [])

  if (isFetchingClassroom) {
    return <DetailSkeleton valueCount={1} />
  }

  if (!classroom) {
    return (
      <ResourceNotFound
        resource="Classroom"
        backTo="/classrooms"
      />
    )
  }

  const handleDeleteClassroom = async (
    id: number
  ) => {
    try {
      setIsDeletingClassroom(true)

      const response = await deleteClassroom(id)

      if (
        response.status === 204 ||
        response.status === 200
      ) {
        toast.success(
          "Classroom deleted successfully."
        )

        navigate("/classrooms")
      }
    } catch (error) {
      console.error(error)

      toast.error(
        "Failed to delete classroom."
      )
    } finally {
      setIsDeletingClassroom(false)
    }
  }

  return (
    <Card size="sm" className="mx-auto w-full">
      <CardHeader>
        <CardTitle>
          Classroom Detail
        </CardTitle>

        <CardDescription>
          This information of classroom.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex w-full flex-col gap-6">
          <Item variant="outline">
            <ItemMedia variant="icon">
              <BookOpen />
            </ItemMedia>

            <ItemContent>
              <ItemTitle>
                Classroom name
              </ItemTitle>

              <ItemDescription>
                {classroom.name}
              </ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-3">
        <Button
          onClick={() =>
            navigate(
              `/classrooms/${classroom.id}/edit`
            )
          }
          variant="outline"
          size="sm"
        >
          <Pencil />
          Edit
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2Icon />
              Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>

              <AlertDialogTitle>
                Delete classroom?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This will permanently delete the classroom.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel
                variant="outline"
                disabled={isDeletingClassroom}
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                disabled={isDeletingClassroom}
                onClick={() =>
                  handleDeleteClassroom(
                    classroom.id
                  )
                }
                variant="destructive"
              >
                {isDeletingClassroom
                  ? "Deleting..."
                  : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}