"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, SquareChartGantt, User, BookText, GraduationCap } from "lucide-react"
import { NavLink } from "react-router"

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: 'Overview',
      url: "#",
      isActive: true,
      icon: (<SquareChartGantt />),
      items: [
        {
          title: "Dashboard",
          url: "/",
        }
      ]
    },
    {
      title: "Students",
      url: "#",
      icon: (
        <User
        />
      ),
      isActive: true,
      items: [
        {
          title: "All students",
          url: "students",
        },
        {
          title: "Create a student",
          url: "students/create",
        },
      ],
    },
    {
      title: "Classes",
      url: "#",
      isActive: true,
      icon: (
        <BookText
        />
      ),
      items: [
        {
          title: "All classes",
          url: "classrooms",
        },
        {
          title: "Create a class",
          url: "classrooms/create",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLink to="/" className="flex items-center gap-3 px-3 py-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-5" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              StudentHub
            </span>
            <span className="text-xs text-muted-foreground">
              School Management
            </span>
          </div>
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
