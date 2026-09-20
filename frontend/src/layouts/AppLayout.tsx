import { Outlet } from "react-router"
import { Navbar } from "../components/Navbar"

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Navbar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
