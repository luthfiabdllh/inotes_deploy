"use client"

import {
  ArrowUpRight,
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
import { DeleteNoteItem } from "./deletenote-dialog";

interface FavoriteNote {
  id: string;
  title: string;
}

async function fetchFavoriteNotes(): Promise<FavoriteNote[]> {
  try {
    const session = await getSession();

    if (!session?.accessToken) {
      throw new Error("Access token not found, please login again.");
    }

    const res = await fetch("https://note-iota-two.vercel.app/api/notes/pinned", {
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

    return Array.isArray(data.data) ? data.data.slice(0, 7) : [];
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
} 

export function NavFavorites() {
  const { isMobile } = useSidebar();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favoriteNotes, setFavoriteNotes] = useState<FavoriteNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }, [status, router]);

  const fetchFavoriteNotesData = useCallback(async () => {
      setLoading(true);
      try {
        const data = await fetchFavoriteNotes();
        setFavoriteNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchFavoriteNotesData();
  }, [fetchFavoriteNotesData]);

  const skeletons = useMemo(() => (
    Array.from({ length: 8 }).map((_, i) => (
      <Skeleton key={i} className="rounded-xl w-full h-5 bg-gray-300 " />
    ))
  ), []);
  
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        Favorites
      </SidebarGroupLabel>
      <SidebarMenu>
        { loading ? ( skeletons ) : (
          favoriteNotes.map((favNote) => (
            <SidebarMenuItem key={favNote.id}>
              <SidebarMenuButton asChild>
                <Link href={`/note/${favNote.id}`}>
                  <span><Star className="size-4" strokeWidth={1.5}/></span>
                  <span>{favNote.title}</span>
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
                    <StarOff className="text-neutral-500 dark:text-neutral-400" />
                    <span>Remove from Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LinkIC className="text-neutral-500 dark:text-neutral-400" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ArrowUpRight className="text-neutral-500 dark:text-neutral-400" />
                    <span>Open in New Tab</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteNoteItem noteId={favNote.id.toString()} onNoteDeleted={fetchFavoriteNotesData}/>
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
