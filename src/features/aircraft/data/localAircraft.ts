import type {
  AircraftAvionicDocument,
  AircraftChecklistDocument,
  AircraftCourseRelationDocument,
  AircraftDocument,
  AircraftLimitationDocument,
  AircraftMediaReference,
  AircraftProcedureDocument,
  AircraftSystemDocument,
  AircraftTrainingDocument
} from "@/features/aircraft/types";

const createdAt = "2026-07-23T00:00:00.000Z";
const updatedAt = "2026-07-23T00:00:00.000Z";
const provisional = "Dados provisórios. Verificar manuais, documentação do fabricante e configuração exata do simulador antes de usar como referência.";
const safetyNote =
  "Procedimentos reais devem ser sempre verificados nos manuais adequados, documentos oficiais, checklists da aeronave e orientação de instrutores certificados. Esta plataforma é apenas para estudo em simulador.";

function mainImage(aircraftId: string, slug: string, alt: string): AircraftMediaReference {
  return {
    id: `media-${slug}-main`,
    aircraftId,
    kind: "main",
    alt,
    storagePath: `aircraft/${slug}/main.jpg`,
    caption: "Imagem principal pendente. Futuramente esta URL virá do Firebase Storage.",
    publicationState: "published",
    createdAt,
    updatedAt
  };
}

export const localAircraftDocuments: AircraftDocument[] = [
  {
    id: "aircraft-cessna-408-skycourier",
    slug: "cessna-408-skycourier",
    manufacturer: "Cessna",
    model: "408 SkyCourier",
    fullName: "Cessna 408 SkyCourier",
    category: "Bimotor utilitário",
    engineType: "Turbopropulsor",
    numberOfEngines: 2,
    cruiseSpeed: provisional,
    range: provisional,
    serviceCeiling: provisional,
    capacity: provisional,
    description:
      "Aeronave principal de estudo da plataforma neste estágio. O foco inicial é usar o SkyCourier no Microsoft Flight Simulator para praticar fundamentos, energia, atitude, potência, checklists e integração com aviônicos.",
    mainImage: mainImage("aircraft-cessna-408-skycourier", "cessna-408-skycourier", "Cessna 408 SkyCourier em estudo no simulador"),
    gallery: [],
    studyStatus: "current",
    progressPercent: 28,
    systemIds: ["system-c408-flight-controls", "system-c408-powerplant", "system-c408-avionics"],
    limitationIds: ["limitation-c408-speeds", "limitation-c408-weight", "limitation-c408-weather"],
    procedureIds: ["procedure-c408-preflight", "procedure-c408-takeoff", "procedure-c408-approach"],
    checklistIds: ["checklist-c408-preflight", "checklist-c408-approach"],
    trainingIds: ["training-c408-traffic-pattern", "training-c408-energy-management"],
    relatedCourseIds: ["course-fundamentos-pilotagem", "course-garmin-g1000-nxi"],
    installedAvionicIds: ["avionic-garmin-g1000-nxi"],
    publicationState: "published",
    createdAt,
    updatedAt
  },
  futureAircraft("aircraft-cessna-172", "cessna-172", "Cessna", "172", "Cessna 172", "Monomotor de treinamento"),
  futureAircraft("aircraft-tbm-930", "tbm-930", "Daher", "TBM 930", "TBM 930", "Monomotor turboélice executivo"),
  futureAircraft("aircraft-vision-jet", "vision-jet", "Cirrus", "Vision Jet", "Cirrus Vision Jet", "Jato leve"),
  futureAircraft("aircraft-embraer-e195", "embraer-e195", "Embraer", "E195", "Embraer E195", "Jato comercial"),
  futureAircraft("aircraft-airbus-a320", "airbus-a320", "Airbus", "A320", "Airbus A320", "Jato comercial"),
  futureAircraft("aircraft-boeing-737-max", "boeing-737-max", "Boeing", "737 MAX", "Boeing 737 MAX", "Jato comercial")
];

export const localAircraftSystemDocuments: AircraftSystemDocument[] = [
  {
    id: "system-c408-flight-controls",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Comandos de voo",
    summary: "Área de estudo para manche, pedais, compensação e resposta da aeronave.",
    details: provisional,
    order: 1,
    publicationState: "published"
  },
  {
    id: "system-c408-powerplant",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Grupo motopropulsor",
    summary: "Estudo de potência, torque, hélice, tendência de energia e operação em simulador.",
    details: provisional,
    order: 2,
    publicationState: "published"
  },
  {
    id: "system-c408-avionics",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Aviônicos e painel",
    summary: "Integração com Garmin G1000 NXi, instrumentos primários e consciência situacional.",
    details: "Conteúdo inicial preparado para a trilha Garmin G1000 NXi. Dados específicos do painel devem ser refinados conforme a versão do simulador.",
    order: 3,
    publicationState: "published"
  }
];

export const localAircraftLimitationDocuments: AircraftLimitationDocument[] = [
  {
    id: "limitation-c408-speeds",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Velocidades e envelopes",
    value: provisional,
    note: "Não usar como referência oficial. Preencher somente após validação em manual adequado.",
    order: 1,
    publicationState: "published"
  },
  {
    id: "limitation-c408-weight",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Peso e balanceamento",
    value: provisional,
    note: "Área reservada para limites, carga, centro de gravidade e impacto no desempenho.",
    order: 2,
    publicationState: "published"
  },
  {
    id: "limitation-c408-weather",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Condições meteorológicas",
    value: provisional,
    note: "A plataforma deve separar prática em simulador de operação real.",
    order: 3,
    publicationState: "published"
  }
];

export const localAircraftProcedureDocuments: AircraftProcedureDocument[] = [
  {
    id: "procedure-c408-preflight",
    aircraftId: "aircraft-cessna-408-skycourier",
    phase: "Solo",
    title: "Preparação antes do voo",
    steps: ["Confirmar cenário e meteorologia do simulador", "Revisar objetivo da missão", "Verificar configuração dos controles", "Abrir checklist aplicável"],
    safetyNote,
    order: 1,
    publicationState: "published"
  },
  {
    id: "procedure-c408-takeoff",
    aircraftId: "aircraft-cessna-408-skycourier",
    phase: "Decolagem",
    title: "Treino de decolagem estabilizada",
    steps: ["Planejar pista e vento", "Aplicar potência de forma progressiva no simulador", "Manter eixo com correções pequenas", "Monitorar tendência de velocidade e atitude"],
    safetyNote,
    order: 2,
    publicationState: "published"
  },
  {
    id: "procedure-c408-approach",
    aircraftId: "aircraft-cessna-408-skycourier",
    phase: "Aproximação",
    title: "Aproximação estabilizada",
    steps: ["Definir critérios de estabilidade", "Monitorar velocidade, razão de descida e alinhamento", "Corrigir causas antes de efeitos", "Arremeter se o perfil ficar instável"],
    safetyNote,
    order: 3,
    publicationState: "published"
  }
];

export const localAircraftChecklistDocuments: AircraftChecklistDocument[] = [
  {
    id: "checklist-c408-preflight",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Pré-voo e partida",
    phase: "Solo",
    items: ["Checklist provisório para simulador", "Configuração de controles revisada", "Objetivo da sessão definido", "Manual/checklist adequado deve ser consultado"],
    order: 1,
    publicationState: "published"
  },
  {
    id: "checklist-c408-approach",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Aproximação estabilizada",
    phase: "Aproximação",
    items: ["Velocidade alvo definida", "Trajetória monitorada", "Configuração estabilizada", "Critério de arremetida revisado"],
    order: 2,
    publicationState: "published"
  }
];

export const localAircraftTrainingDocuments: AircraftTrainingDocument[] = [
  {
    id: "training-c408-traffic-pattern",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Padrão de tráfego visual",
    objective: "Praticar atitude, potência, configuração e circuito visual no simulador.",
    duration: "35 min",
    status: "available",
    order: 1,
    publicationState: "published"
  },
  {
    id: "training-c408-energy-management",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Gerenciamento de energia",
    objective: "Treinar descida, redução de velocidade, nivelamento e estabilização.",
    duration: "40 min",
    status: "planned",
    order: 2,
    publicationState: "published"
  }
];

export const localAircraftCourseRelations: AircraftCourseRelationDocument[] = [
  {
    id: "aircraft-course-c408-fundamentos",
    aircraftId: "aircraft-cessna-408-skycourier",
    courseId: "course-fundamentos-pilotagem",
    title: "Fundamentos da Pilotagem",
    slug: "fundamentos-da-pilotagem",
    relation: "Aeronave base para exercícios práticos do curso.",
    order: 1,
    publicationState: "published"
  },
  {
    id: "aircraft-course-c408-g1000",
    aircraftId: "aircraft-cessna-408-skycourier",
    courseId: "course-garmin-g1000-nxi",
    title: "Garmin G1000 NXi — Fundamentos",
    slug: "garmin-g1000-nxi",
    relation: "Aeronave de referência para estudo do painel e aviônicos.",
    order: 2,
    publicationState: "published"
  }
];

export const localAircraftAvionicDocuments: AircraftAvionicDocument[] = [
  {
    id: "aircraft-avionic-c408-g1000",
    aircraftId: "aircraft-cessna-408-skycourier",
    avionicId: "avionic-garmin-g1000-nxi",
    name: "Garmin G1000 NXi",
    summary: "Aviônico inicial de estudo. A configuração exata deve ser validada conforme a aeronave disponível no simulador.",
    order: 1,
    publicationState: "published"
  }
];

function futureAircraft(id: string, slug: string, manufacturer: string, model: string, fullName: string, category: string): AircraftDocument {
  return {
    id,
    slug,
    manufacturer,
    model,
    fullName,
    category,
    engineType: "Dados provisórios",
    numberOfEngines: null,
    cruiseSpeed: provisional,
    range: provisional,
    serviceCeiling: provisional,
    capacity: provisional,
    description: "Cadastro reservado para expansão futura. Dados técnicos e procedimentos ainda não foram validados.",
    mainImage: mainImage(id, slug, `${fullName} - imagem futura`),
    gallery: [],
    studyStatus: "planned",
    progressPercent: 0,
    systemIds: [],
    limitationIds: [],
    procedureIds: [],
    checklistIds: [],
    trainingIds: [],
    relatedCourseIds: [],
    installedAvionicIds: [],
    publicationState: "draft",
    createdAt,
    updatedAt
  };
}
