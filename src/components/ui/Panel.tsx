import type { ReactNode } from "react";
import clsx from "clsx";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className }: PanelProps) {
  return (
    <section
      className={clsx(
        "min-w-0 rounded-md border border-cyan-200/[0.09] bg-[#08121d]/78 p-4 shadow-[0_18px_52px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-5",
        className
      )}
    >
      {children}
    </section>
  );
}
