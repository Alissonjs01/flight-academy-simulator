import { Plane } from "lucide-react";
import { AircraftCatalog } from "@/components/aircraft/AircraftCatalog";
import { PlaceholderPage } from "@/components/placeholder/PlaceholderPage";
import { listAircraft } from "@/services/aircraftService";

export default async function AircraftPage() {
  const aircraft = await listAircraft();

  return (
    <PlaceholderPage
      eyebrow="Aeronaves"
      title="Biblioteca de aeronaves"
      description="Perfis de estudo, sistemas, limitações provisórias, checklists, treinamentos e cursos relacionados por aeronave."
      icon={Plane}
    >
      <AircraftCatalog aircraft={aircraft} />
    </PlaceholderPage>
  );
}
