"use client"

import {
  ArrowUpRight,
  Clock,
  Link as LinkIC,
  MoreHorizontal,
  Star,
  StarOff,
  Trash2,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { DeleteNoteItem } from "./deletenote-dialog";

interface RecentNote {
  id: number;
  title: string;
}

async function fetchRecentNotes(): Promise<RecentNote[]> {
  try {
    const session = await getSession();

    if (!session?.accessToken) {
      throw new Error("Access token not found, please login again.");
    }

    const res = await fetch("https://note-iota-two.vercel.app/api/notes/sort-by-update", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch notes, status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Note Response:", data);

    return Array.isArray(data.data) ? data.data.slice(0, 5) : [];
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
} 

export function NavRecents() {
  const { isMobile } = useSidebar();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recentNotes, setRecentNotes] = useState<RecentNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }, [status, router]);

  const fetchRecentNotesData = useCallback(async () => {
      setLoading(true);
      try {
        const data = await fetchRecentNotes();
        setRecentNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchRecentNotesData();
  }, [fetchRecentNotesData]);

  const skeletons = useMemo(() => (
    Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className="rounded-xl w-full h-5 bg-gray-300 " />
    ))
  ), []);
  
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        Recents
      </SidebarGroupLabel>
      <SidebarMenu>
        { loading ? ( skeletons ) : (
          recentNotes.map((recNote) => (
            <SidebarMenuItem key={recNote.id}>
              <SidebarMenuButton asChild>
                <Link href={`/note/${recNote.id}`}>
                  <span><Clock className="size-4" strokeWidth={1.5}/></span>
                  <span>{recNote.title}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <LinkIC className="text-neutral-500 dark:text-neutral-400" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ArrowUpRight className="text-neutral-500 dark:text-neutral-400" />
                    <span>Open in New Tab</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteNoteItem noteId={recNote.id.toString()} onNoteDeleted={fetchRecentNotesData}/>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))
        )}
        <SidebarMenuItem>
          { loading ? null : (
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
