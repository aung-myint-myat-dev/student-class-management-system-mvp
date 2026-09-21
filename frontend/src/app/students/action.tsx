import { useEffect, useState } from "react"
import { useLoaderData, useNavigate } from "react-router"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { api } from "@/lib/api"
import type { Classroom, ClassroomOption, Student, StudentFormData } from "./types"
import { useBreadcrumb } from "@/context/breadcrumb-context"
import { Loader2Icon } from "lucide-react"

type LoaderData = {
  student?: Student
}

interface StudentActionProps {
  isEdit: boolean
}

const emptyForm: StudentFormData = {
  name: "",
  email: "",
  phone: "",
  classroom_id: "",
}

export default function StudentAction({
  isEdit,
}: StudentActionProps) {

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
        label: isEdit ? 'Edit student' : 'Create student',
      },
    ])
  }, [setBreadcrumbs, isEdit])

  const loaderData = useLoaderData() as LoaderData | undefined
  const student = loaderData?.student
  const [classes, setClasses] = useState<ClassroomOption[]>([])
  const [loading, setLoading] = useState(false)
  const [classesLoading, setClassesLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<StudentFormData>(emptyForm)

  useEffect(() => {
    if (!isEdit || !student) {
      setFormData(emptyForm)
      setErrors({})
      return
    }
    setFormData({
      name: student.name ?? "",
      email: student.email ?? "",
      phone: student.phone ?? "",
      classroom_id: String(student.class?.id ?? ""),
    })
    setErrors({})
  }, [isEdit, student])

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setClassesLoading(true)
        const response = await api.get("/classrooms")
        const classrooms: Classroom[] =
          response.data.data ?? []
        const options: ClassroomOption[] =
          classrooms.map((classroom) => ({
            value: String(classroom.id),
            label: classroom.name,
          }))
        setClasses(options)
      } catch (error) {
        console.error(
          "Failed to fetch classrooms:",
          error
        )
        toast.error("Failed to load classrooms.")
      } finally {
        setClassesLoading(false)
      }
    }
    fetchClasses()
  }, [])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((prev) => {
      if (!prev[name]) {
        return prev
      }
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleClassroomChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      classroom_id: value,
    }))
    setErrors((prev) => {
      if (!prev.classroom_id) {
        return prev
      }
      const next = { ...prev }
      delete next.classroom_id
      return next
    })
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        classroom_id: Number(formData.classroom_id),
      }
      let response
      if (isEdit && student) {
        response = await api.put(
          `/students/${student.id}`,
          payload
        )
      } else {
        response = await api.post(
          "/students",
          payload
        )
      }
      if (
        response.status === 200 ||
        response.status === 201
      ) {
        toast.success(
          response.data?.message ??
          (isEdit
            ? "Student updated successfully."
            : "Student created successfully.")
        )
        navigate("/students")
      }
    } catch (error) {
      console.error(
        "Student action failed:",
        error
      )

      if (
        error instanceof AxiosError &&
        error.response?.status === 422
      ) {
        const validationErrors =
          error.response.data?.errors

        if (validationErrors) {
          const formattedErrors: Record<
            string,
            string
          > = {}
          Object.entries(validationErrors).forEach(
            ([field, message]) => {
              formattedErrors[field] =
                Array.isArray(message)
                  ? String(message[0])
                  : String(message)
            }
          )
          setErrors(formattedErrors)
        }
        return
      }

      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message ??
          "Something went wrong."
          : "Something went wrong."
      )
    } finally {
      setLoading(false)
    }
  }

  const submitText = loading
    ? isEdit
      ? "Updating..."
      : "Creating..."
    : isEdit
      ? "Update"
      : "Create"

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>
          {isEdit ? "Update" : "Create"} a student
        </CardTitle>

        <CardDescription>
          {isEdit
            ? "Update student information here."
            : "Create a new student here."}
        </CardDescription>
      </CardHeader>

      <form
        id="student-form"
        onSubmit={handleSubmit}
      >
        <CardContent className="space-y-4 py-3">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">
              Name
            </FieldLabel>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter student name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />

            {errors.name && (
              <FieldError>
                {errors.name}
              </FieldError>
            )}
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">
              Email
            </FieldLabel>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="student@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />

            {errors.email && (
              <FieldError>
                {errors.email}
              </FieldError>
            )}
          </Field>

          {/* Phone + Classroom */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Phone */}
            <Field>
              <FieldLabel htmlFor="phone">
                Phone number
              </FieldLabel>

              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="09xxxxxxxx"
                value={formData.phone ?? ""}
                onChange={handleChange}
                disabled={loading}
              />

              {errors.phone && (
                <FieldError>
                  {errors.phone}
                </FieldError>
              )}
            </Field>

            {/* Classroom */}
            <Field>
              <FieldLabel htmlFor="classroom_id">
                Class
              </FieldLabel>

              <Select
                value={formData.classroom_id}
                onValueChange={
                  handleClassroomChange
                }
                disabled={
                  classesLoading || loading
                }
              >
                <SelectTrigger
                  id="classroom_id"
                  className="w-full"
                >
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      Classes
                    </SelectLabel>

                    {classes.map((classItem) => (
                      <SelectItem
                        key={classItem.value}
                        value={classItem.value}
                      >
                        {classItem.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.classroom_id && (
                <FieldError>
                  {errors.classroom_id}
                </FieldError>
              )}
            </Field>
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => navigate("/students")}
          >
            Back
          </Button>

          <Button
            type="submit"
            disabled={
              loading || classesLoading
            }
          >
            {loading && (
              <Loader2Icon/>
            )}
            {submitText}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}