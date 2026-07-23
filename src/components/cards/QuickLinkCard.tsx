import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type QuickLinkCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function QuickLinkCard({ title, description, href, icon: Icon }: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className="focus-ring group rounded-md border border-white/10 bg-white/[0.04] p-4 transition hover:border-aviation-cyan/45 hover:bg-aviation-cyan/[0.08]"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/[0.08] text-aviation-cyan transition group-hover:bg-aviation-cyan group-hover:text-aviation-ink">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm leading-5 text-slate-400">{description}</p>
        </div>
      </div>
    </Link>
  );
}
