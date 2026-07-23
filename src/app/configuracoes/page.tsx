import { Settings } from "lucide-react";
import { PwaSettingsPanel } from "@/components/pwa/PwaSettingsPanel";
import { PlaceholderPage } from "@/components/placeholder/PlaceholderPage";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      eyebrow="Configurações"
      title="Aplicativo e modo offline"
      description="Instalação, conexão, atualização, armazenamento local e cuidados de sincronização da PWA."
      icon={Settings}
    >
      <PwaSettingsPanel />
    </PlaceholderPage>
  );
}
