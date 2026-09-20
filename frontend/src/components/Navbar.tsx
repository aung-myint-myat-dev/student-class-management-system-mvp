import { NavLink } from "react-router"

export function Navbar() {
  return (
    <nav className="w-64 border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-bold">Student Management</h1>
      </div>

      <div className="space-y-1 p-4">
        <NavLink
          to="/students"
          className={({ isActive }) =>
            `block rounded - md px - 3 py - 2 text - sm font - medium transition ${isActive
              ? "bg-gray-900 text-white"
              : "text-gray-700 hover:bg-gray-100"
            } `
          }
        >
          Students
        </NavLink>

        <NavLink
          to="/classrooms"
          className={({ isActive }) =>
            `block rounded - md px - 3 py - 2 text - sm font - medium transition ${isActive
              ? "bg-gray-900 text-white"
              : "text-gray-700 hover:bg-gray-100"
            } `
          }
        >
          Classrooms
        </NavLink>
      </div>
    </nav>
  )
}
