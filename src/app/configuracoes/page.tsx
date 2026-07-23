import { Settings } from "lucide-react";
import { PlaceholderPage } from "@/components/placeholder/PlaceholderPage";
import { Panel } from "@/components/ui/Panel";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      eyebrow="Configurações"
      title="Preferências da plataforma"
      description="Área preparada para tema, perfil, notificações, preferências de estudo e PWA."
      icon={Settings}
    >
      <Panel>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
            <p className="font-semibold text-white">Tema</p>
            <p className="mt-2 text-sm text-slate-400">Modo escuro ativo como padrão.</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
            <p className="font-semibold text-white">Perfil</p>
            <p className="mt-2 text-sm text-slate-400">Aluno único nesta versão inicial.</p>
          </div>
        </div>
      </Panel>
    </PlaceholderPage>
  );
}
