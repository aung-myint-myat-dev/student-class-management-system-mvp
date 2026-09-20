import { createBrowserRouter } from "react-router"

import Students from "./pages/student"
import Classrooms from "./pages/classroom"
import AppLayout from "./layouts/AppLayout"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "classrooms",
        element: <Classrooms />,
      },
    ],
  },
])
