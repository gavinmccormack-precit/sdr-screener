import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "font-medium text-terracotta underline-offset-2 hover:underline",
        className
      )}
    >
      {children}
    </Link>
  );
}
