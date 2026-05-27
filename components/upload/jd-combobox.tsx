"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
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
import {
  PLACEHOLDER_JOB_DESCRIPTIONS,
  type JobDescription,
} from "@/lib/types/job-description";

type JdComboboxProps = {
  value: string | null;
  onChange: (id: string | null, jd: JobDescription | null) => void;
  jobDescriptions?: JobDescription[];
};

function filterJds(jds: JobDescription[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return jds;
  return jds.filter(
    (jd) =>
      jd.title.toLowerCase().includes(q) ||
      jd.body.toLowerCase().includes(q)
  );
}

export function JdCombobox({
  value,
  onChange,
  jobDescriptions = PLACEHOLDER_JOB_DESCRIPTIONS,
}: JdComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = jobDescriptions.find((jd) => jd.id === value) ?? null;

  const filtered = useMemo(
    () => filterJds(jobDescriptions, search),
    [jobDescriptions, search]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-11 w-full justify-between border-stone/30 bg-cream font-normal text-charcoal hover:bg-cream"
        >
          {selected ? (
            <span className="truncate">{selected.title}</span>
          ) : (
            <span className="text-stone/70">
              Search or select a job description…
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-stone" />
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
                <CommandItem
                  key={jd.id}
                  value={jd.id}
                  onSelect={() => {
                    onChange(jd.id, jd);
                    setOpen(false);
                    setSearch("");
                  }}
                >
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
