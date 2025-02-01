import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from './ui/alert-dialog';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface NoteItemProps {
  noteId: string;
}

interface DeleteNoteItemProps extends NoteItemProps {
  onNoteDeleted: () => void;
}

export function DeleteNoteItem({ noteId, onNoteDeleted }: DeleteNoteItemProps) {
    const [open, setOpen] = useState(false); // State untuk mengontrol dialog
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const deleteNote = async (noteId: string) => {
        try {
          const session = await getSession();
      
          if (!session?.accessToken) {
                router.push("/login");
                throw new Error("Access token not found, please login again.");
            }
      
          const response = await fetch(`https://note-iota-two.vercel.app/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error('Failed to delete the note');
            setLoading(false);
          }
          setLoading(false);
          setOpen(false); // Tutup dialog setelah berhasil
          onNoteDeleted();
        } catch (error) {
          setLoading(false);
          console.error('Error deleting note:', error);
        }
    };




    
  return (
    <DropdownMenuItem className="hover:bg-red-500 hover:text-white" onSelect={(e) => e.preventDefault()}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger className="flex items-center gap-2 w-full active:ring-0">
          <Trash2 className="h-4 w-4 text-destructive stroke-gray-500 " />
          <span>Delete Note</span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this note? This action cannot be undone 
              and all note content will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteNote(noteId)}>{ loading ? "Deleting..." : "Delete" }</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenuItem>
  );
}