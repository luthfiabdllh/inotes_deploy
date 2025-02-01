"use client";

import { useState, useEffect, useCallback, useMemo, use } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderDashboard } from "@/components/header-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarInset } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import { fetchFolderDetail } from "@/services/folder";
import { FileText, Star } from "lucide-react";
import NewNoteDialog from "@/components/newnote-dialog";
import Link from "next/link";

type Note = {
  id: string;
  title: string;
  is_pinned: boolean;
  updated_at: string;
};

export default function Folder({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params); // Gunakan `use()` untuk meng-unwrap params
  const folderId = unwrappedParams.id; // Ambil ID folder
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("name-asc");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchNotesData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFolderDetail(folderId);
      setNotes(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    fetchNotesData();
  }, [fetchNotesData]);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;

      if (selectedFilter === "name-asc") {
        return a.title.localeCompare(b.title);
      } else if (selectedFilter === "name-desc") {
        return b.title.localeCompare(a.title);
      } else if (selectedFilter === "date-asc") {
        return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      } else if (selectedFilter === "date-desc") {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
      return 0;
    });
  }, [notes, selectedFilter]);

  const skeletons = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-xl bg-gray-300" />
      )),
    []
  );

  const handleFilterChange = (value: string) => {
    console.log("Filter selected:", value);
    setSelectedFilter(value);
  };

  return (
    <SidebarInset>
      <HeaderDashboard onFilterChange={handleFilterChange}/>
      <div className="flex flex-1 flex-col gap-4 p-4 cursor-pointer">
        <div className="grid auto-rows-min gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {loading ? (
            skeletons
          ) : (
            sortedNotes.map((note) => (
              <Link href={`/note/${note.id}`}
                key={note.id}
                className="aspect-square rounded-xl p-4 bg-white relative leading-tight flex-1 hover:border-gray-300 border hover:ring-1 hover:shadow-sm ring-gray-300"
                >
                <FileText color="#9E9E9E" strokeWidth={1.5} className="h-8 w-8" />
                {note.is_pinned && (
                  <Star
                    color="#FFD700"
                    strokeWidth={1.5}
                    className="absolute top-4 right-4 h-6 w-6"
                  />
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                  <span className="w-full truncate block overflow-hidden mt-2">
                    {note.title}
                  </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="center">
                  {note.title}
                  </TooltipContent>
                </Tooltip>
                <p className="text-zinc-400 text-sm absolute bottom-4">
                  {formatDistanceToNow(new Date(note.updated_at))}
                </p>
              </Link>
            ))
          )}
          {!loading && <NewNoteDialog folderId={folderId} onNoteCreated={fetchNotesData} />}
        </div>
      </div>
    </SidebarInset>
  );
}
