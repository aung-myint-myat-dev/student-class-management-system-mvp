import { createBrowserRouter } from "react-router"
import Dashboard from "./app/dashboard"
import AppLayout from "./layouts/AppLayout"
import Students from "./app/students"
import StudentAction from "./app/students/action"
import { StudentDetail } from "./app/students/show"
import { api } from "./lib/api"
import Classrooms from "./app/classrooms"
import ClassroomAction from "./app/classrooms/action"
import { ClassroomDetail } from "./app/classrooms/show"
import { Loader2Icon } from "lucide-react"
import { StudentBanks } from "./app/student-banks"
import { TestLayout } from "./layouts/TestLayout"
import { BankDetail } from "./app/student-banks/show"

function HydrateFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">
        <Loader2Icon className="animate-spin"/> Loading...
      </p>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    HydrateFallback,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "students/create",
        element: <StudentAction isEdit={false} />,
      },
      {
        path: "students/:id/edit",
        loader: async ({ params }) => {
          const res = await api.get(`students/${params.id}`)

          return {
            student: res.data.data,
          }
        },
        element: <StudentAction isEdit={true} />,
      },
      {
        path: "students/:id",
        element: <StudentDetail />,
      },
      {
        path: "classrooms",
        children: [
          {
            index: true,
            element: <Classrooms />,
          },
          {
            path: "create",
            element: <ClassroomAction isEdit={false} />,
          },
          {
            path: ":id",
            loader: async ({ params }) => {
              const response = await api.get(
                `/classrooms/${params.id}`
              )

              return {
                classroom: response.data.data,
              }
            },
            element: <ClassroomDetail />,
          },
          {
            path: ":id/edit",
            loader: async ({ params }) => {
              const response = await api.get(
                `/classrooms/${params.id}`
              )

              return {
                classroom: response.data.data,
              }
            },
            element: <ClassroomAction isEdit={true} />,
          },
        ],
      },
    ],
  },
  {
    path: '/student-banks',
    element: <TestLayout/>,
    children: [
      {
        index: true,
        element: <StudentBanks/>
      },
      {
        path: ':studentCode',
        element: <BankDetail/>
      }
    ]
  },
])