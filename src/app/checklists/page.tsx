import { ListChecks } from "lucide-react";
import { ChecklistAircraftCatalog } from "@/components/checklists/ChecklistAircraftCatalog";
import { PlaceholderPage } from "@/components/placeholder/PlaceholderPage";
import { listAircraft } from "@/services/aircraftService";
import { listChecklists } from "@/services/checklistService";

export default async function ChecklistsPage() {
  const [aircraft, checklists] = await Promise.all([listAircraft(), listChecklists()]);

  return (
    <PlaceholderPage
      eyebrow="Checklists"
      title="Selecione a aeronave"
      description="Cada aeronave possui seu próprio conjunto de checklists rápidos, organizados por fase do voo."
      icon={ListChecks}
    >
      <ChecklistAircraftCatalog aircraft={aircraft} checklists={checklists} />
    </PlaceholderPage>
  );
}
