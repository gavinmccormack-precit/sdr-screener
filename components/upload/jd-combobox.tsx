"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { fieldControlStyles } from "@/lib/utils/field-styles";
import { filterJobDescriptions } from "@/lib/utils/job-description";
import { useJobDescriptions } from "@/providers/job-descriptions-provider";
import type { JobDescription } from "@/lib/types/job-description";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type JdComboboxProps = {
  value: string | null;
  onChange: (id: string | null, jd: JobDescription | null) => void;
};

export function JdCombobox({ value, onChange }: JdComboboxProps) {
  const { jobDescriptions } = useJobDescriptions();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = jobDescriptions.find((jd) => jd.id === value) ?? null;
  const filtered = useMemo(
    () => filterJobDescriptions(jobDescriptions, search),
    [jobDescriptions, search]
  );

  function select(jd: JobDescription) {
    onChange(jd.id, jd);
    setOpen(false);
    setSearch("");
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="combobox"
          role="combobox"
          aria-expanded={open}
          className={cn(
            fieldControlStyles,
            "h-11 w-full justify-between hover:bg-cream",
            open && "ring-2 ring-terracotta/30"
          )}
        >
          <span className={cn("truncate", !selected && "text-stone/70")}>
            {selected?.title ?? "Search or select a job description…"}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-stone" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type to search saved JDs…"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No matches. Try another search.</CommandEmpty>
            <CommandGroup heading="Saved job descriptions">
              {filtered.map((jd) => (
                <CommandItem key={jd.id} value={jd.id} onSelect={() => select(jd)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-terracotta",
                      value === jd.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{jd.title}</p>
                    <p className="truncate text-xs text-stone">
                      {jd.body.slice(0, 72)}
                      {jd.body.length > 72 ? "…" : ""}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
