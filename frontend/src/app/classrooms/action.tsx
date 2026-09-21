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

import { api } from "@/lib/api"
import type { Classroom, ClassroomFormData } from "./types"
import { useBreadcrumb } from "@/context/breadcrumb-context"
import { Loader2Icon } from "lucide-react"

interface ClassroomActionProps {
  isEdit: boolean
}

type LoaderData = {
  classroom?: Classroom
}

const emptyForm: ClassroomFormData = {
  name: "",
}

export default function ClassroomAction({
  isEdit,
}: ClassroomActionProps) {
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
          label: isEdit ? 'Edit classroom' : 'Creat classroom',
        },
      ])
    }, [setBreadcrumbs, isEdit])

  const loaderData =
    useLoaderData() as LoaderData | undefined

  const classroom = loaderData?.classroom

  const [formData, setFormData] =
    useState<ClassroomFormData>(emptyForm)

  const [loading, setLoading] = useState(false)

  const [errors, setErrors] =
    useState<Record<string, string>>({})

  /**
   * Load classroom when editing
   */
  useEffect(() => {
    if (isEdit && classroom) {
      setFormData({
        name: classroom.name ?? "",
      })
    } else {
      setFormData(emptyForm)
    }

    setErrors({})
  }, [isEdit, classroom])

  /**
   * Input change
   */
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

  /**
   * Submit
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setErrors({})
    setLoading(true)

    try {
      let response

      if (isEdit && classroom) {
        response = await api.put(
          `/classrooms/${classroom.id}`,
          {
            name: formData.name,
          }
        )
      } else {
        response = await api.post(
          "/classrooms",
          {
            name: formData.name,
          }
        )
      }

      if (
        response.status === 200 ||
        response.status === 201
      ) {
        toast.success(
          response.data?.message ??
            (isEdit
              ? "Classroom updated successfully."
              : "Classroom created successfully.")
        )

        navigate("/classrooms")
      }
    } catch (error) {
      console.error(
        "Classroom action failed:",
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
          {isEdit ? "Update" : "Create"} classroom
        </CardTitle>

        <CardDescription>
          {isEdit
            ? "Update classroom information here."
            : "Create a new classroom here."}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="py-3">
          <Field>
            <FieldLabel htmlFor="name">
              Classroom name
            </FieldLabel>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter classroom name"
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
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => navigate("/classrooms")}
          >
            Back
          </Button>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading && (
              <Loader2Icon className="animate-spin"/>
            )}
            {submitText}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}