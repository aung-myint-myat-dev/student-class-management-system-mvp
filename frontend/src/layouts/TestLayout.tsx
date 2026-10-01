import { Outlet } from "react-router";

export function TestLayout() {
  return (
    <div className="h-screen flex">
      <div className="w-65 bg-green-700">
        sidebar
      </div>
      <div className="p-2 flex-1 overflow-auto">
        <Outlet/>
      </div>
    </div>
  )
}