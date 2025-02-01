"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderDashboard } from "@/components/header-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Folder } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import NewFolderDialog from "@/components/newFolder-Dialog";

interface Folder {
  id: string;
  name: string;
  updated_at: string;
}

async function fetchFolders(): Promise<Folder[]> {
  try {
    const session = await getSession();

    if (!session?.accessToken) {
      throw new Error("Access token not found, please login again.");
    }

    const res = await fetch("https://note-iota-two.vercel.app/api/folders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch folders, status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API Response:", data);

    return data.data || [];
  } catch (error) {
    console.error("Error fetching folders:", error);
    return [];
  }
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("name");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchFoldersData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFolders();
      setFolders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoldersData();
  }, [fetchFoldersData]);

  // Sorting function based on selected filter
  const sortedFolders = useMemo(() => {
    return [...folders].sort((a, b) => {
      if (selectedFilter === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (selectedFilter === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (selectedFilter === "date-asc") {
        return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      } else if (selectedFilter === "date-desc") {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
      return 0;
    });
  }, [folders, selectedFilter]);

  const skeletons = useMemo(() => (
    Array.from({ length: 18 }).map((_, i) => (
      <Skeleton key={i} className="aspect-square rounded-xl bg-gray-300" />
    ))
  ), []);

  const handleFilterChange = (value: string) => {
    console.log("Filter selected:", value);
    setSelectedFilter(value);
  };

  return (
    <SidebarInset>
      <HeaderDashboard onFilterChange={handleFilterChange} />
      <div className="flex flex-1 flex-col gap-4 p-4 cursor-pointer">
        <div className="grid auto-rows-min gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {loading ? (
            skeletons
          ) : (
            sortedFolders.map((folder) => (
              <Link href={`/folder/${folder.id}`} key={folder.id} className="aspect-square rounded-xl p-4 bg-white relative leading-tight flex-1 hover: border-gray-300 border hover:ring-1 hover:shadow-sm ring-gray-300">
                <Folder color="#9E9E9E" strokeWidth={1.5} className="h-8 w-8" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="w-full truncate block overflow-hidden mt-2">{folder.name}</span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="center">{folder.name}</TooltipContent>
                </Tooltip>
                <p className="text-zinc-400 text-sm absolute bottom-4">{formatDistanceToNow(new Date(folder.updated_at))}</p>
              </Link>
            ))
          )}
          {!loading && <NewFolderDialog onFolderCreated={fetchFoldersData} />}
        </div>
      </div>
    </SidebarInset>
  );
}
