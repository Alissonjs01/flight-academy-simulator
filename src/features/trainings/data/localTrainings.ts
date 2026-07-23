import type { TrainingDifficulty, TrainingDocument } from "@/features/trainings/types";
import { trainingExerciseMetadata } from "@/features/technical/defaults";

const aircraftId = "aircraft-cessna-408-skycourier";
const aircraftName = "Cessna 408 SkyCourier";
const courseId = "course-fundamentos-pilotagem";
const courseSlug = "fundamentos-da-pilotagem";
const simulatorNotice = "Treinamento de simulador. Não representa procedimento aeronáutico oficial.";
const c408TrainingMetadata = trainingExerciseMetadata({
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  simulatorAircraftVariant: aircraftName,
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorAdaptationNotes: "Cenário didático para simulador; não usar como procedimento operacional real.",
  knownSimulatorDifferences: "Diferenças entre aeronave real e implementação do simulador ainda não foram catalogadas."
});

export const localTrainingDocuments: TrainingDocument[] = [
  createTraining("training-c408-voo-nivelado", "voo-nivelado-c408", "Voo nivelado", "Inicial", "25 min", "Qualquer aeroporto com área livre", "Mesmo aeroporto ou área local", "Céu claro, vento leve", "Manter altitude, proa e velocidade com pequenas correções.", ["Estabilize a aeronave em altitude segura.", "Faça pequenas alterações de atitude e potência.", "Observe tendência antes de corrigir."], ["Altitude mantida dentro da meta pessoal.", "Correções pequenas e espaçadas.", "Aluno consegue verbalizar atitude, potência e desempenho."], "horizonte-artificial"),
  createTraining("training-c408-subida-nivelamento", "subida-e-nivelamento-c408", "Subida e nivelamento", "Inicial", "30 min", "Área local", "Área local", "Vento leve, visibilidade boa", "Praticar subida estabilizada e antecipação do nivelamento.", ["Defina altitude alvo.", "Suba com atitude e potência coerentes.", "Inicie o nivelamento antes da altitude alvo."], ["VSI reduzido antes do alvo.", "Velocidade estabilizada após nivelar.", "Sem comandos bruscos."], "subidas"),
  createTraining("training-c408-descida-estabilizada", "descida-estabilizada-c408", "Descida estabilizada", "Inicial", "30 min", "Área local", "Área local", "Céu claro, sem turbulência relevante", "Executar descida com razão e velocidade estáveis.", ["Escolha altitude inicial e final.", "Reduza potência e ajuste atitude.", "Monitore IAS, VSI e altímetro."], ["Razão de descida previsível.", "Velocidade controlada.", "Nivelamento antecipado."], "descidas"),
  createTraining("training-c408-reducao-velocidade", "reducao-de-velocidade-c408", "Redução de velocidade mantendo altitude", "Inicial", "25 min", "Área local", "Área local", "Voo nivelado em condição simples", "Reduzir velocidade sem transformar o exercício em descida acelerada.", ["Estabilize em voo nivelado.", "Reduza potência gradualmente.", "Use atitude para sustentar altitude."], ["Altitude preservada.", "Velocidade reduzida sem oscilação grande.", "Aluno verbaliza tendência."], "reducao-de-velocidade-mantendo-altitude"),
  createTraining("training-c408-aproximacao-estabilizada", "aproximacao-estabilizada-c408", "Aproximação estabilizada", "Intermediário", "35 min", "Aeroporto simples no simulador", "Mesmo aeroporto", "Vento leve, visibilidade boa", "Praticar critérios de estabilidade e decisão.", ["Entre na perna final com antecedência.", "Monitore velocidade, razão e alinhamento.", "Decida continuar ou arremeter."], ["Critérios verbalizados.", "Correções pequenas.", "Arremetida escolhida quando o perfil ficar instável."], "aproximacao-estabilizada"),
  createTraining("training-c408-arremetida", "arremetida-c408", "Arremetida", "Intermediário", "30 min", "Aeroporto simples no simulador", "Circuito visual", "Condições visuais", "Tratar arremetida como decisão normal de segurança no simulador.", ["Configure uma aproximação simples.", "Declare arremetida quando necessário.", "Priorize atitude, potência, trajetória e configuração conforme treino."], ["Decisão sem atraso.", "Controle mantido.", "Aluno explica por que arremeteu."], "aproximacao-estabilizada"),
  createTraining("training-c408-falha-motor", "falha-de-motor-simulada-c408", "Falha de motor simulada", "Intermediário", "35 min", "Área local em altitude segura", "Área local", "Altitude segura, cenário controlado", "Treinar prioridades conceituais em falha simulada.", ["Use cenário controlado e reversível.", "Reduza potência conforme simulação planejada.", "Aplique Aviate, Navigate, Communicate."], ["Controle preservado.", "Local/rota escolhidos.", "Aluno não abandona a pilotagem básica."], "planeio-apos-falha-de-motor"),
  createTraining("training-c408-g1000-navegacao", "navegacao-basica-g1000-c408", "Navegação básica com G1000", "Intermediário", "35 min", "Aeroporto simples no simulador", "Waypoint próximo", "VFR, baixa carga de trabalho", "Usar G1000 em navegação simples sem perder controle da aeronave.", ["Estabilize o C408.", "Confirme PFD, MFD, CDI/HSI e fonte ativa.", "Execute navegação básica ou Direct-To simples."], ["Fonte ativa conferida.", "Mapa e instrumentos coerentes.", "A aeronave permanece estabilizada durante uso do painel."], "g1000-direct-to", "course-garmin-g1000-nxi", "garmin-g1000-nxi")
];

function createTraining(
  id: string,
  slug: string,
  title: string,
  difficulty: TrainingDifficulty,
  duration: string,
  departureAirport: string,
  destinationAirport: string,
  conditions: string,
  objective: string,
  instructions: string[],
  completionCriteria: string[],
  relatedLessonSlug: string,
  relatedCourseId = courseId,
  relatedCourseSlug = courseSlug
): TrainingDocument {
  return {
    id,
    slug,
    title,
    aircraftId,
    aircraftName,
    difficulty,
    duration,
    departureAirport,
    destinationAirport,
    conditions: `${conditions}. ${simulatorNotice}`,
    objective,
    instructions,
    completionCriteria,
    studentReport: "",
    personalNote: "",
    status: "not_started",
    relatedCourseId,
    relatedCourseSlug,
    relatedLessonSlug,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  };
}
