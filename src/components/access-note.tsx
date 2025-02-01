import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export function AccessNote() {
  return (
    <div className="flex justify-between">
        <div className="flex items-center space-x-2">
            <Avatar>
                <AvatarImage src="/" alt="cn" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <span className="font-medium">Guest</span>
        </div>
        <Select>
            <SelectTrigger className="w-fit space-x-1 border-none shadow-none focus:ring-0 px-0">
                <SelectValue placeholder="Can view" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="view">Can view</SelectItem>
                    <SelectItem value="edit">Can edit</SelectItem>
                    <Button variant="ghost" className="flex justify-start w-full px-2 py-1.5 text-sm text-start hover:bg-red-500 hover:text-white">Remove</Button>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
  )
}

export function RequestAccessNote() {
    return (
        <div className="flex justify-between">
            <div className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src="/" alt="cn" />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <span className="font-medium">Guest</span>
            </div>
            <Select>
                <SelectTrigger className="w-fit space-x-1 border-none shadow-none focus:ring-0 px-0">
                    <SelectValue placeholder="Waiting" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="view">Can view</SelectItem>
                        <SelectItem value="edit">Can edit</SelectItem>
                        <Button variant="ghost" className="flex justify-start w-full px-2 py-1.5 text-sm text-start hover:bg-red-500 hover:text-white">Remove</Button>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}