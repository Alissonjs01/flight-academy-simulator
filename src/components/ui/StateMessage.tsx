import type { LucideIcon } from "lucide-react";
import { AlertCircle, Loader2, SearchX } from "lucide-react";
import { Panel } from "@/components/ui/Panel";

type StateMessageProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function EmptyState({ title, description, icon: Icon = SearchX }: StateMessageProps) {
  return (
    <Panel className="flex min-h-52 flex-col items-start justify-center">
      <Icon className="h-9 w-9 text-aviation-cyan" />
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
    </Panel>
  );
}

export function LoadingState({ title = "Carregando", description = "Preparando os dados da plataforma." }: Partial<StateMessageProps>) {
  return (
    <Panel className="flex min-h-40 items-center gap-3">
      <Loader2 className="h-5 w-5 animate-spin text-aviation-cyan" />
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
    </Panel>
  );
}

export function ErrorState({ title = "Não foi possível carregar", description = "Tente novamente em instantes." }: Partial<StateMessageProps>) {
  return (
    <Panel className="border-red-400/30 bg-red-500/[0.06]">
      <AlertCircle className="h-6 w-6 text-red-300" />
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-red-100/80">{description}</p>
    </Panel>
  );
}
