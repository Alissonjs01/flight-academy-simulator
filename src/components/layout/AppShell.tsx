"use client";

import { LogOut, Menu, PanelLeftClose, PanelLeftOpen, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { navigationItems } from "@/data/mockAcademy";
import { localLessonDocuments } from "@/features/content/data/localContent";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { AuthGate } from "@/components/auth/AuthGate";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { ConnectivityStatus } from "@/components/pwa/ConnectivityStatus";
import { PwaProvider } from "@/components/pwa/PwaProvider";
import { UserProfileModal } from "@/components/profile/UserProfileModal";
import { UserAvatar } from "@/components/ui/SafeImage";
import { logout } from "@/services/authService";
import { createEmptyUserProfileStats, readUserProfileStats, type UserProfileStats } from "@/services/userProfileStatsService";

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AuthProvider>
      <PwaProvider>
        <AppFrame>{children}</AppFrame>
      </PwaProvider>
    </AuthProvider>
  );
}

function AppFrame({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const isAuthPage = pathname === "/login" || pathname === "/cadastro" || pathname === "/recuperar-senha";

  const currentPage = navigationItems
    .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-aviation-ink text-aviation-white">
        <main className="flex min-h-screen items-center justify-center px-4 py-10">
          <Suspense fallback={null}>
            <AuthGate>{children}</AuthGate>
          </Suspense>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-aviation-white">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div
        className={[
          "min-w-0 max-w-full overflow-x-hidden flex min-h-screen flex-col transition-[padding] duration-300",
          isSidebarCollapsed ? "lg:pl-[5.25rem]" : "lg:pl-72"
        ].join(" ")}
      >
        <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#02070d]/82 backdrop-blur-xl">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.035] text-slate-100 lg:hidden"
              aria-label="Abrir menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="focus-ring hidden h-10 w-10 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.035] text-slate-100 lg:inline-flex"
              aria-label={isSidebarCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
              onClick={() => setSidebarCollapsed((value) => !value)}
            >
              {isSidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            </button>

            <div className="min-w-0 flex-1">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-aviation-cyan/80">Flight Academy Simulator</p>
              <h1 className="truncate text-lg font-semibold tracking-normal text-white sm:text-xl">{currentPage?.label ?? "Academia"}</h1>
            </div>

            <div className="hidden min-w-64 items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-sm text-slate-400 md:flex">
              <Search className="h-4 w-4 text-aviation-cyan" />
              <span>Buscar aulas, checklists ou módulos</span>
            </div>
            <ConnectivityStatus compact />
            <UserMenu />
          </div>
        </header>

        <main className="min-w-0 max-w-full flex-1 overflow-x-hidden px-4 py-5 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <Suspense fallback={null}>
            <AuthGate>{children}</AuthGate>
          </Suspense>
        </main>
        <MobileNavigation />
      </div>

      {isMobileOpen ? (
        <button
          type="button"
        className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
        >
          <X className="sr-only" />
        </button>
      ) : null}
    </div>
  );
}

function UserMenu() {
  const { user, profile, profileError, isProfileLoading } = useAuth();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const totalPublishedLessons = useMemo(() => localLessonDocuments.filter((lesson) => lesson.publicationState === "published").length, []);
  const [stats, setStats] = useState<UserProfileStats>(() => createEmptyUserProfileStats(totalPublishedLessons));
  const displayName = profile?.displayName ?? user?.displayName ?? "Aluno";

  useEffect(() => {
    if (!user) {
      setProfileOpen(false);
      setStats(createEmptyUserProfileStats(totalPublishedLessons));
      return;
    }

    setStats(readUserProfileStats(user.uid, totalPublishedLessons));
  }, [totalPublishedLessons, user]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <button
        type="button"
        onClick={() => {
          setStats(readUserProfileStats(user.uid, totalPublishedLessons));
          setProfileOpen(true);
        }}
        className="focus-ring inline-flex items-center gap-3 rounded-md border border-white/[0.08] bg-white/[0.035] p-1.5 text-left transition hover:border-aviation-cyan/40 md:pl-3"
        aria-label="Abrir perfil do aluno"
      >
        <div className="hidden text-right md:block">
          <p className="text-sm font-semibold text-white">{displayName}</p>
          <p className="text-xs text-slate-500">{profile?.role ?? "student"}</p>
        </div>
        <UserAvatar
          src={profile?.photoURL ?? user.photoURL}
          name={displayName}
          className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.04] object-cover text-sm font-semibold text-aviation-cyan md:h-10 md:w-10"
        />
      </button>
      <button
        type="button"
        onClick={() => void logout()}
        className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.035] text-slate-100"
        aria-label="Sair"
      >
        <LogOut className="h-4 w-4" />
      </button>
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        profile={profile}
        stats={stats}
        profileError={profileError}
        isProfileLoading={isProfileLoading}
      />
    </div>
  );
}
