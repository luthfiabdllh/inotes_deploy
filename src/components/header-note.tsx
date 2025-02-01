"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { SidebarTrigger } from "./ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "./ui/breadcrumb";
import { NavActions } from "./nav-actions";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { updateNote } from "@/services/note";
import { Star } from "lucide-react";

export function HeaderNote({ noteId, nameNote, updated_at, is_pinned }: {noteId: string, nameNote: string, updated_at: string, is_pinned : boolean }) {
  const [noteName, setNoteName] = useState(nameNote);
  const [pinned, setPinned] = useState(is_pinned);

  useEffect(() => {
    if (noteName !== nameNote) {
      updateNote(noteId, { title: noteName });
    }
  }, [noteName]);

  useEffect(() => {
    setPinned(is_pinned);
  }, [is_pinned]);

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-gray-200">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator aria-orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setNoteName(e.target.innerText)}>
                {nameNote}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto px-3">
        <NavActions is_pinned={pinned} noteId={noteId} updated_at={updated_at} />
      </div>
    </header>
  );
}