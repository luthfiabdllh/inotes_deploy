"use client"

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  LineChart,
  Link,
  MoreHorizontal,
  Settings2,
  Star,
  Trash,
  Trash2,
  Share2,
  Tag
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import ToggleFavorite from "./toggle-favorite"
import { ShareDialog } from "./share-dialog"
import { formatDistanceToNow } from "date-fns"
import { updateNote } from "@/services/note"

const data = [
  [
    {
      label: "Tags",
      icon: Tag,
    },
    {
      label: "Copy Link",
      icon: Link,
    },
    {
      label: "Move to Trash",
      icon: Trash2,
    },
  ],
]

export function NavActions({ noteId, updated_at, is_pinned }: { noteId : string ,updated_at: string, is_pinned: boolean }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [pinned, setPinned] = React.useState(is_pinned);
  
  React.useEffect(() => {
    setIsOpen(false)
  }, [])

  const togglePinned = async () => {
    const newFavoriteStatus = !pinned;
    setPinned(newFavoriteStatus);

    try {
      await updateNote(noteId, { is_pinned: newFavoriteStatus });
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      setPinned(pinned); 
    }
  };
  

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-neutral-500 md:inline-block dark:text-neutral-400">
        {formatDistanceToNow(new Date(updated_at))}
      </div>
      <ShareDialog />
      <button onClick={togglePinned} className="ml-2 text-gray-500 hover:text-yellow-500">
        {pinned? <Star strokeWidth={0} className="w-5 h-5  fill-slate-500" /> : <Star  className="w-5 h-5" />}
      </button>  
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-800"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  )
}
