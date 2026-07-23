"use client";

import clsx from "clsx";
import { PlaneTakeoff, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/data/mockAcademy";

type SidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
};

export function Sidebar({ isCollapsed, isMobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-aviation-panel/[0.98] shadow-panel backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
        isCollapsed && "lg:w-[5.25rem]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex min-h-20 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-aviation-cyan/40 bg-aviation-cyan/10 text-aviation-cyan">
          <PlaneTakeoff className="h-6 w-6" />
        </div>
        <div className={clsx("min-w-0", isCollapsed && "lg:hidden")}>
          <p className="text-sm font-semibold text-white">Flight Academy</p>
          <p className="text-xs text-slate-400">Simulator</p>
        </div>
        <button
          type="button"
          className="focus-ring ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 lg:hidden"
          aria-label="Fechar menu"
          onClick={onCloseMobile}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Navegação principal">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={clsx(
                "focus-ring flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition",
                isActive
                  ? "bg-aviation-cyan text-aviation-ink"
                  : "text-slate-300 hover:bg-white/[0.08] hover:text-white",
                isCollapsed && "lg:justify-center lg:px-2"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className={clsx("truncate", isCollapsed && "lg:hidden")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={clsx("border-t border-white/10 p-4", isCollapsed && "lg:px-3")}>
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
          <p className={clsx("text-xs uppercase text-slate-500", isCollapsed && "lg:hidden")}>Perfil ativo</p>
          <p className={clsx("mt-1 text-sm font-semibold text-white", isCollapsed && "lg:hidden")}>Aluno solo</p>
          <div className={clsx("mt-3 h-1.5 rounded-full bg-white/10", isCollapsed && "lg:mt-0")}>
            <div className="h-full w-[42%] rounded-full bg-aviation-mint" />
          </div>
        </div>
      </div>
    </aside>
  );
}
