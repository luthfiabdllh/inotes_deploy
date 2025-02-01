import { useState } from "react";
import { FilePlus, FolderPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { set } from "date-fns";

export default function NewNoteDialog({ folderId, onNoteCreated }: { folderId: string, onNoteCreated: () => void }) {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false); // State untuk mengontrol dialog
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const session = await getSession();

        if (!session?.accessToken) {
            router.push("/login");
            return alert("Access token not found, please login again.");
        }

        try {
            const res = await fetch("https://note-iota-two.vercel.app/api/notes", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    content: "",
                    is_pinned: false,
                    folder_id: folderId
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to create note, status: ${res.status}`);
                setLoading(false);
            }
            setLoading(false);
            setTitle(""); // Reset input
            setOpen(false); // Tutup dialog setelah berhasil
            onNoteCreated();
        } catch (error) {
            setLoading(false);
            console.error("Error creating note:", error);
            alert("Failed to create note.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="aspect-square rounded-xl p-4 bg-white relative leading-tight flex-1 hover: border-gray-300 border hover:ring-1 hover:shadow-sm ring-gray-300">
                    <FilePlus color="#9E9E9E" strokeWidth={1.5} className="h-8 w-8" />
                    <span className="w-full truncate block overflow-hidden mt-2">Add Note</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Note</DialogTitle>
                    <DialogDescription>
                        Enter the name of the new note below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid items-center gap-4">
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <DialogFooter>
                        <Button type="submit">{ loading ? "Creating..." : "Create" }</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
