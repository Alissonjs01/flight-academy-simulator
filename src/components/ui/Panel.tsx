import type { ReactNode } from "react";
import clsx from "clsx";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className }: PanelProps) {
  return <section className={clsx("min-w-0 rounded-md border border-white/10 bg-white/[0.045] p-4 shadow-panel sm:p-5", className)}>{children}</section>;
}
