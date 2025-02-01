import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { set } from "date-fns";

export default function NewFolderDialog({ onFolderCreated }: { onFolderCreated: () => void }) {
    const [name, setName] = useState("");
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
            const res = await fetch("https://note-iota-two.vercel.app/api/folders", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name, 
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to create note, status: ${res.status}`);
                setLoading(false);
            }
            setLoading(false);
            setName(""); // Reset input
            setOpen(false); // Tutup dialog setelah berhasil
            onFolderCreated();
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
                    <FolderPlus color="#9E9E9E" strokeWidth={1.5} className="h-8 w-8" />
                    <span className="w-full truncate block overflow-hidden mt-2">Add Folder</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Folder</DialogTitle>
                    <DialogDescription>
                        Enter the name of the new folder below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid items-center gap-4">
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
