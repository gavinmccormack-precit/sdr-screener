import { cn } from "@/lib/utils/cn";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-4",
        className
      )}
    >
      <div>
        <h1 className="font-serif text-3xl text-charcoal">{title}</h1>
        {description && (
          <p className="mt-1 text-stone">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
