import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, Filter } from "lucide-react";

export function FilterDropdown({ onChange }: { onChange: (value: string) => void }) {
  const [selectedValue, setSelectedValue] = React.useState("default");

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange(value); // Kembalikan nilai saat berubah
  };

  return (
    <div className="flex items-center">
      <p className="text-sm text-muted-foreground items-center mr-4 hidden sm:flex">
        <Filter className="mr-2 h-4 w-4" /> Sort by
      </p>
      <Select value={selectedValue} onValueChange={handleChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="name-asc">Name &#9650;</SelectItem>
            <SelectItem value="name-desc">Name &#9660;</SelectItem>
            <SelectItem value="date-asc">Date Modified &#9650;</SelectItem>
            <SelectItem value="date-desc">Date Modified &#9660;</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
