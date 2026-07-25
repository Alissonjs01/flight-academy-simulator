import { ClipboardCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { ChecklistCenter } from "@/components/checklists/ChecklistCenter";
import { PlaceholderPage } from "@/components/placeholder/PlaceholderPage";
import { getAircraftBySlug } from "@/services/aircraftService";
import { listChecklists } from "@/services/checklistService";

type AircraftChecklistPageProps = {
  params: Promise<{
    aircraftSlug: string;
  }>;
};

export default async function AircraftChecklistPage({ params }: AircraftChecklistPageProps) {
  const { aircraftSlug } = await params;
  const aircraft = await getAircraftBySlug(aircraftSlug);

  if (!aircraft || aircraft.publicationState !== "published" || aircraft.studyStatus !== "current") {
    notFound();
  }

  const checklists = (await listChecklists({ aircraftId: aircraft.id })).filter((checklist) => checklist.publicationState === "published");

  if (!checklists.length) {
    notFound();
  }

  return (
    <PlaceholderPage
      eyebrow="Checklists"
      title={aircraft.fullName}
      description="Selecione a fase do voo e acompanhe os itens da sessão atual."
      icon={ClipboardCheck}
    >
      <ChecklistCenter aircraft={aircraft} checklists={checklists} />
    </PlaceholderPage>
  );
}
