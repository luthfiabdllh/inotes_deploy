import { Copy, Share2, UserRoundPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "./ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { AccessNote, RequestAccessNote } from "./access-note"

export function ShareDialog() {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
                <Share2 />
            </Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Share this note</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
            <Label htmlFor="email" className="sr-only">
                email
            </Label>
            <Input
            id="email"
            />
            </div>
            <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Invite</span>
            <UserRoundPlus />
            </Button>
        </div>
        <DialogDescription>
            Who has access for this note   
        </DialogDescription>
        <div className="sm:max-w-md max-h-[30vh] overflow-y-auto space-y-4 hideScrollBar">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Avatar>
                    <AvatarImage src="/" alt="cn" />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Ahmad Luthfi Abdillah</span>
                </div>
                <span className="text-sm">Owner</span>
            </div>
            <AccessNote />
        </div>
        <DialogDescription>
            Request access   
        </DialogDescription>
        <div className="sm:max-w-md max-h-[30vh] overflow-y-auto space-y-4 hideScrollBar">
            <RequestAccessNote />
        </div>
        </DialogContent>
    </Dialog>
  )
}
