import { ListChecks } from "lucide-react";
import { ChecklistCenter } from "@/components/checklists/ChecklistCenter";
import { PlaceholderPage } from "@/components/placeholder/PlaceholderPage";
import { listChecklists } from "@/services/checklistService";

export default async function ChecklistsPage() {
  const checklists = await listChecklists();

  return (
    <PlaceholderPage
      eyebrow="Checklists"
      title="Rotinas de cabine"
      description="Checklists de estudo e uso operacional em simulador, organizados por aeronave e fase do voo."
      icon={ListChecks}
    >
      <ChecklistCenter checklists={checklists} />
    </PlaceholderPage>
  );
}
