import { cn } from "@/lib/cn";

type Props = {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "right";
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: Props) {
  return (
    <header
      className={cn(
        "mb-12 flex flex-col gap-5 md:mb-16",
        align === "right" && "md:items-end md:text-right",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {index && <span className="text-label">{index}</span>}
        {eyebrow && <span className="text-label text-[var(--text-secondary)]">{eyebrow}</span>}
      </div>
      <h2 className="text-section max-w-[18ch] text-[var(--text)]">{title}</h2>
      {description && (
        <p className="max-w-xl font-serif text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </header>
  );
}
