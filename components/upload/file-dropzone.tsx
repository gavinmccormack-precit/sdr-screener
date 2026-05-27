"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, Upload, Video } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type FileDropzoneProps = {
  label: string;
  description: string;
  accept: string;
  optional?: boolean;
  icon?: "resume" | "video";
  onFileSelect: (file: File | null) => void;
};

export function FileDropzone({
  label,
  description,
  accept,
  optional = false,
  icon = "resume",
  onFileSelect,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const Icon = icon === "video" ? Video : FileText;

  const handleFile = useCallback(
    (f: File | null) => {
      setFile(f);
      onFileSelect(f);
    },
    [onFileSelect]
  );

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition-colors",
        dragOver
          ? "border-terracotta/50 bg-dried-grass/30"
          : "border-stone/25 bg-sand/30 hover:border-terracotta/30 hover:bg-cream/50",
        file && "border-terracotta/40 bg-dried-grass/20"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream shadow-sm">
        <Icon className="h-6 w-6 text-terracotta" />
      </div>
      <p className="font-medium text-charcoal">
        {label}
        {optional && (
          <span className="ml-1 text-sm font-normal text-stone">(optional)</span>
        )}
      </p>
      <p className="mt-1 text-center text-xs text-stone">{description}</p>
      {file ? (
        <p className="mt-3 max-w-full truncate text-sm font-medium text-terracotta">
          {file.name}
        </p>
      ) : (
        <p className="mt-3 flex items-center gap-1 text-xs text-stone">
          <Upload className="h-3.5 w-3.5" />
          Drag and drop or click to browse
        </p>
      )}
    </div>
  );
}
