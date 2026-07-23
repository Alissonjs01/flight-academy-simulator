import type { ChecklistDocument, ChecklistItemDocument, FlightPhase } from "@/features/checklists/types";

const aircraftId = "aircraft-cessna-408-skycourier";
const aircraftName = "Cessna 408 SkyCourier";
const updatedAt = "2026-07-23";
const simulatorNotice =
  "Checklist de estudo para simulador. Não usar como checklist real. Verifique QRH, POH, AFM, manuais do fabricante e documentação adequada.";

export const checklistDisclaimer =
  "Os checklists da plataforma são destinados ao uso em simuladores. Eles não substituem checklists oficiais, QRH, POH, AFM ou manuais do fabricante.";

export const localChecklistDocuments: ChecklistDocument[] = [
  createChecklist({
    id: "checklist-c408-preparacao",
    slug: "c408-preparacao",
    flightPhase: "preparacao",
    title: "Preparação do voo no simulador",
    description: "Organiza objetivo, cenário, meteorologia simulada e material de apoio antes de abrir a aeronave.",
    order: 1,
    version: "0.1",
    itemTexts: [
      ["Objetivo da sessão", "Definido em uma frase", "Evita treino disperso e melhora revisão posterior", "critical"],
      ["Cenário do simulador", "Aeroporto, horário e clima selecionados", "Use condições simples quando estiver aprendendo um fluxo novo", "normal"],
      ["Material de apoio", "Curso, aula ou checklist aberto", "Este item existe para estudo, não para operação real", "normal"]
    ]
  }),
  createChecklist({
    id: "checklist-c408-cockpit",
    slug: "c408-cockpit",
    flightPhase: "cockpit",
    title: "Cockpit e controles",
    description: "Verificação introdutória de comandos e painel antes da partida no simulador.",
    order: 2,
    version: "0.1",
    itemTexts: [
      ["Controles físicos", "Eixos e botões respondendo corretamente", "Falha de configuração no simulador prejudica todo o treino", "critical"],
      ["PFD e MFD", "Telas identificadas", "Conteúdo técnico será aprofundado na trilha Garmin", "normal"],
      ["Altímetro/QNH", "Referência conferida no cenário", "Usar apenas como treino conceitual", "normal"]
    ]
  }),
  createChecklist({
    id: "checklist-c408-antes-decolagem",
    slug: "c408-antes-da-decolagem",
    flightPhase: "antes-da-decolagem",
    title: "Antes da decolagem",
    description: "Checklist simplificado de estudo para verbalizar vento, pista, intenção e critérios de segurança.",
    order: 3,
    version: "0.1",
    itemTexts: [
      ["Pista e vento", "Compatíveis com a intenção do treino", "Reforce vento de proa/cauda/cruzado", "critical"],
      ["Plano inicial", "Subida, primeira curva e altitude verbalizadas", "Planejamento curto reduz surpresa logo após a decolagem", "normal"],
      ["Critério de interrupção", "Definido antes de aplicar potência", "Procedimento real deve vir do manual adequado", "critical"]
    ]
  }),
  createChecklist({
    id: "checklist-c408-aproximacao",
    slug: "c408-aproximacao-estabilizada",
    flightPhase: "aproximacao",
    title: "Aproximação estabilizada",
    description: "Checklist de estudo para avaliar velocidade, trajetória, configuração e decisão de arremetida.",
    order: 4,
    version: "0.1",
    itemTexts: [
      ["Velocidade", "Dentro da meta de treino", "Não há número oficial cadastrado nesta versão", "critical"],
      ["Trajetória", "Razão de descida e alinhamento estáveis", "Corrija causas antes de efeitos", "critical"],
      ["Decisão", "Continuar ou arremeter verbalizado", "Arremetida deve ser treinada como opção normal", "critical"]
    ]
  }),
  createChecklist({
    id: "checklist-c408-emergencia",
    slug: "c408-emergencia-simulada",
    flightPhase: "emergencia",
    title: "Emergência simulada",
    description: "Checklist conceitual para treinar prioridades em cenário de simulador.",
    order: 5,
    version: "0.1",
    itemTexts: [
      ["Aviate", "Atitude e velocidade sob controle", "Controle da aeronave vem antes de menus e rádio", "critical"],
      ["Navigate", "Local seguro ou rota identificada", "Use mapa com critério sem abandonar instrumentos", "normal"],
      ["Communicate", "Comunicação simulada apenas após controle", "Treino conceitual, não procedimento real", "normal"]
    ]
  })
];

type ChecklistInput = {
  id: string;
  slug: string;
  flightPhase: FlightPhase;
  title: string;
  description: string;
  order: number;
  version: string;
  itemTexts: Array<[string, string, string, "critical" | "normal"]>;
};

function createChecklist(input: ChecklistInput): ChecklistDocument {
  const items: ChecklistItemDocument[] = input.itemTexts.map(([text, expectedResponse, observation, kind], index) => ({
    id: `${input.id}-item-${index + 1}`,
    checklistId: input.id,
    text,
    expectedResponse,
    observation,
    order: index + 1,
    kind,
    status: "pending",
    explanation: observation
  }));

  return {
    id: input.id,
    slug: input.slug,
    aircraftId,
    aircraftName,
    flightPhase: input.flightPhase,
    title: input.title,
    description: input.description,
    items,
    order: input.order,
    notes: simulatorNotice,
    version: input.version,
    publicationState: "published",
    updatedAt,
    studyMode: {
      enabled: true,
      description: "Permite abrir explicações, consultar observações e estudar fora de sequência rígida."
    },
    operationalMode: {
      enabled: true,
      description: "Interface compacta para marcar itens rapidamente no iPad durante treino em simulador."
    }
  };
}
