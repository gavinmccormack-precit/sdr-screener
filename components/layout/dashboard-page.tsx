import { cn } from "@/lib/utils/cn";
import { PageHeader } from "@/components/layout/page-header";

type DashboardPageProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function DashboardPage({
  title,
  description,
  action,
  children,
  footer,
  className,
}: DashboardPageProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <PageHeader title={title} description={description} action={action} />
      {children}
      {footer}
    </div>
  );
}
