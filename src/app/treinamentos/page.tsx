import { Target } from "lucide-react";
import { PlaceholderPage } from "@/components/placeholder/PlaceholderPage";
import { TrainingCenter } from "@/components/trainings/TrainingCenter";
import { listTrainings } from "@/services/trainingService";

export default async function TrainingPage() {
  const trainings = await listTrainings();

  return (
    <PlaceholderPage
      eyebrow="Treinamentos"
      title="Missões práticas"
      description="Cenários de simulador para praticar controle, energia, aproximações, emergências simuladas e Garmin G1000 no C408."
      icon={Target}
    >
      <TrainingCenter trainings={trainings} />
    </PlaceholderPage>
  );
}
