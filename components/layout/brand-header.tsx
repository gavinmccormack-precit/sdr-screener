import { CardDescription, CardTitle } from "@/components/ui/card";

type BrandHeaderProps = {
  subtitle?: string;
  title?: string;
  description?: string;
};

export function BrandHeader({
  subtitle = "Click Theory Capital",
  title = "SDR Screener",
  description,
}: BrandHeaderProps) {
  return (
    <div className="text-center">
      <p className="font-serif text-sm uppercase tracking-[0.2em] text-stone">
        {subtitle}
      </p>
      <CardTitle className="mt-2 font-serif text-3xl text-charcoal">
        {title}
      </CardTitle>
      {description && (
        <CardDescription className="mt-2">{description}</CardDescription>
      )}
    </div>
  );
}
