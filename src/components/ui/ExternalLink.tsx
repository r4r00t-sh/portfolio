import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

export function ExternalLink({ href, children, className, showIcon = true }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 transition-colors hover:text-[var(--highlight)]",
        className,
      )}
    >
      {children}
      {showIcon && <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />}
    </a>
  );
}
