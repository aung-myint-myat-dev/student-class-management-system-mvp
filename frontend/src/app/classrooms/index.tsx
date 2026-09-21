import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { Ellipsis, Eye, Pencil, Trash2 } from "lucide-react"

import { getClassrooms } from "./api/get-classrooms"
import { deleteClassroom as apiDeleteClassroom } from "./api/delete-classroom"
import type { Classroom } from "./types"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useBreadcrumb } from "@/context/breadcrumb-context"

export default function Classrooms() {
  const navigate = useNavigate()
  const { setBreadcrumbs } = useBreadcrumb()

  const [fetchingClassrooms, setFetchingClassrooms] = useState(false)
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [deleteClassroom, setDeleteClassroom] = useState<Classroom | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Dashboard",
        href: "/",
      },
      {
        label: "Classrooms",
      },
    ])
  }, [setBreadcrumbs])

  const fetchClassrooms = async () => {
    try {
      setFetchingClassrooms(true)

      const data = await getClassrooms()

      setClassrooms(data)
    } catch (error) {
      console.error("Failed to fetch classrooms:", error)
      toast.error("Failed to load classrooms.")
    } finally {
      setFetchingClassrooms(false)
    }
  }

  const handleDeleteClassroom = async (id: number) => {
    try {
      setLoading(true)

      const response = await apiDeleteClassroom(id)

      if (response.status === 204 || response.status === 200) {
        toast.success("Classroom deleted successfully.")

        setClassrooms((prev) =>
          prev.filter((classroom) => classroom.id !== id)
        )
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete classroom.")
    } finally {
      setLoading(false)
      setDeleteClassroom(null)
    }
  }

  useEffect(() => {
    fetchClassrooms()
  }, [])

  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="p-3">
        <h2 className="text-2xl font-bold">
          All Classrooms List
        </h2>

        <p className="text-sm text-accent-foreground">
          You can see your classrooms here.
        </p>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="ps-3">
                Name
              </TableHead>

              <TableHead className="w-20 text-right pe-3" />
            </TableRow>
          </TableHeader>

          {fetchingClassrooms && (
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="ps-3">
                    <Skeleton className="h-6 w-full max-w-sm" />
                  </TableCell>

                  <TableCell className="text-right pe-3">
                    <Skeleton className="ml-auto h-6 w-8" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

          {!fetchingClassrooms && classrooms.length > 0 && (
            <TableBody>
              {classrooms.map((classroom) => (
                <TableRow key={classroom.id}>
                  <TableCell className="ps-3 font-medium">
                    {classroom.name}
                  </TableCell>

                  <TableCell className="text-right pe-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                        >
                          <Ellipsis className="size-4" />
                          <span className="sr-only">
                            Open actions
                          </span>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-36"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/classrooms/${classroom.id}`)
                          }
                        >
                          <Eye className="size-4" />
                          View
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() =>
                            navigate(
                              `/classrooms/${classroom.id}/edit`
                            )
                          }
                        >
                          <Pencil className="size-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={(e) => {
                            e.preventDefault()
                            setDeleteClassroom(classroom)
                          }}
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

          {!fetchingClassrooms && classrooms.length === 0 && (
            <TableCaption className="mb-4">
              No classrooms found.
            </TableCaption>
          )}
        </Table>
      </div>

      <AlertDialog
        open={!!deleteClassroom}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteClassroom(null)
          }
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2 />
            </AlertDialogMedia>

            <AlertDialogTitle>
              Delete classroom?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This will permanently delete this classroom.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              disabled={loading}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              disabled={loading}
              onClick={() => {
                if (deleteClassroom) {
                  handleDeleteClassroom(deleteClassroom.id)
                }
              }}
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


