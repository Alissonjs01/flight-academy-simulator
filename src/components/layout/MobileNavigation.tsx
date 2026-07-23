"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/data/mockAcademy";

const mobileItems = navigationItems.slice(0, 5);

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 overflow-hidden border-t border-white/10 bg-aviation-panel/95 px-2 py-2 backdrop-blur-xl lg:hidden"
      aria-label="Navegação inferior"
    >
      {mobileItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "focus-ring flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-md text-[0.68rem] font-medium",
              isActive ? "bg-aviation-cyan/15 text-aviation-cyan" : "text-slate-400"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="max-w-full truncate px-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
