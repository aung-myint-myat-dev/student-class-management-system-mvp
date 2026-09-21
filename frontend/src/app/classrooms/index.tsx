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
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { AxiosError } from "axios"

export default function Classrooms() {
  const navigate = useNavigate()
  const { setBreadcrumbs } = useBreadcrumb()

  const [fetchingClassrooms, setFetchingClassrooms] = useState(false)
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [deleteClassroom, setDeleteClassroom] = useState<Classroom | null>(null)
  const [loading, setLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [lastPage, setLastPage] = useState(1)

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

  const fetchClassrooms = async (page = currentPage, limit = perPage) => {
    try {
      setFetchingClassrooms(true)

      const res = await getClassrooms({
        page: page,
        perPage: limit
      })

      setClassrooms(res.data)
      setCurrentPage(res.meta.current_page)
      setLastPage(res.meta.last_page)
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
        const isClassroomOnLastPage = classrooms.length === 1

        if (isClassroomOnLastPage && currentPage > 1) {
          fetchClassrooms(currentPage - 1, perPage)
        } else {
          fetchClassrooms(currentPage, perPage)
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast.error(
            error.response.data.message ?? "Cannot delete this classroom."
          )
          return
        }
      }
    } finally {
      setLoading(false)
      setDeleteClassroom(null)
    }
  }

  const goToPage = (page: number) => {
    if (page < 1 || page > lastPage || page === currentPage || fetchingClassrooms) { return }
    fetchClassrooms(page, perPage)
  }

  useEffect(() => {
    fetchClassrooms(1, perPage)
  }, [perPage])

  return (
    <div className="flex flex-col gap-4">
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

      {!fetchingClassrooms && lastPage > 1 && (
        <div className="flex items-center justify-between gap-4">
          <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
            <Select defaultValue={String(perPage)} onValueChange={(value) => {
              setPerPage(Number(value))
              setCurrentPage(1)
            }}>
              <SelectTrigger className="w-20" id="select-rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <Button disabled={currentPage === 1 || fetchingClassrooms} variant="outline"
                  onClick={() => goToPage(currentPage - 1)}>Previous</Button>
              </PaginationItem>
              <PaginationItem>
                <Button disabled={currentPage === lastPage || fetchingClassrooms} variant="outline"
                  onClick={() => goToPage(currentPage + 1)}>Next</Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

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
