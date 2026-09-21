import { Button } from "@/components/ui/button"
import { Book, Mail, Pencil, Phone, User2 } from "lucide-react"
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
import { Trash2Icon } from "lucide-react"
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
import type { Student } from "./types"
import { toast } from "sonner"
import { useBreadcrumb } from "@/context/breadcrumb-context"
import { getStudent } from "./api/get-student"
import { deleteStudent } from "./api/delete-student"
import { DetailSkeleton } from "@/components/detail-skeleton"
import { ResourceNotFound } from "@/components/resource-not-found"

export function StudentDetail() {
  const { id } = useParams()
  const [isFetchingStudent, setIsFetchingStudent] = useState<boolean>(false)
  const [isDeletingStudent, setIsDeletingStudent] = useState<boolean>(false)
  const [student, setStudent] = useState<Student>()
  const navigate = useNavigate()
  const { setBreadcrumbs } = useBreadcrumb()

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Dashboard",
        href: "/",
      },
      {
        label: "Students",
        href: "/students",
      },
      {
        label: "Detail",
      },
    ])
  }, [setBreadcrumbs])

  const fetchStudent = async () => {
    try {
      setIsFetchingStudent(true)
      const data = await getStudent(id)
      setStudent(data)
    } catch (error) {
      console.error(
        "Failed to fetch student:",
        error
      )
      toast.error(
        "Failed to load student."
      )
    } finally {
      setIsFetchingStudent(false)
    }
  }
  useEffect(() => {
    fetchStudent()
  }, [])

  if (isFetchingStudent) return <DetailSkeleton/>
  if (!student) return <ResourceNotFound resource="Student" backTo="/students"/>

  const handleDeleteStudent = async (
    id: any
  ) => {
    try {
      setIsDeletingStudent(true)
      const response = await deleteStudent(id);
      if (
        response.status === 204 ||
        response.status === 200
      ) {
        toast.success(
          "Student deleted successfully."
        )
        navigate('/students')
      }
    } catch (error) {
      console.error(error)
      toast.error(
        "Failed to delete student."
      )
    } finally {
      setIsDeletingStudent(false)
    }
  }

  return (
    <Card size="sm" className="mx-auto w-full">

      <CardHeader>
        <CardTitle>Student Detail</CardTitle>
        <CardDescription>
          This information of student.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex w-full flex-col gap-6">

          <Item variant="outline">
            <ItemMedia variant="icon">
              <User2 />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Name</ItemTitle>
              <ItemDescription>
                {student.name}
              </ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="outline">
            <ItemMedia variant="icon">
              <Mail />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Email</ItemTitle>
              <ItemDescription>
                {student.email}
              </ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="outline">
            <ItemMedia variant="icon">
              <Phone />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Phone</ItemTitle>
              <ItemDescription>
                {student.phone}
              </ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="outline">
            <ItemMedia variant="icon">
              <Book />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Class</ItemTitle>
              <ItemDescription>
                {student.class.name}
              </ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-3">
        <Button onClick={() => navigate(`/students/${student.id}/edit`)} variant="outline" size="sm">
          <Pencil/>
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>
              <Trash2Icon />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete student?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the student.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={isDeletingStudent} onClick={() => handleDeleteStudent(student.id)} variant="destructive">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}




