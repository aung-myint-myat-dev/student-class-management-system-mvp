import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { getStudents } from "./api/get-students";
import type { Student } from "./types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useBreadcrumb } from "@/context/breadcrumb-context";
import { deleteStudent as apiDeleteStudent } from "./api/delete-student";
import { Skeleton } from "@/components/ui/skeleton";

export default function Students() {
  const navigate = useNavigate()
  const [fetchingStudents, setFetchingStudents] = useState<boolean>(false)
  const [students, setStudents] = useState<Student[] | []>([])
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(false);
  const { setBreadcrumbs } = useBreadcrumb()
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
        label: "Students",
      },
    ])
  }, [setBreadcrumbs])

  const fetchStudents = async (page = currentPage, limit = perPage) => {
    try {
      setFetchingStudents(true)
      const res = await getStudents({
        page: page,
        perPage: limit
      })
      setStudents(res.data)
      setCurrentPage(res.meta.current_page)
      setLastPage(res.meta.last_page)
    } catch (error) {
      console.error(
        "Failed to fetch students:",
        error
      )
      toast.error(
        "Failed to load students."
      )
    } finally {
      setFetchingStudents(false)
    }
  }

  const handleDeleteStudent = async (
    id: any
  ) => {
    try {
      setLoading(true)
      const response = await apiDeleteStudent(id);
      if (
        response.status === 204 ||
        response.status === 200
      ) {
        toast.success(
          "Student deleted successfully."
        )
        const isStudentOnLastPage = students.length === 1
        if(isStudentOnLastPage && currentPage > 1) {
          fetchStudents(currentPage - 1, perPage)
        } else {
          fetchStudents(currentPage, perPage)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error(
        "Failed to delete student."
      )
    } finally {
      setLoading(false)
      setDeleteStudent(null)
    }
  }

  const goToPage = (page: number) => {
    if( page < 1 || page > lastPage || page === currentPage || fetchingStudents ) { return }
    fetchStudents(page, perPage)
  }

  useEffect(() => {
    fetchStudents(1, perPage)
  }, [perPage])

  return (
    <div className="flex flex-col gap-4">
      <div className="p-3">
        <h2 className="font-bold text-2xl">All Students List</h2>
        <p className="text-sm text-accent-foreground">You can see your students here.</p>
      </div>

      <div className="border rounded-xl">
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead className="w-75 ps-3">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Class</TableHead>
              <TableHead className="text-right pe-3"></TableHead>
            </TableRow>
          </TableHeader>

          {/* Skeleton */}
          {fetchingStudents && (
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell> <Skeleton className="h-6" /> </TableCell>
                  <TableCell> <Skeleton className="h-6" /> </TableCell>
                  <TableCell> <Skeleton className="h-6" /> </TableCell>
                  <TableCell> <Skeleton className="h-6" /> </TableCell>
                  <TableCell> <Skeleton className="h-6" /> </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

          {/* Data Table */}
          {students.length > 0 && !fetchingStudents && (
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium ps-3">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.class.name}</TableCell>
                  <TableCell className="text-right pe-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                        >
                          <Ellipsis className="size-4" />
                          <span className="sr-only">Open actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-36"
                      >
                        <DropdownMenuItem onClick={() => navigate(`/students/${student.id}`)} >
                          <Eye className="size-4" /> View
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => navigate(`/students/${student.id}/edit`)} >
                          <Pencil className="size-4" /> Edit
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={(e) => { e.preventDefault(); setDeleteStudent(student) }} >
                          <Trash2 className="size-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

          {students.length === 0 && (
            <TableCaption className="mb-4">No students found.</TableCaption>
          )}
        </Table>
      </div>

      {/* Paginator */}
      {!fetchingStudents && lastPage > 1 && (
        <div className="flex items-center justify-between gap-4">
          <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
            <Select defaultValue={String(perPage)}
            onValueChange={(value) => {
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
                <Button disabled={currentPage === 1} variant={'outline'} onClick={() => goToPage(currentPage - 1)}>Previous</Button>
              </PaginationItem>
              <PaginationItem>
                <Button disabled={currentPage === lastPage} variant={'outline'} onClick={() => goToPage(currentPage + 1)}>Next</Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteStudent}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteStudent(null)
          }
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete student?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this student.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteStudent(deleteStudent?.id)} disabled={loading} variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
