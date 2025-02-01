"use client";

import { AppSidebar } from "@/components/app-sidebar"
import Editor from "@/components/editor/editor"
import { HeaderNote } from "@/components/header-note"
import { NavActions } from "@/components/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Note() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <HeaderNote /> */}
        {/* <Editor /> */}
      </SidebarInset>
    </SidebarProvider>
  )
}
