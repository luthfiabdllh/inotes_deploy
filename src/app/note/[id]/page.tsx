"use client";

import Editor from "@/components/editor/editor";
import { HeaderNote } from "@/components/header-note";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchNoteDetail } from "@/services/note";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  content: { blocks: Array<any> };
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  tags: Array<any>;
};

export default function Note({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const noteId = unwrappedParams?.id;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchNotesData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchNoteDetail(noteId);
      console.log("Fetched note data:", data.data);
      setNote(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [noteId]);
  
  useEffect(() => {
    fetchNotesData();
  }, [fetchNotesData]);

  useEffect(() => {
    console.log("Note state updated:", note);
  }, [note]);

  const is_pinned = note ? note.is_pinned : false;

  console.log("Note data:", note?.is_pinned);
  return (
    <SidebarInset>
      <HeaderNote is_pinned={is_pinned} noteId={note?.id || ""} nameNote={note?.title || "Untitled"} updated_at={note?.updated_at || "1111-02-01T13:08:21.835+00:00"}/>
      <Editor noteId={noteId} readOnly={false} data={note?.content.blocks || []}/>
    </SidebarInset>
  );
}