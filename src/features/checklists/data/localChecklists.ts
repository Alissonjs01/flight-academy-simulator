import type { ChecklistDocument, ChecklistItemDocument, ChecklistItemKind, FlightPhase } from "@/features/checklists/types";
import { simulatorAdaptationMetadata } from "@/features/technical/defaults";

export const c408ChecklistAircraftId = "aircraft-cessna-408-skycourier";
export const c408ChecklistAircraftName = "Cessna 408 SkyCourier";

const updatedAt = "2026-07-25";
const simulatorNotice =
  "Checklist rápido para uso em simulador. Procedimentos reais devem seguir AFM, POH, QRH e documentação oficial aplicável.";

export const checklistDisclaimer =
  "Os checklists da plataforma são destinados ao uso em simuladores. Eles não substituem checklists oficiais, QRH, POH, AFM ou manuais do fabricante.";

const c408ChecklistMetadata = simulatorAdaptationMetadata({
  sourceType: "simulator_developer_documentation",
  sourceTitle: "Textron Aviation SkyCourier public materials; Microsoft Flight Simulator C408 in-simulator checklist context",
  sourceOrganization: "Textron Aviation; Microsoft Flight Simulator",
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  simulatorAircraftVariant: c408ChecklistAircraftName,
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorDeveloper: "Microsoft / Carenado",
  simulatorAdaptationNotes:
    "Checklist resumido criado para organizar treino normal no Microsoft Flight Simulator. Nao contem memory items, limites oficiais nem sequencia operacional aprovada.",
  knownSimulatorDifferences:
    "A profundidade de sistemas do C408 depende da versao instalada no simulador. Use este checklist como apoio de estudo e confira documentacao aplicavel antes de tratar qualquer item como operacional real.",
  revisionNotes: "Reorganizacao por aeronave e por fase operacional. Itens mantidos curtos para uso durante voo simulado."
});

type ChecklistInput = {
  id: string;
  slug: string;
  flightPhase: FlightPhase;
  title: string;
  description: string;
  order: number;
  items: Array<{
    text: string;
    expectedResponse: string;
    observation?: string;
    kind?: ChecklistItemKind;
  }>;
};

export const localChecklistDocuments: ChecklistDocument[] = [
  createChecklist({
    id: "checklist-c408-preparacao-voo",
    slug: "c408-preparacao-do-voo",
    flightPhase: "preparacao-do-voo",
    title: "Preparação do voo",
    description: "Configuração inicial do voo simulado antes de carregar ou mover a aeronave.",
    order: 1,
    items: [
      item("Objetivo do treino", "DEFINIDO", "Uma frase basta."),
      item("Meteorologia", "REVISADA"),
      item("Rota", "PLANEJADA"),
      item("Alternado", "SELECIONADO", "Quando aplicável ao treino."),
      item("Peso e combustível", "CONFIGURADOS", "Sem preencher tudo no máximo por padrão.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-inspecao-externa",
    slug: "c408-inspecao-externa",
    flightPhase: "inspecao-externa",
    title: "Inspeção externa",
    description: "Reconhecimento visual externo para treino no simulador.",
    order: 2,
    items: [
      item("Área ao redor", "LIVRE"),
      item("Condição geral", "VERIFICADA"),
      item("Asas e superfícies", "LIVRES"),
      item("Motores e hélices", "LIVRES", "Use câmera externa se necessário."),
      item("Portas e carga", "FECHADAS")
    ]
  }),
  createChecklist({
    id: "checklist-c408-cockpit-inicial",
    slug: "c408-cockpit-inicial",
    flightPhase: "cockpit-inicial",
    title: "Cockpit inicial",
    description: "Estado inicial de cabine antes de energizar.",
    order: 3,
    items: [
      item("Parking Brake", "SET"),
      item("Power Levers", "IDLE"),
      item("Prop/Condition", "SET", "Conforme representação do simulador."),
      item("Flight Controls", "CHECK"),
      item("Avionics", "OFF")
    ]
  }),
  createChecklist({
    id: "checklist-c408-energizacao",
    slug: "c408-energizacao",
    flightPhase: "energizacao",
    title: "Energização",
    description: "Energização básica e conferência de telas para o simulador.",
    order: 4,
    items: [
      item("Battery", "ON"),
      item("Beacon", "ON"),
      item("PFD/MFD", "ON"),
      item("Altimeter", "SET"),
      item("Alerts", "CHECK")
    ]
  }),
  createChecklist({
    id: "checklist-c408-antes-partida",
    slug: "c408-antes-da-partida",
    flightPhase: "antes-da-partida",
    title: "Antes da partida",
    description: "Confirmações rápidas antes da partida dos motores.",
    order: 5,
    items: [
      item("Área das hélices", "CLEAR", undefined, "critical"),
      item("Parking Brake", "SET"),
      item("Fuel", "SET"),
      item("Lights", "SET"),
      item("Start plan", "BRIEFED", "Parar se alerta não fizer sentido.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-partida-motor-1",
    slug: "c408-partida-motor-1",
    flightPhase: "partida-motor-1",
    title: "Partida do motor 1",
    description: "Partida simulada do primeiro motor com observação de estabilização.",
    order: 6,
    items: [
      item("Engine 1 area", "CLEAR"),
      item("Engine 1 start", "ENGAGE"),
      item("Engine indications", "STABILIZED"),
      item("Generator 1", "ON"),
      item("Alerts", "CHECK")
    ]
  }),
  createChecklist({
    id: "checklist-c408-partida-motor-2",
    slug: "c408-partida-motor-2",
    flightPhase: "partida-motor-2",
    title: "Partida do motor 2",
    description: "Partida simulada do segundo motor e comparação básica entre lados.",
    order: 7,
    items: [
      item("Engine 2 area", "CLEAR"),
      item("Engine 2 start", "ENGAGE"),
      item("Engine indications", "STABILIZED"),
      item("Generator 2", "ON"),
      item("Alerts", "CHECK")
    ]
  }),
  createChecklist({
    id: "checklist-c408-apos-partida",
    slug: "c408-apos-partida",
    flightPhase: "apos-partida",
    title: "Após a partida",
    description: "Configuração inicial após estabilização dos motores.",
    order: 8,
    items: [
      item("Generators", "ON"),
      item("Avionics", "ON"),
      item("Radios", "SET"),
      item("Flight Controls", "CHECK"),
      item("Flaps/Trim", "SET")
    ]
  }),
  createChecklist({
    id: "checklist-c408-antes-taxi",
    slug: "c408-antes-do-taxi",
    flightPhase: "antes-do-taxi",
    title: "Antes do taxi",
    description: "Itens para iniciar deslocamento no solo com segurança no simulador.",
    order: 9,
    items: [
      item("Taxi route", "BRIEFED"),
      item("Brakes", "CHECK"),
      item("Taxi light", "ON"),
      item("Flight plan", "CONFIRMED"),
      item("Area", "CLEAR")
    ]
  }),
  createChecklist({
    id: "checklist-c408-taxi",
    slug: "c408-taxi",
    flightPhase: "taxi",
    title: "Taxi",
    description: "Checklist rápido para taxi controlado.",
    order: 10,
    items: [
      item("Speed", "CONTROLLED"),
      item("Steering", "CHECK"),
      item("Brakes", "CHECK"),
      item("Instruments", "CHECK"),
      item("Hold short", "CONFIRMED", "Antes de entrar em pista.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-antes-decolagem",
    slug: "c408-antes-da-decolagem",
    flightPhase: "antes-da-decolagem",
    title: "Antes da decolagem",
    description: "Conferência final antes de alinhar.",
    order: 11,
    items: [
      item("Runway", "CONFIRMED"),
      item("Wind", "CHECKED"),
      item("Flaps", "SET"),
      item("Trim", "SET"),
      item("Transponder", "ALT")
    ]
  }),
  createChecklist({
    id: "checklist-c408-alinhamento",
    slug: "c408-alinhamento",
    flightPhase: "alinhamento",
    title: "Alinhamento",
    description: "Confirmação rápida já na pista.",
    order: 12,
    items: [
      item("Runway heading", "CONFIRM"),
      item("Centerline", "ALIGNED"),
      item("Landing lights", "ON"),
      item("Autopilot", "OFF"),
      item("Timer/route", "START")
    ]
  }),
  createChecklist({
    id: "checklist-c408-decolagem",
    slug: "c408-decolagem",
    flightPhase: "decolagem",
    title: "Decolagem",
    description: "Monitoramento curto durante decolagem normal simulada.",
    order: 13,
    items: [
      item("Power", "SET SMOOTHLY"),
      item("Engine instruments", "NORMAL"),
      item("Directional control", "MAINTAIN"),
      item("Climb attitude", "ESTABLISH"),
      item("Positive climb", "CONFIRM")
    ]
  }),
  createChecklist({
    id: "checklist-c408-apos-decolagem",
    slug: "c408-apos-decolagem",
    flightPhase: "apos-decolagem",
    title: "Após a decolagem",
    description: "Organização inicial após sair do solo.",
    order: 14,
    items: [
      item("Pitch/Power", "STABILIZED"),
      item("Flaps", "RETRACT AS APPROPRIATE"),
      item("Navigation", "CONFIRM"),
      item("Altitude target", "SET"),
      item("Lights", "SET")
    ]
  }),
  createChecklist({
    id: "checklist-c408-subida",
    slug: "c408-subida",
    flightPhase: "subida",
    title: "Subida",
    description: "Monitoramento durante subida.",
    order: 15,
    items: [
      item("Power", "SET"),
      item("Engine indications", "MONITOR"),
      item("Altitude target", "CHECK"),
      item("Navigation", "ON COURSE"),
      item("Ice protection", "AS REQUIRED")
    ]
  }),
  createChecklist({
    id: "checklist-c408-cruzeiro",
    slug: "c408-cruzeiro",
    flightPhase: "cruzeiro",
    title: "Cruzeiro",
    description: "Monitoramento compacto em cruzeiro.",
    order: 16,
    items: [
      item("Power", "SET"),
      item("Fuel", "MONITOR"),
      item("Navigation", "CHECK"),
      item("Weather", "MONITOR"),
      item("Arrival brief", "START")
    ]
  }),
  createChecklist({
    id: "checklist-c408-preparacao-descida",
    slug: "c408-preparacao-descida",
    flightPhase: "preparacao-descida",
    title: "Preparação da descida",
    description: "Briefing e configuração antes de iniciar a descida.",
    order: 17,
    items: [
      item("Destination weather", "REVIEWED"),
      item("Runway/approach", "SELECTED"),
      item("Altimeter", "SET/CHECK"),
      item("Descent point", "PLANNED"),
      item("Alternate", "CONFIRMED")
    ]
  }),
  createChecklist({
    id: "checklist-c408-descida",
    slug: "c408-descida",
    flightPhase: "descida",
    title: "Descida",
    description: "Controle de energia e navegação durante a descida.",
    order: 18,
    items: [
      item("Power", "ADJUST"),
      item("Speed", "MONITOR"),
      item("Altitude constraints", "CHECK"),
      item("Approach setup", "CONFIRM"),
      item("Weather/Ice", "MONITOR")
    ]
  }),
  createChecklist({
    id: "checklist-c408-aproximacao",
    slug: "c408-aproximacao",
    flightPhase: "aproximacao",
    title: "Aproximação",
    description: "Configuração e confirmação de aproximação estabilizada.",
    order: 19,
    items: [
      item("Nav source", "CONFIRM"),
      item("Approach mode", "ARM/CHECK"),
      item("Flaps", "SET AS APPROPRIATE"),
      item("Speed/Energy", "STABLE"),
      item("Missed approach", "BRIEFED")
    ]
  }),
  createChecklist({
    id: "checklist-c408-antes-pouso",
    slug: "c408-antes-do-pouso",
    flightPhase: "antes-pouso",
    title: "Antes do pouso",
    description: "Confirmação final de pouso.",
    order: 20,
    items: [
      item("Runway", "CONFIRMED"),
      item("Flaps", "LANDING SET"),
      item("Gear", "FIXED/DOWN CONFIRMED"),
      item("Landing lights", "ON"),
      item("Stabilized", "CHECK")
    ]
  }),
  createChecklist({
    id: "checklist-c408-apos-pouso",
    slug: "c408-apos-pouso",
    flightPhase: "apos-pouso",
    title: "Após o pouso",
    description: "Saída da pista e limpeza inicial.",
    order: 21,
    items: [
      item("Directional control", "MAINTAIN"),
      item("Power/Beta", "AS APPROPRIATE"),
      item("Flaps", "RETRACT"),
      item("Lights", "SET"),
      item("Transponder", "STBY/GND")
    ]
  }),
  createChecklist({
    id: "checklist-c408-estacionamento",
    slug: "c408-estacionamento",
    flightPhase: "estacionamento",
    title: "Estacionamento",
    description: "Aeronave parada e preparada para desligamento.",
    order: 22,
    items: [
      item("Parking Brake", "SET"),
      item("Power Levers", "IDLE"),
      item("Avionics", "AS REQUIRED"),
      item("Lights", "SET"),
      item("Debrief note", "RECORDED")
    ]
  }),
  createChecklist({
    id: "checklist-c408-desligamento",
    slug: "c408-desligamento",
    flightPhase: "desligamento",
    title: "Desligamento",
    description: "Encerramento limpo da sessão no simulador.",
    order: 23,
    items: [
      item("Avionics", "OFF"),
      item("Generators", "OFF"),
      item("Engines", "SHUTDOWN"),
      item("Beacon", "OFF"),
      item("Battery", "OFF")
    ]
  })
];

export const c408ChecklistIds = localChecklistDocuments.map((checklist) => checklist.id);

function item(text: string, expectedResponse: string, observation = "", kind: ChecklistItemKind = "normal") {
  return { text, expectedResponse, observation, kind };
}

function createChecklist(input: ChecklistInput): ChecklistDocument {
  const items: ChecklistItemDocument[] = input.items.map((itemInput, index) => ({
    id: `${input.id}-item-${index + 1}`,
    checklistId: input.id,
    text: itemInput.text,
    expectedResponse: itemInput.expectedResponse,
    observation: itemInput.observation ?? "",
    order: index + 1,
    kind: itemInput.kind ?? "normal",
    status: "pending",
    explanation: itemInput.observation ?? "",
    technicalMetadata: c408ChecklistMetadata
  }));

  return {
    id: input.id,
    slug: input.slug,
    aircraftId: c408ChecklistAircraftId,
    aircraftName: c408ChecklistAircraftName,
    flightPhase: input.flightPhase,
    title: input.title,
    description: input.description,
    items,
    order: input.order,
    notes: simulatorNotice,
    version: "2.0-simulador",
    publicationState: "published",
    updatedAt,
    studyMode: {
      enabled: true,
      description: "Explicações completas ficam nas aulas e procedimentos relacionados."
    },
    operationalMode: {
      enabled: true,
      description: "Checklist rápido para marcação por sessão durante voo simulado."
    },
    technicalMetadata: c408ChecklistMetadata
  };
}
