import { AppHeader } from "@/components/layout/app-header";
import { JobDescriptionsProvider } from "@/providers/job-descriptions-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JobDescriptionsProvider>
      <div className="min-h-screen bg-sand">
        <AppHeader />
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
      </div>
    </JobDescriptionsProvider>
  );
}
