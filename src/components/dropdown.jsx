import React from "react";
import {
  BadgeCheckIcon,
  BellIcon,
  ChevronDown,
  CreditCardIcon,
  LogOutIcon,
  SparklesIcon
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

const user = {
  name: "Toby Belhome",
  email: "contact@bundui.io",
  avatar: "https://bundui-images.netlify.app/avatars/01.png"
};

export function DropDown({ label, options, disabled }) {
  return (
      <Select disabled={disabled}>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, idx) => <SelectItem key={idx} value={`option${idx}`}>{option}</SelectItem>)}
          </SelectContent>
        </SelectGroup>
      </Select>
  );
}
