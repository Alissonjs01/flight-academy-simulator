import type {
  AvionicComponentDocument,
  AvionicCourseRelationDocument,
  AvionicDocument,
  AvionicMediaReference,
  AvionicProcedureDocument,
  AvionicSectionDocument,
  AvionicTrainingDocument
} from "@/features/avionics/types";
import { provisionalTechnicalMetadata, simulatorAdaptationMetadata, trainingExerciseMetadata } from "@/features/technical/defaults";

const createdAt = "2026-07-23T00:00:00.000Z";
const updatedAt = "2026-07-23T00:00:00.000Z";
const avionicId = "avionic-garmin-g1000-nxi";
const provisional =
  "Conteúdo introdutório e provisório. A operação real deve ser verificada nos manuais adequados, documentação oficial, versão exata do equipamento e configuração da aeronave no simulador.";
const g1000TechnicalMetadata = provisionalTechnicalMetadata({
  sourceTitle: "Conteúdo local provisório sobre Garmin G1000 NXi",
  sourceOrganization: "Flight Academy Simulator",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorAircraftVariant: "Cessna 408 SkyCourier",
  simulatorAdaptationNotes: "Conteúdo preparado para estudo no simulador, pendente de comparação com manual oficial do equipamento e configuração exata da aeronave.",
  knownSimulatorDifferences: "Diferenças entre o equipamento real, versões do G1000 NXi e implementação do simulador ainda não foram catalogadas."
});
const g1000SimulatorAdaptationMetadata = simulatorAdaptationMetadata({
  sourceTitle: "Adaptação local provisória para Garmin G1000 NXi no simulador",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorAircraftVariant: "Cessna 408 SkyCourier",
  knownSimulatorDifferences: "Diferenças entre versões reais do aviônico e implementação do simulador ainda não foram catalogadas."
});
const g1000TrainingMetadata = trainingExerciseMetadata({
  sourceTitle: "Treinamento didático local para Garmin G1000 NXi",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorAircraftVariant: "Cessna 408 SkyCourier",
  simulatorAdaptationNotes: "Treinamento para simulador; não representa procedimento operacional oficial."
});

function media(kind: AvionicMediaReference["kind"], slug: string, alt: string): AvionicMediaReference {
  return {
    id: `media-g1000-${slug}`,
    avionicId,
    kind,
    alt,
    storagePath: `avionics/garmin-g1000-nxi/${slug}.jpg`,
    caption: "Imagem/diagrama pendente. Futuramente esta referência deverá apontar para Firebase Storage.",
    publicationState: "published",
    createdAt,
    updatedAt
  };
}

export const localAvionicDocuments: AvionicDocument[] = [
  {
    id: avionicId,
    slug: "garmin-g1000-nxi",
    name: "Garmin G1000 NXi",
    manufacturer: "Garmin",
    version: "NXi",
    description:
      "Suite integrada de aviônicos usada como base para estudo de PFD, MFD, navegação, CDI/HSI, Direct-To, planos de voo, piloto automático e procedimentos IFR no simulador.",
    image: media("main", "main", "Garmin G1000 NXi"),
    compatibleAircraftIds: ["aircraft-cessna-408-skycourier"],
    courseIds: ["course-garmin-g1000-nxi"],
    componentIds: ["component-g1000-pfd", "component-g1000-mfd", "component-g1000-cdi-hsi", "component-g1000-autopilot"],
    procedureIds: ["procedure-g1000-direct-to", "procedure-g1000-flight-plan", "procedure-g1000-ils-rnav"],
    trainingIds: ["training-g1000-c408-direct-to", "training-g1000-c408-approach"],
    progressPercent: 8,
    studyStatus: "current",
    publicationState: "published",
    createdAt,
    updatedAt,
    technicalMetadata: g1000TechnicalMetadata
  }
];

const sections: Array<{ slug: string; title: string; lessonSlug: string; highlights: string[] }> = [
  { slug: "visao-geral", title: "Visão geral", lessonSlug: "g1000-como-o-sistema-pensa", highlights: ["Integração", "Fluxo de cockpit", "Consciência situacional"] },
  { slug: "pfd", title: "PFD", lessonSlug: "g1000-pfd-e-mfd", highlights: ["Instrumentos primários", "Atitude", "Velocidade", "Altitude"] },
  { slug: "mfd", title: "MFD", lessonSlug: "g1000-pfd-e-mfd", highlights: ["Mapa", "Sistemas", "Rota", "Motor"] },
  { slug: "cdi", title: "CDI", lessonSlug: "g1000-cdi-e-hsi", highlights: ["Fonte de navegação", "Desvio lateral", "GPS/NAV"] },
  { slug: "hsi", title: "HSI", lessonSlug: "g1000-cdi-e-hsi", highlights: ["Curso", "Proa", "Consciência lateral"] },
  { slug: "gps", title: "GPS", lessonSlug: "g1000-gps-e-nav", highlights: ["Navegação por satélite", "Plano de voo", "Direct-To"] },
  { slug: "nav", title: "NAV", lessonSlug: "g1000-gps-e-nav", highlights: ["VOR/LOC", "Fonte ativa", "Sintonia"] },
  { slug: "direct-to", title: "Direct-To", lessonSlug: "g1000-direct-to", highlights: ["Destino direto", "Interceptação", "Uso com critério"] },
  { slug: "flight-plan", title: "Flight Plan", lessonSlug: "g1000-flight-plan", highlights: ["Sequência de waypoints", "Revisão de rota", "Antecipação"] },
  { slug: "obs", title: "OBS", lessonSlug: "g1000-obs", highlights: ["Curso manual", "Suspensão de sequenciamento", "Treino introdutório"] },
  { slug: "piloto-automatico", title: "Piloto automático", lessonSlug: "g1000-piloto-automatico", highlights: ["Modos laterais", "Modos verticais", "Monitoramento"] },
  { slug: "altitude-selecionada", title: "Altitude selecionada", lessonSlug: "g1000-altitude-selecionada", highlights: ["Bug de altitude", "Captura", "Consciência vertical"] },
  { slug: "vs", title: "VS", lessonSlug: "g1000-vs-e-flc", highlights: ["Razão vertical", "Risco de velocidade", "Monitoramento"] },
  { slug: "flc", title: "FLC", lessonSlug: "g1000-vs-e-flc", highlights: ["Velocidade alvo", "Subida/descida", "Energia"] },
  { slug: "vnav", title: "VNAV", lessonSlug: "g1000-vnav", highlights: ["Perfil vertical", "Restrição", "Planejamento"] },
  { slug: "ils", title: "ILS", lessonSlug: "g1000-ils", highlights: ["LOC", "Glideslope", "Fonte NAV"] },
  { slug: "rnav", title: "RNAV", lessonSlug: "g1000-rnav", highlights: ["GPS approach", "Sequenciamento", "Mínimos"] },
  { slug: "falhas-erros-comuns", title: "Falhas e erros comuns", lessonSlug: "g1000-falhas-e-erros-comuns", highlights: ["Modo errado", "Fonte errada", "Plano de voo incompleto"] }
];

export const localAvionicSectionDocuments: AvionicSectionDocument[] = sections.map((section, index) => ({
  id: `section-g1000-${section.slug}`,
  avionicId,
  slug: section.slug,
  title: section.title,
  summary: `Seção preparada para estudar ${section.title} no Garmin G1000 NXi.`,
  body: provisional,
  image: media("section", section.slug, `Diagrama da seção ${section.title}`),
  highlights: section.highlights,
  examples: [`Exemplo provisório: localizar ${section.title} no painel e verbalizar sua função antes de usar.`],
  exercisePrompts: [`Explique com suas palavras quando ${section.title} entra no fluxo de voo.`],
  relatedTrainingIds: ["training-g1000-c408-direct-to"],
  relatedAircraftIds: ["aircraft-cessna-408-skycourier"],
  internalLessonSlugs: [section.lessonSlug],
  order: index + 1,
  publicationState: "published",
  technicalMetadata: g1000TechnicalMetadata
}));

export const localAvionicComponentDocuments: AvionicComponentDocument[] = [
  component("component-g1000-pfd", "PFD", "Primary Flight Display com instrumentos primários e modos principais.", "pfd", 1),
  component("component-g1000-mfd", "MFD", "Multi Function Display para mapa, rota, sistemas e dados complementares.", "mfd", 2),
  component("component-g1000-cdi-hsi", "CDI/HSI", "Indicações laterais para GPS, VOR, LOC e consciência de curso.", "cdi", 3),
  component("component-g1000-autopilot", "Piloto automático", "Modos laterais e verticais que exigem monitoramento ativo.", "piloto-automatico", 4)
];

export const localAvionicProcedureDocuments: AvionicProcedureDocument[] = [
  {
    id: "procedure-g1000-direct-to",
    avionicId,
    title: "Uso introdutório do Direct-To",
    sectionSlug: "direct-to",
    steps: ["Confirmar waypoint desejado", "Acionar Direct-To no simulador", "Conferir curso ativo", "Monitorar CDI/HSI antes de confiar na rota"],
    note: provisional,
    order: 1,
    publicationState: "published",
    technicalMetadata: g1000SimulatorAdaptationMetadata
  },
  {
    id: "procedure-g1000-flight-plan",
    avionicId,
    title: "Revisão de Flight Plan",
    sectionSlug: "flight-plan",
    steps: ["Inserir rota provisória", "Conferir sequência de waypoints", "Comparar mapa e expectativa mental", "Corrigir descontinuidades antes do voo"],
    note: provisional,
    order: 2,
    publicationState: "published",
    technicalMetadata: g1000SimulatorAdaptationMetadata
  },
  {
    id: "procedure-g1000-ils-rnav",
    avionicId,
    title: "Preparação inicial para aproximações",
    sectionSlug: "ils",
    steps: ["Identificar tipo de aproximação", "Conferir fonte de navegação", "Revisar mínimos e perfil", "Monitorar captura lateral e vertical"],
    note: provisional,
    order: 3,
    publicationState: "published",
    technicalMetadata: g1000SimulatorAdaptationMetadata
  }
];

export const localAvionicTrainingDocuments: AvionicTrainingDocument[] = [
  {
    id: "training-g1000-c408-direct-to",
    avionicId,
    title: "Direct-To no C408",
    objective: "Praticar destino direto sem perder atitude, altitude e consciência lateral.",
    relatedAircraftIds: ["aircraft-cessna-408-skycourier"],
    duration: "25 min",
    status: "planned",
    order: 1,
    publicationState: "published",
    technicalMetadata: g1000TrainingMetadata
  },
  {
    id: "training-g1000-c408-approach",
    avionicId,
    title: "Aproximação guiada no C408",
    objective: "Treinar preparação básica para ILS/RNAV usando a lógica de fonte, curso e modo ativo.",
    relatedAircraftIds: ["aircraft-cessna-408-skycourier"],
    duration: "40 min",
    status: "planned",
    order: 2,
    publicationState: "published",
    technicalMetadata: g1000TrainingMetadata
  }
];

export const localAvionicCourseRelations: AvionicCourseRelationDocument[] = [
  {
    id: "avionic-course-g1000-fundamentos",
    avionicId,
    courseId: "course-garmin-g1000-nxi",
    title: "Garmin G1000 NXi — Fundamentos",
    slug: "garmin-g1000-nxi",
    relation: "Curso estrutural inicial para aprender a lógica do G1000 NXi antes de navegação IFR mais avançada.",
    order: 1,
    publicationState: "published",
    technicalMetadata: g1000TrainingMetadata
  }
];

function component(id: string, title: string, summary: string, sectionSlug: string, order: number): AvionicComponentDocument {
  return {
    id,
    avionicId,
    title,
    summary,
    sectionSlug,
    order,
    publicationState: "published",
    technicalMetadata: g1000TechnicalMetadata
  };
}
