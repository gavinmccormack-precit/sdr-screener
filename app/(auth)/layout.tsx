export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sand">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[min(90vw,640px)] -translate-x-1/2 rounded-[50%] bg-cream/60"
        aria-hidden
      />
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
