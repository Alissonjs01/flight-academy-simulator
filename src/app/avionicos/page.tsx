import { Gauge } from "lucide-react";
import { AvionicsCatalog } from "@/components/avionics/AvionicsCatalog";
import { PlaceholderPage } from "@/components/placeholder/PlaceholderPage";
import { listAvionics } from "@/services/avionicsService";

export default async function AvionicsPage() {
  const avionics = await listAvionics();

  return (
    <PlaceholderPage
      eyebrow="Aviônicos"
      title="Sistemas e painéis"
      description="Biblioteca de aviônicos com componentes, procedimentos, treinamentos e cursos relacionados."
      icon={Gauge}
    >
      <AvionicsCatalog avionics={avionics} />
    </PlaceholderPage>
  );
}
