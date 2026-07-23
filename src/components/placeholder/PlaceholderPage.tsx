import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Panel } from "@/components/ui/Panel";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children?: ReactNode;
};

export function PlaceholderPage({ eyebrow, title, description, icon: Icon, children }: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      {children ? (
        children
      ) : (
        <Panel className="flex min-h-72 flex-col items-start justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-aviation-cyan/25 bg-aviation-cyan/10 text-aviation-cyan">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">Área preparada para conteúdo</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Esta página já faz parte da navegação inicial. Na próxima etapa ela pode receber dados do Firebase, formulários, filtros e estados de carregamento.
          </p>
          <Link href="/dashboard" className="focus-ring mt-6 rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
            Voltar ao dashboard
          </Link>
        </Panel>
      )}
    </div>
  );
}
