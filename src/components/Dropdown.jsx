import React from "react";

import { SelectGroup } from "@radix-ui/react-select";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";

export function Dropdown({ label, options, disabled, setFormData }) {
  function handleValueChange(value) {
    const idx = value.replace('option','');
    const name = label.toLowerCase();
    setFormData(prev => ({ ...prev, [name]: options[idx] }));
  }

  return (
      <Select disabled={disabled} onValueChange={handleValueChange}>
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
