import type {
  CourseDocument,
  ExerciseDocument,
  FinalAssessmentDocument,
  LessonDocument,
  ModuleDocument
} from "@/features/content/types";
import { educationalExplanationMetadata, trainingExerciseMetadata } from "@/features/technical/defaults";

export const simulatorOnlyDisclaimer =
  "Este curso é destinado exclusivamente ao aprendizado em simuladores de voo e não substitui formação aeronáutica oficial, instrução prática, manuais da aeronave, regulamentos ou orientação de instrutores certificados.";
const courseTechnicalMetadata = educationalExplanationMetadata({
  sourceTitle: "ICAO Annex 2; DECEA ICA 100-12; AISWEB; FAA Instrument Flying Handbook; FAA Instrument Procedures Handbook; FAA Pilot's Handbook of Aeronautical Knowledge; FAA AIM; EASA Easy Access Rules for Air Operations; Garmin G1000 NXi support/manual references; Textron Aviation SkyCourier public materials; Microsoft Flight Simulator documentation",
  sourceOrganization: "ICAO; DECEA; Federal Aviation Administration; EASA; Garmin; Textron Aviation; Microsoft",
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  simulatorAircraftVariant: "Cessna 408 SkyCourier",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorAdaptationNotes: "Conteúdo educacional para simulador, pendente de validação técnica por fonte aplicável quando tratar de operação, sistemas ou performance.",
  knownSimulatorDifferences: "Diferenças entre aeronave real, aviônicos reais e implementação do simulador devem ser registradas por aula quando identificadas."
});
const lessonTechnicalMetadata = educationalExplanationMetadata({
  sourceTitle: "ICAO Annex 2; DECEA ICA 100-12; AISWEB; FAA Instrument Flying Handbook; FAA Instrument Procedures Handbook; FAA Pilot's Handbook of Aeronautical Knowledge; FAA AIM; EASA Easy Access Rules for Air Operations; Garmin G1000 NXi support/manual references; Textron Aviation SkyCourier public materials; Microsoft Flight Simulator documentation",
  sourceOrganization: "ICAO; DECEA; Federal Aviation Administration; EASA; Garmin; Textron Aviation; Microsoft",
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  simulatorAircraftVariant: "Cessna 408 SkyCourier",
  simulatorPlatform: "Microsoft Flight Simulator",
  revisionNotes: "Aula didática local. Não usar como SOP, AFM, POH, FCOM, QRH ou manual oficial."
});
const exerciseTechnicalMetadata = trainingExerciseMetadata({
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  simulatorAircraftVariant: "Cessna 408 SkyCourier",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorAdaptationNotes: "Exercício didático para simulador; não representa procedimento aeronáutico oficial."
});

const navigationVfrCourseId = "course-navegacao-ifr";
const navigationIfrCourseId = "course-navegacao-ifr-instrumentos";

type LessonSpec = {
  title: string;
  slug: string;
  moduleId: string;
  order: number;
  duration: string;
  concepts: string[];
  objective: string;
  introduction: string;
  explanation: string;
  example: string;
  mistake: string;
  simulator: string;
  exercise: string;
  expected: string;
  conclusion: string;
  next: string;
};

export const localCourseDocuments: CourseDocument[] = [
  {
    id: "course-fundamentos-pilotagem",
    slug: "fundamentos-da-pilotagem",
    title: "Fundamentos da Pilotagem",
    description:
      "Curso introdutório para pilotos de simulador, focado em compreender a física do voo, controle da aeronave, instrumentos básicos, consciência situacional, energia e tomada de decisão.",
    category: "Fundamentos da Pilotagem",
    imageIcon: "plane-takeoff",
    level: "Inicial",
    audience: "Iniciantes no Microsoft Flight Simulator",
    referenceAircraft: "Cessna 408 SkyCourier",
    language: "Português do Brasil",
    disclaimer: simulatorOnlyDisclaimer,
    estimatedDuration: "14h 35min",
    progressPercent: 0,
    moduleCount: 6,
    status: "in_progress",
    prerequisites: ["Microsoft Flight Simulator instalado", "Controles básicos configurados", "Cessna 408 SkyCourier disponível no simulador"],
    updatedAt: "2026-07-23",
    order: 1,
    publicationState: "published",
    technicalMetadata: courseTechnicalMetadata
  },
  {
    id: "course-garmin-g1000-nxi",
    slug: "garmin-g1000-nxi",
    title: "Garmin G1000 NXi — Fundamentos",
    description:
      "Curso técnico e didático para compreender a lógica do Garmin G1000 NXi no Cessna 408 SkyCourier: PFD, MFD, CDI/HSI, GPS/NAV, Direct-To, Flight Plan, procedimentos, Flight Director, FMA, piloto automático, ILS, RNAV, troubleshooting e uso durante um voo completo no simulador.",
    category: "Aviônicos",
    imageIcon: "gauge",
    level: "Intermediário",
    audience: "Alunos que concluíram Fundamentos da Pilotagem",
    referenceAircraft: "Cessna 408 SkyCourier",
    language: "Português do Brasil",
    disclaimer: simulatorOnlyDisclaimer,
    estimatedDuration: "6h 00min",
    progressPercent: 0,
    moduleCount: 12,
    status: "locked",
    prerequisites: ["Concluir Fundamentos da Pilotagem"],
    updatedAt: "2026-07-23",
    order: 2,
    publicationState: "published",
    technicalMetadata: courseTechnicalMetadata
  },
  {
    id: navigationVfrCourseId,
    slug: "navegacao-ifr",
    title: "Navegação VFR",
    description: "Curso prático de navegação visual para planejar, acompanhar e corrigir voos VFR no Microsoft Flight Simulator, usando referências visuais, cartas, vento, tempo, distância e decisão.",
    category: "Navegação",
    imageIcon: "route",
    level: "Intermediário",
    audience: "Alunos que já concluíram Fundamentos da Pilotagem e querem planejar voos visuais com método.",
    referenceAircraft: "Cessna 408 SkyCourier",
    language: "Português do Brasil",
    disclaimer: simulatorOnlyDisclaimer,
    estimatedDuration: "10h 00min",
    progressPercent: 0,
    moduleCount: 5,
    status: "not_started",
    prerequisites: ["Fundamentos da Pilotagem"],
    updatedAt: "2026-07-24",
    order: 3,
    publicationState: "published",
    technicalMetadata: courseTechnicalMetadata
  },
  {
    id: navigationIfrCourseId,
    slug: "navegacao-ifr-instrumentos",
    title: "Navegação IFR",
    description:
      "Curso progressivo para compreender a lógica do voo por instrumentos no Microsoft Flight Simulator: planejamento IFR, instrumentos, navegação, SID, STAR, holds, ILS, RNAV, missed approach, automação e tomada de decisão.",
    category: "IFR",
    imageIcon: "radar",
    level: "Avançado",
    audience: "Alunos que já dominam fundamentos, navegação VFR e leitura básica de instrumentos.",
    referenceAircraft: "Cessna 408 SkyCourier",
    language: "Português do Brasil",
    disclaimer: simulatorOnlyDisclaimer,
    estimatedDuration: "14h 00min",
    progressPercent: 0,
    moduleCount: 6,
    status: "locked",
    prerequisites: ["Fundamentos da Pilotagem", "Navegação VFR", "Garmin G1000 NXi — Fundamentos"],
    updatedAt: "2026-07-24",
    order: 4,
    publicationState: "published",
    technicalMetadata: courseTechnicalMetadata
  }
];

const fundamentalsModuleIds = {
  situationalAwareness: "module-preparacao-consciencia-situacional",
  instruments: "module-instrumentos-basicos",
  physics: "module-fisica-do-voo",
  energy: "module-energia-controle",
  precision: "module-precisao-antecipacao",
  decision: "module-prioridades-decisao"
};

const garminCourseId = "course-garmin-g1000-nxi";

const garminModuleSpecs = [
  ["module-g1000-como-pensa", "Como o G1000 pensa", "Entende a lógica de integração entre sensores, fonte de navegação, displays, modos e fluxo de decisão."],
  ["module-g1000-pfd-mfd", "PFD e MFD", "Organiza a leitura dos dois displays principais e a divisão de atenção no cockpit."],
  ["module-g1000-cdi-hsi", "CDI e HSI", "Introduz desvio lateral, fonte ativa e consciência de curso."],
  ["module-g1000-gps-nav", "GPS e NAV", "Separa navegação GPS, NAV, VOR/LOC e troca de fonte."],
  ["module-g1000-direct-to", "Direct-To", "Prepara uso criterioso do destino direto sem perder consciência situacional."],
  ["module-g1000-flight-plan", "Flight Plan", "Estrutura o uso introdutório de plano de voo e sequenciamento de waypoints."],
  ["module-g1000-piloto-automatico", "Piloto automático", "Apresenta modos laterais e verticais como ferramentas que precisam ser monitoradas."],
  ["module-g1000-vs-flc", "VS e FLC", "Compara razão vertical e velocidade alvo no controle vertical."],
  ["module-g1000-vnav", "VNAV", "Prepara o aluno para pensar em perfil vertical e restrições."],
  ["module-g1000-ils", "ILS", "Introduz preparação para aproximação ILS no simulador."],
  ["module-g1000-rnav", "RNAV", "Introduz aproximações RNAV e lógica GPS aplicada."],
  ["module-g1000-treinamento-c408", "Treinamento no C408", "Conecta o G1000 NXi aos exercícios práticos no Cessna 408 SkyCourier."]
] as const;

const garminModuleLessonSlugs = [
  ["g1000-como-o-sistema-pensa"],
  ["g1000-pfd-e-mfd"],
  ["g1000-cdi-e-hsi"],
  ["g1000-gps-e-nav"],
  ["g1000-direct-to"],
  ["g1000-flight-plan", "g1000-obs"],
  ["g1000-piloto-automatico", "g1000-altitude-selecionada"],
  ["g1000-vs-e-flc"],
  ["g1000-vnav"],
  ["g1000-ils"],
  ["g1000-rnav"],
  ["g1000-treinamento-no-c408", "g1000-falhas-e-erros-comuns"]
] as const;

const garminModuleDocuments: ModuleDocument[] = garminModuleSpecs.map(([id, title, description], index) => ({
  id,
  courseId: garminCourseId,
  title,
  description,
  order: index + 1,
  lessonIds: garminModuleLessonSlugs[index].map((slug) => `lesson-${slug}`),
  duration: garminModuleLessonSlugs[index].length > 1 ? "1h 00min" : "30 min",
  status: "locked",
  progressPercent: 0,
  prerequisites: index === 0 ? ["course-fundamentos-pilotagem"] : [garminModuleSpecs[index - 1][0]],
  publicationState: "published"
}));

const navigationVfrModuleIds = {
  conceptsWeather: "module-vfr-conceitos-meteorologia",
  chartsAirports: "module-vfr-cartas-aerodromos",
  headingWind: "module-vfr-proa-vento-tempo",
  routePlanning: "module-vfr-planejamento-rota",
  executionDecision: "module-vfr-execucao-decisao"
};

const navigationVfrModuleDocuments: ModuleDocument[] = [
  {
    id: navigationVfrModuleIds.conceptsWeather,
    courseId: navigationVfrCourseId,
    title: "Conceitos VFR e meteorologia visual",
    description: "Define voo VFR, diferencia VFR e IFR, apresenta VMC, visibilidade, teto, nuvens e os limites educacionais das regras por país.",
    order: 1,
    lessonIds: [
      "lesson-vfr-o-que-e-voo-visual",
      "lesson-vfr-vmc-visibilidade-teto-nuvens",
      "lesson-vfr-orientacao-espacial-referencias",
      "lesson-vfr-meteorologia-em-rota"
    ],
    duration: "2h 00min",
    status: "not_started",
    progressPercent: 0,
    prerequisites: ["course-fundamentos-pilotagem"],
    publicationState: "published"
  },
  {
    id: navigationVfrModuleIds.chartsAirports,
    courseId: navigationVfrCourseId,
    title: "Cartas, aeródromos e circuito",
    description: "Ensina leitura básica de cartas, aeródromos, pistas, cabeceiras, elevação, circuito de tráfego e entradas/saídas VFR.",
    order: 2,
    lessonIds: [
      "lesson-vfr-leitura-basica-de-cartas",
      "lesson-vfr-aerodromos-pistas-e-cabeceiras",
      "lesson-vfr-circuito-de-trafego",
      "lesson-vfr-espaco-aereo-e-altitude"
    ],
    duration: "2h 00min",
    status: "not_started",
    progressPercent: 0,
    prerequisites: [navigationVfrModuleIds.conceptsWeather],
    publicationState: "published"
  },
  {
    id: navigationVfrModuleIds.headingWind,
    courseId: navigationVfrCourseId,
    title: "Proa, vento, distância e tempo",
    description: "Constrói a base de navegação estimada: proa, curso, rumo, trajetória, norte verdadeiro/magnético, vento, deriva, velocidade no solo e estimativas.",
    order: 3,
    lessonIds: [
      "lesson-vfr-proa-rumo-curso-trajetoria",
      "lesson-vfr-norte-verdadeiro-magnetico",
      "lesson-vfr-velocidade-distancia-tempo",
      "lesson-vfr-vento-deriva-correcao"
    ],
    duration: "2h 00min",
    status: "not_started",
    progressPercent: 0,
    prerequisites: [navigationVfrModuleIds.chartsAirports],
    publicationState: "published"
  },
  {
    id: navigationVfrModuleIds.routePlanning,
    courseId: navigationVfrCourseId,
    title: "Planejamento de rota VFR",
    description: "Organiza pontos de referência, pilotagem, navegação estimada, combustível, alternado, briefing de saída e chegada.",
    order: 4,
    lessonIds: [
      "lesson-vfr-pontos-de-referencia",
      "lesson-vfr-navegacao-estimada-e-observada",
      "lesson-vfr-combustivel-alternado-ponto-nao-retorno",
      "lesson-vfr-briefing-de-rota"
    ],
    duration: "2h 00min",
    status: "not_started",
    progressPercent: 0,
    prerequisites: [navigationVfrModuleIds.headingWind],
    publicationState: "published"
  },
  {
    id: navigationVfrModuleIds.executionDecision,
    courseId: navigationVfrCourseId,
    title: "Execução, correções e voo completo",
    description: "Aplica o plano no simulador: GPS como apoio, correções de desvio, perda de orientação, desvio meteorológico, VFR noturno introdutório e voo completo.",
    order: 5,
    lessonIds: [
      "lesson-vfr-gps-como-apoio",
      "lesson-vfr-correcao-de-desvio",
      "lesson-vfr-perda-de-orientacao-e-desvio",
      "lesson-vfr-voo-completo-planejado"
    ],
    duration: "2h 00min",
    status: "not_started",
    progressPercent: 0,
    prerequisites: [navigationVfrModuleIds.routePlanning],
    publicationState: "published"
  }
];

const navigationIfrModuleIds = {
  conceptsInstruments: "module-ifr-conceitos-instrumentos",
  navigationSystems: "module-ifr-navegacao-sistemas",
  planningCharts: "module-ifr-planejamento-cartas",
  departuresEnrouteHolds: "module-ifr-saidas-rota-holds",
  arrivalsApproaches: "module-ifr-chegadas-aproximacoes",
  automationCompleteFlight: "module-ifr-automacao-voo-completo"
};

const navigationIfrModuleDocuments: ModuleDocument[] = [
  {
    id: navigationIfrModuleIds.conceptsInstruments,
    courseId: navigationIfrCourseId,
    title: "Conceitos IFR e instrumentos",
    description: "Apresenta a lógica do voo por instrumentos, responsabilidades do piloto, scan, instrumentos primários e secundários, pressão e consciência vertical.",
    order: 1,
    lessonIds: [
      "lesson-ifr-o-que-e-voo-por-instrumentos",
      "lesson-ifr-responsabilidades-e-limites",
      "lesson-ifr-scan-e-instrumentos-primarios",
      "lesson-ifr-pressao-altitudes-e-niveis"
    ],
    duration: "2h 20min",
    status: "locked",
    progressPercent: 0,
    prerequisites: [navigationVfrCourseId],
    publicationState: "published"
  },
  {
    id: navigationIfrModuleIds.navigationSystems,
    courseId: navigationIfrCourseId,
    title: "Navegação IFR e auxílios",
    description: "Constrói a lógica de waypoints, aerovias, interseções, VOR, DME, NDB conceitual, GPS, RNAV, FMS e sequenciamento.",
    order: 2,
    lessonIds: [
      "lesson-ifr-waypoints-aerovias-intersecoes",
      "lesson-ifr-vor-dme-ndb",
      "lesson-ifr-gps-rnav-fms",
      "lesson-ifr-sequencia-logica-da-navegacao"
    ],
    duration: "2h 20min",
    status: "locked",
    progressPercent: 0,
    prerequisites: [navigationIfrModuleIds.conceptsInstruments],
    publicationState: "published"
  },
  {
    id: navigationIfrModuleIds.planningCharts,
    courseId: navigationIfrCourseId,
    title: "Planejamento e cartas IFR",
    description: "Ensina leitura de plano IFR, clearance, meteorologia, NOTAM introdutório, alternado, reservas, cabeçalhos, mínimos e restrições de cartas.",
    order: 3,
    lessonIds: [
      "lesson-ifr-plano-clearance-briefing",
      "lesson-ifr-meteorologia-notam-alternado",
      "lesson-ifr-leitura-de-cartas-ifr",
      "lesson-ifr-altitudes-restricoes-e-minimos"
    ],
    duration: "2h 20min",
    status: "locked",
    progressPercent: 0,
    prerequisites: [navigationIfrModuleIds.navigationSystems],
    publicationState: "published"
  },
  {
    id: navigationIfrModuleIds.departuresEnrouteHolds,
    courseId: navigationIfrCourseId,
    title: "Saídas, rota e esperas",
    description: "Aprofunda SID, ODP, transitions, interceptação de curso e radial, mudança de aerovia, holds, entradas e racetrack.",
    order: 4,
    lessonIds: [
      "lesson-ifr-sid-odp-transition",
      "lesson-ifr-interceptacao-curso-radial",
      "lesson-ifr-aerovias-mudanca-de-rota",
      "lesson-ifr-hold-entry-racetrack"
    ],
    duration: "2h 20min",
    status: "locked",
    progressPercent: 0,
    prerequisites: [navigationIfrModuleIds.planningCharts],
    publicationState: "published"
  },
  {
    id: navigationIfrModuleIds.arrivalsApproaches,
    courseId: navigationIfrCourseId,
    title: "Chegadas e aproximações",
    description: "Explica STAR, IAF, IF, FAF, MAP, ILS, Localizer, Glide Slope, RNAV, LNAV, LPV, mínimos, aproximação estabilizada e arremetida IFR.",
    order: 5,
    lessonIds: [
      "lesson-ifr-star-iaf-if-faf-map",
      "lesson-ifr-ils-localizer-glide-slope",
      "lesson-ifr-rnav-lnav-lpv-minimos",
      "lesson-ifr-missed-approach-arremetida"
    ],
    duration: "2h 20min",
    status: "locked",
    progressPercent: 0,
    prerequisites: [navigationIfrModuleIds.departuresEnrouteHolds],
    publicationState: "published"
  },
  {
    id: navigationIfrModuleIds.automationCompleteFlight,
    courseId: navigationIfrCourseId,
    title: "Automação, decisão e voo completo",
    description: "Integra Flight Director, NAV, HDG, APR, ALT, VS, FLC, modos ativos/armados, consciência situacional, alternado e voo IFR completo no simulador.",
    order: 6,
    lessonIds: [
      "lesson-ifr-flight-director-piloto-automatico",
      "lesson-ifr-consciencia-situacional-e-erros",
      "lesson-ifr-alternado-reprogramacao",
      "lesson-ifr-voo-completo"
    ],
    duration: "2h 20min",
    status: "locked",
    progressPercent: 0,
    prerequisites: [navigationIfrModuleIds.arrivalsApproaches],
    publicationState: "published"
  }
];

export const localModuleDocuments: ModuleDocument[] = [
  {
    id: fundamentalsModuleIds.situationalAwareness,
    courseId: "course-fundamentos-pilotagem",
    title: "Preparação e consciência situacional",
    description: "Constrói a mentalidade inicial: entender o voo, avaliar riscos, ler condições básicas e antecipar terreno, vento e altímetro.",
    order: 1,
    lessonIds: [
      "lesson-o-que-e-pilotar",
      "lesson-pave",
      "lesson-metar-basico",
      "lesson-elevacao-altitude-e-altura",
      "lesson-terreno-e-consciencia-situacional",
      "lesson-vento-e-escolha-da-pista",
      "lesson-qnh-e-altimetro"
    ],
    duration: "2h 55min",
    status: "in_progress",
    progressPercent: 0,
    prerequisites: [],
    publicationState: "published"
  },
  {
    id: fundamentalsModuleIds.instruments,
    courseId: "course-fundamentos-pilotagem",
    title: "Instrumentos básicos",
    description: "Ensina a interpretar instrumentos primários sem perder a noção de atitude, desempenho e tendência.",
    order: 2,
    lessonIds: [
      "lesson-horizonte-artificial",
      "lesson-velocidade-indicada",
      "lesson-vsi",
      "lesson-altimetro",
      "lesson-scan-de-instrumentos",
      "lesson-instrumentos-de-controle-e-desempenho"
    ],
    duration: "2h 30min",
    status: "not_started",
    progressPercent: 0,
    prerequisites: [fundamentalsModuleIds.situationalAwareness],
    publicationState: "published"
  },
  {
    id: fundamentalsModuleIds.physics,
    courseId: "course-fundamentos-pilotagem",
    title: "Física do voo",
    description: "Apresenta sustentação, peso, empuxo, arrasto, ângulo de ataque, estol e planeio de forma aplicada ao simulador.",
    order: 3,
    lessonIds: [
      "lesson-as-quatro-forcas",
      "lesson-sustentacao",
      "lesson-angulo-de-ataque",
      "lesson-estol",
      "lesson-planeio-apos-falha-de-motor"
    ],
    duration: "2h 05min",
    status: "not_started",
    progressPercent: 0,
    prerequisites: [fundamentalsModuleIds.instruments],
    publicationState: "published"
  },
  {
    id: fundamentalsModuleIds.energy,
    courseId: "course-fundamentos-pilotagem",
    title: "Energia e controle",
    description: "Mostra como altitude, velocidade, potência e atitude se combinam para estabilizar subida, descida e aproximação.",
    order: 4,
    lessonIds: [
      "lesson-energia-potencial-e-cinetica",
      "lesson-potencia-e-atitude",
      "lesson-aproximacao-estabilizada",
      "lesson-corrigir-a-causa-nao-o-efeito",
      "lesson-a-cadeia-de-controle"
    ],
    duration: "2h 05min",
    status: "not_started",
    progressPercent: 0,
    prerequisites: [fundamentalsModuleIds.physics],
    publicationState: "published"
  },
  {
    id: fundamentalsModuleIds.precision,
    courseId: "course-fundamentos-pilotagem",
    title: "Precisão e antecipação",
    description: "Treina pensar à frente, observar tendências, nivelar com antecedência e evitar correções excessivas.",
    order: 5,
    lessonIds: [
      "lesson-flying-ahead-of-the-airplane",
      "lesson-tendencia",
      "lesson-nivelamento",
      "lesson-atraso-de-resposta",
      "lesson-pio",
      "lesson-novo-equilibrio"
    ],
    duration: "2h 30min",
    status: "not_started",
    progressPercent: 0,
    prerequisites: [fundamentalsModuleIds.energy],
    publicationState: "published"
  },
  {
    id: fundamentalsModuleIds.decision,
    courseId: "course-fundamentos-pilotagem",
    title: "Prioridades e tomada de decisão",
    description: "Fecha o curso aplicando prioridades, intenção versus resultado, subidas, descidas, redução de velocidade e exercício final.",
    order: 6,
    lessonIds: [
      "lesson-aviate-navigate-communicate",
      "lesson-o-aviao-nao-conhece-sua-intencao",
      "lesson-subidas",
      "lesson-descidas",
      "lesson-reducao-de-velocidade-mantendo-altitude",
      "lesson-exercicio-final-fundamentos"
    ],
    duration: "2h 30min",
    status: "not_started",
    progressPercent: 0,
    prerequisites: [fundamentalsModuleIds.precision],
    publicationState: "published"
  },
  ...garminModuleDocuments,
  ...navigationVfrModuleDocuments,
  ...navigationIfrModuleDocuments
];

const lessonSpecs: LessonSpec[] = [
  spec(1, fundamentalsModuleIds.situationalAwareness, "O que é pilotar", "o-que-e-pilotar", "25 min", ["Atitude", "Potência", "Trajetória", "Energia"], "Diferenciar movimentar comandos de realmente pilotar a aeronave no simulador.", "Pilotar não é apenas mover manche, manete e pedais. Pilotar é observar o estado da aeronave, prever sua resposta e comandar mudanças com intenção técnica.", "Uma aeronave responde às leis físicas. Ela não sabe que você deseja subir, manter altitude ou reduzir velocidade; ela apenas reage à atitude, à potência, à configuração e ao ambiente.", "Se o C408 começa a perder altitude em cruzeiro, puxar o nariz sem avaliar potência e velocidade pode apenas trocar altitude por velocidade e aproximar a aeronave de uma condição instável.", "O erro comum é confundir movimento com controle: mexer muito nos comandos, mas sem monitorar se atitude, potência, trajetória e energia caminham para o resultado desejado.", "No Microsoft Flight Simulator, voe reto e nivelado por cinco minutos no C408. Faça pequenas alterações de atitude e potência e observe velocidade, altitude e VSI antes de corrigir novamente.", "Descreva, em suas palavras, a diferença entre comandar a aeronave e pilotar a aeronave.", "A resposta deve mencionar atitude, potência, trajetória, energia, observação dos instrumentos e o fato de que o avião responde a comandos físicos, não à intenção do piloto.", "A primeira habilidade é pensar como piloto: observar, comandar, aguardar a resposta e corrigir com método.", "A próxima aula apresenta o PAVE, um modelo simples para avaliar riscos antes de iniciar o voo."),
  spec(2, fundamentalsModuleIds.situationalAwareness, "PAVE", "pave", "25 min", ["Pilot", "Aircraft", "Environment", "External pressures"], "Usar o PAVE como checklist mental de risco antes do voo.", "PAVE organiza a preparação em quatro áreas: Pilot, Aircraft, enVironment e External pressures. A ideia é não iniciar o voo apenas porque o simulador permite clicar em Fly.", "Pilot verifica preparo e carga de trabalho. Aircraft verifica aeronave, combustível, configuração e limitações. Environment olha vento, clima, terreno e aeroporto. External pressures identifica pressões como pressa, objetivo rígido ou vontade de completar o voo a qualquer custo.", "Em um voo curto com vento cruzado forte, pouca visibilidade e aeroporto cercado por terreno, o risco pode ser alto mesmo que a rota pareça simples no mapa.", "O erro comum é avaliar só a aeronave e esquecer ambiente e pressão externa. No simulador isso aparece quando o aluno tenta pousar de qualquer jeito para terminar a missão.", "Antes de decolar no C408, escreva quatro linhas: uma para você, uma para a aeronave, uma para ambiente e uma para pressões externas.", "Monte uma avaliação PAVE para um voo local com vento cruzado moderado.", "A resposta deve citar preparo do piloto, configuração/combustível da aeronave, vento/visibilidade/terreno e qualquer pressão para continuar o voo.", "PAVE reduz improviso e transforma a preparação em decisão consciente.", "A próxima aula entra em METAR básico, parte essencial da área Environment."),
  spec(3, fundamentalsModuleIds.situationalAwareness, "METAR básico", "metar-basico", "25 min", ["Vento", "Visibilidade", "Nuvens", "Temperatura", "QNH"], "Interpretar os elementos básicos de um METAR para decidir se o voo é adequado.", "O METAR descreve as condições observadas no aeroporto. Mesmo em simulador, ele ajuda a entender vento, visibilidade, nuvens, temperatura, ponto de orvalho e pressão.", "O vento indica direção e intensidade; visibilidade mostra o alcance horizontal; nuvens indicam cobertura e altura; temperatura e ponto de orvalho sugerem proximidade de saturação; pressão alimenta o ajuste do altímetro.", "Um METAR com vento 220 graus a 18 nós e pista 22 sugere vento de proa. O mesmo vento para uma pista 13 cria componente cruzado importante.", "O erro comum é olhar apenas se está chovendo ou não. Vento, teto e visibilidade podem ser mais importantes para a operação do que a chuva visual.", "Escolha um aeroporto no simulador, leia o METAR exibido e anote vento, visibilidade, nuvens e pressão antes de selecionar a pista.", "Interprete um METAR simples e diga se o vento favorece ou dificulta a operação.", "A resposta deve identificar direção/intensidade do vento, visibilidade, camada de nuvens, temperatura/ponto de orvalho e pressão, relacionando vento à pista.", "METAR básico não substitui meteorologia real, mas cria disciplina de leitura do ambiente.", "A próxima aula diferencia elevação, altitude e altura, conceitos fundamentais para interpretar terreno e aproximação."),
  spec(4, fundamentalsModuleIds.situationalAwareness, "Elevação, altitude e altura", "elevacao-altitude-e-altura", "25 min", ["Elevação", "Altitude indicada", "Altura", "Obstáculos"], "Distinguir elevação do aeroporto, altitude indicada e altura sobre o terreno.", "Elevação é a posição vertical de um ponto no terreno em relação ao nível médio do mar. Altitude indicada é o que o altímetro mostra após ajuste. Altura é a distância vertical em relação ao terreno abaixo.", "Uma aeronave a 5.000 pés de altitude indicada sobre um aeroporto com elevação de 3.500 pés está apenas cerca de 1.500 pés acima daquele terreno, desconsiderando erros e ajustes.", "Ao aproximar de um aeroporto elevado, olhar apenas a altitude indicada pode dar falsa sensação de margem sobre obstáculos.", "O erro comum é tratar altitude como altura. Isso causa aproximações altas ou baixas e reduz a consciência sobre terreno.", "No mapa do simulador, escolha aeroporto em região elevada e compare altitude do circuito com a elevação do campo.", "Explique por que 4.000 pés indicados não significam sempre 4.000 pés acima do solo.", "A resposta deve citar elevação do terreno/aeroporto e diferenciar referência ao nível do mar de referência ao terreno.", "Compreender referências verticais evita decisões baseadas em números fora de contexto.", "A próxima aula amplia essa consciência para terreno, obstáculos e trajetória."),
  spec(5, fundamentalsModuleIds.situationalAwareness, "Terreno e consciência situacional", "terreno-e-consciencia-situacional", "25 min", ["Posição", "Elevação", "Obstáculos", "Trajetória", "Antecipação"], "Relacionar posição, terreno e trajetória para evitar surpresas no simulador.", "Consciência situacional é saber onde você está, para onde está indo, o que existe ao redor e o que provavelmente acontecerá nos próximos minutos.", "Terreno alto, obstáculos, vale, aproximação e trajetória precisam ser pensados juntos. Uma rota segura no mapa pode exigir altitude maior antes de cruzar uma serra.", "Ao voar o C408 em direção a uma região montanhosa, manter a mesma altitude sem prever subida pode deixar pouca margem para manobra.", "O erro comum é olhar só para o painel e esquecer o mundo externo ou o mapa. Isso cria voo tecnicamente controlado, mas mal posicionado.", "Faça uma rota curta próxima a terreno elevado e verbalize a cada minuto: posição, altitude, terreno à frente e plano de ação.", "Liste quatro perguntas de consciência situacional antes de iniciar uma descida.", "A resposta deve incluir posição atual, elevação/obstáculos, trajetória pretendida e antecipação do próximo passo.", "Pilotar bem envolve manter o avião sob controle e também manter a mente à frente do avião.", "A próxima aula aplica essa antecipação ao vento e à escolha da pista."),
  spec(6, fundamentalsModuleIds.situationalAwareness, "Vento e escolha da pista", "vento-e-escolha-da-pista", "25 min", ["Vento de proa", "Vento de cauda", "Vento cruzado", "Pistas"], "Escolher a pista mais adequada observando direção e intensidade do vento.", "A pista é escolhida, sempre que possível, para operar contra o vento. Vento de proa reduz distância e melhora controle; vento de cauda aumenta distância e risco; vento cruzado exige correções laterais.", "A numeração da pista representa sua direção magnética aproximada. Pista 22 aponta aproximadamente para 220 graus; vento vindo de 220 graus favorece decolagem e pouso nessa pista.", "Se o vento está de 040 graus, a pista 04 tende a ser melhor que a 22, pois usar a 22 colocaria vento de cauda.", "O erro comum é escolher a pista pela conveniência do plano de voo ou pela aproximação visual mais bonita, ignorando vento.", "No simulador, selecione um aeroporto com duas cabeceiras. Compare vento atual com a numeração das pistas e escolha a mais favorável.", "Dado vento 180 graus a 12 nós e pistas 18/36, escolha a pista e explique.", "A resposta esperada é pista 18, pois recebe vento de proa; também pode citar atenção a obstáculos e procedimentos locais.", "Escolher pista é uma decisão de energia e segurança, não apenas de navegação.", "A próxima aula fecha o módulo mostrando como o ajuste QNH influencia a leitura de altitude."),
  spec(7, fundamentalsModuleIds.situationalAwareness, "QNH e altímetro", "qnh-e-altimetro", "25 min", ["Pressão atmosférica", "QNH", "Altímetro", "Altitude indicada"], "Entender por que ajustar o altímetro é essencial para interpretar altitude.", "O altímetro usa pressão para estimar altitude. Como a pressão atmosférica muda, o piloto ajusta o QNH para que a indicação faça sentido em relação ao aeroporto e ao nível do mar.", "Se o QNH estiver incorreto, a altitude indicada também estará incorreta. Em aproximação, isso pode levar o aluno a acreditar que está mais alto ou mais baixo do que realmente está no cenário.", "Ao iniciar em um aeroporto, ajustar o altímetro para o QNH local deve fazer a altitude indicada ficar próxima da elevação do campo.", "O erro comum é decolar com ajuste padrão ou antigo e confiar cegamente na altitude indicada durante aproximação.", "Antes de cada voo no C408, ajuste o altímetro pelo QNH do simulador e compare a indicação com a elevação do aeroporto.", "Explique o risco de usar QNH incorreto em uma aproximação.", "A resposta deve mencionar erro de altitude indicada, risco com obstáculos, aproximação fora do perfil e decisões baseadas em informação falsa.", "QNH conecta meteorologia, instrumento e segurança vertical.", "No próximo módulo, você começa a ler instrumentos básicos com mais método."),
  spec(1, fundamentalsModuleIds.instruments, "Horizonte artificial", "horizonte-artificial", "25 min", ["Pitch", "Bank", "Atitude", "Trajetória"], "Usar o horizonte artificial para interpretar atitude, sem confundir atitude com trajetória.", "O horizonte artificial mostra a atitude da aeronave: nariz acima ou abaixo e inclinação lateral. Ele não mostra diretamente se você está subindo, descendo ou mantendo altitude.", "Pitch é atitude longitudinal; bank é inclinação. Uma atitude de nariz levemente acima pode resultar em subida, voo nivelado ou perda de velocidade dependendo de potência e configuração.", "No C408, manter pequeno pitch positivo com potência adequada pode sustentar cruzeiro; com pouca potência, a mesma atitude pode gerar redução de velocidade.", "O erro comum é achar que nariz acima sempre significa subida segura. Sem energia suficiente, a aeronave pode desacelerar e aproximar-se do estol.", "Em voo nivelado, altere pitch em pequenos incrementos e observe velocidade, altímetro e VSI após alguns segundos.", "Explique a diferença entre atitude e trajetória.", "A resposta deve dizer que atitude é a orientação da aeronave; trajetória é o caminho resultante, dependente também de potência, velocidade e energia.", "O horizonte artificial é instrumento de controle, mas precisa ser confirmado por desempenho.", "A próxima aula observa a velocidade indicada como um dos principais resultados desse controle."),
  spec(2, fundamentalsModuleIds.instruments, "Velocidade indicada", "velocidade-indicada", "25 min", ["IAS", "Arco branco", "Arco verde", "Limites", "Tendência"], "Interpretar IAS e faixas de operação de forma útil no simulador.", "Velocidade indicada, ou IAS, é a velocidade mostrada ao piloto e usada para muitas decisões de controle. Ela informa margem operacional, tendência e proximidade de limites.", "Arco verde representa faixa normal de operação; arco branco está associado à operação com flap; marcas e limites ajudam a evitar excesso ou falta de velocidade.", "Em aproximação, velocidade dentro da faixa esperada facilita configurar a aeronave e manter trajetória. Velocidade alta aumenta distância; velocidade baixa reduz margem.", "O erro comum é olhar apenas o número atual e ignorar tendência. Uma velocidade aparentemente boa pode estar caindo rápido.", "No C408, estabilize uma velocidade em cruzeiro, reduza potência e observe quanto tempo leva para a IAS começar a cair.", "Diga por que tendência de velocidade importa tanto quanto o valor mostrado.", "A resposta deve mencionar que o piloto precisa antecipar perda ou ganho de energia, evitando correções atrasadas.", "IAS é uma janela para a energia cinética da aeronave.", "A próxima aula apresenta o VSI, outro instrumento de desempenho com atraso próprio."),
  spec(3, fundamentalsModuleIds.instruments, "VSI", "vsi", "25 min", ["Razão de subida", "Razão de descida", "Atraso", "Desempenho"], "Usar o VSI como instrumento de desempenho, respeitando seu atraso.", "O VSI mostra razão de subida ou descida, geralmente em pés por minuto. Ele confirma se a aeronave está ganhando ou perdendo altitude e a intensidade dessa mudança.", "O VSI não reage instantaneamente. Após uma mudança de atitude ou potência, pode haver atraso antes de a indicação estabilizar.", "Se você reduz potência e baixa levemente o nariz, o VSI pode demorar para mostrar uma descida estável. Corrigir antes da estabilização pode gerar oscilação.", "O erro comum é perseguir o ponteiro do VSI, fazendo comandos sucessivos sem esperar a aeronave responder.", "Faça uma descida de 500 pés por minuto no C408. Ajuste uma vez, espere, observe e só então refine.", "Explique por que o VSI não deve ser usado como instrumento primário de comando.", "A resposta deve citar atraso e função de confirmar desempenho, enquanto atitude e potência são comandos principais.", "VSI confirma resultado, mas não deve comandar sozinho sua mão.", "A próxima aula revisa a leitura do altímetro e a antecipação do nivelamento."),
  spec(4, fundamentalsModuleIds.instruments, "Altímetro", "altimetro", "25 min", ["Leitura", "Centenas", "Milhares", "Nivelamento"], "Ler o altímetro com segurança e antecipar nivelamentos.", "O altímetro exige leitura calma. Ponteiros, fitas digitais ou escalas devem ser interpretados em milhares e centenas para evitar confusão.", "Além do valor atual, o piloto observa a aproximação da altitude desejada. Quanto maior a razão de subida ou descida, mais cedo deve iniciar o nivelamento.", "Descendo para 4.000 pés a 1.000 pés por minuto, esperar exatamente 4.000 para nivelar fará a aeronave passar abaixo antes de estabilizar.", "O erro comum é tratar a altitude alvo como botão instantâneo. A aeronave tem inércia e precisa de antecipação.", "No simulador, suba até 5.000 pés e comece o nivelamento antes da altitude, observando VSI e velocidade.", "Descreva como antecipar um nivelamento em descida.", "A resposta deve mencionar reduzir razão de descida antes da altitude alvo, ajustar atitude, potência e aguardar estabilização.", "Altitude é objetivo, mas o caminho até ela exige planejamento.", "A próxima aula junta instrumentos em um scan organizado."),
  spec(5, fundamentalsModuleIds.instruments, "Scan de instrumentos", "scan-de-instrumentos", "25 min", ["Atitude", "Velocidade", "Altitude", "VSI", "Proa"], "Criar um scan básico sem fixar os olhos em um único instrumento.", "Scan é o ciclo de observação entre instrumentos e referências externas. O objetivo é perceber mudanças cedo, não decorar números isolados.", "Um scan simples alterna atitude, velocidade, altitude, VSI e proa. A atitude mostra comando; os demais confirmam desempenho.", "Em subida, você observa pitch, IAS, VSI, altímetro e proa. Se a velocidade cai demais, ajuste atitude ou potência antes que a situação piore.", "O erro comum é fixar o olhar no instrumento que preocupa, como velocidade, e perder altitude, proa ou atitude.", "Voe por dez minutos mantendo altitude e proa. A cada poucos segundos, verbalize atitude, velocidade, altitude, VSI e proa.", "Monte uma sequência de scan para voo nivelado.", "A resposta deve incluir atitude como referência frequente, seguida de velocidade, altitude/VSI e proa, sem fixação exclusiva.", "Um bom scan transforma instrumentos em narrativa de tendência.", "A próxima aula separa instrumentos de controle e desempenho."),
  spec(6, fundamentalsModuleIds.instruments, "Instrumentos de controle e desempenho", "instrumentos-de-controle-e-desempenho", "25 min", ["Controle", "Desempenho", "Atitude", "Potência"], "Entender a relação entre comando aplicado e resposta observada.", "Instrumentos de controle indicam o que você está comandando, principalmente atitude e potência. Instrumentos de desempenho mostram o que a aeronave está fazendo, como velocidade, VSI e altitude.", "Você ajusta atitude e potência, espera a resposta e confirma nos instrumentos de desempenho. Essa cadeia evita correção aleatória.", "Para iniciar uma descida, reduza potência e ajuste atitude. Depois confirme no VSI, na velocidade e no altímetro se a descida está no perfil.", "O erro comum é tentar controlar diretamente o desempenho sem entender o comando que o produz.", "Escolha uma altitude e pratique pequenas mudanças de potência/atitude, anotando como IAS e VSI respondem.", "Explique por que atitude e potência são tratados como controles principais.", "A resposta deve dizer que eles são comandos que geram alterações de desempenho observadas depois em velocidade, altitude e VSI.", "Separar controle de desempenho cria método e reduz ansiedade no cockpit.", "O próximo módulo entra na física que explica por que esses comandos funcionam."),
  spec(1, fundamentalsModuleIds.physics, "As quatro forças", "as-quatro-forcas", "25 min", ["Sustentação", "Peso", "Empuxo", "Arrasto"], "Compreender as quatro forças básicas e o equilíbrio em voo nivelado.", "Todo voo pode ser entendido a partir de sustentação, peso, empuxo e arrasto. Elas não aparecem como botões no cockpit, mas explicam o comportamento da aeronave.", "Em voo nivelado estabilizado, sustentação equilibra peso e empuxo equilibra arrasto. Quando esse equilíbrio muda, altitude, velocidade ou trajetória mudam.", "Aumentar potência aumenta empuxo disponível; se atitude for mantida, a aeronave tende a acelerar até novo equilíbrio.", "O erro comum é tentar resolver tudo pelo manche, esquecendo que potência e arrasto também participam.", "No C408, mantenha altitude e altere potência em pequenos passos. Observe como a velocidade muda até estabilizar.", "Descreva as quatro forças e como elas se equilibram em voo nivelado.", "A resposta deve citar sustentação contra peso e empuxo contra arrasto, com equilíbrio dinâmico em voo estabilizado.", "As quatro forças são a linguagem de fundo de todo controle de voo.", "A próxima aula aprofunda a sustentação."),
  spec(2, fundamentalsModuleIds.physics, "Sustentação", "sustentacao", "25 min", ["Velocidade", "Ângulo de ataque", "Densidade", "Asa"], "Relacionar sustentação com velocidade, ângulo de ataque, densidade e formato da asa.", "Sustentação não é mágica. Ela depende da interação entre asa e ar, influenciada por velocidade, ângulo de ataque, densidade do ar e formato da asa.", "Mais velocidade geralmente aumenta sustentação; maior ângulo de ataque aumenta sustentação até certo limite; ar menos denso reduz desempenho.", "Em altitude elevada ou dia quente simulado, a aeronave pode precisar de mais pista ou mais cuidado para subir.", "O erro comum é achar que sustentação depende só de velocidade. Ângulo de ataque e densidade também mudam o resultado.", "Compare decolagem em aeroporto ao nível do mar e em aeroporto elevado, observando aceleração e razão de subida.", "Explique dois fatores que afetam a sustentação além da velocidade.", "A resposta deve mencionar ângulo de ataque, densidade do ar e/ou formato da asa, relacionando-os ao voo.", "Sustentação é resultado de condições físicas, não de desejo do piloto.", "A próxima aula mostra por que ângulo de ataque é central para entender estol."),
  spec(3, fundamentalsModuleIds.physics, "Ângulo de ataque", "angulo-de-ataque", "25 min", ["Ângulo de ataque", "Sustentação", "Limite crítico", "Estol"], "Entender ângulo de ataque e sua relação com sustentação e estol.", "Ângulo de ataque é o ângulo entre a corda da asa e o vento relativo. Ele não é simplesmente o ângulo do nariz no horizonte.", "Aumentar ângulo de ataque aumenta sustentação até um limite crítico. Depois desse limite, o fluxo se separa e a asa perde eficiência.", "Em curva, subida ou flare excessivo, o ângulo de ataque pode crescer mesmo que a velocidade ainda pareça razoável.", "O erro comum é tratar estol como sinônimo de baixa velocidade. A causa conceitual é exceder o ângulo de ataque crítico.", "Em altitude segura no simulador, observe como comandos bruscos de nariz para cima degradam velocidade e resposta.", "Explique por que ângulo de ataque não é igual a pitch.", "A resposta deve citar vento relativo e dizer que pitch é atitude no horizonte, enquanto AOA depende do fluxo de ar sobre a asa.", "Ângulo de ataque conecta comando, sustentação e limite de voo.", "A próxima aula usa esse conceito para entender estol."),
  spec(4, fundamentalsModuleIds.physics, "Estol", "estol", "25 min", ["Ângulo crítico", "Sintomas", "Recuperação", "Prevenção"], "Reconhecer conceitualmente o estol e a lógica de recuperação no simulador.", "Estol acontece quando a asa excede o ângulo de ataque crítico. Ele não depende apenas de baixa velocidade; pode ocorrer em várias atitudes e configurações.", "Sintomas incluem resposta mais mole, alerta de estol, queda de nariz, perda de altitude ou vibração simulada. A recuperação conceitual começa reduzindo ângulo de ataque.", "Se o aluno puxa demais para manter altitude com pouca potência, pode aumentar AOA e piorar a situação.", "O erro comum é puxar ainda mais quando a aeronave começa a afundar, agravando o estol.", "Em altitude segura, pratique reconhecimento conceitual com cautela: reduza AOA, estabilize atitude e recupere energia antes de tentar subir.", "Explique a primeira ação conceitual para sair de um estol.", "A resposta esperada é reduzir o ângulo de ataque, estabilizar, gerenciar potência e recuperar voo controlado.", "Evitar estol é principalmente gerenciar atitude e energia antes do limite.", "A próxima aula mostra que, mesmo sem motor, ainda há planeio e decisões a tomar."),
  spec(5, fundamentalsModuleIds.physics, "Planeio após falha de motor", "planeio-apos-falha-de-motor", "25 min", ["Falha de motor", "Energia potencial", "Melhor planeio", "Local de pouso"], "Entender que a aeronave continua voando após perda de potência e precisa ser gerenciada.", "Após falha de motor, o avião não cai imediatamente. Ele transforma altitude em deslocamento horizontal se o piloto mantiver atitude e velocidade adequadas.", "Energia potencial é altitude disponível. Melhor planeio é uma atitude/velocidade que maximiza alcance para escolher local e preparar pouso simulado.", "Se a potência some a 7.000 pés, baixar o nariz para manter velocidade de planeio é mais importante do que tentar segurar altitude impossível.", "O erro comum é puxar para manter altitude, perdendo velocidade e aproximando a aeronave de estol.", "Simule redução de potência em altitude segura e pratique manter velocidade de planeio, escolhendo um campo ou pista próxima.", "Descreva prioridades após falha de motor em altitude.", "A resposta deve citar controlar atitude/velocidade, escolher local, planejar trajetória e não tentar manter altitude indefinidamente.", "Planeio é gerenciamento de energia sob pressão.", "O próximo módulo transforma essa ideia em gerenciamento amplo de energia e controle."),
  spec(1, fundamentalsModuleIds.energy, "Energia potencial e cinética", "energia-potencial-e-cinetica", "25 min", ["Altitude", "Velocidade", "Troca de energia", "Gerenciamento"], "Usar altitude e velocidade como formas de energia no voo.", "Altitude representa energia potencial; velocidade representa energia cinética. Pilotar bem é trocar uma pela outra de forma controlada.", "Ao baixar o nariz, você tende a trocar altitude por velocidade. Ao subir sem potência suficiente, troca velocidade por altitude até a energia se esgotar.", "Em descida, o C408 pode ganhar velocidade rapidamente se a potência não for reduzida e a atitude não for planejada.", "O erro comum é tratar velocidade e altitude como números separados, quando uma influencia a outra.", "Faça uma descida suave e observe como potência, pitch, VSI e IAS se relacionam.", "Explique uma situação em que altitude vira velocidade.", "A resposta deve mencionar descida ou nariz baixo, com conversão de energia potencial em cinética.", "Energia é a moeda do voo: você gasta, guarda e troca.", "A próxima aula explica como potência e atitude administram essa moeda."),
  spec(2, fundamentalsModuleIds.energy, "Potência e atitude", "potencia-e-atitude", "25 min", ["Potência", "Atitude", "Subida", "Descida", "Velocidade"], "Entender potência como fonte de energia e atitude como distribuição dessa energia.", "Potência altera a energia disponível. Atitude define como essa energia aparece: mais velocidade, mais subida, menor descida ou estabilização.", "Com mais potência e atitude adequada, a aeronave pode subir. Com pouca potência e atitude mantida, pode perder velocidade ou altitude.", "Para descer mantendo velocidade, normalmente reduz-se potência e ajusta-se atitude para controlar razão de descida.", "O erro comum é esperar que potência sozinha resolva trajetória ou que pitch sozinho controle velocidade.", "No C408, compare duas descidas: uma só baixando nariz e outra reduzindo potência com atitude planejada.", "Descreva o papel de potência e atitude em uma subida.", "A resposta deve citar potência de subida, atitude para velocidade alvo e confirmação em VSI/altímetro.", "Potência e atitude trabalham juntas; separá-las mentalmente cria controle preciso.", "A próxima aula aplica essa precisão à aproximação estabilizada."),
  spec(3, fundamentalsModuleIds.energy, "Aproximação estabilizada", "aproximacao-estabilizada", "25 min", ["Velocidade", "Trajetória", "Configuração", "Potência", "Arremetida"], "Identificar os elementos de uma aproximação estabilizada e quando arremeter.", "Uma aproximação estabilizada mantém velocidade correta, trajetória coerente, configuração definida, potência adequada e pequenas correções.", "Se a aeronave está alta, rápida, desalinhada ou com grande variação de potência perto da pista, a aproximação deixou de ser previsível.", "No C408, chegar à final com velocidade controlada e razão de descida estável é mais seguro do que tentar salvar tudo nos últimos segundos.", "O erro comum é insistir na aproximação instável por orgulho ou pressa, em vez de arremeter e reorganizar.", "Faça aproximações curtas no simulador e decida, antes da final curta, se continua ou arremete conforme critérios simples.", "Liste quatro critérios de aproximação estabilizada.", "A resposta deve citar velocidade, trajetória, configuração, potência/razão de descida e alinhamento.", "A aproximação estabilizada é uma decisão contínua, não um detalhe visual.", "A próxima aula ensina a corrigir causas, não sintomas."),
  spec(4, fundamentalsModuleIds.energy, "Corrigir a causa, não o efeito", "corrigir-a-causa-nao-o-efeito", "25 min", ["Causa", "Efeito", "Energia", "Correção"], "Aplicar a regra de ouro de corrigir a causa do desvio.", "Quando algo sai do perfil, o primeiro passo é perguntar por quê. Baixo, alto, rápido ou lento são efeitos; potência, atitude, configuração e planejamento são causas prováveis.", "Se você está baixo e lento, puxar pode piorar. Talvez a causa seja pouca potência ou excesso de arrasto. Se está rápido, baixar o nariz pode aumentar ainda mais a velocidade.", "Em descida para pouso, uma razão excessiva pode exigir potência e ajuste suave de atitude, não apenas puxar o manche.", "O erro comum é reagir ao efeito com comando automático, sem diagnóstico.", "Durante uma aproximação, pause mentalmente antes de corrigir: diga o efeito, a causa provável e o comando escolhido.", "Dado que o avião está baixo e perdendo velocidade, qual diagnóstico inicial você faria?", "A resposta deve mencionar energia insuficiente, possível pouca potência ou atitude inadequada, evitando simplesmente puxar.", "A boa correção começa no diagnóstico.", "A próxima aula organiza esse processo em uma cadeia de controle."),
  spec(5, fundamentalsModuleIds.energy, "A cadeia de controle", "a-cadeia-de-controle", "25 min", ["Potência", "Atitude", "Desempenho", "Correção", "Espera"], "Usar uma sequência ordenada de comando, observação e correção.", "A cadeia de controle é: ajustar potência e atitude, observar desempenho, corrigir pouco e esperar a resposta da aeronave.", "A aeronave tem inércia. Comandos sucessivos antes da resposta completa geram oscilação e perda de precisão.", "Para nivelar, reduza pitch de subida, ajuste potência, observe VSI/altímetro/velocidade e só então refine.", "O erro comum é fazer três correções diferentes em poucos segundos e depois não saber qual causou o resultado.", "Pratique uma subida, uma descida e um nivelamento usando a frase: comando, observo, espero, corrijo.", "Descreva a cadeia de controle em quatro etapas.", "A resposta deve mencionar potência/atitude, desempenho, pequena correção e espera pela resposta.", "A cadeia de controle reduz improviso e prepara pilotagem mais precisa.", "O próximo módulo foca em antecipação e precisão."),
  spec(1, fundamentalsModuleIds.precision, "Flying ahead of the airplane", "flying-ahead-of-the-airplane", "25 min", ["Pensar à frente", "Prever", "Planejar", "Antecipar"], "Aprender a pensar à frente da aeronave em vez de apenas reagir.", "Flying ahead of the airplane significa estar mentalmente no próximo evento antes de ele chegar. O piloto prevê mudanças e prepara ações.", "Antes da altitude alvo, você já pensa no nivelamento. Antes da final, já pensa em velocidade, configuração e arremetida. Antes do terreno subir, já pensa em margem.", "Descendo para 4.000 pés, você não espera 4.000 para decidir; observa VSI e começa a reduzir a descida antes.", "O erro comum é reagir só depois que o problema aparece grande no painel.", "Faça um voo curto com três eventos planejados: subir, nivelar e reduzir velocidade. Diga em voz alta o próximo passo antes de executá-lo.", "Explique como pensar à frente ajuda no nivelamento.", "A resposta deve citar antecipar razão vertical, iniciar ajustes antes da altitude e evitar ultrapassar o alvo.", "Antecipação é uma habilidade silenciosa, mas muda toda a qualidade do voo.", "A próxima aula aprofunda a leitura de tendência."),
  spec(2, fundamentalsModuleIds.precision, "Tendência", "tendencia", "25 min", ["Observação", "Direção dos valores", "Antecipação", "Trajetória"], "Observar para onde velocidade, altitude e trajetória estão indo.", "Tendência é mais importante que fotografia instantânea. O valor atual diz onde você está; a tendência diz onde estará em breve.", "Velocidade 120 nós pode estar segura se está estável, mas preocupante se cai rapidamente. Altitude 4.200 pés é diferente subindo ou descendo a 1.000 pés por minuto.", "Na aproximação, uma trajetória levemente baixa mas estabilizando pode ser menos preocupante que uma trajetória aparentemente boa piorando rápido.", "O erro comum é corrigir números atuais sem entender direção e velocidade da mudança.", "Durante cinco minutos, observe apenas tendências: IAS subindo/descendo, VSI aumentando/reduzindo, altitude aproximando/afastando.", "Dê um exemplo de valor aceitável com tendência ruim.", "A resposta deve mencionar um valor dentro do esperado mas mudando rapidamente para fora do perfil, como velocidade caindo.", "Tendência é a ponte entre observação e antecipação.", "A próxima aula usa tendência para nivelar com precisão."),
  spec(3, fundamentalsModuleIds.precision, "Nivelamento", "nivelamento", "25 min", ["Antecipação", "VSI", "Atitude", "Potência", "Estabilização"], "Executar nivelamentos sem ultrapassar altitude nem perder energia.", "Nivelar não é congelar a aeronave na altitude. É reduzir gradualmente a razão vertical, ajustar atitude, ajustar potência e estabilizar velocidade.", "Quanto maior o VSI, mais cedo começa o nivelamento. A atitude deve voltar ao voo nivelado, e a potência deve ser ajustada para a fase desejada.", "Subindo a 1.000 pés por minuto para 7.000 pés, iniciar a transição perto de 6.900 pés pode evitar passar da altitude.", "O erro comum é esperar a altitude exata e fazer correção brusca, gerando oscilação.", "Pratique subir para 5.000 pés e nivelar com variação máxima pequena, observando VSI zerar progressivamente.", "Descreva os passos de um nivelamento em subida.", "A resposta deve citar iniciar antes da altitude, reduzir pitch, ajustar potência, monitorar VSI/altímetro e estabilizar velocidade.", "Nivelamento é antecipação aplicada.", "A próxima aula explica por que a aeronave demora a responder."),
  spec(4, fundamentalsModuleIds.precision, "Atraso de resposta", "atraso-de-resposta", "25 min", ["Inércia", "Tempo de resposta", "Espera", "Correções pequenas"], "Respeitar o tempo entre comando e resultado para evitar instabilidade.", "A aeronave não responde como cursor de mouse. Há inércia, atraso de instrumentos e tempo para novo equilíbrio.", "Depois de ajustar pitch ou potência, aguarde a tendência aparecer. Corrigir imediatamente pode duplicar o comando antes de saber seu efeito.", "Ao reduzir potência para descer, o VSI e a velocidade podem levar alguns segundos para estabilizar.", "O erro comum é empilhar correções: baixa nariz, aumenta potência, puxa, reduz potência, tudo antes de observar.", "Faça uma alteração pequena de potência e espere dez segundos antes de qualquer nova correção, anotando a tendência.", "Por que esperar faz parte do controle?", "A resposta deve mencionar inércia, atraso de instrumentos e necessidade de identificar a resposta real da aeronave.", "Esperar não é passividade; é parte do método.", "A próxima aula mostra o que acontece quando o piloto corrige demais: PIO."),
  spec(5, fundamentalsModuleIds.precision, "PIO", "pio", "25 min", ["Pilot-Induced Oscillation", "Correções excessivas", "Comandos pequenos", "Estabilização"], "Reconhecer e reduzir Pilot-Induced Oscillation no simulador.", "PIO ocorre quando o piloto cria ou amplifica oscilações com correções excessivas e alternadas.", "O aluno passa do alvo, corrige demais para o outro lado, passa novamente e entra em ciclo. Isso é comum em pitch, flare, altitude e alinhamento.", "Na final, puxar demais, depois empurrar demais, depois puxar de novo pode tornar a aproximação instável.", "O erro comum é achar que o problema é falta de força no comando, quando na verdade é excesso de comando.", "Pratique manter altitude com movimentos muito pequenos, soltando pressão e aguardando resposta antes da próxima correção.", "Como sair de uma tendência de PIO?", "A resposta deve mencionar reduzir amplitude dos comandos, recentrar, esperar resposta e buscar estabilização gradual.", "Precisão vem de comandos pequenos, não de força.", "A próxima aula apresenta a ideia de novo equilíbrio após cada mudança."),
  spec(6, fundamentalsModuleIds.precision, "Novo equilíbrio", "novo-equilibrio", "25 min", ["Equilíbrio", "Potência", "Atitude", "Velocidade", "Arrasto"], "Entender que a aeronave busca novo equilíbrio após cada mudança.", "Toda mudança de potência, atitude ou configuração leva a aeronave a buscar um novo equilíbrio entre sustentação, peso, empuxo e arrasto.", "Você não controla apenas o instante da mudança; controla a transição até que velocidade, razão vertical e atitude se estabilizem.", "Ao baixar flap, o arrasto aumenta. Mesmo mantendo atitude, a velocidade e a necessidade de potência podem mudar até novo equilíbrio.", "O erro comum é esperar que a aeronave mantenha exatamente o mesmo comportamento após mudar configuração.", "No C408, mude potência em cruzeiro e observe o tempo até velocidade e atitude ficarem estáveis novamente.", "Explique o que significa novo equilíbrio após reduzir potência.", "A resposta deve citar menor energia disponível, possível mudança de velocidade/razão vertical e necessidade de estabilização.", "Cada comando inicia uma transição. O piloto acompanha até estabilizar.", "O módulo final conecta controle preciso com prioridades e tomada de decisão."),
  spec(1, fundamentalsModuleIds.decision, "Aviate, Navigate, Communicate", "aviate-navigate-communicate", "25 min", ["Aviate", "Navigate", "Communicate", "Emergências"], "Aplicar prioridades corretas, especialmente sob carga de trabalho.", "Aviate, Navigate, Communicate significa controlar primeiro, navegar depois e comunicar por último. Sem controle da aeronave, as outras tarefas perdem sentido.", "Em emergência simulada, a primeira ação mental é manter atitude e velocidade seguras. Depois vem direção/local; só então rádio ou menus.", "Se há falha de motor, não comece procurando frequência enquanto a velocidade degrada. Voe o avião.", "O erro comum é mexer no GPS, rádio ou checklist enquanto a aeronave sai de controle.", "Simule uma pane simples em altitude e verbalize: aviate, navigate, communicate, executando nessa ordem.", "Dê um exemplo de decisão Aviate antes de Navigate.", "A resposta deve citar manter controle, atitude e velocidade antes de escolher rota ou comunicar.", "Prioridade correta reduz carga mental e evita perder o básico.", "A próxima aula reforça que a intenção só vale quando o desempenho confirma."),
  spec(2, fundamentalsModuleIds.decision, "O avião não conhece sua intenção", "o-aviao-nao-conhece-sua-intencao", "25 min", ["Intenção", "Resultado", "Comandos", "Desempenho"], "Separar o que o piloto queria do que a aeronave realmente está fazendo.", "Você pode querer subir, reduzir velocidade ou manter altitude, mas a aeronave só responde aos comandos e condições físicas.", "A intenção precisa ser verificada no desempenho. Se você queria nivelar, confira altímetro e VSI. Se queria reduzir velocidade, confira IAS e tendência.", "Empurrar levemente o nariz para reduzir velocidade é incoerente se isso aumenta a descida e a velocidade.", "O erro comum é insistir no comando porque a intenção era correta, mesmo quando o resultado mostra o contrário.", "Em cada manobra, diga: minha intenção é X; meus comandos são Y; o desempenho mostrou Z.", "Explique como verificar se sua intenção virou resultado.", "A resposta deve citar instrumentos de desempenho, tendência e correção caso o resultado não corresponda.", "Boa pilotagem é humildade diante dos dados.", "As próximas aulas aplicam essa verificação em subidas e descidas."),
  spec(3, fundamentalsModuleIds.decision, "Subidas", "subidas", "25 min", ["Potência de subida", "Atitude", "Velocidade", "VSI", "Nivelamento"], "Executar subida com potência, atitude, velocidade e antecipação.", "Subida exige potência adequada, atitude que preserve velocidade e scan para confirmar razão vertical e altitude.", "A potência fornece energia; atitude seleciona a velocidade de subida; VSI e altímetro confirmam desempenho. O nivelamento deve ser antecipado.", "No C408, uma subida muito íngreme pode parecer eficiente, mas pode degradar velocidade e aumentar carga de trabalho.", "O erro comum é puxar demais para subir mais rápido, perdendo velocidade e estabilidade.", "Decole ou inicie subida em altitude segura, defina atitude, monitore IAS/VSI e nivele antes da altitude alvo.", "Descreva uma subida estabilizada.", "A resposta deve mencionar potência de subida, atitude para velocidade alvo, VSI positivo, altímetro subindo e antecipação do nivelamento.", "Subir bem é administrar energia sem sacrificar margem de velocidade.", "A próxima aula aplica raciocínio semelhante às descidas."),
  spec(4, fundamentalsModuleIds.decision, "Descidas", "descidas", "25 min", ["Redução de potência", "Atitude de descida", "Velocidade", "VSI", "Nivelamento"], "Executar descida controlada sem deixar a velocidade fugir.", "Descida normalmente começa reduzindo potência e ajustando atitude. O objetivo é controlar razão de descida e velocidade ao mesmo tempo.", "Se apenas baixar o nariz, a aeronave pode acelerar. Se apenas reduzir potência sem atitude adequada, pode perder velocidade ou ficar fora do perfil.", "Para descer de 7.000 para 4.000 pés, planeje razão, monitore VSI e prepare nivelamento antes da altitude.", "O erro comum é iniciar descida tarde e compensar com razão excessiva ou velocidade alta.", "Faça descida de 1.000 pés com razão estável, mantendo velocidade dentro de faixa confortável.", "Descreva como iniciar uma descida planejada.", "A resposta deve citar reduzir potência, ajustar atitude, monitorar IAS/VSI/altímetro e antecipar nivelamento.", "Descida boa começa antes do nariz baixar: começa no planejamento.", "A próxima aula combina descida mental com redução de velocidade mantendo altitude."),
  spec(5, fundamentalsModuleIds.decision, "Redução de velocidade mantendo altitude", "reducao-de-velocidade-mantendo-altitude", "25 min", ["Reduzir potência", "Manter altitude", "Atitude", "Velocidade", "Compensar"], "Reduzir velocidade sem perder altitude desnecessariamente.", "Para reduzir velocidade mantendo altitude, normalmente reduza potência e ajuste atitude para sustentar altitude enquanto a aeronave desacelera.", "Com menos potência, será necessário gerenciar pitch e compensação. O altímetro e o VSI confirmam se a altitude está sendo mantida.", "Reduzir velocidade em voo nivelado exige paciência: potência menor, atitude ajustada, compensação e observação da tendência, usando valores operacionais apenas quando confirmados na documentação da aeronave.", "O erro comum é reduzir potência e deixar o nariz cair, transformando redução de velocidade em descida acelerada.", "No C408, em altitude segura, reduza potência e mantenha altitude até atingir uma nova velocidade segura conforme configuração e documentação aplicável, fazendo pequenas correções.", "Descreva como reduzir velocidade mantendo altitude sem usar valores específicos não confirmados.", "A resposta deve mencionar reduzir potência, manter altitude com atitude, acompanhar IAS, compensar e estabilizar.", "Controle de velocidade em altitude fixa mostra maturidade no gerenciamento de energia.", "A próxima aula reúne tudo em um cenário final."),
  spec(6, fundamentalsModuleIds.decision, "Exercício final", "exercicio-final-fundamentos", "25 min", ["C408", "Circuito", "Decolagem", "Aproximação", "Pouso", "Arremetida"], "Executar um primeiro voo completo guiado no simulador, integrando preparação, decolagem, circuito, aproximação, pouso e arremetida quando necessário.", "O cenário final combina as principais ideias do curso em um voo local visual no Microsoft Flight Simulator.", "A resposta não deve ser uma sequência mecânica. O aluno precisa explicar preparação, vento, pista, atitude, potência, energia, instrumentos, circuito, aproximação estabilizada e decisão de arremeter.", "Uma execução madura começa planejando o voo, evitando chegar atrasado ao circuito e preparando a aproximação antes da final.", "O erro comum é tentar salvar uma aproximação instável apenas para pousar.", "No simulador, configure clima claro e vento fraco. Execute um circuito visual simples no C408 usando somente valores confirmados na documentação aplicável.", "Descreva preparação, decolagem, circuito, aproximação, pouso e arremetida em um voo local guiado.", "A resposta deve citar PAVE/METAR, pista contra o vento, altímetro, controle direcional, subida inicial, circuito, final estabilizada, flare, toque, controle após pouso e arremetida se instável.", "Você concluiu a base conceitual para controlar a aeronave com método no simulador.", "A conclusão leva à avaliação final e prepara o estudo do Garmin G1000 NXi.")
];

type LessonEnhancement = Partial<Omit<LessonSpec, "slug" | "moduleId" | "order">>;

const fundamentalsLessonEnhancements: Record<string, LessonEnhancement> = {
  "o-que-e-pilotar": {
    concepts: ["Controles de voo", "Aileron", "Profundor", "Leme", "Trim", "Flaps", "Potência", "Atitude"],
    explanation:
      "Pilotar começa por entender que cada comando altera o equilíbrio da aeronave. O profundor controla arfagem e, portanto, a atitude de nariz; os ailerons controlam rolagem; o leme atua na guinada e ajuda a manter coordenação; o trim reduz esforço contínuo após a aeronave estar estabilizada; os flaps mudam sustentação, arrasto e atitude necessária em baixa velocidade; a potência altera a energia disponível. Nenhum desses comandos deve ser usado isoladamente como solução mágica. O aluno deve sempre perguntar: que atitude eu selecionei, que potência apliquei, qual desempenho resultou e qual tendência apareceu nos instrumentos?",
    simulator:
      "Atividade prática: em clima calmo no Microsoft Flight Simulator, coloque o C408 ou uma aeronave de treino em altitude segura, em voo reto e nivelado. Faça uma pequena pressão para trás e solte; observe horizonte artificial, velocidade, altímetro e VSI. Repita com pequena rolagem, pequena aplicação de leme e ajuste de potência. Critério de sucesso: reconhecer qual instrumento confirma cada efeito sem fazer comandos bruscos. Reinicie se a aeronave entrar em grande oscilação ou se você perder referência de atitude.",
    exercise: "Explique o papel de profundor, ailerons, leme, trim, flaps e potência no controle básico da aeronave.",
    expected:
      "A resposta deve dizer que profundor controla arfagem, ailerons controlam rolagem, leme ajuda na guinada e coordenação, trim alivia esforço depois de estabilizar, flaps alteram sustentação/arrasto/configuração e potência gerencia energia. Deve citar que o piloto observa atitude, velocidade, altitude, VSI e proa para confirmar resultado."
  },
  pave: {
    explanation:
      "PAVE é uma forma simples de aplicar gerenciamento de risco antes do voo. Pilot avalia preparo, fadiga, domínio dos controles e carga de trabalho. Aircraft avalia se a aeronave escolhida é adequada ao exercício, se a configuração está compreendida e se limitações dependem de documentação. Environment avalia vento, visibilidade, nuvens, pista, terreno e luz. External pressures avalia pressa, vontade de concluir a missão, excesso de confiança e resistência a arremeter. Em simulador, isso evita o hábito ruim de começar qualquer cenário sem briefing.",
    simulator:
      "Atividade prática: antes de clicar em Fly, escreva um PAVE de quatro linhas. Use meteorologia simples, pista longa, visibilidade boa e vento fraco no primeiro treino. Se quiser aumentar dificuldade, altere apenas um fator por vez. Critério de sucesso: conseguir explicar por que o cenário é adequado para o objetivo da aula. Reinicie o planejamento se houver vento cruzado forte, baixa visibilidade ou aeronave/configuração que você ainda não entende.",
    exercise: "Monte um PAVE para um primeiro voo local no simulador e diga qual risco faria você simplificar o exercício.",
    expected:
      "A resposta deve incluir preparo do piloto, aeronave/configuração, ambiente e pressão externa. Deve reconhecer que vento, visibilidade, pista curta, terreno ou pressa podem justificar simplificar, adiar ou reiniciar o treino."
  },
  "metar-basico": {
    explanation:
      "METAR é uma observação meteorológica padronizada do aeródromo. Para fundamentos, concentre-se em vento, visibilidade, nuvens, temperatura, ponto de orvalho e pressão. Vento informa direção de onde ele vem e intensidade; visibilidade indica quanto você consegue enxergar; nuvens ajudam a prever teto; temperatura e ponto de orvalho sugerem umidade; QNH ajusta o altímetro. Não é necessário dominar todos os grupos no início, mas é essencial perceber que vento e teto mudam a dificuldade do exercício.",
    simulator:
      "Atividade prática: escolha um aeroporto simples, leia o METAR ou a meteorologia configurada e anote vento, visibilidade, nuvens e pressão. Depois escolha uma pista coerente com o vento e compare a sensação de decolar contra o vento e com vento de cauda em um cenário didático. Não trate componentes ou limites como oficiais do C408 sem consultar documentação. Critério de sucesso: relacionar vento à pista e prever se o exercício ficará mais fácil ou mais difícil.",
    exercise: "Leia um METAR simples e explique quais elementos influenciam decolagem, circuito e pouso visual.",
    expected:
      "A resposta deve citar vento, visibilidade, teto/nuvens e pressão. Deve relacionar vento à pista, visibilidade à referência externa, teto à margem vertical e QNH à leitura correta do altímetro."
  },
  "elevacao-altitude-e-altura": {
    explanation:
      "Elevação é a altura de um ponto do terreno ou aeroporto em relação ao nível médio do mar. Altitude indicada é a leitura do altímetro ajustado. Altura é a separação vertical em relação ao solo abaixo da aeronave. Essa diferença muda a forma de pensar aproximação, terreno e circuito: uma altitude que parece alta no painel pode representar pouca margem sobre um aeroporto elevado. Em voo visual, o piloto combina altímetro, visão externa e consciência de terreno.",
    simulator:
      "Atividade prática: escolha um aeroporto ao nível do mar e outro em região elevada. Compare elevação do campo, altitude indicada no pátio e percepção visual no circuito. Depois faça uma aproximação visual simples observando que a altitude indicada não é a mesma coisa que altura acima da pista. Critério de sucesso: explicar com suas palavras por que uma mesma altitude indicada pode representar alturas diferentes sobre terrenos diferentes.",
    exercise: "Diferencie elevação, altitude indicada e altura usando um aeroporto elevado como exemplo.",
    expected:
      "A resposta deve definir elevação como referência do terreno ao nível médio do mar, altitude indicada como leitura do altímetro ajustado e altura como distância vertical sobre o terreno. Deve citar risco de interpretar altitude como se fosse sempre altura sobre o solo."
  },
  "terreno-e-consciencia-situacional": {
    explanation:
      "Consciência situacional é manter um quadro mental atualizado: posição, altitude, terreno, obstáculos, vento, configuração, combustível simulado, próxima ação e alternativa. Em fundamentos, isso vale mesmo sem navegação avançada. O aluno precisa olhar para fora, para o mapa quando apropriado e para os instrumentos, sem fixação exclusiva no painel. Terreno alto, vale, obstáculo e aproximação visual exigem antecipação: se você só percebe o problema quando está próximo, já perdeu tempo de decisão.",
    simulator:
      "Atividade prática: voe uma rota curta perto de relevo moderado, em clima claro. A cada minuto, verbalize: onde estou, qual altitude, o que há à frente, para onde posso virar, qual é minha próxima ação. Não use terreno montanhoso difícil no início. Critério de sucesso: manter controle da aeronave enquanto atualiza o quadro mental sem se perder no mapa.",
    exercise: "Liste as perguntas que você faria antes de iniciar uma descida visual perto de terreno elevado.",
    expected:
      "A resposta deve citar posição, altitude indicada, altura sobre terreno, obstáculos, vento, pista ou referência visual, razão de descida pretendida e alternativa caso a aproximação fique instável."
  },
  "vento-e-escolha-da-pista": {
    explanation:
      "Aeronaves normalmente decolam e pousam contra o vento porque o vento de proa aumenta a velocidade do ar sobre as asas para uma mesma velocidade em relação ao solo. Vento de cauda aumenta distância no solo e reduz margem. Vento cruzado exige corrigir deriva e manter controle direcional. A numeração da pista aproxima sua direção magnética: pista 18 aponta aproximadamente para 180 graus. Escolher pista é comparar vento, pista, obstáculos, tráfego e procedimentos locais, sem ignorar limites publicados da aeronave.",
    simulator:
      "Atividade prática: configure vento fraco alinhado com a pista, decole e observe controle direcional. Depois, em outro carregamento, use vento leve cruzado e perceba a tendência de deriva. Não use vento forte até dominar alinhamento e correção. Critério de sucesso: escolher a pista contra o vento e explicar se o componente é de proa, cauda ou cruzado.",
    exercise: "Explique como vento de proa, vento de cauda e vento cruzado afetam decolagem e pouso.",
    expected:
      "A resposta deve dizer que vento de proa é desejável, vento de cauda aumenta distância e risco, e vento cruzado exige correção lateral e controle direcional. Deve citar que limites reais dependem da documentação da aeronave."
  },
  "qnh-e-altimetro": {
    explanation:
      "O altímetro é um instrumento de pressão calibrado para indicar altitude. Como a pressão muda com o tempo e o local, o ajuste QNH permite que a altitude indicada fique coerente com a elevação do aeroporto quando a aeronave está no solo. Ajuste incorreto gera erro vertical: você pode acreditar que está acima ou abaixo do perfil real. Em voo visual no simulador, isso afeta circuito, aproximação e separação de terreno.",
    simulator:
      "Atividade prática: no pátio, ajuste o altímetro para o QNH exibido pelo simulador/ATIS e compare com a elevação do aeroporto. Depois altere o ajuste propositalmente e observe a mudança de leitura. Retorne ao valor correto antes de voar. Critério de sucesso: entender que QNH não muda a aeronave, muda a referência usada pelo instrumento.",
    exercise: "Explique por que decolar com QNH errado prejudica circuito e aproximação.",
    expected:
      "A resposta deve citar erro de altitude indicada, risco de perfil vertical errado, falsa margem sobre obstáculos e necessidade de conferir QNH antes da decolagem e aproximação."
  },
  "horizonte-artificial": {
    concepts: ["Arfagem", "Rolagem", "Bank", "Pitch", "Referência externa"],
    explanation:
      "O horizonte artificial mostra atitude: nariz acima/abaixo e asas niveladas/inclinadas. Arfagem é movimento em torno do eixo lateral; rolagem é movimento em torno do eixo longitudinal. A atitude selecionada é um comando inicial; desempenho é o resultado observado depois. Um mesmo nariz levemente acima pode resultar em subida, voo nivelado ou desaceleração, conforme potência, configuração e velocidade. Por isso o horizonte deve ser lido junto com velocímetro, altímetro, VSI e referência externa.",
    simulator:
      "Atividade prática: em voo nivelado e clima calmo, faça pequenas mudanças de pitch e bank. Aguarde alguns segundos antes de corrigir. Observe se a trajetória confirmou a atitude. Critério de sucesso: manter asas niveladas, reconhecer inclinação pequena antes que vire curva acentuada e não confundir nariz acima com subida garantida.",
    exercise: "Diferencie atitude, arfagem, rolagem e trajetória usando o horizonte artificial.",
    expected:
      "A resposta deve explicar que atitude é orientação da aeronave, arfagem é nariz subindo/descendo, rolagem é inclinação das asas, e trajetória é o caminho resultante confirmado por instrumentos e referência externa."
  },
  "velocidade-indicada": {
    concepts: ["IAS", "Tendência", "Margem", "Configuração", "Energia cinética"],
    explanation:
      "Velocidade indicada, ou IAS, é a velocidade apresentada ao piloto e usada para controle básico, margens e limites publicados. Em fundamentos, mais importante do que decorar um número sem fonte é entender tendência: a velocidade está aumentando, diminuindo ou estabilizada? Flaps, potência, atitude, peso e vento alteram a forma como a aeronave acelera ou desacelera. Valores operacionais do C408 devem vir de documentação aplicável; nesta etapa, trabalhe com faixas seguras do simulador e foco conceitual.",
    simulator:
      "Atividade prática: estabilize voo reto e nivelado em altitude segura. Reduza um pouco a potência e observe quanto tempo a IAS leva para cair. Depois aumente potência e observe a aceleração. Critério de sucesso: perceber tendência antes de chegar a uma velocidade indesejada. Reinicie se a aeronave entrar em atitude excessiva ou se você perder altitude sem intenção.",
    exercise: "Por que tendência de IAS pode ser mais útil do que olhar apenas o número instantâneo?",
    expected:
      "A resposta deve citar antecipação, energia cinética, desaceleração ou aceleração, configuração e necessidade de corrigir antes que a velocidade fique fora da faixa segura."
  },
  vsi: {
    explanation:
      "O VSI mostra razão vertical, geralmente em pés por minuto. Ele é instrumento de desempenho, não comando primário. Após alterar atitude ou potência, o VSI pode demorar a estabilizar; se você perseguir a indicação imediatamente, cria oscilação. Use atitude e potência para comandar, altímetro e VSI para confirmar. Em subidas e descidas, procure tendência estável em vez de resposta instantânea perfeita.",
    simulator:
      "Atividade prática: em altitude segura, reduza levemente potência e selecione uma atitude de descida suave. Aguarde a indicação do VSI estabilizar antes de nova correção. Depois nivele e observe o atraso da indicação. Critério de sucesso: fazer pequenas correções e evitar perseguir o ponteiro.",
    exercise: "Explique por que o VSI confirma desempenho, mas não deve ser perseguido como comando principal.",
    expected:
      "A resposta deve mencionar atraso, tendência, uso de atitude/potência como comandos e confirmação pelo altímetro/VSI após a aeronave responder."
  },
  altimetro: {
    explanation:
      "Ler altitude exige interpretar o instrumento e antecipar. Em fita digital ou mostrador analógico, o aluno deve distinguir milhares, centenas e tendência. A aeronave não para verticalmente no instante em que chega à altitude desejada: há inércia, potência, atitude e razão vertical. Quanto maior a razão de subida ou descida, mais cedo você deve iniciar o nivelamento. A técnica básica é reduzir a razão antes do alvo, ajustar atitude, ajustar potência e confirmar estabilização.",
    simulator:
      "Atividade prática: suba ou desça para uma altitude alvo em clima calmo. Comece a reduzir a razão vertical antes da altitude, sem esperar cruzar o número. Critério de sucesso: chegar próximo ao alvo com VSI reduzindo e velocidade controlada, sem ultrapassagem grande.",
    exercise: "Descreva como antecipar um nivelamento em subida ou descida.",
    expected:
      "A resposta deve citar observar razão vertical, iniciar nivelamento antes da altitude, ajustar atitude e potência, confirmar com altímetro/VSI e evitar correções tardias."
  },
  "scan-de-instrumentos": {
    explanation:
      "Scan é uma varredura ativa entre instrumentos e referência externa. A atitude informa o comando; velocidade, altímetro, VSI, proa e indicador de curva confirmam desempenho e coordenação. O scan não é olhar tudo com a mesma duração, mas voltar frequentemente ao instrumento que responde à manobra atual sem abandonar os demais. Em voo visual, o scan inclui o horizonte real, tráfego simulado, pista e terreno.",
    simulator:
      "Atividade prática: mantenha voo reto e nivelado por dez minutos. Verbalize em ciclo: atitude, velocidade, altitude, VSI, proa, referência externa. Depois faça uma curva rasa e inclua indicador de curva/coordenação. Critério de sucesso: perceber desvios pequenos antes que virem grandes.",
    exercise: "Monte um scan básico para voo reto e para curva rasa.",
    expected:
      "A resposta deve incluir atitude como referência central, velocidade, altitude/VSI, proa, coordenação e referência externa, ajustando a atenção conforme a manobra."
  },
  "instrumentos-de-controle-e-desempenho": {
    explanation:
      "Instrumentos de controle ajudam a selecionar a condição desejada; instrumentos de desempenho mostram o resultado. Horizonte artificial, potência selecionada e posição/configuração são referências de controle. Velocidade, altímetro, VSI, proa e coordenação mostram se o resultado está acontecendo. Essa separação evita corrigir efeito sem entender causa: se a altitude cai, a causa pode ser atitude, potência, velocidade, configuração ou turbulência.",
    simulator:
      "Atividade prática: escolha uma altitude e proa. Faça uma pequena mudança de potência e observe quais instrumentos mostram causa e quais mostram efeito. Critério de sucesso: explicar qual comando alterou a condição e qual instrumento confirmou o desempenho.",
    exercise: "Dê dois exemplos de instrumento de controle e dois de desempenho em uma subida.",
    expected:
      "A resposta deve citar atitude/potência como controle e IAS, VSI, altímetro e proa como desempenho, explicando que desempenho confirma se o comando funcionou."
  },
  "as-quatro-forcas": {
    concepts: ["Sustentação", "Peso", "Tração", "Arrasto", "Equilíbrio"],
    explanation:
      "As quatro forças básicas são sustentação, peso, tração e arrasto. Sustentação atua principalmente para cima, peso para baixo, tração impulsiona a aeronave e arrasto resiste ao movimento. Em voo reto e nivelado não significa que não há forças; significa que elas estão aproximadamente equilibradas. Alterar potência, atitude ou configuração muda esse equilíbrio. Flaps aumentam sustentação em certas condições, mas também aumentam arrasto; subida exige energia disponível; descida pode converter altitude em velocidade se não for controlada.",
    simulator:
      "Atividade prática: em voo nivelado, reduza potência e observe arrasto vencer tração, com tendência de perda de velocidade ou altitude. Depois aumente potência e observe a nova tendência. Critério de sucesso: relacionar cada mudança observada a uma força predominante, sem inventar valores específicos da aeronave.",
    exercise: "Explique como as quatro forças se equilibram no voo reto e o que muda ao reduzir potência.",
    expected:
      "A resposta deve citar sustentação/peso e tração/arrasto, explicando que reduzir potência reduz tração disponível e exige ajuste de atitude para manter velocidade, altitude ou iniciar descida controlada."
  },
  sustentacao: {
    explanation:
      "Sustentação depende da asa interagindo com o ar. Velocidade, ângulo de ataque, densidade do ar, configuração e formato da asa influenciam o resultado. Aumentar ângulo de ataque pode aumentar sustentação até um limite; ultrapassar esse limite leva ao estol. Mais velocidade geralmente aumenta energia disponível, mas não substitui controle de atitude. Ar quente, altitude elevada e peso maior degradam desempenho. Em simulador, perceba a relação antes de decorar números.",
    simulator:
      "Atividade prática: em altitude segura, compare voo nivelado limpo e com configuração diferente se a aeronave permitir, sempre dentro de faixa segura. Observe atitude, velocidade e tendência vertical. Critério de sucesso: explicar que sustentação não depende de um único fator e que valores operacionais devem vir do manual da aeronave.",
    exercise: "Cite três fatores que afetam sustentação e explique o limite imposto pelo ângulo de ataque.",
    expected:
      "A resposta deve citar velocidade, ângulo de ataque, densidade/configuração/peso e explicar que ângulo de ataque excessivo pode levar ao estol."
  },
  "angulo-de-ataque": {
    explanation:
      "Ângulo de ataque é o ângulo entre a corda da asa e o vento relativo. Ele não é a mesma coisa que atitude de nariz: uma aeronave pode ter nariz baixo e alto ângulo de ataque dependendo da trajetória. O estol ocorre quando o ângulo de ataque crítico é excedido, independentemente de altitude ou intenção do piloto. Entender isso evita a ideia errada de que estol só acontece devagar ou perto do solo.",
    simulator:
      "Atividade prática: em altitude segura e clima calmo, reduza potência gradualmente e mantenha altitude com cuidado até perceber necessidade crescente de atitude e sinais de baixa energia. Não force uma emergência sem entender recuperação. Critério de sucesso: reconhecer que segurar altitude com pouca energia aumenta ângulo de ataque.",
    exercise: "Explique a diferença entre atitude de nariz e ângulo de ataque.",
    expected:
      "A resposta deve dizer que atitude é orientação da aeronave em relação ao horizonte, enquanto ângulo de ataque é relação asa/vento relativo. Deve citar que estol depende de exceder ângulo crítico."
  },
  estol: {
    concepts: ["Estol", "Ângulo crítico", "Sinais", "Prevenção", "Recuperação"],
    explanation:
      "Estol é perda parcial de sustentação causada por exceder o ângulo de ataque crítico. Sinais podem incluir redução de controle, alerta sonoro/visual no simulador, buffeting quando modelado, queda de nariz ou asa e razão de descida aumentando. Prevenção é manter energia, atitude e configuração adequadas. Recuperação didática no simulador segue o princípio geral: reduzir ângulo de ataque, aplicar potência conforme apropriado, nivelar asas e recuperar trajetória sem comandos bruscos. Procedimentos reais dependem da aeronave e treinamento.",
    simulator:
      "Atividade prática: somente em altitude segura, clima calmo e sem tráfego simulado próximo, pratique reconhecer sinais de aproximação do estol. Faça o exercício de forma conceitual, sem buscar limite agressivo no C408. Critério de sucesso: reconhecer sinais cedo e recuperar controle reduzindo ângulo de ataque antes de perder muita altitude.",
    exercise: "Quais sinais indicam aproximação do estol e qual é a prioridade inicial de recuperação?",
    expected:
      "A resposta deve citar baixa velocidade/tendência, alerta, controles menos efetivos, buffeting quando presente e razão de descida. A prioridade inicial é reduzir ângulo de ataque e recuperar controle, com potência e asas niveladas conforme apropriado."
  },
  "planeio-apos-falha-de-motor": {
    explanation:
      "Falha de motor em fundamentos deve ser estudada como gerenciamento de energia e prioridades, não como procedimento real do C408. Sem tração, a aeronave troca altitude por velocidade para manter fluxo de ar sobre as asas. A prioridade é manter controle, selecionar atitude de planeio adequada conforme documentação da aeronave, escolher área ou pista viável no simulador e evitar curvas/atitudes que aumentem risco de estol. Valores e checklists reais dependem de manual e instrução.",
    simulator:
      "Atividade prática: em altitude segura, reduza potência para simular perda parcial/total e observe que manter velocidade exige baixar o nariz. Escolha uma área ampla no simulador e pratique manter controle, sem tratar isso como checklist oficial. Critério de sucesso: preservar atitude controlável e evitar puxar para tentar alongar planeio.",
    exercise: "Explique por que puxar o nariz após perda de potência pode piorar a situação.",
    expected:
      "A resposta deve dizer que sem potência a aeronave precisa converter altitude em velocidade; puxar excessivamente aumenta ângulo de ataque, reduz velocidade e pode aproximar do estol."
  },
  "energia-potencial-e-cinetica": {
    explanation:
      "Energia potencial está associada à altitude; energia cinética à velocidade. Pilotar é administrar troca entre elas com atitude, potência e configuração. Descida mal planejada pode transformar altitude em velocidade demais. Subida agressiva pode consumir velocidade. Aproximação estabilizada depende de chegar com energia correta: nem alto/rápido demais, nem baixo/lento demais. O C408 no simulador deve ser tratado com margem e sem números inventados.",
    simulator:
      "Atividade prática: em altitude segura, faça três cenários: reduzir potência mantendo atitude, baixar ligeiramente o nariz mantendo potência, e aumentar potência mantendo atitude. Observe velocidade, VSI e altitude. Critério de sucesso: explicar qual energia aumentou, qual diminuiu e por quê.",
    exercise: "Explique a troca entre energia potencial e cinética em uma descida planejada.",
    expected:
      "A resposta deve citar altitude como energia potencial, velocidade como energia cinética e explicar que atitude/potência/configuração controlam se a descida acelera, estabiliza ou perde velocidade."
  },
  "potencia-e-atitude": {
    explanation:
      "Potência e atitude trabalham juntas. Potência altera energia disponível; atitude seleciona como essa energia aparece em velocidade, subida, descida ou manutenção de altitude. Aumentar potência não significa automaticamente subir: se a atitude não for ajustada, pode haver aceleração. Puxar o nariz não significa subir com segurança: sem energia suficiente, a velocidade cai. O método básico é ajustar um comando, observar tendência e refinar com pequenas correções.",
    simulator:
      "Atividade prática: em voo nivelado, aumente potência mantendo atitude e observe tendência de velocidade. Depois selecione atitude de subida com potência adequada e observe velocidade/VSI. Critério de sucesso: explicar diferença entre acelerar e subir, sem usar comando amplo.",
    exercise: "Por que potência sozinha não garante subida e atitude sozinha não garante desempenho seguro?",
    expected:
      "A resposta deve citar energia disponível, atitude, velocidade, VSI e necessidade de coordenar potência/atitude para obter desempenho desejado."
  },
  "aproximacao-estabilizada": {
    concepts: ["Aproximação visual", "Perfil", "Configuração", "Velocidade", "Arremetida"],
    explanation:
      "Aproximação estabilizada é uma aproximação em que a aeronave chega cedo a um perfil controlado: alinhada com a pista, razão de descida adequada, configuração planejada, velocidade na faixa segura conforme documentação, potência coerente e pequenos ajustes. Ela começa antes da final; começa no planejamento do circuito, na base e na interceptação da final. Se a aproximação fica alta, rápida, desalinhada ou instável, arremeter é decisão normal e correta.",
    simulator:
      "Atividade prática: voe circuitos visuais em clima calmo. Na final, avalie: estou alinhado, estabilizado, com velocidade segura, razão controlada e pista alcançável sem mergulho? Se não, arremeta. Critério de sucesso: tomar a decisão de arremeter antes de forçar pouso ruim.",
    exercise: "Liste critérios básicos de uma aproximação visual estabilizada.",
    expected:
      "A resposta deve citar alinhamento, perfil vertical, configuração, velocidade segura conforme documentação, potência/razão de descida controladas e decisão de arremeter se instável."
  },
  "corrigir-a-causa-nao-o-efeito": {
    explanation:
      "Iniciantes costumam corrigir o sintoma visível sem achar a causa. Se a altitude cai, puxam; se a velocidade cai, empurram; se a proa muda, viram mais. Mas a causa pode ser potência inadequada, trim mal ajustado, inclinação não percebida, vento, configuração ou comando excessivo. Corrigir a causa exige scan: atitude, potência, velocidade, altitude/VSI, proa e coordenação. Só então escolha comando pequeno e observe.",
    simulator:
      "Atividade prática: peça ao simulador vento leve ou deixe a aeronave sair um pouco de altitude/proa. Antes de corrigir, verbalize a causa provável. Critério de sucesso: corrigir com uma ação pequena e confirmar tendência, não alternar comandos amplos.",
    exercise: "Dê um exemplo de correção da causa em vez do efeito durante voo nivelado.",
    expected:
      "A resposta deve identificar um sintoma, levantar causa provável e propor correção coerente, como ajustar potência/atitude/trim em vez de apenas puxar ou empurrar."
  },
  "a-cadeia-de-controle": {
    concepts: ["Curvas rasas", "Curvas médias", "Coordenação", "Proa", "Leme"],
    explanation:
      "A cadeia de controle liga intenção, comando, resposta e correção. Para mudar proa, por exemplo, você inclina com ailerons, controla arfagem com profundor, usa leme para coordenação e monitora indicador de curva/coordenação, proa, altitude e velocidade. Curvas rasas exigem pequena inclinação e pouca correção; curvas médias exigem mais atenção a altitude e velocidade porque parte da sustentação passa a atuar horizontalmente. Em qualquer curva, coordenação evita derrapagem ou glissada desnecessária.",
    simulator:
      "Atividade prática: faça curvas rasas de 10 a 15 graus de inclinação e depois curvas médias moderadas, em altitude segura. Observe proa, altitude, velocidade e indicador de coordenação. Critério de sucesso: entrar, manter e sair da curva suavemente, parando na proa desejada sem grande perda de altitude.",
    exercise: "Explique como aileron, profundor e leme trabalham juntos em uma curva coordenada.",
    expected:
      "A resposta deve citar ailerons para iniciar/parar rolagem, profundor para manter atitude/altitude, leme para coordenação, e instrumentos de proa, altitude, velocidade e coordenação para confirmar resultado."
  },
  "flying-ahead-of-the-airplane": {
    explanation:
      "Flying ahead of the airplane significa pensar alguns passos à frente da aeronave. Em vez de reagir tarde, você prevê: próxima altitude, próxima proa, configuração, vento, pista, ponto de arremetida e alternativa. No circuito de tráfego, isso aparece claramente: perna contra o vento, través, vento, base e final acontecem rápido para quem não se antecipa. O aluno deve sempre saber a próxima ação antes de precisar executá-la.",
    simulator:
      "Atividade prática: voe um circuito visual simples. Antes de cada perna, verbalize a próxima ação: manter subida inicial, virar través, nivelar, configurar, virar base, estabilizar final ou arremeter. Critério de sucesso: nenhuma ação deve parecer surpresa.",
    exercise: "Explique como pensar à frente ajuda no circuito de tráfego.",
    expected:
      "A resposta deve citar antecipação de proa, altitude, configuração, velocidade, vento, perna seguinte e decisão de arremeter antes de ficar atrasado."
  },
  tendencia: {
    explanation:
      "Tendência é para onde os dados estão caminhando. Um altímetro ainda próximo do alvo, mas com VSI alto, indica que você vai passar do alvo. Uma velocidade ainda aceitável, mas caindo rápido, indica perda de energia. Um desvio lateral pequeno, mas aumentando, indica correção tardia. Bons pilotos iniciantes aprendem a agir na tendência, não apenas no valor atual.",
    simulator:
      "Atividade prática: mantenha altitude e proa em clima calmo. Faça pequenas perturbações e identifique a tendência antes de corrigir. Critério de sucesso: iniciar correções cedo e pequenas, sem esperar o erro ficar grande.",
    exercise: "Dê três exemplos de tendência que merecem correção antes do valor ficar fora do desejado.",
    expected:
      "A resposta deve citar tendência de velocidade, altitude/VSI, proa/desvio lateral ou razão vertical, explicando correções pequenas e antecipadas."
  },
  nivelamento: {
    explanation:
      "Nivelamento é transição, não interrupção instantânea. Ao se aproximar de altitude alvo em subida, reduza gradualmente atitude de subida, ajuste potência conforme a fase e aguarde aceleração/estabilização. Em descida, reduza a razão antes do alvo, ajuste atitude e potência para impedir aceleração ou afundamento. O trim deve ser ajustado depois que a nova condição estiver quase estabilizada, não como ferramenta para iniciar a manobra.",
    simulator:
      "Atividade prática: pratique nivelar após uma subida e após uma descida. Comece a transição antes da altitude, observe VSI aproximando de zero e ajuste potência/trim quando estabilizar. Critério de sucesso: manter altitude sem oscilações grandes por pelo menos dois minutos.",
    exercise: "Explique por que nivelamento exige antecipação e quando usar trim.",
    expected:
      "A resposta deve citar inércia, VSI, ajuste de atitude/potência antes do alvo e uso do trim para aliviar esforço após estabilização."
  },
  "atraso-de-resposta": {
    explanation:
      "Aeronaves e instrumentos não respondem como cursor de videogame. Há inércia, atraso de indicação e tempo para a nova condição se estabilizar. Se você corrige antes de observar a resposta, cria sequência de comandos contraditórios. Esse atraso aparece em VSI, velocidade, altitude, trim e potência. A técnica é comandar pouco, aguardar, confirmar tendência e só então refinar.",
    simulator:
      "Atividade prática: faça uma pequena alteração de pitch e conte alguns segundos antes de nova correção. Observe primeiro atitude, depois VSI/velocidade. Critério de sucesso: reduzir a frequência de comandos e estabilizar mais rápido.",
    exercise: "Como o atraso de resposta leva a oscilações em altitude ou velocidade?",
    expected:
      "A resposta deve explicar que corrigir antes de ver a tendência cria comandos excessivos e atrasados, levando a sobe/desce ou acelera/desacelera contínuo."
  },
  pio: {
    concepts: ["Oscilação induzida pelo piloto", "Comandos suaves", "Trim", "Paciência"],
    explanation:
      "PIO, oscilação induzida pelo piloto, acontece quando o piloto corrige demais, tarde demais, e passa a alimentar a oscilação. Em fundamentos, aparece em altitude, flare, velocidade e curvas. A solução é reduzir amplitude dos comandos, voltar a uma atitude de referência, aguardar resposta e usar trim apenas após estabilizar. Tentar vencer a aeronave com força geralmente piora.",
    simulator:
      "Atividade prática: em altitude segura, pratique manter altitude com pequenas pressões. Se a aeronave oscilar, pare de perseguir o altímetro, retorne à atitude de referência e espere a tendência. Critério de sucesso: reduzir a oscilação em vez de ampliá-la.",
    exercise: "Explique o que é PIO e como interromper uma oscilação induzida pelo piloto.",
    expected:
      "A resposta deve citar correções excessivas/tardias, retorno à atitude de referência, comandos menores, espera pela resposta e trim somente após estabilizar."
  },
  "novo-equilibrio": {
    explanation:
      "Cada mudança de potência, atitude, configuração ou velocidade cria um novo equilíbrio. Quando você reduz potência mantendo altitude, a aeronave desacelera e exige nova atitude/trim. Ao baixar flaps, arrasto e sustentação mudam, exigindo nova relação de potência e atitude. Ao virar, a sustentação se divide entre vertical e horizontal. Entender novo equilíbrio evita lutar contra a aeronave.",
    simulator:
      "Atividade prática: estabeleça voo nivelado, altere uma variável por vez e aguarde estabilizar. Só depois ajuste trim. Critério de sucesso: reconhecer que a aeronave pode ficar estável em nova condição sem comandos contínuos grandes.",
    exercise: "Descreva como encontrar novo equilíbrio após reduzir potência em voo nivelado.",
    expected:
      "A resposta deve citar esperar tendência, ajustar atitude para manter altitude/velocidade desejada, compensar após estabilizar e verificar instrumentos."
  },
  "aviate-navigate-communicate": {
    concepts: ["Prioridades", "Aviate", "Navigate", "Communicate", "Arremetida"],
    explanation:
      "Aviate, Navigate, Communicate organiza prioridades. Primeiro mantenha controle da aeronave: atitude, velocidade, altitude e trajetória. Depois saiba para onde ir: pista, proa, circuito, área segura. Só então comunique ou mexa em sistemas. Em simulador, isso vale quando você se perde no G1000, erra a aproximação ou chega instável. Arremeter é aplicação direta de aviate: recuperar energia, configuração e controle antes de tentar pousar de qualquer jeito.",
    simulator:
      "Atividade prática: durante aproximação visual, se ficar alto, rápido ou desalinhado, verbalize 'aviate' e execute arremetida didática: potência conforme apropriado no simulador, controle de atitude, asas niveladas, subida positiva e reorganização. Não trate como procedimento oficial do C408. Critério de sucesso: decidir cedo e manter controle.",
    exercise: "Explique como Aviate, Navigate, Communicate orienta uma arremetida no simulador.",
    expected:
      "A resposta deve priorizar controle da aeronave, energia/atitude/velocidade, trajetória segura, depois navegação/circuito e comunicação quando aplicável."
  },
  "o-aviao-nao-conhece-sua-intencao": {
    explanation:
      "A aeronave só responde a condições físicas. Ela não sabe que você pretende manter altitude, fazer curva suave ou pousar na zona correta. Se os comandos, potência e configuração produzem outra tendência, a aeronave seguirá essa tendência. Essa aula amarra a mentalidade do curso: intenção precisa virar comando correto, e comando correto precisa ser confirmado por desempenho.",
    simulator:
      "Atividade prática: escolha uma intenção simples, como manter altitude e proa. Antes de comandar, diga quais instrumentos confirmarão sucesso. Depois execute e compare intenção versus resultado. Critério de sucesso: corrigir com base no resultado real, não na esperança de que a aeronave entenda sua intenção.",
    exercise: "Dê um exemplo de intenção que precisa ser traduzida em comandos e verificações.",
    expected:
      "A resposta deve citar intenção, comando físico, instrumentos de confirmação e correção baseada em tendência observada."
  },
  subidas: {
    explanation:
      "Subida estabilizada combina potência disponível, atitude que preserve velocidade segura, coordenação, proa e antecipação do nivelamento. Subida não é puxar até o VSI mostrar número alto. Se a atitude for excessiva, a velocidade cai e a margem diminui. Com peso maior, ar quente ou altitude elevada, o desempenho de subida reduz. Valores de velocidade e potência do C408 devem seguir documentação, então aqui o foco é método e observação.",
    simulator:
      "Atividade prática: em voo seguro, estabeleça uma subida suave mantendo proa e velocidade dentro de faixa confortável. Observe IAS, VSI, altímetro e coordenação. Antes da altitude alvo, reduza gradualmente a atitude de subida e estabilize. Critério de sucesso: subir sem grande perda de velocidade e nivelar sem ultrapassagem grande.",
    exercise: "Descreva uma subida estabilizada sem usar números específicos do C408.",
    expected:
      "A resposta deve citar potência adequada, atitude para velocidade segura, VSI positivo, proa/coordenação, monitoramento de IAS e antecipação do nivelamento."
  },
  descidas: {
    explanation:
      "Descida planejada começa antes de baixar o nariz. Você define altitude alvo, razão desejada, distância disponível, velocidade segura e configuração. Reduzir potência sem pensar pode perder velocidade; baixar o nariz sem controle pode acelerar demais. A descida boa mantém energia previsível, razão estável e transição suave para o nivelamento ou aproximação.",
    simulator:
      "Atividade prática: escolha uma altitude alvo 1.000 pés abaixo, em área segura. Reduza potência de forma moderada, ajuste atitude para descida suave e monitore IAS/VSI. Inicie nivelamento antes da altitude. Critério de sucesso: chegar estabilizado, sem mergulho nem aceleração excessiva.",
    exercise: "Explique como iniciar uma descida sem deixar a velocidade fugir.",
    expected:
      "A resposta deve citar planejamento, redução de potência, atitude de descida, monitoramento de IAS/VSI/altímetro e nivelamento antecipado."
  },
  "reducao-de-velocidade-mantendo-altitude": {
    explanation:
      "Reduzir velocidade mantendo altitude mostra se você entende energia. Ao reduzir potência, a aeronave tende a desacelerar e pode exigir mais atitude de nariz para manter altitude, mas exagerar nessa atitude aumenta ângulo de ataque. Conforme a velocidade muda, o trim precisa ser reajustado depois da estabilização. A configuração, peso e vento influenciam o comportamento. Não use números específicos sem fonte confirmada.",
    simulator:
      "Atividade prática: em altitude segura, reduza potência gradualmente e mantenha altitude usando pequenas correções. Observe IAS, altímetro e VSI. Quando estabilizar em nova velocidade segura, ajuste trim para aliviar esforço. Critério de sucesso: reduzir velocidade sem transformar o exercício em descida ou oscilação.",
    exercise: "Explique a sequência para reduzir velocidade mantendo altitude.",
    expected:
      "A resposta deve citar reduzir potência, manter altitude com atitude suave, monitorar IAS/VSI/altímetro, aguardar estabilização e compensar com trim depois."
  },
  "exercicio-final-fundamentos": {
    concepts: ["Primeiro voo completo", "Circuito", "Decolagem", "Aproximação", "Pouso", "Arremetida"],
    objective: "Executar um primeiro voo completo guiado no simulador, integrando preparação, decolagem, circuito, aproximação, pouso e arremetida quando necessário.",
    introduction:
      "O exercício final reúne o curso em um voo local curto. O objetivo não é provar domínio operacional real do C408; é demonstrar método no Microsoft Flight Simulator: preparar, decolar, estabilizar subida inicial, voar circuito visual simples, aproximar estabilizado, pousar com controle direcional ou arremeter se a aproximação não estiver boa.",
    explanation:
      "A sequência didática é: briefing PAVE e meteorologia simples; escolha de pista contra o vento; ajuste de altímetro; identificação de controles e instrumentos; alinhamento; corrida de decolagem mantendo eixo; rotação suave conforme comportamento seguro/documentação; subida inicial com velocidade segura; curva para o circuito; voo na perna do vento; base; final estabilizada; flare suave; toque; controle direcional após o toque. Com vento cruzado leve, antecipe deriva e mantenha alinhamento. Se ficar alto, rápido, desalinhado ou instável, arremeta.",
    example:
      "Um bom voo completo no simulador parece calmo: você fala o que vai fazer antes de fazer, usa comandos pequenos, confirma tendência nos instrumentos e aceita arremeter como parte normal do treino. Um pouso forçado a partir de uma final instável não é sucesso; sucesso é manter decisão e controle.",
    mistake:
      "O erro comum é transformar o voo final em corrida para pousar: decolar sem briefing, esquecer vento, virar tarde no circuito, chegar alto e rápido, tentar salvar a final com mergulho, puxar demais no flare e perder controle direcional após o toque.",
    simulator:
      "Atividade prática: configure clima claro, vento fraco, pista simples e tráfego desligado ou baixo. Faça briefing rápido, decole, voe um circuito visual amplo e execute aproximação final estabilizada. Use o C408 apenas como referência de plataforma, sem inventar velocidades ou checklists: qualquer valor operacional deve seguir documentação da aeronave. Critério de sucesso: completar o circuito com controle, ou arremeter cedo se os critérios de estabilidade não forem atendidos. Debriefing: anote uma coisa boa, uma tendência ruim e uma ação para o próximo voo.",
    exercise: "Descreva seu plano para um primeiro voo completo guiado no simulador, incluindo quando arremeter.",
    expected:
      "A resposta deve citar preparação PAVE/METAR, pista contra o vento, altímetro, decolagem com controle direcional, subida inicial, circuito, final estabilizada, flare/toque, controle após pouso e arremetida se alto, rápido, desalinhado ou instável.",
    conclusion:
      "Você conclui Fundamentos quando consegue explicar o que a aeronave está fazendo, antecipar tendências e praticar um voo completo com método, aceitando arremetida como decisão normal de segurança no simulador.",
    next: "A conclusão prepara o aluno para estudar Garmin G1000 NXi sem abandonar a prioridade principal: pilotar a aeronave primeiro."
  }
};

const navigationVfrLessonSpecs: LessonSpec[] = [
  spec(
    1,
    navigationVfrModuleIds.conceptsWeather,
    "O que é voo VFR",
    "vfr-o-que-e-voo-visual",
    "30 min",
    ["VFR", "IFR", "VMC", "Referência visual", "Responsabilidade"],
    "Entender o voo VFR como navegação baseada em referências visuais, meteorologia adequada e consciência contínua de posição.",
    "VFR significa Visual Flight Rules, ou regras de voo visual. No estudo em simulador, a ideia central é simples: você mantém referência visual com o mundo externo, identifica posição por pontos no terreno e evita depender exclusivamente de instrumentos ou automação. IFR, Instrument Flight Rules, é outro regime, baseado em procedimentos e separação por instrumentos, e será estudado depois.",
    "Voo VFR não é voo sem método. Ele exige meteorologia visual, planejamento, noção de espaço aéreo, referência de terreno, controle de tempo, combustível estimado, alternado e decisão. Em regras reais, mínimos, autorizações e requisitos variam por país; ICAO fornece base internacional, e no Brasil o DECEA publica regras e cartas aplicáveis. Nesta plataforma, o foco é educacional para Microsoft Flight Simulator, não preparação legal para voo real.",
    "Em um voo local simples, você pode sair de um aeródromo, seguir uma rodovia até uma cidade, retornar por um rio e entrar novamente no circuito. O GPS pode confirmar posição, mas a navegação principal do exercício é visual: olhar fora, comparar com o plano e manter orientação.",
    "O erro comum é achar que VFR significa apenas olhar pela janela e seguir o mapa do simulador. Isso cria dependência do mapa externo, perda de noção de vento e pouca preparação para quando a referência visual fica confusa.",
    "Atividade prática: escolha clima claro, vento fraco e um trecho curto próximo a um aeródromo conhecido no simulador. Antes de voar, escolha duas referências visuais grandes, como rodovia e cidade. Durante o voo, mantenha o GPS apenas como confirmação ocasional. Critério de sucesso: explicar onde você está sem olhar primeiro para o mapa externo.",
    "Explique a diferença entre VFR e IFR e diga por que VFR ainda exige planejamento.",
    "A resposta deve citar referência visual, meteorologia adequada, posição por pontos no terreno, diferença para regras por instrumentos e necessidade de planejamento, espaço aéreo, tempo, combustível e decisão.",
    "VFR é visual, mas não é improvisado: é navegação planejada com olhos fora, mapa mental e confirmação contínua.",
    "A próxima aula define as condições meteorológicas visuais que permitem esse tipo de voo."
  ),
  spec(
    2,
    navigationVfrModuleIds.conceptsWeather,
    "VMC, visibilidade, teto e nuvens",
    "vfr-vmc-visibilidade-teto-nuvens",
    "30 min",
    ["VMC", "Visibilidade", "Teto", "Nuvens", "Mínimos"],
    "Interpretar condições meteorológicas visuais de forma geral, distinguindo princípios internacionais de regras locais.",
    "VMC significa Visual Meteorological Conditions, ou condições meteorológicas visuais. Para VFR, você precisa de visibilidade suficiente, distância adequada de nuvens e teto compatível com a fase do voo. Teto é a altura da camada de nuvens mais baixa que cobre parte significativa do céu conforme definição meteorológica aplicável; visibilidade é o alcance horizontal para enxergar referências e tráfego.",
    "Os mínimos VFR não são universais em detalhes. ICAO estabelece base internacional, mas cada Estado publica regras próprias. Nos exemplos brasileiros, consulte sempre publicações vigentes do DECEA, como a ICA 100-12 e cartas/informações aeronáuticas. Para o simulador, use essa aula como disciplina: se o cenário tem nuvens baixas, pouca visibilidade ou chuva que elimina referências, simplifique, retorne ou adie o exercício.",
    "Um voo costeiro com visibilidade ampla e nuvens altas é adequado para aprender referências. O mesmo voo com base de nuvens baixa pode obrigar o aluno a voar mais baixo, perto de terreno e obstáculos, aumentando carga de trabalho e risco didático.",
    "O erro comum é avaliar clima apenas pela beleza visual. Uma camada de nuvens baixa, neblina leve ou visibilidade reduzida pode tornar impossível identificar referências no momento certo.",
    "Atividade prática: configure três cenários no simulador: céu claro, camada baixa de nuvens e visibilidade reduzida. Tente identificar a mesma cidade ou lago em cada um. Critério de sucesso: reconhecer quando o exercício deixou de ser adequado para navegação visual iniciante.",
    "Explique por que visibilidade e teto afetam diretamente a navegação VFR.",
    "A resposta deve citar capacidade de ver referências, terreno, tráfego, nuvens, margem vertical e o fato de mínimos/regras variarem por país e publicação vigente.",
    "Antes de navegar visualmente, confirme se o ambiente permite enxergar e decidir com antecedência.",
    "A próxima aula mostra como transformar o mundo externo em referências úteis de orientação."
  ),
  spec(
    3,
    navigationVfrModuleIds.conceptsWeather,
    "Orientação espacial e referências visuais",
    "vfr-orientacao-espacial-referencias",
    "30 min",
    ["Orientação", "Referências", "Posição", "Relevo", "Consciência situacional"],
    "Usar referências visuais grandes e confiáveis para manter posição e orientação no simulador.",
    "Orientação espacial em VFR é saber onde você está, para onde vai e quais referências confirmam isso. Boas referências são grandes, distintas e difíceis de confundir: litoral, rios, lagos, rodovias, ferrovias, cidades, vales, serras e cruzamentos marcantes. Referências ruins são pequenas, repetitivas ou parecidas com várias outras.",
    "A navegação visual funciona melhor quando você usa referências em conjunto. Uma cidade pode confirmar posição, mas a rodovia ao lado, o rio e o relevo aumentam confiança. Em cartas e no simulador, procure referências antes do voo e pense em como elas aparecerão da altitude planejada. Nem toda referência do mapa é fácil de enxergar em voo, principalmente com iluminação, clima ou resolução do cenário.",
    "Se a rota segue uma rodovia até uma cidade e depois cruza um rio, você pode usar a rodovia como guia, a cidade como checkpoint e o rio como confirmação de que chegou ao ponto de mudança de proa.",
    "O erro comum é escolher um único ponto pequeno, como uma construção isolada, e entrar em dúvida quando ele não aparece. Outro erro é voar olhando para dentro enquanto a referência passa por baixo da asa.",
    "Atividade prática: escolha uma rota curta que acompanhe uma rodovia ou litoral. Anote três referências em ordem e voe sem abrir mapa externo continuamente. Critério de sucesso: identificar cada referência antes de passar por ela e verbalizar a próxima.",
    "Como escolher bons pontos de referência para navegação VFR?",
    "A resposta deve citar referências grandes, únicas, alinhadas com a rota, visíveis da altitude planejada e combinadas com outras referências para reduzir ambiguidade.",
    "Referência visual boa é aquela que você reconhece cedo, confirma com outra pista e usa para tomar a próxima decisão.",
    "A próxima aula aplica essa leitura visual à meteorologia ao longo da rota."
  ),
  spec(
    4,
    navigationVfrModuleIds.conceptsWeather,
    "Meteorologia em rota e decisão VFR",
    "vfr-meteorologia-em-rota",
    "30 min",
    ["Meteorologia em rota", "Desvio", "Retorno", "Alternado", "Decisão"],
    "Planejar e decidir quando meteorologia em rota deixa de ser adequada para continuar VFR no simulador.",
    "Meteorologia em rota é diferente da meteorologia no aeródromo. Você pode decolar em condições boas e encontrar nuvens, chuva, visibilidade reduzida ou relevo encoberto adiante. Em VFR, a pergunta não é apenas se a aeronave consegue voar; é se o piloto consegue manter referência visual, margem de terreno, rota e opção de retorno.",
    "A decisão VFR segura é progressiva: perceber deterioração cedo, comparar com o plano, reduzir carga de trabalho, desviar para área melhor, retornar ou alternar. No simulador, treine a decisão sem orgulho. Se uma camada encobre o vale ou a chuva apaga a cidade de referência, não force passagem visual como se fosse regra geral.",
    "Em uma navegação por litoral, chuva à frente pode permitir desvio para o lado do mar ou retorno antes de perder referências. Em região de vale, a mesma chuva pode tornar o cenário inadequado para iniciante.",
    "O erro comum é continuar porque o destino está perto. Pressão para completar o voo é uma das maiores armadilhas de VFR, inclusive no simulador.",
    "Atividade prática: configure uma rota curta e adicione uma área de chuva ou nuvem adiante. Pratique decidir antes de entrar nela: desviar, retornar ou escolher alternado. Critério de sucesso: manter sempre uma saída visual clara.",
    "Quais sinais indicam que você deve desviar, retornar ou alternar em um voo VFR?",
    "A resposta deve citar perda de visibilidade, nuvens baixas, referências desaparecendo, terreno à frente, aumento de carga de trabalho, falta de margem e opção segura de retorno ou alternado.",
    "Em VFR, boa decisão começa antes de ficar sem referências.",
    "A próxima aula entra nas cartas que ajudam a planejar essas referências antes do voo."
  ),
  spec(
    1,
    navigationVfrModuleIds.chartsAirports,
    "Leitura básica de cartas VFR",
    "vfr-leitura-basica-de-cartas",
    "30 min",
    ["Cartas", "AISWEB", "CNAV", "CAP", "VAC", "Espaço aéreo"],
    "Interpretar cartas aeronáuticas em nível introdutório para planejamento visual no simulador.",
    "Cartas aeronáuticas representam terreno, aeródromos, obstáculos, espaços aéreos, rotas, auxílios e informações necessárias ao planejamento. No Brasil, o DECEA/ICA disponibiliza cartas pelo AISWEB, incluindo cartas visuais como WAC, CNAV/CINAV, CAP/CIAP, cartas de corredores visuais e cartas de aproximação visual quando aplicáveis. Em outros países, use as publicações oficiais locais.",
    "Para um aluno VFR iniciante, a leitura básica busca responder: onde está o aeródromo, qual a elevação, quais pistas existem, que relevo/obstáculos cercam a rota, que espaços aéreos podem afetar o voo, que referências geográficas ajudam e qual escala da carta. Não invente cartas oficiais: use as cartas reais disponíveis ou exemplos claramente didáticos.",
    "Em uma carta visual, uma rodovia paralela ao curso pode ser referência primária; uma cidade na metade do caminho pode ser checkpoint; relevo alto ao lado pode definir altitude mínima didática do exercício.",
    "O erro comum é usar a carta como decoração: olhar o traçado, mas ignorar escala, obstáculos, relevo, espaço aéreo e referência alternativa.",
    "Atividade prática: abra uma carta visual oficial ou mapa aeronáutico disponível para sua região, escolha uma rota curta e marque três checkpoints visuais. No simulador, compare se eles aparecem como esperado. Critério de sucesso: conseguir explicar a rota sem depender só do GPS.",
    "Quais informações uma carta VFR básica deve fornecer para o planejamento?",
    "A resposta deve citar aeródromos, pistas, elevação, obstáculos, relevo, espaços aéreos, referências geográficas, escala/distância e publicações oficiais como fonte.",
    "A carta transforma o voo visual em plano verificável, não em passeio aleatório.",
    "A próxima aula foca no aeródromo: pista, cabeceira, elevação e orientação."
  ),
  spec(
    2,
    navigationVfrModuleIds.chartsAirports,
    "Aeródromos, pistas e cabeceiras",
    "vfr-aerodromos-pistas-e-cabeceiras",
    "30 min",
    ["Aeródromo", "Cabeceira", "Pista", "Orientação magnética", "Elevação"],
    "Ler informações básicas de aeródromos e pistas para escolher cabeceira e planejar chegada VFR.",
    "Um aeródromo não é apenas um ponto no mapa. Para navegação VFR, você precisa saber elevação, orientação das pistas, comprimento e largura publicados, tipo de superfície, obstáculos, circuito, operação local e cartas disponíveis. A numeração de pista representa sua orientação magnética aproximada arredondada para dezenas de graus: pista 18 aponta aproximadamente para 180 graus magnéticos; pista 36 para 360 graus.",
    "Comprimento, largura e elevação afetam planejamento, mas não devem ser tratados com valores inventados. Use dados oficiais do aeródromo ou dados do simulador como referência didática claramente identificada. Para o C408, qualquer avaliação real de desempenho exige documentação específica, peso, configuração e condições.",
    "Se o vento vem de 180 graus, uma pista 18 tende a receber vento de proa. Se o vento muda, a cabeceira preferida pode mudar. Isso também muda entrada no circuito, referências visuais e setor de chegada.",
    "O erro comum é escolher a pista pelo alinhamento do mapa ou pela rota mais bonita, sem comparar vento, comprimento, obstáculos e circuito.",
    "Atividade prática: escolha um aeródromo com duas cabeceiras. Anote pista, orientação aproximada, elevação e vento. Depois escolha a cabeceira mais coerente para um exercício visual. Critério de sucesso: justificar a escolha sem citar desempenho não confirmado.",
    "Explique como a numeração da pista ajuda a escolher cabeceira com base no vento.",
    "A resposta deve dizer que a numeração aproxima direção magnética, que vento de proa é preferível, e que comprimento, largura, elevação, obstáculos e regras locais devem ser verificados em fonte oficial.",
    "Escolher cabeceira é unir vento, pista, ambiente e plano de chegada.",
    "A próxima aula organiza a circulação visual ao redor do aeródromo."
  ),
  spec(
    3,
    navigationVfrModuleIds.chartsAirports,
    "Circuito de tráfego VFR",
    "vfr-circuito-de-trafego",
    "30 min",
    ["Circuito", "Contra o vento", "Través", "Perna do vento", "Base", "Final"],
    "Entender as pernas do circuito de tráfego visual e como entrar ou sair mantendo consciência de vento e pista.",
    "O circuito de tráfego organiza aeronaves ao redor do aeródromo. As pernas básicas são contra o vento ou subida inicial após decolagem, través, perna do vento paralela à pista no sentido oposto ao pouso, base e final. O lado padrão ou não padrão pode variar conforme publicação local, obstáculos, ruído, espaço aéreo ou procedimento do aeródromo.",
    "Em VFR, o circuito é ferramenta de previsibilidade. Ele ajuda a manter separação visual, preparar configuração, avaliar vento, alinhar final e decidir arremetida. Entrada e saída devem respeitar regras locais; no simulador, pratique de forma didática, ampla e sem tráfego denso até dominar orientação.",
    "Em um aeródromo com circuito pela esquerda, após decolar você sobe, vira para o través, depois para perna do vento, planeja base e intercepta final estabilizada. Se o vento cruzado desloca a aeronave, corrija a trajetória, não apenas a proa.",
    "O erro comum é virar base tarde, encurtar final, chegar alto e rápido ou entrar no circuito pelo lado errado sem verificar publicação.",
    "Atividade prática: em clima claro, voe três circuitos amplos. Em cada perna, verbalize nome da perna, vento, próxima ação e referência visual. Critério de sucesso: entrar na final com tempo para estabilizar ou arremeter cedo.",
    "Descreva as pernas de um circuito visual e o que observar em cada uma.",
    "A resposta deve citar contra o vento/subida inicial, través, perna do vento, base e final, relacionando vento, altitude, configuração, alinhamento, tráfego e decisão de arremeter.",
    "Circuito bem voado reduz improviso na parte mais carregada do voo visual.",
    "A próxima aula trata de altitude, obstáculos e espaço aéreo ao planejar esse circuito e a rota."
  ),
  spec(
    4,
    navigationVfrModuleIds.chartsAirports,
    "Altitude, obstáculos e espaço aéreo",
    "vfr-espaco-aereo-e-altitude",
    "30 min",
    ["Altitude de segurança", "Obstáculos", "Espaço aéreo", "Áreas restritas", "Tráfego"],
    "Escolher altitude VFR de estudo considerando relevo, obstáculos, espaço aéreo e consciência de tráfego.",
    "Escolher altitude em VFR envolve mais do que conforto visual. Você precisa considerar elevação do terreno, obstáculos, margem vertical, nuvens, vento, espaços aéreos controlados, áreas restritas ou perigosas, tráfego e capacidade de manter referências. Regras reais de altitude, semicircularidade, autorizações e mínimos variam por país e devem ser consultadas em publicações oficiais.",
    "No Brasil, use publicações DECEA/AISWEB para verificar cartas, espaços aéreos, áreas especiais e procedimentos. No simulador, trate áreas controladas e restritas como parte do estudo: mesmo que o ambiente permita atravessar tudo, o objetivo é criar disciplina de planejamento.",
    "Uma rota sobre planície pode permitir altitude confortável para ver referências; uma rota sobre serra pode exigir maior margem ou rota alternativa por vale/litoral. Altitude baixa demais reduz tempo de decisão; altitude alta demais pode esconder referências pequenas.",
    "O erro comum é escolher altitude apenas pela vista bonita ou por copiar outro voo, sem olhar relevo, nuvens, obstáculos e espaço aéreo.",
    "Atividade prática: planeje a mesma rota em duas altitudes didáticas diferentes. Observe em qual delas você identifica melhor referências e mantém margem de terreno. Critério de sucesso: justificar a escolha com relevo, obstáculos, nuvens e espaço aéreo.",
    "Quais fatores entram na escolha de altitude para um voo VFR de estudo?",
    "A resposta deve citar relevo, obstáculos, nuvens, visibilidade, espaço aéreo, tráfego, referências visuais, regras locais e margem de decisão.",
    "Altitude é uma decisão de navegação, segurança e observação, não só um número no piloto automático.",
    "A próxima aula separa proa, rumo, curso e trajetória para entender como chegar ao lugar planejado."
  ),
  spec(
    1,
    navigationVfrModuleIds.headingWind,
    "Proa, rumo, curso e trajetória",
    "vfr-proa-rumo-curso-trajetoria",
    "30 min",
    ["Proa", "Rumo", "Curso", "Trajetória", "Track"],
    "Diferenciar para onde o nariz aponta, qual caminho foi planejado e qual caminho a aeronave realmente percorre.",
    "Curso é a linha planejada no mapa entre dois pontos. Proa é para onde o nariz da aeronave aponta. Trajetória, ou track, é o caminho real sobre o solo. Rumo pode ser usado em diferentes contextos, mas nesta plataforma vamos tratar como direção a seguir ou direção da rota, sempre deixando claro se falamos de caminho planejado ou proa voada.",
    "Sem vento, proa e trajetória podem ficar parecidas. Com vento, a aeronave deriva: o nariz pode apontar levemente para um lado enquanto a trajetória desejada segue reta sobre o solo. Essa diferença é central para navegação VFR. O aluno deve observar se está seguindo a referência planejada, não apenas se a bússola mostra a proa esperada.",
    "Se você quer seguir uma rodovia ao norte, mas vento lateral empurra a aeronave para leste, precisará apontar o nariz ligeiramente contra o vento para manter a trajetória sobre a rodovia.",
    "O erro comum é corrigir só a proa no painel e ignorar que a trajetória sobre o solo continua afastando da rota.",
    "Atividade prática: escolha uma rodovia reta ou litoral. Voe primeiro sem vento e depois com vento lateral leve. Compare proa e trajetória. Critério de sucesso: manter a rota visual mesmo que a proa indicada não seja exatamente igual ao curso planejado.",
    "Explique a diferença entre curso, proa e trajetória em presença de vento.",
    "A resposta deve dizer que curso é caminho planejado, proa é direção do nariz e trajetória é caminho real sobre o solo, podendo diferir por causa do vento.",
    "Navegar é controlar trajetória, não apenas perseguir proa.",
    "A próxima aula adiciona norte verdadeiro, norte magnético e declinação."
  ),
  spec(
    2,
    navigationVfrModuleIds.headingWind,
    "Norte verdadeiro, magnético e declinação",
    "vfr-norte-verdadeiro-magnetico",
    "30 min",
    ["Norte verdadeiro", "Norte magnético", "Declinação", "Variação magnética", "Proa magnética"],
    "Entender por que cartas, bússola e pistas usam referências de norte que precisam ser diferenciadas.",
    "Norte verdadeiro aponta para o polo geográfico. Norte magnético aponta para o campo magnético terrestre local. A diferença angular entre eles é chamada declinação ou variação magnética, dependendo da terminologia usada. Cartas podem apresentar cursos verdadeiros; instrumentos e pistas normalmente trabalham com referência magnética. Por isso, o piloto precisa saber se está falando de proa verdadeira ou magnética.",
    "Em navegação básica, não transforme isso em matemática pesada. A ideia é entender que um curso medido em carta pode precisar de correção para virar proa magnética, e que a numeração de pista é magnética aproximada. Em simulador, muitos sistemas já mostram dados prontos, mas o aluno deve entender a origem para não confundir.",
    "Se uma carta mostra um curso verdadeiro e a região tem variação magnética, a proa magnética será ajustada. O valor exato deve vir da carta ou base aeronáutica, não de suposição.",
    "O erro comum é misturar verdadeiro e magnético na mesma conta, depois culpar vento ou GPS por um desvio que veio de referência errada.",
    "Atividade prática: escolha um trecho no planejador do simulador e compare curso mostrado no mapa com proa magnética durante o voo. Observe também a numeração da pista escolhida. Critério de sucesso: explicar qual referência está sendo usada sem inventar a declinação local.",
    "Por que é importante saber se um curso ou proa é verdadeiro ou magnético?",
    "A resposta deve citar norte verdadeiro, norte magnético, declinação/variação magnética, cartas, bússola e pistas, destacando que valores reais devem vir de fonte publicada.",
    "Separar referências evita erro silencioso no planejamento.",
    "A próxima aula usa distância, velocidade e tempo para prever checkpoints."
  ),
  spec(
    3,
    navigationVfrModuleIds.headingWind,
    "Velocidade, distância e tempo",
    "vfr-velocidade-distancia-tempo",
    "30 min",
    ["Distância", "Tempo", "Velocidade no solo", "TAS", "IAS", "Combustível"],
    "Calcular estimativas simples de tempo e progresso usando distância e velocidade no solo.",
    "Navegação estimada usa uma relação simples: tempo é distância dividida pela velocidade. Em aviação, distância normalmente usa milhas náuticas e velocidade usa nós, que significam milhas náuticas por hora. Se a distância é 60 NM e a velocidade no solo é 120 kt, o tempo estimado é 0,5 hora, ou 30 minutos. Esse é exemplo educacional, não valor operacional do C408.",
    "Velocidade indicada, calibrada, verdadeira e no solo não são iguais. IAS é a lida no instrumento; CAS é IAS corrigida por erros do sistema; TAS é velocidade real em relação à massa de ar; groundspeed é velocidade sobre o solo, afetada pelo vento. Para VFR básico no simulador, use groundspeed para estimar tempo entre checkpoints e entenda que vento de proa reduz groundspeed, vento de cauda aumenta.",
    "Se você planeja um checkpoint a 20 NM e observa groundspeed de 100 kt, o tempo aproximado é 20/100 hora, ou 0,2 hora, cerca de 12 minutos.",
    "O erro comum é calcular tempo com IAS sem perceber que vento alterou velocidade no solo.",
    "Atividade prática: escolha dois pontos separados por distância conhecida no simulador. Anote groundspeed e estime o tempo. Use cronômetro e compare previsão com chegada real. Critério de sucesso: erro pequeno e explicação da diferença causada por vento, curva ou dificuldade de manter rota.",
    "Mostre como estimar tempo até um checkpoint usando distância e velocidade no solo.",
    "A resposta deve apresentar tempo = distância / groundspeed, converter hora para minutos e explicar que vento altera groundspeed.",
    "Cronômetro e checkpoints transformam navegação visual em progresso verificável.",
    "A próxima aula mostra como o vento altera essa conta e desloca a trajetória."
  ),
  spec(
    4,
    navigationVfrModuleIds.headingWind,
    "Vento, deriva e correção",
    "vfr-vento-deriva-correcao",
    "30 min",
    ["Vento", "Deriva", "WCA", "Groundspeed", "Correção"],
    "Entender como vento altera trajetória e velocidade no solo, e como corrigir deriva de forma prática.",
    "Vento desloca a aeronave porque ela se move dentro de uma massa de ar que também se move. Vento de proa reduz groundspeed; vento de cauda aumenta; vento lateral cria deriva. Ângulo de correção de deriva é a diferença aplicada à proa para que a trajetória sobre o solo coincida com o curso planejado. Em VFR básico, você pode estimar de forma prática: observe se a referência está escorregando para um lado e ajuste a proa contra o vento.",
    "Não é necessário começar com trigonometria. O método didático é: planeje a rota, voe uma proa inicial, observe a trajetória em relação à referência, corrija pequeno contra o vento, aguarde e verifique se a rota estabilizou. Depois ajuste o tempo previsto pelo groundspeed observado.",
    "Se uma rodovia planejada fica cada vez mais à esquerda da aeronave, sua trajetória está derivando para a direita; uma correção de proa para a esquerda pode ser necessária.",
    "O erro comum é fazer uma correção grande demais e cruzar a rota para o outro lado, criando zigue-zague.",
    "Atividade prática: configure vento lateral leve. Siga uma rodovia ou linha de costa. Faça correções pequenas contra o vento e use cronômetro entre checkpoints. Critério de sucesso: manter a referência próxima sem oscilar de um lado para outro.",
    "Explique como reconhecer deriva e corrigir sem depender totalmente do GPS.",
    "A resposta deve citar diferença entre proa e trajetória, deslocamento lateral da referência, correção contra o vento, observação após alguns minutos e ajuste de tempo por groundspeed.",
    "Correção de deriva é um ciclo: observar, corrigir pouco, aguardar e confirmar.",
    "A próxima aula escolhe checkpoints e referências para aplicar essa correção em uma rota."
  ),
  spec(
    1,
    navigationVfrModuleIds.routePlanning,
    "Pontos de referência e checkpoints",
    "vfr-pontos-de-referencia",
    "30 min",
    ["Checkpoints", "Rodovias", "Rios", "Litoral", "Cidades", "Relevo"],
    "Selecionar checkpoints úteis e referências laterais para acompanhar uma rota VFR.",
    "Checkpoint é um ponto que confirma progresso e posição. Bons checkpoints devem ser visíveis, únicos, espaçados de forma prática e próximos da rota. Referências lineares, como rios, litoral, rodovias e ferrovias, ajudam a guiar. Referências laterais, chamadas de brackets em alguns materiais de instrução, ajudam a perceber se você passou demais para um lado.",
    "No planejamento, escolha pontos que você conseguirá identificar da altitude escolhida e nas condições de luz e clima previstas. Cidades grandes, pontes, entroncamentos, lagos e mudanças de relevo costumam ser úteis no simulador. Pequenas vilas, torres ou detalhes finos podem não aparecer bem conforme cenário, resolução e distância.",
    "Uma rota VFR pode usar uma rodovia como eixo, uma cidade como checkpoint intermediário, um rio como limite lateral e uma serra como alerta para não desviar ao norte.",
    "O erro comum é planejar checkpoints próximos demais ou genéricos demais, criando carga de trabalho alta e pouca confiança.",
    "Atividade prática: planeje uma rota com quatro checkpoints: origem, ponto intermediário, referência lateral e destino. Voe usando cronômetro e observação externa. Critério de sucesso: identificar cada checkpoint dentro de poucos minutos do tempo previsto.",
    "Quais características tornam um checkpoint bom para navegação VFR?",
    "A resposta deve citar visibilidade, singularidade, proximidade da rota, espaçamento adequado, relação com outras referências e compatibilidade com altitude/clima.",
    "Checkpoints bons reduzem incerteza e dão ritmo à navegação.",
    "A próxima aula combina checkpoints com navegação estimada e observada."
  ),
  spec(
    2,
    navigationVfrModuleIds.routePlanning,
    "Navegação estimada e observada",
    "vfr-navegacao-estimada-e-observada",
    "30 min",
    ["Pilotagem", "Dead reckoning", "Cronômetro", "Correção", "Posição"],
    "Combinar cálculo por tempo, velocidade e proa com confirmação visual por referências no terreno.",
    "Navegação estimada, ou dead reckoning, usa tempo, velocidade, direção e vento para prever posição. Navegação observada, ou pilotagem, confirma posição por referências externas. Em VFR, as duas trabalham juntas: você estima quando chegará ao checkpoint e observa se o terreno confirma. Se não confirmar, mantenha controle e proa planejada enquanto procura referências maiores.",
    "O cronômetro é ferramenta simples e poderosa. Ao cruzar um checkpoint, inicie tempo para o próximo. Se o próximo deveria aparecer em 10 minutos e aparece em 8, seu groundspeed foi maior ou distância/rota foi diferente. Se não aparece, pode haver vento, erro de proa, checkpoint ruim ou identificação atrasada.",
    "Em uma rota por rodovia, você estima 12 minutos até uma cidade. Aos 10 minutos, começa a procurar visualmente. Aos 13, se não apareceu, verifica referências laterais e GPS como apoio, sem entrar em pânico.",
    "O erro comum é abandonar a proa planejada ao primeiro sinal de dúvida, o que transforma pequena incerteza em perda real de posição.",
    "Atividade prática: voe entre três checkpoints com cronômetro. Anote tempo previsto e tempo real. Critério de sucesso: corrigir estimativas no trecho seguinte com base no que foi observado.",
    "Explique como usar navegação estimada e observada no mesmo voo VFR.",
    "A resposta deve citar previsão por tempo/velocidade/proa, confirmação visual por checkpoints, uso de cronômetro e correção gradual quando o observado não bate com o planejado.",
    "A estimativa diz onde você deveria estar; a observação confirma onde você provavelmente está.",
    "A próxima aula acrescenta combustível, alternado e ponto de não retorno em nível introdutório."
  ),
  spec(
    3,
    navigationVfrModuleIds.routePlanning,
    "Combustível, alternado e ponto de não retorno",
    "vfr-combustivel-alternado-ponto-nao-retorno",
    "30 min",
    ["Combustível", "Reserva", "Alternado", "Ponto de não retorno", "Decisão"],
    "Planejar combustível e alternados de forma educacional, sem inventar consumo específico do C408.",
    "Combustível em VFR não é apenas chegar ao destino. O plano deve incluir táxi, subida, rota, chegada, alternativa, reserva e margem para erro. Consumo real depende da aeronave, potência, peso, altitude, temperatura e documentação. Para o C408, não use números sem fonte. No simulador, o objetivo é aprender lógica: quanto tempo de voo planejado, que margem existe e para onde ir se o destino fechar?",
    "Alternado é um aeródromo ou local planejado para pousar se o destino não for adequado. Ponto de não retorno, em nível introdutório, é o ponto depois do qual retornar à origem pode ser pior do que seguir para destino/alternado, considerando combustível, vento e meteorologia. Em simulador, isso vira uma decisão didática de não continuar sem plano.",
    "Se o vento de proa aumenta tempo até o destino e nuvens aparecem à frente, seu alternado deve estar dentro de autonomia e em condições visuais melhores.",
    "O erro comum é planejar rota pelo mapa e deixar combustível/alternado como detalhe automático do simulador.",
    "Atividade prática: planeje um voo de 45 minutos didáticos e defina uma reserva simbólica, um alternado e um ponto de decisão no meio da rota. Não use consumo real do C408 sem documentação. Critério de sucesso: saber em que ponto você decide continuar, retornar ou alternar.",
    "Por que combustível e alternado fazem parte da navegação VFR, mesmo no simulador?",
    "A resposta deve citar tempo, margem, vento, meteorologia, alternativa, reserva e que valores reais dependem de documentação da aeronave.",
    "Planejamento bom inclui uma saída antes de precisar dela.",
    "A próxima aula organiza tudo em briefing de saída, rota e chegada."
  ),
  spec(
    4,
    navigationVfrModuleIds.routePlanning,
    "Briefing de rota, saída e chegada",
    "vfr-briefing-de-rota",
    "30 min",
    ["Briefing", "Saída", "Rota", "Chegada", "Alternado"],
    "Criar um briefing simples que transforme o plano VFR em ações executáveis no simulador.",
    "Briefing é falar o plano antes de executá-lo. Para VFR, inclua saída, pista, vento, altitude inicial, primeiro checkpoint, rota, referências, tempos, espaço aéreo, meteorologia, alternado, chegada e ponto de arremetida. Um briefing curto reduz surpresa e ajuda a perceber quando algo saiu do planejado.",
    "O briefing de saída responde: qual pista, que direção após decolar, qual primeira referência e que altitude inicial? O briefing de rota responde: quais checkpoints, tempos e correções de vento? O briefing de chegada responde: como identificar o aeródromo, qual cabeceira provável, circuito, altitude e quando arremeter.",
    "Antes de um voo costeiro, você pode dizer: decolo contra o vento, sigo até interceptar o litoral, mantenho litoral à esquerda, confirmo cidade A em 12 minutos, cidade B em 25, alternado será o aeródromo X, e se a visibilidade cair retorno antes da cidade A.",
    "O erro comum é fazer o plano mentalmente e não verbalizar. Ao entrar em dúvida, o aluno não sabe qual parte falhou.",
    "Atividade prática: grave ou escreva um briefing de um minuto antes do voo. Depois voe e faça debriefing: o que bateu, o que atrasou, o que confundiu. Critério de sucesso: conseguir comparar execução com plano.",
    "Quais itens não podem faltar em um briefing VFR simples?",
    "A resposta deve citar pista/vento, saída, altitude, checkpoints, tempos, referências, espaço aéreo, meteorologia, alternado, chegada, circuito e decisão de arremeter/retornar.",
    "Briefing bom deixa claro o que você espera ver antes de ver.",
    "A próxima aula mostra como usar GPS como apoio sem abandonar o plano visual."
  ),
  spec(
    1,
    navigationVfrModuleIds.executionDecision,
    "GPS como apoio, não como muleta",
    "vfr-gps-como-apoio",
    "30 min",
    ["GPS", "Direct-To", "Distância", "ETE", "Confirmação"],
    "Usar GPS e mapa do simulador como confirmação, mantendo a navegação visual como referência principal.",
    "GPS informa posição, distância, rota e tempo estimado, mas não substitui consciência visual. Em VFR básico, use o GPS para confirmar: estou perto do checkpoint? Minha distância até o destino faz sentido? O tempo estimado combina com meu cronômetro? Direct-To pode ajudar em desvio ou retorno, mas deve ser usado com confirmação de terreno, espaço aéreo e destino correto.",
    "Não transforme esta etapa em curso Garmin. O princípio é operacional e mental: antes de apertar botões, mantenha controle da aeronave, saiba sua posição aproximada e confirme se o GPS está apontando para o ponto pretendido. Erro de waypoint, rota ativa ou zoom pode criar falsa segurança.",
    "Se você perdeu uma cidade, olhe primeiro referências grandes, mantenha proa segura e depois use GPS para confirmar se está antes, depois ou lateral ao ponto.",
    "O erro comum é navegar pelo magenta com a cabeça dentro, deixando de ver vento, terreno, tráfego, nuvens e referências externas.",
    "Atividade prática: voe uma rota visual e cubra mentalmente o GPS por trechos de cinco minutos. Depois use-o apenas para confirmar distância/posição. Critério de sucesso: o GPS confirmar uma posição que você já estimou visualmente.",
    "Como usar GPS em VFR sem depender totalmente dele?",
    "A resposta deve citar confirmação de posição, distância, tempo estimado, Direct-To com critério, manutenção de referências visuais e verificação de waypoint/rota ativa.",
    "GPS é excelente quando confirma uma navegação que você ainda entende sem ele.",
    "A próxima aula ensina a corrigir desvios quando a rota visual começa a fugir."
  ),
  spec(
    2,
    navigationVfrModuleIds.executionDecision,
    "Correção de desvio e retorno à rota",
    "vfr-correcao-de-desvio",
    "30 min",
    ["Desvio", "Intercepção", "Correção de deriva", "Retorno à rota", "Checkpoint"],
    "Corrigir desvios laterais e temporais sem transformar a navegação em zigue-zague.",
    "Desvio acontece quando a trajetória real não coincide com a rota planejada. Primeiro identifique tipo de desvio: lateral, atraso/adiantamento, erro de referência ou vento. Depois escolha correção proporcional. Se estiver pouco fora da rota, ajuste proa para interceptar suavemente. Se estiver muito fora ou incerto, use referência maior, mantenha segurança e considere retornar a um checkpoint conhecido.",
    "A correção deve ser verificada. Mudar proa por alguns graus não resolve se você não observar a trajetória alguns minutos depois. Também não adianta cruzar agressivamente a rota e passar para o outro lado. Em VFR, o objetivo é recuperar orientação com calma.",
    "Se a rodovia planejada está à esquerda e se afastando, faça correção à esquerda suficiente para parar o afastamento e depois volte gradualmente à rota.",
    "O erro comum é virar direto para o destino sem saber onde está, cortando espaço aéreo, relevo ou checkpoints planejados.",
    "Atividade prática: configure vento lateral e deixe a aeronave derivar por alguns minutos. Depois corrija para interceptar a referência visual. Critério de sucesso: voltar à rota sem grandes oscilações e atualizar tempo para o próximo checkpoint.",
    "Descreva um método simples para corrigir desvio lateral em VFR.",
    "A resposta deve citar identificar desvio, manter controle, escolher referência maior, corrigir contra o desvio, aguardar, confirmar trajetória e atualizar tempo/posição.",
    "Correção boa recupera a rota e a consciência, não apenas o traço no mapa.",
    "A próxima aula trabalha perda de orientação, desvio meteorológico e decisão."
  ),
  spec(
    3,
    navigationVfrModuleIds.executionDecision,
    "Perda de orientação, desvio e VFR noturno básico",
    "vfr-perda-de-orientacao-e-desvio",
    "30 min",
    ["Perda de posição", "Desvio meteorológico", "Retorno", "VFR noturno", "Decisão"],
    "Aplicar uma sequência segura quando a posição fica incerta ou o ambiente visual piora.",
    "Perder orientação em VFR não significa falha total; significa que sua confiança na posição caiu. A sequência didática é: voe a aeronave, mantenha altitude e proa seguras, reduza carga de trabalho, procure referências grandes, use cronômetro, compare com último checkpoint conhecido, confirme no GPS se apropriado e decida retornar, alternar ou seguir. Se meteorologia piora, não espere ficar sem saída.",
    "VFR noturno exige cuidado extra: referências diminuem, horizonte pode ficar pobre, luzes podem confundir distância, áreas escuras escondem terreno e a dependência de instrumentos aumenta. Regras e requisitos para VFR noturno variam por país. Nesta etapa, trate como introdução: no simulador, comece em áreas conhecidas, clima excelente e rotas curtas.",
    "Em uma rota ao entardecer, uma cidade iluminada pode parecer próxima, mas relevo escuro entre você e ela pode não estar visível. O GPS pode apoiar, mas não elimina planejamento de altitude e terreno.",
    "O erro comum é continuar em direção ao destino só porque o GPS mostra linha direta, ignorando nuvens, relevo, perda de referência ou escurecimento.",
    "Atividade prática: faça uma rota curta ao entardecer em clima claro. Identifique quando referências terrestres começam a desaparecer e decida retorno antes de ficar desconfortável. Critério de sucesso: tomar decisão conservadora e manter posição conhecida.",
    "O que fazer quando você perde temporariamente a orientação em voo VFR?",
    "A resposta deve citar manter controle, altitude/proa seguras, último checkpoint conhecido, referências grandes, GPS como apoio, retorno/alternado e decisão antes de perder VMC.",
    "Perder orientação vira problema maior quando o piloto continua sem admitir incerteza.",
    "A próxima aula reúne tudo em um voo VFR completo planejado e executado."
  ),
  spec(
    4,
    navigationVfrModuleIds.executionDecision,
    "Voo VFR completo planejado",
    "vfr-voo-completo-planejado",
    "30 min",
    ["Planejamento completo", "Execução", "Debriefing", "C408", "Simulador"],
    "Planejar, executar e revisar um voo VFR completo no Microsoft Flight Simulator.",
    "O voo completo integra todo o curso: objetivo, meteorologia, cartas, aeródromo, pista, circuito, altitude, espaço aéreo, checkpoints, vento, tempo, combustível didático, alternado, GPS como apoio, correções e decisão. O C408 pode ser usado como aeronave principal da plataforma, mas não use velocidades, consumo ou desempenho sem documentação aplicável. Se o foco for navegação, mantenha a aeronave estabilizada e reduza complexidade.",
    "A sequência é: escolha rota curta e visual; consulte cartas/informações oficiais quando disponíveis; defina clima adequado; selecione pista pelo vento; faça briefing de saída, rota e chegada; voe por checkpoints com cronômetro; corrija deriva; confirme com GPS ocasionalmente; entre no circuito; pouse ou arremeta; faça debriefing. O sucesso não é pousar a qualquer custo, é executar plano, perceber desvios e decidir bem.",
    "Um bom primeiro voo VFR pode seguir litoral por 20 a 30 minutos, cruzar uma cidade como checkpoint, retornar por rodovia e chegar ao aeródromo com pista e circuito já planejados.",
    "O erro comum é escolher rota longa, clima bonito porém marginal, aeronave complexa e vários sistemas novos ao mesmo tempo. Isso transforma aula de navegação em sobrecarga.",
    "Atividade prática: planeje um voo VFR curto com 3 a 5 checkpoints, clima claro, vento fraco e alternado simples. Use cronômetro, referências visuais e GPS apenas como confirmação. Debriefing: compare tempos previstos, referências vistas, desvios, decisões e uma melhoria para o próximo voo.",
    "Descreva um plano completo de voo VFR no simulador, do briefing ao debriefing.",
    "A resposta deve citar meteorologia, carta, pista, altitude, espaço aéreo, checkpoints, vento/deriva, tempo, combustível didático, alternado, GPS como apoio, circuito, pouso/arremetida e debriefing.",
    "Um voo VFR completo é uma conversa contínua entre plano, mundo externo, instrumentos e decisões.",
    "A próxima etapa de conteúdo poderá aprofundar aeronave, aviônicos ou navegação avançada sem perder essa base visual."
  )
];

const garminLessonSpecs: LessonSpec[] = [
  spec(
    1,
    "module-g1000-como-pensa",
    "Como o G1000 pensa",
    "g1000-como-o-sistema-pensa",
    "30 min",
    ["Integração", "Fonte ativa", "Modo ativo", "FMA", "Consciência"],
    "Entender o Garmin G1000 NXi como um sistema integrado de intenção, confirmação e monitoramento.",
    "O G1000 NXi não deve ser estudado como duas telas bonitas ou uma coleção de botões. Ele é uma flight deck integrada: recebe dados de sensores, mostra instrumentos, organiza plano de voo, seleciona fontes de navegação, comanda Flight Director e piloto automático, exibe alertas e ajuda o piloto a prever o próximo evento.",
    "O raciocínio central é sempre o mesmo: qual fonte está ativa, qual perna ou curso está ativo, qual modo lateral está ativo ou armado, qual modo vertical está ativo ou armado, qual altitude está selecionada e o que a aeronave está realmente fazendo. O Flight Mode Annunciator, FMA, é a confirmação formal da automação. A linha magenta e o mapa ajudam, mas não substituem HSI/CDI, FMA e desempenho real.",
    "Antes de acionar NAV em uma rota GPS, confirme GPS como fonte, perna ativa coerente, CDI apontando para a rota desejada e FMA mostrando o modo esperado. Se qualquer item discordar, pare e resolva antes de confiar na automação.",
    "O erro comum é pensar: apertei NAV, então o avião seguirá a rota. O correto é pensar: NAV está armado ou ativo? A fonte é GPS ou NAV? A perna ativa é a certa? A aeronave está interceptando ou se afastando?",
    "No C408 do Microsoft Flight Simulator, faça um treino parado no cockpit: localize PFD, MFD, HSI/CDI, fonte ativa, FMA, botões de plano, Direct-To, Procedures e painel de piloto automático. A versão simulada é Microsoft/Carenado; funções específicas podem variar entre MSFS 2020, MSFS 2024 e atualizações.",
    "Explique o fluxo mental fonte, plano, modo, FMA e desempenho ao usar o G1000.",
    "A resposta deve citar fonte ativa, plano/perna ativa, modo lateral e vertical, FMA como confirmação, altitude selecionada e monitoramento do desempenho real da aeronave.",
    "O G1000 reduz carga de trabalho quando o piloto confirma a lógica. Sem confirmação, ele apenas executa uma configuração que talvez esteja errada.",
    "A próxima aula separa a função do PFD e do MFD dentro desse fluxo."
  ),
  spec(
    1,
    "module-g1000-pfd-mfd",
    "PFD e MFD",
    "g1000-pfd-e-mfd",
    "30 min",
    ["PFD", "MFD", "FMA", "Mapa", "Motor"],
    "Ler PFD e MFD de forma organizada, sem abandonar a pilotagem básica.",
    "PFD significa Primary Flight Display. É a tela principal para manter controle: atitude, velocidade, altitude, VSI, proa, HSI/CDI, fonte de navegação, barômetro, altitude selecionada, Flight Director e FMA. MFD significa Multi Function Display. Ele amplia a consciência situacional: mapa, rota, range, waypoints, páginas de motor e combustível, sistemas, alertas e informações auxiliares.",
    "A regra de cockpit é simples: o PFD responde se a aeronave está voando corretamente agora; o MFD ajuda a entender o que vem depois. Ao ajustar plano, Direct-To ou procedimento, volte ao PFD e confira atitude, velocidade, altitude, fonte e FMA. Ao estudar motor e combustível, use o MFD como monitoramento complementar, sem inventar limites que não estejam em fonte oficial.",
    "Em cruzeiro no C408, use o MFD para ver distância até o próximo ponto e preparar descida, mas confirme no PFD altitude, velocidade, modo lateral, modo vertical e altitude selecionada.",
    "O erro comum é olhar somente o mapa e deixar altitude, velocidade ou FMA mudarem sem perceber. Outro erro é ficar preso no PFD e não prever chegada, terreno ou alteração de procedimento.",
    "Atividade prática: em voo estabilizado, faça ciclos verbais de 20 segundos. PFD: atitude, velocidade, altitude, fonte, FMA. MFD: rota, próximo waypoint, distância, motor/combustível e alerta. Critério de sucesso: saber o estado atual e o próximo evento sem pausar o simulador.",
    "Liste informações que pertencem prioritariamente ao PFD e informações que o MFD ajuda a prever.",
    "A resposta deve citar PFD como atitude, velocidade, altitude, HSI/CDI, fonte e FMA; e MFD como mapa, rota, waypoints, sistemas, motor, combustível, alertas e planejamento.",
    "PFD e MFD formam uma dupla: controle agora e previsão do próximo evento.",
    "A próxima aula aprofunda CDI e HSI, onde muitos erros de fonte aparecem."
  ),
  spec(
    1,
    "module-g1000-cdi-hsi",
    "CDI e HSI",
    "g1000-cdi-e-hsi",
    "30 min",
    ["CDI", "HSI", "GPS/NAV", "Curso", "Desvio"],
    "Entender CDI e HSI como a ponte entre fonte de navegação, curso desejado e posição da aeronave.",
    "CDI é Course Deviation Indicator. Ele mostra o quanto a aeronave está desviada do curso da fonte selecionada. HSI é Horizontal Situation Indicator. Ele coloca proa, curso, desvio lateral e fonte em uma visão única. O ponto essencial é que o CDI não mostra sua intenção; ele mostra a relação com a fonte atualmente selecionada.",
    "Se a fonte está em GPS, o CDI representa a rota GPS/perna ativa. Se está em NAV, pode representar VOR ou localizer conforme frequência e curso. Em uma aproximação ILS, o erro clássico é esperar captura do localizer enquanto o CDI ainda está em GPS. Em uma RNAV, o erro oposto é deixar NAV/LOC ativo quando a orientação deveria vir do GPS.",
    "Imagine que o plano mostra final alinhada, mas o HSI indica desvio estranho. Antes de virar, confira fonte, perna ativa, curso, escala do CDI e se o modo OBS/SUSP não está alterando o sequenciamento.",
    "O erro comum é perseguir a agulha como se ela fosse sempre a rota pretendida. A agulha pode estar correta para a fonte errada.",
    "No simulador, carregue uma rota simples e alterne visualmente a fonte GPS/NAV. Observe como a indicação lateral muda. Não voe o exercício em baixa altitude; faça em voo estabilizado ou no solo.",
    "Por que confirmar a fonte é obrigatório antes de seguir CDI/HSI?",
    "A resposta deve explicar que CDI/HSI dependem da fonte ativa, que GPS, VOR e LOC representam lógicas diferentes, e que seguir uma fonte errada pode levar a aeronave para fora da intenção do plano.",
    "CDI e HSI são instrumentos de consciência, não apenas agulhas para centralizar.",
    "A próxima aula separa navegação GPS de navegação NAV."
  ),
  spec(
    1,
    "module-g1000-gps-nav",
    "GPS e NAV",
    "g1000-gps-e-nav",
    "30 min",
    ["GPS", "NAV", "VOR", "LOC", "Fonte"],
    "Diferenciar GPS, NAV, VOR e LOC para selecionar a fonte correta antes de navegar.",
    "GPS usa posição e banco de dados para seguir waypoints, legs, RNAV e planos de voo. NAV usa rádio navegação, como VOR ou localizer, dependente de frequência, identificação, curso e cobertura. No G1000, a troca de fonte muda o que o CDI e o HSI representam e também afeta o que o piloto automático pode capturar em NAV ou APR.",
    "GPS é adequado para rota, Direct-To, RNAV e sequenciamento de plano. NAV/LOC é necessário quando a navegação depende de VOR ou localizer, como em muitos ILS. Antes de apertar NAV, defina qual fonte quer seguir. Antes de apertar APR, confirme se o procedimento exige GPS ou NAV/LOC. Isso evita o erro de capturar uma aproximação com fonte incompatível.",
    "Para um ILS, briefing, frequência, identificação e fonte LOC/NAV devem estar coerentes. Para uma RNAV, o foco é procedimento carregado, GPS ativo, perna correta e mínimos adequados.",
    "O erro comum é tratar GPS e NAV como sinônimos porque ambos desenham uma rota no painel. Eles não são a mesma fonte e não têm as mesmas pré-condições.",
    "Atividade prática: no C408, selecione uma rota GPS curta e depois um auxílio NAV em voo estabilizado. Observe diferenças de indicação no HSI/CDI e verbalize qual fonte o piloto automático seguiria se NAV fosse armado.",
    "Compare GPS e NAV em fonte, uso típico e erro comum.",
    "A resposta deve citar GPS como navegação por posição/banco de dados/plano, NAV como rádio navegação VOR/LOC, e o risco de tentar capturar ILS ou seguir RNAV com fonte errada.",
    "Fonte correta é a base de toda navegação no G1000.",
    "A próxima aula mostra como Direct-To altera a geometria do voo."
  ),
  spec(
    1,
    "module-g1000-direct-to",
    "Direct-To",
    "g1000-direct-to",
    "30 min",
    ["Direct-To", "Waypoint", "Curso direto", "Rota original", "Recuperação"],
    "Usar Direct-To com critério, entendendo seu efeito sobre rota, curso e consciência situacional.",
    "Direct-To cria navegação direta para um waypoint selecionado. Ele é útil para alternado, desvio, retorno, interceptação simples ou recuperação de uma rota, mas não é uma solução mágica. Ao ativar Direct-To, você pode pular pontos, restrições, partes de procedimento ou alterar a relação com a chegada planejada.",
    "Antes de ativar, faça quatro perguntas: qual waypoint selecionei, qual curso/distância aparecerá, o que acontece com o plano original e há terreno, espaço aéreo ou procedimento que estou ignorando? Depois de ativar, confira CDI/HSI, mapa, perna ativa e FMA. Se o objetivo era apenas interceptar uma perna, Activate Leg pode ser mais adequado do que Direct-To.",
    "Se você está em desvio meteorológico e decide ir para um fix adiante, Direct-To pode simplificar. Se você está dentro de uma aproximação publicada e usa Direct-To para o FAF sem entender a geometria, pode destruir a proteção e o sequenciamento do procedimento.",
    "O erro comum é usar Direct-To porque o plano ficou confuso. Primeiro estabilize a aeronave, diagnostique fonte/perna/modo, depois decida se Direct-To realmente é a ferramenta correta.",
    "Atividade prática: crie uma rota curta com três waypoints. Use Direct-To para o segundo, observe curso e distância, depois tente retornar ao plano original reativando a perna correta. Critério de sucesso: explicar o que mudou na sequência.",
    "Quando Direct-To é adequado e qual risco ele cria?",
    "A resposta deve citar navegação direta para waypoint, confirmação de destino/curso/distância, possível interrupção da rota original, risco em procedimentos e necessidade de revisar perna ativa depois.",
    "Direct-To é uma decisão de navegação, não um botão de emergência para confusão.",
    "A próxima aula organiza o Flight Plan, onde Direct-To precisa se encaixar."
  ),
  spec(
    1,
    "module-g1000-flight-plan",
    "Flight Plan",
    "g1000-flight-plan",
    "30 min",
    ["Plano de voo", "Waypoints", "Perna ativa", "Procedimentos", "Revisão"],
    "Montar e revisar um plano de voo no G1000 como sequência lógica de navegação.",
    "Flight Plan é a lista ordenada de origem, destino, waypoints, aerovias quando aplicável, saídas, chegadas, aproximações e missed approach conforme banco de dados. O piloto deve saber ler a lista, reconhecer perna ativa, identificar próximo waypoint, inserir ou remover pontos e comparar a lista com o mapa.",
    "O plano pode vir do menu mundial, de arquivo externo ou ser editado no painel. Em qualquer caso, revise. Procure waypoint duplicado, transição inadequada, aproximação carregada cedo demais, perna ativa errada e rota que não corresponde ao briefing. Load apenas insere o procedimento para revisão; Activate muda o sequenciamento. Activate Leg seleciona uma perna específica. Direct-To cria um curso direto. Esses comandos não são equivalentes.",
    "Antes da decolagem, diga em voz alta: origem, destino, primeiro ponto, último ponto antes da chegada, aproximação esperada e o que farei se a rota não sequenciar.",
    "O erro comum é olhar a linha magenta e não ler a lista. O mapa pode parecer bonito enquanto a ordem dos pontos está inadequada.",
    "Atividade prática: monte uma rota curta no C408, insira um waypoint intermediário, remova outro, carregue uma aproximação sem ativar e compare lista e mapa. Critério de sucesso: identificar perna ativa sem adivinhar.",
    "Quais itens devem ser revisados antes de confiar no Flight Plan?",
    "A resposta deve citar origem, destino, waypoints, sequência, perna ativa, procedimentos, transições, duplicações, mapa, fonte GPS e diferença entre Load, Activate, Activate Leg e Direct-To.",
    "O Flight Plan é útil quando o piloto entende a sequência que ele está comandando.",
    "A próxima aula apresenta OBS, que pode alterar essa sequência."
  ),
  spec(
    2,
    "module-g1000-flight-plan",
    "OBS",
    "g1000-obs",
    "30 min",
    ["OBS", "SUSP", "Curso manual", "Sequenciamento", "Interceptação"],
    "Entender OBS como ferramenta de curso manual e possível alteração do sequenciamento automático.",
    "OBS, quando disponível no contexto do G1000, permite selecionar ou manter um curso manual relacionado ao waypoint/fonte e pode suspender ou modificar a lógica normal de sequenciamento. Isso é útil para treino de interceptação e para entender geometria, mas exige uma pergunta: quero que o GPS avance automaticamente para o próximo ponto ou quero manter esta relação de curso?",
    "A indicação OBS/SUSP deve ser tratada como sinal de atenção. Se o sistema está suspenso ou em curso manual, ele pode não sequenciar como em uma rota normal. Em aproximações ou missed approach, isso pode confundir o aluno que espera avanço automático. Antes de continuar, confirme indicação, perna ativa e mapa.",
    "Em um treino, selecione OBS para interceptar um curso educacional até um waypoint. Depois desligue/retorne ao sequenciamento normal e confirme se o plano voltou a avançar como esperado.",
    "O erro comum é deixar OBS/SUSP ativo sem perceber, passar o waypoint e achar que o G1000 falhou.",
    "Atividade prática: em voo estabilizado, ative OBS quando o simulador permitir, altere o curso, observe CDI/HSI e depois restaure a navegação normal. Critério de sucesso: explicar se o sequenciamento está automático ou suspenso.",
    "Por que OBS exige atenção especial antes de procedimentos e aproximações?",
    "A resposta deve citar curso manual, possibilidade de suspensão de sequenciamento, necessidade de verificar SUSP/OBS, perna ativa e risco de esperar avanço automático que não ocorrerá.",
    "OBS é útil quando usado com intenção; perigoso quando fica esquecido.",
    "A próxima aula entra na automação: piloto automático, Flight Director e FMA."
  ),
  spec(
    1,
    "module-g1000-piloto-automatico",
    "Piloto automático",
    "g1000-piloto-automatico",
    "30 min",
    ["AP", "Flight Director", "FMA", "HDG", "NAV", "APR"],
    "Compreender o piloto automático como executor de modos selecionados e confirmados no FMA.",
    "O piloto automático não segue vontade; ele segue modos. AP engaja servos, Flight Director mostra comandos, HDG segue bug de proa, NAV tenta capturar e seguir fonte de navegação, APR prepara captura de aproximação, ALT mantém altitude, VS comanda razão vertical e FLC busca velocidade alvo quando implementado. O FMA mostra o que está ativo e o que está armado.",
    "A sequência correta é: definir intenção, selecionar fonte e altitude, escolher modo lateral, escolher modo vertical, confirmar FMA, monitorar desempenho. Um modo armado ainda não está guiando a aeronave; ele espera condição de captura. Um modo ativo já está comandando. Se o avião não faz o esperado, o FMA quase sempre revela o motivo.",
    "Ao receber vetoração, use HDG, bug de proa e altitude selecionada. Ao interceptar rota, arme NAV e observe a transição de armado para ativo. Para aproximação, não arme APR sem briefing, fonte correta e interceptação plausível.",
    "O erro comum é ligar AP e parar de pilotar. Automação reduz esforço físico, mas aumenta a necessidade de supervisão.",
    "Atividade prática: em altitude segura, alterne HDG, NAV, VS, FLC e ALT. Depois de cada comando, verbalize modo ativo, modo armado, altitude selecionada e resposta da aeronave. Critério de sucesso: detectar um modo inesperado antes que cause desvio grande.",
    "Explique a diferença entre AP, Flight Director, modo ativo, modo armado e FMA.",
    "A resposta deve citar AP como execução, Flight Director como comando visual, FMA como confirmação, modo ativo comandando agora e modo armado aguardando captura.",
    "Quem lê o FMA está supervisionando a automação; quem só aperta botões está apostando.",
    "A próxima aula aprofunda altitude selecionada, alvo essencial dos modos verticais."
  ),
  spec(
    2,
    "module-g1000-piloto-automatico",
    "Altitude selecionada",
    "g1000-altitude-selecionada",
    "30 min",
    ["Altitude selecionada", "ALT", "Captura", "QNH", "Modo vertical"],
    "Usar altitude selecionada, barômetro e modo vertical como conjunto inseparável.",
    "Altitude selecionada é o alvo vertical que o sistema pode capturar ou respeitar. Ela não manda a aeronave subir ou descer sozinha; para isso, você precisa de um modo vertical como VS, FLC ou outro modo disponível. Também precisa de ajuste barométrico correto. Uma altitude indicada baseada em QNH errado pode parecer precisa e ainda assim estar errada para o cenário.",
    "Separe cinco conceitos: altitude atual, altitude selecionada, altitude autorizada ou planejada, altitude publicada em carta e altitude mínima. Em treino IFR, selecione a altitude autorizada ou objetivo didático antes de ativar modo vertical. Depois confirme FMA: VS/FLC/VNAV armado ou ativo, ALT armado, ALT capturado.",
    "Selecionar 4.000 pés e ativar VS de descida não garante segurança se a carta exige 5.000 pés até determinado fix. O G1000 pode cumprir sua configuração e ainda assim violar sua intenção operacional.",
    "O erro comum é mudar VS ou FLC sem conferir bug de altitude. Outro erro é ajustar pressão depois e não perceber que a leitura de altitude mudou.",
    "Atividade prática: no solo, ajuste QNH e compare altitude indicada com elevação do aeroporto. Em voo, selecione uma altitude alvo, use VS ou FLC e observe captura ALT no FMA. Critério de sucesso: explicar diferença entre selecionar altitude e comandar a trajetória até ela.",
    "Por que altitude selecionada não basta para comandar uma subida ou descida?",
    "A resposta deve citar necessidade de modo vertical, barômetro correto, altitude autorizada/publicada, captura ALT e monitoramento da aeronave.",
    "Altitude selecionada é intenção; modo vertical é o caminho; FMA é confirmação.",
    "A próxima aula compara VS e FLC como modos de energia."
  ),
  spec(
    1,
    "module-g1000-vs-flc",
    "VS e FLC",
    "g1000-vs-e-flc",
    "30 min",
    ["VS", "FLC", "Velocidade", "Energia", "Captura"],
    "Comparar VS e FLC como duas maneiras diferentes de gerenciar trajetória vertical.",
    "VS, Vertical Speed, comanda uma razão de subida ou descida. FLC, Flight Level Change, busca uma velocidade selecionada ajustando atitude, enquanto o piloto gerencia potência. A diferença é de energia: VS tenta manter razão mesmo se a velocidade sofrer; FLC prioriza velocidade alvo e deixa a razão resultar da potência disponível.",
    "Em subida, VS alto demais pode derrubar velocidade. Em descida, VS agressivo pode aumentar velocidade ou aproximar a aeronave de uma situação instável. FLC pode ser mais confortável para preservar velocidade, mas não compensa alvo errado, potência errada ou altitude selecionada errada. Em qualquer modo, selecione altitude alvo, confirme FMA, monitore IAS, VSI, atitude e potência.",
    "Se você precisa subir sem perder velocidade, FLC tende a ser didaticamente mais fácil de entender: selecione altitude, escolha velocidade alvo do exercício, ajuste potência e observe razão resultante. Se precisa pequena descida controlada, VS moderado pode ser suficiente.",
    "O erro comum é usar VS como elevador: selecionar grande razão e só perceber a perda de velocidade tarde. Outro erro é acreditar que FLC escolhe potência sozinho.",
    "Atividade prática: em voo seguro, faça uma subida em VS moderado e outra em FLC. Compare velocidade, atitude e razão de subida. Critério de sucesso: explicar qual modo estava ativo no FMA e como a energia mudou.",
    "Qual a diferença essencial entre VS e FLC?",
    "A resposta deve citar VS como razão vertical selecionada, FLC como velocidade alvo, necessidade de potência, altitude selecionada, FMA e monitoramento de energia.",
    "Modos verticais são escolhas de energia, não apenas botões de subir e descer.",
    "A próxima aula trata VNAV como planejamento vertical."
  ),
  spec(
    1,
    "module-g1000-vnav",
    "VNAV",
    "g1000-vnav",
    "30 min",
    ["VNAV", "Perfil vertical", "TOD", "Restrição", "Planejamento"],
    "Entender VNAV como apoio ao planejamento vertical, sem tratar a função como piloto automático mágico.",
    "VNAV ajuda a calcular ou acompanhar um perfil vertical baseado em altitude desejada, restrições, distância, razão de descida e, quando implementado, orientação vertical. A função depende de dados corretos no plano, banco de dados, restrições publicadas, altitude selecionada e modo compatível. Nem toda instalação ou implementação simulada oferece o mesmo nível de VNAV.",
    "O raciocínio manual continua obrigatório. Para uma descida simples, estime altitude a perder e distância restante. Uma regra didática comum é pensar em cerca de 300 pés por milha náutica para um perfil de 3 graus, sem usar isso como substituto de carta ou cálculo oficial. Se você está alto, VNAV não apaga atraso; ele apenas mostra que o planejamento precisa ser corrigido.",
    "Antes da descida no C408, revise chegada, restrições, altitude selecionada, QNH, modo vertical disponível e ponto de início de descida. Se o simulador não der VNAV confiável, use VS/FLC e cálculo simples com monitoramento.",
    "O erro comum é esperar que VNAV desça sozinho sem altitude selecionada adequada, sem restrições carregadas ou sem modo vertical correto.",
    "Atividade prática: escolha uma descida de 6.000 pés em 20 NM. Calcule perfil aproximado, configure altitude alvo e compare com indicação/planejamento do simulador. Critério de sucesso: explicar quando iniciar a descida e como corrigir se estiver alto.",
    "Quais condições tornam VNAV útil e quais tornam VNAV enganoso?",
    "A resposta deve citar plano e restrições corretas, altitude selecionada, modo vertical, distância/altitude a perder, confirmação no FMA e limitação da implementação simulada.",
    "VNAV começa antes do botão: começa no briefing vertical.",
    "A próxima aula aplica fonte, FMA e captura em aproximação ILS."
  ),
  spec(
    1,
    "module-g1000-ils",
    "ILS",
    "g1000-ils",
    "30 min",
    ["ILS", "LOC", "Glideslope", "APR", "FMA"],
    "Preparar e monitorar uma aproximação ILS no G1000, entendendo fonte NAV/LOC, localizer, glideslope e APR.",
    "ILS usa localizer para orientação lateral e glideslope para orientação vertical. No G1000, o piloto deve carregar ou preparar o procedimento conforme cenário, fazer briefing da carta, sintonizar e identificar frequência, confirmar curso, selecionar fonte NAV/LOC, escolher altitude de interceptação, armar APR no momento adequado e monitorar FMA.",
    "A captura ocorre em etapas. O localizer costuma ser capturado antes do glideslope. APR armado não é captura; ele apenas prepara o sistema. Se a aeronave está alta demais, fora do ângulo de interceptação, com fonte GPS ativa, frequência incorreta ou curso errado, a captura pode não ocorrer. A ação correta é manter controle, diagnosticar fonte, frequência, curso, altitude e FMA.",
    "Durante o briefing, diga: pista, frequência, curso, altitude antes do glideslope, mínimos, missed approach e ponto em que desconectarei ou assumirei manualmente. Não use valores fictícios de carta; consulte dados oficiais quando quiser simular um procedimento real.",
    "O erro comum é armar APR tarde, cedo demais ou com fonte errada. Outro erro é continuar abaixo de mínimos por confiar que a automação levará ao pouso.",
    "Atividade prática: carregue um ILS autorizado ou didático no simulador. Antes do FAF, pause mentalmente e confirme fonte, frequência, curso, APR, LOC/GS armado ou ativo, altitude e plano de arremetida. Critério de sucesso: explicar por que a captura aconteceu ou não aconteceu.",
    "Liste verificações obrigatórias antes de confiar em APR numa aproximação ILS.",
    "A resposta deve citar briefing, frequência, identificação, fonte NAV/LOC, curso, altitude de interceptação, APR armado, FMA, localizer, glideslope, mínimos e missed approach.",
    "ILS exige preparação antes da final; não é um botão de pouso automático.",
    "A próxima aula compara essa lógica com aproximações RNAV."
  ),
  spec(
    1,
    "module-g1000-rnav",
    "RNAV",
    "g1000-rnav",
    "30 min",
    ["RNAV", "GPS", "LNAV", "LPV", "Sequenciamento"],
    "Executar aproximações RNAV entendendo GPS, banco de dados, perna ativa, mínimos e orientação vertical disponível.",
    "RNAV usa navegação baseada em área, normalmente com GPS no contexto do G1000. A aproximação depende de procedimento carregado, pista correta, transição, waypoints, perna ativa, sequenciamento, fonte GPS e mínimos aplicáveis. Nem toda RNAV possui orientação vertical; algumas são LNAV, outras podem ter LPV ou glidepath conforme equipamento, banco de dados, aprovação e implementação.",
    "Não trate RNAV como ILS com outro nome. Em ILS, a fonte principal é rádio localizer/glideslope. Em RNAV, a lógica vem do GPS e banco de dados. O piloto deve conferir IAF, IF, FAF, MAP, distância, cursos, altitude, mínimos e missed approach. Se a vertical guidance não aparece, não invente que ela existe; voe conforme o tipo de mínimo e aula didática apropriada.",
    "No C408 simulado, carregue a RNAV, revise a lista, confirme GPS, observe CDI e mapa, arme NAV/APR apenas quando a lógica estiver coerente e monitore se o FMA mostra aquilo que você esperava.",
    "O erro comum é carregar a aproximação e não ativar ou revisar a perna correta. Outro erro é confundir LPV, LNAV e VNAV sem olhar carta e painel.",
    "Atividade prática: selecione uma RNAV curta, identifique IAF, IF, FAF e MAP no plano, voe até a final e execute missed approach se a aproximação não estiver estabilizada. Critério de sucesso: explicar sequenciamento e mínimos sem depender apenas da linha magenta.",
    "O que verificar antes de seguir uma RNAV no G1000?",
    "A resposta deve citar procedimento, pista, transição, fonte GPS, perna ativa, IAF/IF/FAF/MAP, CDI, mínimos, possível orientação vertical e missed approach.",
    "RNAV é poderosa quando a sequência está correta e perigosa quando o piloto não sabe qual perna está ativa.",
    "A próxima aula junta o Garmin ao fluxo completo do C408."
  ),
  spec(
    1,
    "module-g1000-treinamento-c408",
    "Treinamento no C408",
    "g1000-treinamento-no-c408",
    "30 min",
    ["C408", "Fluxo completo", "FMA", "Procedimentos", "Debriefing"],
    "Aplicar o G1000 NXi em um voo completo no Cessna 408 SkyCourier, do pré-voo ao pós-pouso.",
    "O treinamento no C408 deve ser progressivo. Antes da partida, confirme telas, barômetro, rádios, transponder, plano de voo, origem, destino, saída e primeira altitude. No taxi, use mapa e frequências sem abandonar controle da aeronave. Na decolagem e subida, confirme Flight Director, altitude selecionada, modo lateral, modo vertical, velocidade e FMA.",
    "Em cruzeiro, monitore plano, ETA, combustível em nível educacional, motor, mapa e chegada. Na descida, revise altitude, energia, STAR ou transição, barômetro e aproximação. Na aproximação, confirme fonte, frequência quando aplicável, curso, mínimos, APR, FMA, captura e estabilização. Na arremetida, simplifique: potência, atitude, navegação, modo, missed approach e nova decisão.",
    "Um bom voo de treino não tenta provar tudo de uma vez. Escolha rota curta, clima bom, baixa carga de tráfego e um objetivo claro: por exemplo, criar plano, usar NAV, preparar aproximação e corrigir uma falha simples de fonte.",
    "O erro comum é aprender botões isolados e depois tentar usá-los em voo carregado. O curso deve formar fluxo: configurar, confirmar, monitorar e debriefar.",
    "Atividade prática: planeje um voo curto com uma aproximação simples. Em cada fase, diga em voz alta: fonte, perna ativa, modo lateral, modo vertical, altitude selecionada e próximo evento. Critério de sucesso: completar ou arremeter com consciência, não apenas chegar ao solo.",
    "Descreva um fluxo completo de uso do G1000 no C408 durante um voo curto.",
    "A resposta deve citar pré-voo, barômetro, rádios, transponder, plano, taxi, decolagem, subida, cruzeiro, descida, aproximação, FMA, arremetida e debriefing.",
    "O G1000 deve ampliar sua visão de voo; quando ele rouba sua atenção, volte ao básico e simplifique.",
    "A última aula mostra como diagnosticar falhas e erros comuns."
  ),
  spec(
    2,
    "module-g1000-treinamento-c408",
    "Falhas e erros comuns",
    "g1000-falhas-e-erros-comuns",
    "30 min",
    ["Fonte errada", "Modo errado", "Sequenciamento", "APR", "Troubleshooting"],
    "Diagnosticar e recuperar erros comuns de fonte, plano, modo, captura e carga de trabalho no G1000.",
    "Quando o G1000 não faz o esperado, a sequência não começa no menu. Começa em aviate: voe a aeronave, estabilize atitude, altitude, velocidade e proa. Depois navegue: confirme fonte GPS/NAV, perna ativa, CDI/HSI, plano e mapa. Só então gerencie automação: leia FMA, modos ativos, modos armados, altitude selecionada e comando vertical.",
    "Problemas típicos: NAV não captura porque a fonte está errada ou interceptação é ruim; APR não captura porque frequência/curso/fonte/altitude estão inadequados; glideslope não aparece porque a aeronave está alta ou a fonte não é LOC; VS derruba velocidade; FLC parece estranho por potência ou alvo errado; Direct-To pulou parte do plano; OBS/SUSP impediu sequenciamento; RNAV foi carregada mas não ativada; FMA mostra HDG quando o piloto imaginava NAV.",
    "A técnica de recuperação é mudar uma variável por vez. Se estiver confuso, desconecte AP, mantenha voo seguro, selecione HDG simples, confirme altitude, reconstrua fonte/plano e só então volte a NAV/APR. Se for aproximação e a situação não estabilizar, arremeta no simulador e rebrief.",
    "O erro comum é tentar salvar tudo apertando mais botões. Mais comandos sem diagnóstico aumentam a confusão.",
    "Atividade prática: crie três falhas didáticas: fonte errada em ILS, Direct-To para waypoint errado e VS alto demais em subida. Para cada uma, registre sintoma, causa provável, verificação, recuperação e prevenção. Critério de sucesso: resolver sem perder controle da aeronave.",
    "Monte uma sequência de troubleshooting quando o G1000 ou piloto automático não segue o esperado.",
    "A resposta deve citar aviate, estabilizar, verificar fonte, plano/perna ativa, CDI/HSI, FMA, modo ativo/armado, altitude selecionada, corrigir uma variável por vez e arremeter ou simplificar quando necessário.",
    "Troubleshooting bom é calmo, metódico e começa sempre pela aeronave.",
    "O curso Garmin fica pronto para ser usado como base de estudo antes dos checklists e treinamentos práticos da próxima etapa."
  )
];

const navigationIfrLessonSpecs: LessonSpec[] = [
  spec(
    1,
    navigationIfrModuleIds.conceptsInstruments,
    "O que é voo por instrumentos",
    "ifr-o-que-e-voo-por-instrumentos",
    "35 min",
    ["IFR", "IMC", "Procedimentos", "Separação", "Referência instrumental"],
    "Entender IFR como um método estruturado de voar por instrumentos, procedimentos e autorizações.",
    "IFR significa Instrument Flight Rules, ou regras de voo por instrumentos. No simulador, o ponto principal não é voar dentro de nuvem por aventura, mas aprender a manter controle, navegação e decisão quando a referência visual externa não é suficiente.",
    "Um voo IFR combina instrumentos de atitude e desempenho, navegação por auxílios ou banco de dados, cartas publicadas, altitudes mínimas, comunicação com controle e procedimentos de saída, rota, chegada e aproximação. Diferente do VFR, o piloto não decide a trajetória apenas olhando o terreno; ele segue uma autorização, monitora obstáculos, respeita mínimos e confirma cada fase pela carta e pelos instrumentos.",
    "Em um voo IFR curto no C408, a lógica pode ser: decolar por uma SID, seguir waypoints em rota, cumprir uma STAR, interceptar um ILS ou RNAV e executar aproximação perdida se não houver condição segura para pousar. Não use esse exemplo como procedimento real da aeronave; ele é um roteiro didático para o Microsoft Flight Simulator.",
    "O erro comum é resumir IFR a apertar NAV e APR. Se o aluno não sabe qual procedimento está ativo, qual altitude protege obstáculos e onde começa a aproximação perdida, a automação apenas esconde a falta de entendimento.",
    "Atividade prática: carregue um plano IFR simples no Microsoft Flight Simulator, sem decolar. Abra a rota e verbalize origem, destino, saída, rota, chegada, aproximação, altitude de cruzeiro e alternado. Critério de sucesso: explicar a sequência antes de usar o piloto automático.",
    "Explique a diferença entre voar IFR e simplesmente seguir uma linha magenta no GPS.",
    "A resposta deve citar regras por instrumentos, cartas, autorização, altitudes, auxílios de navegação, procedimentos, mínimos e monitoramento, mostrando que GPS é apenas uma ferramenta dentro do método.",
    "IFR é uma lógica de voo previsível: cada fase existe para manter separação, obstáculo, navegação e decisão sob controle.",
    "A próxima aula separa vantagens, limitações e responsabilidades do piloto em IFR."
  ),
  spec(
    2,
    navigationIfrModuleIds.conceptsInstruments,
    "Responsabilidades e limites do IFR",
    "ifr-responsabilidades-e-limites",
    "35 min",
    ["Autorização", "Responsabilidade do piloto", "Mínimos", "Limitações", "Regra local"],
    "Distinguir o que o controle autoriza, o que a carta protege e o que continua sendo responsabilidade do piloto.",
    "IFR aumenta a estrutura do voo, mas não tira a responsabilidade do piloto. Uma autorização ATC permite operar sob determinadas condições, porém o piloto continua responsável por cumprir regras, manter a aeronave controlada, verificar cartas, respeitar mínimos e recusar ou pedir alteração quando algo não for seguro.",
    "Regras IFR variam por país. A lógica ICAO é a base internacional, mas detalhes de fraseologia, mínimos, espaço aéreo e requisitos são publicados por cada autoridade. Em exemplos brasileiros, use DECEA e AISWEB. Em exemplos dos Estados Unidos, FAA AIM, handbooks e procedimentos FAA ajudam, mas não devem ser tratados como regra universal.",
    "Se o simulador autoriza uma aproximação em meteorologia muito ruim, o aluno ainda deve fazer briefing: tipo de aproximação, mínimos, pista, arremetida, alternado, combustível simulado e se a aeronave está estabilizada. O C408 no simulador pode aceitar ações que não representam uma operação real aprovada.",
    "O erro comum é obedecer qualquer instrução do ATC do simulador mesmo quando ela entra em conflito com carta, altitude mínima ou perfil. Outro erro é tratar mínimos de uma região como se servissem para todos os países.",
    "Atividade prática: escolha um aeroporto com aproximação por instrumentos. Antes de voar, escreva três decisões que continuam suas mesmo com ATC: aceitar clearance, iniciar descida e continuar abaixo do mínimo. Critério de sucesso: explicar quando pedir alternativa, espera ou arremetida.",
    "Por que uma autorização IFR não elimina a responsabilidade do piloto?",
    "A resposta deve mencionar que ATC autoriza dentro de regras, mas o piloto deve cumprir regulamentos, carta, limitações, mínimos, segurança da aeronave e pedir alteração se necessário.",
    "IFR é disciplina, não transferência de responsabilidade.",
    "A próxima aula transforma essa disciplina em scan de instrumentos."
  ),
  spec(
    3,
    navigationIfrModuleIds.conceptsInstruments,
    "Scan e instrumentos primários",
    "ifr-scan-e-instrumentos-primarios",
    "35 min",
    ["Scan", "Horizonte artificial", "Altímetro", "IAS", "VSI", "HSI"],
    "Construir um scan IFR básico usando instrumentos primários e secundários sem fixação.",
    "Em IFR, o mundo externo pode desaparecer. O piloto passa a construir a imagem do voo a partir de instrumentos: atitude, velocidade indicada, altitude, razão vertical, proa, curso, desvio lateral e indicação de curva. Scan é a varredura contínua que transforma instrumentos isolados em tendência.",
    "O horizonte artificial mostra atitude. Altímetro e VSI confirmam trajetória vertical. Indicador de velocidade mostra energia. HSI ou CDI mostram relação com curso. Bússola e indicação de proa servem para conferência. Turn coordinator ou indicador de curva ajuda a perceber inclinação e coordenação. Instrumentos primários mudam conforme a manobra: em voo nivelado, altitude e atitude são centrais; em aproximação, curso, altitude, velocidade e razão de descida ganham prioridade.",
    "Durante interceptação de localizer, olhar apenas o CDI pode fazer você perder altitude e velocidade. Um bom scan alterna atitude, desvio lateral, altímetro, VSI, velocidade e modos ativos. No C408, telas digitais ajudam, mas também concentram muita informação no mesmo lugar.",
    "O erro comum é perseguir uma agulha e abandonar o resto. Corrigir desvio lateral com curva excessiva pode criar aproximação instável, altitude errada e carga de trabalho crescente.",
    "Atividade prática: em clima IMC simulado, mantenha altitude e proa por cinco minutos, depois faça curva para interceptar um curso simples. Fale em voz alta: atitude, altitude, VSI, velocidade, proa, curso, desvio. Critério de sucesso: não fixar em um único instrumento por mais que alguns segundos.",
    "Monte um scan para uma aproximação por instrumentos em fase final.",
    "A resposta deve citar atitude, velocidade, altitude, VSI, HSI/CDI, fonte ativa, modo lateral/vertical e verificação de estabilidade, sem abandonar energia ou altitude.",
    "Scan IFR é a base que permite usar cartas, navegação e automação sem virar passageiro.",
    "A próxima aula liga instrumentos IFR a pressão, QNH e níveis de voo."
  ),
  spec(
    4,
    navigationIfrModuleIds.conceptsInstruments,
    "Pressão, altitudes e níveis",
    "ifr-pressao-altitudes-e-niveis",
    "35 min",
    ["QNH", "Pressão padrão", "Nível de voo", "Altitude mínima", "Restrição"],
    "Entender como QNH, pressão padrão, altitudes e níveis afetam separação vertical e cumprimento de procedimentos.",
    "IFR depende de consciência vertical precisa. O altímetro precisa estar ajustado corretamente para que altitudes de saída, rota e aproximação façam sentido. Em muitas operações, abaixo da altitude de transição usa-se QNH local; acima dela usa-se pressão padrão para voar níveis de voo. O valor e a regra de transição variam por país e publicação.",
    "Cartas IFR podem trazer altitudes mínimas, restrições de cruzamento, altitudes obrigatórias, máximas ou esperadas. O piloto precisa diferenciar altitude autorizada pelo controle, altitude publicada de procedimento e altitude selecionada no painel. Uma altitude selecionada errada pode fazer o piloto automático cumprir uma intenção errada com perfeita precisão.",
    "Em um voo simulado no C408, antes da SID, confirme QNH, altitude inicial autorizada, altitude de transição conforme a região do cenário, e altitude selecionada no painel. Não invente regra local: consulte a publicação aplicável quando o voo for tratado como realista.",
    "O erro comum é deixar pressão padrão no solo ou esquecer de mudar para padrão em cruzeiro quando aplicável. Outro erro é descer para uma altitude de carta antes de estar autorizado ou antes do ponto correto.",
    "Atividade prática: planeje uma subida IFR com altitude inicial, altitude de cruzeiro e possível mudança para pressão padrão. Critério de sucesso: verbalizar qual ajuste de pressão está em uso e qual altitude está autorizada, publicada e selecionada.",
    "Explique a diferença entre altitude autorizada, altitude publicada e altitude selecionada.",
    "A resposta deve citar ATC ou plano autorizado, carta/procedimento, bug no painel e necessidade de conferir QNH ou pressão padrão conforme a fase do voo.",
    "Em IFR, altitude é separação, terreno e procedimento. Tratar altitude como número solto é perigoso.",
    "O próximo módulo começa a navegação IFR pelos pontos e rotas."
  ),
  spec(
    1,
    navigationIfrModuleIds.navigationSystems,
    "Waypoints, aerovias e interseções",
    "ifr-waypoints-aerovias-intersecoes",
    "35 min",
    ["Waypoint", "Interseção", "Aerovia", "Rota", "Sequenciamento"],
    "Entender a rota IFR como uma sequência de pontos, trechos e restrições, não como desenho decorativo no mapa.",
    "Um waypoint é um ponto definido para navegação. Uma interseção é um fixo usado para construir rotas e procedimentos. Aerovias são corredores publicados que conectam auxílios e waypoints com critérios de navegação e altitudes associadas. Em IFR, a rota é lida como sequência: de onde saio, qual próximo ponto, qual curso, qual altitude, qual restrição e qual procedimento vem depois.",
    "A lógica de sequenciamento é essencial. O GPS ou FMS pode avançar de waypoint em waypoint, mas o piloto deve confirmar se a perna ativa corresponde ao plano e à autorização. Se um Direct-To pula pontos, ele também pode pular restrições ou mudar a geometria esperada.",
    "No simulador, uma rota direta entre origem e destino pode funcionar tecnicamente, mas não ensina IFR realista. Um voo didático deve incluir saída, trecho em rota, chegada e aproximação, mesmo que simples.",
    "O erro comum é confiar no mapa sem ler a lista de waypoints. O aluno acha que está seguindo o plano, mas a aeronave pode estar navegando para um ponto errado ou com procedimento desconectado.",
    "Atividade prática: abra um plano IFR no MSFS e copie a sequência de waypoints em papel. Antes de voar, aponte no mapa cada perna e diga qual deve ser a próxima. Critério de sucesso: perceber rapidamente quando a perna ativa não combina com a intenção.",
    "Por que uma rota IFR deve ser entendida como sequência e não apenas como linha no mapa?",
    "A resposta deve citar waypoints, interseções, aerovias, pernas ativas, restrições, autorização e risco de sequenciamento incorreto.",
    "Quem entende a sequência IFR consegue prever o voo antes que a aeronave chegue ao próximo ponto.",
    "A próxima aula apresenta auxílios convencionais como VOR, DME e NDB."
  ),
  spec(
    2,
    navigationIfrModuleIds.navigationSystems,
    "VOR, DME e NDB",
    "ifr-vor-dme-ndb",
    "35 min",
    ["VOR", "Radial", "DME", "NDB", "Rádio navegação"],
    "Compreender auxílios convencionais de navegação por instrumentos e sua utilidade mesmo em era GPS.",
    "VOR fornece informação angular em relação a uma estação, normalmente interpretada por radiais. DME mede distância inclinada até a estação equipada. NDB é um auxílio mais antigo, interpretado por ponteiro ADF, útil conceitualmente para entender rumo para estação, vento e interceptação, embora menos comum em operações modernas.",
    "Radial é uma linha que sai da estação VOR. Se você está na radial 090, está a leste da estação, independentemente da proa. Para voar inbound para a estação pelo curso 270, você precisa selecionar e interceptar corretamente o curso. DME ajuda a saber distância, permitindo identificar fixes como uma radial com determinada distância.",
    "Em uma aula IFR no C408, use VOR/DME como exercício mental mesmo se o GPS estiver disponível. Confirme frequência, identificação, curso, indicação TO/FROM, distância e se a aeronave está indo para onde você imagina.",
    "O erro comum é confundir radial com proa. Outro erro é perseguir a agulha sem conferir TO/FROM, fonte NAV e identificação do auxílio.",
    "Atividade prática: escolha um VOR no simulador, sintonize, identifique e voe para interceptar uma radial publicada ou educacional. Critério de sucesso: explicar sua posição relativa à estação antes de corrigir.",
    "Explique a diferença entre radial, curso selecionado e proa da aeronave.",
    "A resposta deve citar que radial sai da estação, curso selecionado é a linha que se deseja seguir no indicador, e proa é para onde o nariz aponta, podendo diferir por vento e interceptação.",
    "Rádio navegação ensina geometria IFR de forma clara, mesmo quando o GPS é a ferramenta principal.",
    "A próxima aula conecta GPS, RNAV e FMS."
  ),
  spec(
    3,
    navigationIfrModuleIds.navigationSystems,
    "GPS, RNAV e FMS",
    "ifr-gps-rnav-fms",
    "35 min",
    ["GPS", "RNAV", "FMS", "PBN", "Banco de dados"],
    "Entender GPS e RNAV como navegação baseada em posição, banco de dados e integridade, sem aprofundar botões Garmin.",
    "GPS fornece posição. RNAV permite navegar entre pontos que não precisam estar diretamente sobre uma estação de rádio. FMS ou sistema de gerenciamento de voo organiza rota, procedimentos, performance quando disponível e sequenciamento. PBN, navegação baseada em performance, adiciona requisitos de precisão, integridade e procedimento conforme publicação e equipamento.",
    "A principal disciplina é verificar o banco de dados, procedimento carregado, pista, transição, sequência de waypoints, distâncias, cursos e restrições. Em aproximações RNAV, não se deve editar manualmente pontos críticos de procedimento como se fossem rota livre, porque isso pode destruir a proteção publicada.",
    "No MSFS, o planejador e os aviônicos podem facilitar muito, mas podem carregar transições inadequadas, conectar mal uma STAR à aproximação ou deixar uma perna inesperada ativa. A resposta não é apertar mais botões: é comparar mapa, lista e carta.",
    "O erro comum é aceitar o plano do simulador sem revisão. Outro erro é tratar RNAV como ILS com outro nome; RNAV depende de lógica GPS, integridade e tipo de mínimo disponível.",
    "Atividade prática: carregue uma rota IFR com uma aproximação RNAV. Antes de decolar, confira procedimento, pista, IAF, IF/FAF quando aplicável, perna ativa e distância até cada ponto. Critério de sucesso: identificar uma inconsistência simulada antes do voo.",
    "Quais itens devem ser verificados antes de confiar em uma rota RNAV carregada?",
    "A resposta deve citar banco de dados, pista, procedimento, transição, sequência, perna ativa, distâncias, cursos, restrições e mínimos.",
    "GPS e RNAV dão precisão, mas exigem conferência mais rigorosa, não menos.",
    "A próxima aula junta auxílios, pontos e procedimentos em uma sequência lógica de navegação."
  ),
  spec(
    4,
    navigationIfrModuleIds.navigationSystems,
    "Sequência lógica da navegação IFR",
    "ifr-sequencia-logica-da-navegacao",
    "35 min",
    ["Origem", "SID", "Enroute", "STAR", "Aproximação", "Missed"],
    "Montar o mapa mental de um voo IFR completo, da saída à aproximação perdida.",
    "Um voo IFR completo é uma cadeia de fases: preparação, clearance, saída, subida, rota, chegada, aproximação, pouso ou aproximação perdida. Cada fase tem gatilhos, altitudes, pontos, configurações e decisões.",
    "A pergunta correta em IFR é sempre: em que fase estou, qual é o próximo ponto, qual altitude me protege, qual modo deve estar ativo, qual autorização possuo e qual é meu plano caso precise interromper? Essa estrutura evita ficar atrás da aeronave, expressão usada quando o piloto só reage ao que já aconteceu.",
    "Em um voo didático no C408, antes do taxi, faça briefing verbal: se a SID termina em tal waypoint, depois sigo a rota até a STAR, carrego a aproximação, espero interceptar final em tal fix, e se não estabilizar executo missed approach conforme carta.",
    "O erro comum é pensar apenas no trecho atual. O piloto decola sem saber o fim da SID, cruza o início da STAR sem briefing e chega alto na aproximação.",
    "Atividade prática: desenhe em uma folha seis caixas: SID, rota, STAR, IAF, final, missed. Preencha com uma rota do simulador. Critério de sucesso: saber o próximo evento antes de ele acontecer.",
    "Descreva a sequência lógica de um voo IFR completo.",
    "A resposta deve incluir preparação, clearance, SID ou vetores, rota, STAR, aproximação, mínimos, pouso ou missed approach, com monitoramento de autorização e altitudes.",
    "A boa navegação IFR começa antes da aeronave se mover.",
    "O próximo módulo entra no planejamento, clearance e leitura de cartas."
  ),
  spec(
    1,
    navigationIfrModuleIds.planningCharts,
    "Plano IFR, clearance e briefing",
    "ifr-plano-clearance-briefing",
    "35 min",
    ["Plano IFR", "Clearance", "Briefing", "Rota", "Altitude"],
    "Ler um plano IFR e transformar clearance em ações conferíveis no painel e na carta.",
    "Plano IFR é a intenção arquivada ou carregada. Clearance é a autorização recebida. Elas podem ser parecidas, mas não são a mesma coisa. O controle pode alterar saída, rota, altitude, transponder ou restrições. O piloto precisa registrar a autorização, ler de volta quando aplicável e comparar com o plano carregado.",
    "Um briefing IFR simples responde: qual pista, qual saída ou vetor, qual primeira altitude, qual rota, qual frequência seguinte, qual transponder, quais restrições e qual ameaça principal. Depois, essas informações viram configuração: altitude selecionada, fonte de navegação, plano conferido e cartas abertas.",
    "No MSFS, o ATC pode simplificar ou divergir da operação real. Ainda assim, treine a disciplina: anote clearance, compare com o plano, ajuste o que for necessário e só então inicie taxi.",
    "O erro comum é carregar um plano no menu mundial e decolar sem briefing. Quando o ATC muda algo, o aluno não sabe se deve seguir a carta, a linha magenta ou a instrução.",
    "Atividade prática: crie um plano IFR curto e escreva um clearance didático em formato: liberado para, via, altitude inicial, espere, frequência, transponder. Critério de sucesso: configurar painel e rota coerentes com esse texto.",
    "Qual a diferença entre plano IFR e clearance IFR?",
    "A resposta deve dizer que plano é intenção arquivada/carregada, clearance é autorização operacional sob condições específicas, e ambas precisam ser comparadas antes do voo.",
    "Clearance bem entendido reduz confusão na fase mais carregada do voo: a saída.",
    "A próxima aula trata meteorologia IFR, NOTAM, alternado e reservas."
  ),
  spec(
    2,
    navigationIfrModuleIds.planningCharts,
    "Meteorologia, NOTAM, alternado e reservas",
    "ifr-meteorologia-notam-alternado",
    "35 min",
    ["METAR", "TAF", "NOTAM", "Alternado", "Reserva"],
    "Planejar IFR considerando meteorologia, alternado, reservas e avisos operacionais sem transformar o curso em preparação legal.",
    "IFR não significa ignorar meteorologia. METAR mostra condição observada; TAF apresenta previsão; NOTAM informa alterações temporárias relevantes, como auxílio fora de serviço, pista fechada ou procedimento indisponível. Alternado e reserva dão margem quando destino, aproximação ou clima não cooperam.",
    "Regras de alternado, combustível e mínimos variam por autoridade e tipo de operação. Nesta plataforma, a abordagem é educacional para simulador: compreender por que esses elementos existem. Para operação real, consulte regulamento, POH/AFM, cartas e instrução certificada aplicáveis.",
    "Em um voo IFR no C408 simulado, escolha destino e alternado antes de sair. Se a aproximação esperada depende de ILS e o NOTAM indica auxílio indisponível no mundo real, isso muda o briefing. No simulador, o banco de dados pode não refletir tudo, então registre a diferença como limitação do cenário.",
    "O erro comum é planejar até o destino como se pouso fosse garantido. IFR maduro pergunta: e se o teto baixar, se o auxílio falhar, se eu arremeter ou se ficar alto?",
    "Atividade prática: escolha uma rota IFR curta, leia METAR/TAF quando disponível e selecione um alternado didático. Critério de sucesso: explicar por que esse alternado é razoável e qual decisão tomaria se o destino piorasse.",
    "Por que alternado e reserva fazem parte do raciocínio IFR mesmo no simulador?",
    "A resposta deve citar incerteza meteorológica, indisponibilidade de auxílio, arremetida, espera, combustível/reserva e decisão antes da pressão aumentar.",
    "Planejar IFR é preparar opções antes que elas pareçam urgentes.",
    "A próxima aula ensina a ler cartas IFR sem copiar cartas protegidas."
  ),
  spec(
    3,
    navigationIfrModuleIds.planningCharts,
    "Leitura de cartas IFR",
    "ifr-leitura-de-cartas-ifr",
    "35 min",
    ["Carta IFR", "Cabeçalho", "Frequências", "Waypoints", "Mínimos"],
    "Interpretar a estrutura de cartas IFR: cabeçalho, frequências, vista planimétrica, perfil, mínimos e missed approach.",
    "Carta IFR é uma instrução visual organizada. Ela mostra identificação do procedimento, aeroporto, pista, frequências, cursos, waypoints, altitudes, restrições, perfil vertical, mínimos e aproximação perdida. O objetivo da aula é aprender a ler a lógica, não copiar uma carta específica.",
    "Comece pelo cabeçalho: nome do procedimento, pista, data/revisão e tipo. Depois leia frequências e navegação necessária. Na vista superior, identifique IAF, IF, FAF, MAP, courses e holds. No perfil, veja altitudes mínimas e descidas autorizadas. Na tabela de mínimos, diferencie DA, MDA, visibilidade/RVR quando aplicável e categoria de aeronave conforme carta.",
    "No MSFS, use cartas oficiais quando disponíveis pelo simulador, AISWEB, autoridade local ou serviço autorizado. Se não tiver carta, trate o voo como exercício simplificado e não como reprodução operacional real.",
    "O erro comum é olhar apenas o mapa da carta e ignorar perfil e mínimos. Outro erro é confundir altitude recomendada com autorização para descer antes do fix correto.",
    "Atividade prática: escolha uma carta de aproximação autorizada para estudo. Sem voar, marque no papel: cabeçalho, IAF, IF, FAF, MAP, altitude no FAF, mínimos e texto do missed. Critério de sucesso: fazer briefing de 60 segundos sem pular mínimos.",
    "Quais partes de uma carta IFR devem entrar no briefing de aproximação?",
    "A resposta deve citar identificação, pista, frequências, navegação requerida, IAF/IF/FAF/MAP, cursos, altitudes, mínimos, missed approach e ameaças.",
    "A carta IFR é o roteiro. A aeronave só deve seguir o que o piloto entendeu.",
    "A próxima aula aprofunda altitudes, restrições e mínimos."
  ),
  spec(
    4,
    navigationIfrModuleIds.planningCharts,
    "Altitudes, restrições e mínimos",
    "ifr-altitudes-restricoes-e-minimos",
    "35 min",
    ["Altitude mínima", "Restrição", "DA", "MDA", "Estabilização"],
    "Diferenciar altitudes de procedimento, restrições, mínimos de aproximação e decisões de continuação.",
    "Em IFR, nem toda altitude na carta tem o mesmo significado. Algumas protegem obstáculos antes de um ponto, outras são restrições de cruzamento, outras são altitudes esperadas por ATC, e os mínimos definem a decisão final da aproximação.",
    "DA, Decision Altitude, é associada a aproximações com orientação vertical onde a decisão deve ocorrer ao atingir a altitude. MDA, Minimum Descent Altitude, é uma altitude mínima em aproximações sem orientação vertical contínua, abaixo da qual não se desce sem referência visual suficiente. Termos e valores dependem da carta e da autoridade aplicável.",
    "No simulador, se você chega ao mínimo sem pista ou ambiente de pista em vista, a ação didática correta é arremeter. Não continue descendo só porque a pista deve aparecer em alguns segundos.",
    "O erro comum é descer abaixo de uma altitude mínima antes do fix correto, ou tratar LPV, LNAV e ILS como se tivessem a mesma lógica de mínimo.",
    "Atividade prática: escolha uma carta ILS e uma RNAV. Compare onde aparece DA ou MDA e em que ponto a decisão deve ser tomada. Critério de sucesso: explicar por que uma aproximação perdida pode ser necessária mesmo com tudo configurado corretamente.",
    "Explique a diferença prática entre DA e MDA.",
    "A resposta deve citar decisão ao atingir DA em aproximação com orientação vertical e manutenção acima de MDA até referência visual ou MAP em aproximação sem orientação vertical contínua.",
    "Mínimos não são sugestão: são parte da decisão planejada.",
    "O próximo módulo aplica planejamento em saída, rota e espera."
  ),
  spec(
    1,
    navigationIfrModuleIds.departuresEnrouteHolds,
    "SID, ODP e Transition",
    "ifr-sid-odp-transition",
    "35 min",
    ["SID", "ODP", "Transition", "Gradiente", "Obstacle clearance"],
    "Entender saídas por instrumentos, proteção de obstáculos e transições sem transformar o curso em manual regional.",
    "SID, Standard Instrument Departure, organiza a saída de aeroportos com rotas, pontos, altitudes e restrições. ODP, Obstacle Departure Procedure, existe para proteção contra obstáculos quando aplicável. Transition conecta a saída a uma rota ou fixo posterior. Nem todo país usa a mesma nomenclatura ou apresentação, então consulte a publicação local.",
    "A lógica de uma saída IFR é tirar a aeronave do aeroporto mantendo separação e obstáculos sob controle até entrar na rota. O piloto deve saber pista, procedimento, primeira proa ou curso, altitude inicial, restrições, gradiente de subida publicado quando houver e o ponto em que termina a saída.",
    "No C408 simulado, não use gradientes ou performance real sem fonte. Em vez disso, pratique a leitura: qual pista, qual primeira altitude, qual waypoint, que restrição aparece e qual transição foi carregada.",
    "O erro comum é carregar a SID, ativar NAV e não saber para onde a aeronave fará a primeira curva. Outro erro é ignorar restrições de altitude por confiar que o simulador vai resolver.",
    "Atividade prática: escolha uma SID no planejador ou carta autorizada. Faça briefing antes da decolagem e pause logo após decolar para conferir se a primeira perna ativa corresponde à carta. Critério de sucesso: antecipar a primeira curva e a próxima altitude.",
    "Quais itens devem ser conferidos antes de voar uma SID?",
    "A resposta deve citar pista, procedimento, transição, primeira altitude, restrições, curso/waypoint inicial, fonte ativa, modos e proteção de obstáculos conforme carta.",
    "Uma saída IFR bem feita começa no briefing, não depois da decolagem.",
    "A próxima aula pratica interceptação de curso e radial."
  ),
  spec(
    2,
    navigationIfrModuleIds.departuresEnrouteHolds,
    "Interceptação de curso e radial",
    "ifr-interceptacao-curso-radial",
    "35 min",
    ["Interceptação", "Curso", "Radial", "CDI", "Ângulo"],
    "Aprender a interceptar um curso ou radial com método, sem perseguir a agulha.",
    "Interceptar significa aproximar a aeronave de uma linha desejada com ângulo controlado até que ela esteja estabelecida. A linha pode ser um curso GPS, radial VOR, localizer ou aerovia. O piloto escolhe proa de interceptação, observa a indicação de desvio e reduz o ângulo antes de cruzar o curso.",
    "Um método simples: confirme fonte, confirme curso, saiba de que lado está a linha, use interceptação moderada, monitore CDI/HSI, antecipe a redução de ângulo e estabilize no curso. Vento pode exigir correção para manter trajetória, então proa e curso raramente são exatamente iguais.",
    "No simulador, pratique sem pressa. Use uma altitude segura, escolha um curso e comece com 20 a 30 graus de interceptação como exercício didático. Valores exatos dependem de velocidade, distância, vento e procedimento.",
    "O erro comum é virar só quando a agulha centraliza. A aeronave cruza o curso com muita razão lateral e passa para o outro lado, criando ziguezague.",
    "Atividade prática: configure um VOR ou rota GPS simples, posicione-se fora do curso e intercepte. Critério de sucesso: centralizar sem overshoot grande e explicar quando começou a reduzir o ângulo.",
    "Descreva um método para interceptar um curso IFR.",
    "A resposta deve citar fonte, curso, lado do desvio, ângulo de interceptação, monitoramento da agulha, antecipação e correção de vento.",
    "Interceptar bem é prever a linha antes de cruzá-la.",
    "A próxima aula aplica essa lógica em aerovias e mudanças de rota."
  ),
  spec(
    3,
    navigationIfrModuleIds.departuresEnrouteHolds,
    "Aerovias e mudança de rota",
    "ifr-aerovias-mudanca-de-rota",
    "35 min",
    ["Aerovia", "Course change", "Clearance", "Waypoint", "Direct-To"],
    "Gerenciar navegação em rota, mudança de aerovia e alteração de clearance sem perder consciência situacional.",
    "Em rota IFR, a aeronave pode seguir aerovia, rota RNAV, fixos diretos ou vetores. Mudanças de rota podem vir de ATC, meteorologia, tráfego, indisponibilidade de auxílio ou decisão de alternado. A questão central é transformar a nova autorização em navegação correta.",
    "Ao receber mudança, pare de pensar em botão e siga uma sequência: aviate, anote, confirme o novo clearance, identifique o próximo fixo, confira altitude, ajuste o plano ou fonte, compare no mapa e monitore. Direct-To pode ser útil, mas pode pular restrições ou desconectar procedimentos se usado sem análise.",
    "No MSFS, o ATC pode enviar vetores ou mudanças simplificadas. Treine a disciplina realista: não aceite uma alteração mentalmente se você não sabe onde ela coloca a aeronave.",
    "O erro comum é reprogramar o GPS enquanto a aeronave perde altitude ou rumo. Outro é aceitar Direct-To para um ponto depois do início da STAR, quebrando a sequência planejada.",
    "Atividade prática: durante um voo IFR curto, pause em rota e simule uma mudança para outro waypoint ou aerovia. Critério de sucesso: explicar o novo próximo ponto, a altitude e como voltar ao fluxo da rota.",
    "Qual sequência segura usar ao receber uma mudança de rota IFR?",
    "A resposta deve citar aviate, anotar, confirmar clearance, identificar ponto, altitude, ajustar navegação, comparar carta/mapa e monitorar.",
    "Mudança de rota não é emergência se o piloto preserva método.",
    "A próxima aula introduz holds, entradas e racetrack."
  ),
  spec(
    4,
    navigationIfrModuleIds.departuresEnrouteHolds,
    "Hold, entry e racetrack",
    "ifr-hold-entry-racetrack",
    "35 min",
    ["Hold", "Entry", "Racetrack", "Inbound", "Outbound"],
    "Entender espera IFR como padrão protegido de navegação, tempo e controle de fluxo.",
    "Hold é um procedimento de espera em torno de um fixo, geralmente com formato de racetrack. Ele pode ser publicado ou atribuído pelo controle. Serve para sequenciamento, atraso, reversão de curso ou preparação para aproximação. O piloto precisa saber fixo, curso inbound, sentido das curvas, altitude, velocidade, tempo ou distância de perna e horário ou autorização de saída quando aplicável.",
    "Entradas de hold, como direct, parallel e teardrop, são métodos para entrar no padrão sem manobras improvisadas. Não transforme isso em memorização cega: o objetivo é chegar ao lado protegido e estabilizar inbound/outbound. Em RNAV, confira se o hold carregado corresponde à carta, pois banco de dados e simulador podem simplificar ou escolher padrão diferente.",
    "No C408 simulado, faça um hold em altitude segura com GPS ou VOR. Observe se a aeronave antecipa curvas e se a perna outbound respeita tempo/distância. Se o sistema não representar corretamente o hold, voe manualmente como exercício didático.",
    "O erro comum é entrar no hold sem saber curso inbound. Outro erro é confiar que o FMS sempre codificou corretamente direção, perna e altitude.",
    "Atividade prática: escolha um fixo, defina curso inbound, curvas à direita e perna de 1 minuto como exercício. Critério de sucesso: cruzar o fixo, entrar de modo coerente e estabilizar no padrão sem perder altitude.",
    "Quais informações são indispensáveis para voar um hold?",
    "A resposta deve citar fixo, curso inbound, sentido das curvas, altitude, velocidade, tempo ou distância da perna, entrada e autorização ou saída.",
    "Hold é pausa organizada, não voo em círculos sem plano.",
    "O próximo módulo chega às STARs e aproximações."
  ),
  spec(
    1,
    navigationIfrModuleIds.arrivalsApproaches,
    "STAR, IAF, IF, FAF e MAP",
    "ifr-star-iaf-if-faf-map",
    "35 min",
    ["STAR", "IAF", "IF", "FAF", "MAP"],
    "Entender a transição da chegada para a aproximação por meio dos principais fixes IFR.",
    "STAR, Standard Terminal Arrival, organiza a chegada da rota para a área terminal. Ela pode terminar em fixo, transição ou ponto conectado a uma aproximação. IAF é Initial Approach Fix, início da aproximação; IF é Intermediate Fix, trecho intermediário; FAF é Final Approach Fix, onde começa o segmento final em muitos procedimentos; MAP é Missed Approach Point, ponto associado à decisão de aproximação perdida em procedimentos sem DA.",
    "A lógica é descer e alinhar progressivamente, sem chegar alto, rápido ou sem briefing. O piloto deve saber onde termina a STAR, qual aproximação está carregada, se há transição correta e como a carta conecta chegada à final. Quando ATC vetoriza, a aeronave pode não voar todos os pontos, mas o piloto ainda precisa saber qual segmento está sendo interceptado.",
    "No MSFS, é comum o plano inserir uma STAR longa ou uma transição inadequada. Antes da chegada, confira a distância, altitude, pista em uso e se a aproximação começa no IAF correto ou em vectors-to-final.",
    "O erro comum é deixar a STAR terminar sem aproximação ativa ou carregar a aproximação tarde demais. Isso gera curvas inesperadas, altitude alta e perda de consciência.",
    "Atividade prática: carregue uma STAR e uma aproximação. Pause antes do top of descent e identifique STAR final, IAF, IF, FAF e MAP. Critério de sucesso: saber quando deve estar configurado para aproximação.",
    "Explique o papel de STAR, IAF, IF, FAF e MAP na sequência IFR.",
    "A resposta deve dizer que STAR leva da rota à terminal, IAF inicia aproximação, IF estabiliza/intermedia, FAF inicia final e MAP define ponto de aproximação perdida quando aplicável.",
    "Chegada IFR é preparação antecipada para a final, não uma corrida até a pista.",
    "A próxima aula aprofunda ILS, Localizer e Glide Slope."
  ),
  spec(
    2,
    navigationIfrModuleIds.arrivalsApproaches,
    "ILS, Localizer e Glide Slope",
    "ifr-ils-localizer-glide-slope",
    "35 min",
    ["ILS", "Localizer", "Glide Slope", "APR", "DA"],
    "Compreender ILS como orientação lateral e vertical baseada em sinais, modos e mínimos.",
    "ILS, Instrument Landing System, fornece orientação lateral pelo Localizer e vertical pelo Glide Slope. O localizer alinha a aeronave com o eixo da pista. O glide slope orienta a descida. Em muitas aeronaves, a fonte deve estar em NAV/LOC, a frequência correta deve estar sintonizada ou carregada e o modo APR deve ser armado no momento adequado.",
    "A aproximação ILS exige briefing: pista, frequência, curso, altitude de interceptação, FAF ou ponto equivalente, DA/DH, missed approach e configuração esperada. Capturar localizer antes do glide slope evita descer em uma aeronave ainda desalinhada. Depois de capturado, monitore desvios, velocidade, razão de descida, altitude e modos ativos.",
    "No C408 com aviônicos simulados, pratique conceito, não procedimento oficial: confirme fonte, identifique LOC, arme APR e observe se lateral e vertical ficam ativos. Se a simulação divergir, priorize entender modo ativo versus modo armado.",
    "O erro comum é armar APR sem fonte correta, ou perseguir o glide slope por baixo. Outro erro é continuar abaixo da DA sem referência visual suficiente.",
    "Atividade prática: carregue uma ILS no simulador, estabilize antes da interceptação e verbalize fonte, curso, LOC vivo, GS vivo, APR armado/ativo e DA. Critério de sucesso: executar missed se a aproximação ficar instável.",
    "Quais confirmações devem ocorrer antes de confiar em uma aproximação ILS?",
    "A resposta deve citar frequência ou procedimento carregado, identificação, fonte NAV/LOC, curso, localizer, glide slope, APR, altitude de interceptação, DA e missed approach.",
    "ILS é preciso, mas só é seguro quando o piloto sabe o que foi capturado.",
    "A próxima aula compara RNAV, LNAV, LPV e mínimos."
  ),
  spec(
    3,
    navigationIfrModuleIds.arrivalsApproaches,
    "RNAV, LNAV, LPV e mínimos",
    "ifr-rnav-lnav-lpv-minimos",
    "35 min",
    ["RNAV", "LNAV", "LPV", "MDA", "DA"],
    "Entender aproximações RNAV e diferenças introdutórias entre mínimos laterais e verticais.",
    "Aproximação RNAV usa navegação de área, geralmente baseada em GPS ou sistema aprovado, para conduzir a aeronave por waypoints publicados. LNAV fornece orientação lateral. LPV fornece orientação vertical angular com desempenho semelhante em uso prático a uma aproximação com guia vertical, quando disponível e publicado. Outros tipos podem existir conforme região e equipamento.",
    "A diferença didática principal é a decisão. Algumas aproximações RNAV usam MDA, outras usam DA. O piloto precisa ler a linha correta dos mínimos, confirmar o tipo carregado no aviônico, verificar integridade e não inventar orientação vertical quando ela não está disponível. A carta manda mais que a expectativa do aluno.",
    "No MSFS, o aviônico pode mostrar vertical guidance em alguns cenários, mas o aluno deve conferir se a aproximação e o mínimo selecionado correspondem ao procedimento estudado. Garmin específico será aprofundado em etapa própria.",
    "O erro comum é chamar toda RNAV de LPV ou acreditar que qualquer linha magenta vertical autoriza descer como ILS. Outro erro é editar waypoints de aproximação e quebrar a proteção do procedimento.",
    "Atividade prática: compare uma RNAV com mínimo LNAV e outra com LPV quando disponível. Critério de sucesso: explicar o tipo de orientação, mínimo aplicável e ação ao perder guia vertical ou integridade.",
    "Como diferenciar RNAV LNAV de RNAV LPV em nível introdutório?",
    "A resposta deve citar orientação lateral para LNAV, orientação vertical publicada para LPV, diferença entre MDA/DA conforme carta, necessidade de conferir procedimento e integridade.",
    "RNAV exige leitura cuidadosa: o mesmo nome geral pode esconder mínimos e lógicas diferentes.",
    "A próxima aula trata missed approach e arremetida IFR."
  ),
  spec(
    4,
    navigationIfrModuleIds.arrivalsApproaches,
    "Missed Approach e arremetida IFR",
    "ifr-missed-approach-arremetida",
    "35 min",
    ["Missed Approach", "MAP", "DA", "MDA", "Arremetida"],
    "Executar conceitualmente uma aproximação perdida como procedimento planejado, não como fracasso.",
    "Missed Approach é o procedimento publicado ou autorizado para interromper a aproximação e voltar a uma trajetória protegida. Ele pode ser iniciado ao atingir DA/DH sem referência visual suficiente, ao chegar ao MAP sem condição de pouso, quando a aproximação não está estabilizada ou quando ATC instruir.",
    "A sequência mental é: potência, atitude, controle de trajetória, configuração conforme aeronave e manual aplicável, navegação lateral do missed, altitude publicada ou autorizada e comunicação. Se a arremetida for iniciada antes do MAP, muitas regras e publicações exigem seguir a trajetória lateral até o MAP antes de virar, salvo instrução específica. Detalhes variam por país e procedimento.",
    "No simulador, pratique missed sem esperar emergência. Carregue uma aproximação e decida antes: se não estiver estável no ponto escolhido, execute arremetida. Não use valores de configuração do C408 sem documentação; foque na lógica de potência, atitude, navegação e altitude.",
    "O erro comum é tentar salvar pouso abaixo de mínimos ou virar imediatamente para o hold de missed sem entender de onde a proteção começa.",
    "Atividade prática: voe uma aproximação ILS ou RNAV e execute missed deliberado no mínimo. Critério de sucesso: manter controle, seguir a rota publicada do missed e subir para altitude indicada no procedimento ou autorizada.",
    "Quando uma aproximação IFR deve virar missed approach?",
    "A resposta deve citar falta de referência visual no DA/MAP, instabilidade, instrução ATC, perda de guia ou qualquer condição em que pouso seguro não esteja garantido.",
    "Missed approach é parte normal do IFR. O erro é improvisar algo que já deveria estar briefado.",
    "O próximo módulo integra automação, decisão e voo IFR completo."
  ),
  spec(
    1,
    navigationIfrModuleIds.automationCompleteFlight,
    "Flight Director e piloto automático",
    "ifr-flight-director-piloto-automatico",
    "35 min",
    ["Flight Director", "NAV", "HDG", "APR", "ALT", "VS", "FLC"],
    "Entender modos de automação como comandos formais que precisam ser armados, ativos e monitorados.",
    "Flight Director mostra comandos de orientação para o piloto ou para o piloto automático. O piloto automático executa modos ativos. Modos laterais comuns incluem HDG para proa selecionada, NAV para seguir fonte de navegação, e APR para captura de aproximação. Modos verticais incluem ALT para manter altitude, VS para razão vertical e FLC para velocidade alvo.",
    "Modo armado é intenção preparada. Modo ativo é o que comanda agora. Uma aeronave pode estar com APR armado, mas ainda seguindo HDG; ou com altitude selecionada errada, mas verticalmente perfeita em VS. O piloto deve ler o anunciador de modos antes de confiar no comportamento.",
    "No C408 simulado, pratique dizer em voz alta: lateral ativo, lateral armado, vertical ativo, vertical armado, altitude selecionada. Não entre em detalhes de Garmin nesta etapa; o foco é raciocínio de automação.",
    "O erro comum é apertar APR e acreditar que ILS está capturado. Se LOC e GS não passaram a ativos, a aeronave ainda não está voando a aproximação como o aluno imagina.",
    "Atividade prática: em voo nivelado, alterne HDG, NAV, ALT, VS e APR em cenário seguro e observe os anúncios de modo. Critério de sucesso: explicar a diferença entre armado e ativo antes de cada manobra.",
    "Explique a diferença entre modo armado e modo ativo.",
    "A resposta deve dizer que modo armado está preparado para capturar ou assumir futuramente, enquanto modo ativo está comandando a aeronave naquele momento.",
    "Automação IFR é linguagem. Se você não lê os modos, não sabe quem está voando.",
    "A próxima aula mostra como manter consciência situacional e evitar erros comuns."
  ),
  spec(
    2,
    navigationIfrModuleIds.automationCompleteFlight,
    "Consciência situacional e erros comuns",
    "ifr-consciencia-situacional-e-erros",
    "35 min",
    ["Consciência situacional", "Modo errado", "Curso errado", "Pressão", "Carga de trabalho"],
    "Reconhecer e corrigir erros IFR frequentes antes que eles virem perda de controle ou procedimento.",
    "Consciência situacional IFR é saber posição, altitude, próxima restrição, próximo modo, próxima frequência, alternativa e consequência de cada ação. O piloto precisa estar à frente da aeronave: preparar chegada antes da descida, briefing antes do IAF e missed antes do mínimo.",
    "Erros comuns incluem interceptar curso errado, seguir GPS quando deveria seguir NAV/LOC, esquecer APR armado, descer antes do permitido, chegar alto na final, manter pressão incorreta, configurar altitude errada, interpretar uma carta pela metade e reprogramar o FMS durante fase crítica.",
    "No MSFS, algumas falhas vêm do próprio simulador: ATC simplificado, planos desconectados, bancos de dados diferentes de cartas externas, captura de modo inesperada ou representação incompleta de procedimentos. Trate isso como diferença do simulador, não como regra real.",
    "O erro mais perigoso é tentar corrigir tudo ao mesmo tempo. A prioridade continua: aviate, navigate, communicate. Controle atitude e altitude, depois fonte/curso, depois comunicação ou reprogramação.",
    "Atividade prática: simule um erro simples, como fonte em GPS durante interceptação de LOC. Critério de sucesso: perceber pela indicação, estabilizar a aeronave, corrigir fonte/modo e continuar ou arremeter.",
    "Liste cinco erros IFR comuns e diga como reduzir o risco.",
    "A resposta deve citar fonte/modo, APR, descida prematura, carta incompleta, pressão, altitude selecionada, carga de trabalho e uso de briefing/scan para prevenção.",
    "IFR seguro é menos heroísmo e mais antecipação disciplinada.",
    "A próxima aula trabalha alternado e reprogramação sem perder controle."
  ),
  spec(
    3,
    navigationIfrModuleIds.automationCompleteFlight,
    "Alternado e reprogramação",
    "ifr-alternado-reprogramacao",
    "35 min",
    ["Alternado", "Desvio", "Reprogramação", "Direct-To", "Decisão"],
    "Tomar decisão de alternar ou reprogramar sem misturar navegação, automação e pressão.",
    "Alternar é decidir ir para outro aeródromo quando continuar ao destino deixa de ser a melhor opção. O motivo pode ser meteorologia, combustível simulado, aproximação indisponível, pista inadequada, carga de trabalho ou instabilidade. Reprogramar é alterar o sistema para refletir a nova decisão, mas a decisão vem antes do botão.",
    "Fluxo seguro: mantenha controle, escolha alternado já estudado, confira distância, meteorologia, pista, aproximação disponível, combustível didático, terreno e autorização quando usando ATC. Só então ajuste Direct-To, nova rota ou nova aproximação. Verifique se o plano não pulou restrições importantes.",
    "No MSFS, o ATC pode não tratar alternado de forma realista. Ainda assim, pratique como cenário: se destino fechou, declare sua intenção no fluxo mental, estabilize em altitude segura, carregue alternado e faça novo briefing.",
    "O erro comum é clicar Direct-To para o alternado sem saber qual aproximação será usada ou se há terreno entre você e ele.",
    "Atividade prática: em rota IFR, escolha um alternado e reprograme a navegação em fase tranquila. Critério de sucesso: manter altitude e proa estáveis enquanto modifica o plano e depois confirmar a nova sequência.",
    "Qual deve vir primeiro: decidir alternar ou reprogramar o GPS? Explique.",
    "A resposta deve dizer que a decisão operacional vem primeiro, baseada em segurança, meteorologia, combustível, aproximação e alternativa; a reprogramação apenas formaliza a nova intenção.",
    "Reprogramar bem é consequência de decidir bem.",
    "A próxima aula integra tudo em um voo IFR completo."
  ),
  spec(
    4,
    navigationIfrModuleIds.automationCompleteFlight,
    "Voo IFR completo",
    "ifr-voo-completo",
    "35 min",
    ["Voo completo", "SID", "Rota", "STAR", "Aproximação", "Debriefing"],
    "Planejar, executar e revisar um voo IFR completo no Microsoft Flight Simulator com raciocínio de piloto.",
    "O voo IFR completo junta todas as peças: planejamento, meteorologia, alternado, cartas, clearance, SID, rota, STAR, aproximação, automação, mínimos, missed approach e debriefing. O objetivo não é terminar pousando a qualquer custo, mas demonstrar método.",
    "Preparação: escolha uma rota curta, clima IFR moderado ou marginal controlado, aeroporto de alternado e uma aproximação publicada. Briefing: pista, saída, rota, chegada, aproximação, altitudes, mínimos e missed. Execução: voe a aeronave, confirme cada modo, antecipe cada ponto e mantenha estabilidade. Debriefing: compare plano e execução, erros de altitude, fonte, modo, timing e decisão.",
    "Use o C408 como plataforma de estudo quando fizer sentido, mas não invente velocidades, consumo, configuração ou performance. Use valores do simulador apenas como referência didática e marque qualquer dado técnico específico para validação futura.",
    "O erro comum é transformar o voo final em teste de pouso. Em IFR, uma arremetida bem executada após aproximação instável pode ser melhor demonstração de proficiência do que pouso improvisado.",
    "Atividade prática: execute um voo IFR curto com SID ou vetor, trecho em rota, STAR ou chegada direta, aproximação ILS ou RNAV e missed planejado opcional. Critério de sucesso: explicar antes de cada fase o próximo ponto, altitude, modo, carta e decisão.",
    "Descreva um voo IFR completo do planejamento ao debriefing.",
    "A resposta deve citar meteorologia, NOTAM introdutório, alternado, clearance, SID, rota, STAR, IAF/FAF/MAP, ILS ou RNAV, automação, mínimos, missed approach, alternado e debriefing.",
    "Compreender IFR é saber por que cada procedimento existe e como confirmar que a aeronave realmente está fazendo o que você pediu.",
    "A próxima etapa poderá aprofundar aviônicos, aeronave ou procedimentos específicos sem confundir conceito IFR com botão."
  )
];

export const localLessonDocuments: LessonDocument[] = [
  ...lessonSpecs.map(createLessonDocument),
  ...garminLessonSpecs.map(createLessonDocument),
  ...navigationVfrLessonSpecs.map(createLessonDocument),
  ...navigationIfrLessonSpecs.map(createLessonDocument)
];

export const localExerciseDocuments: ExerciseDocument[] = localLessonDocuments.flatMap((lesson) => {
  const courseId = getCourseIdByModuleId(lesson.moduleId);
  const baseId = lesson.exerciseId.replace(/-multiple-choice$/, "");
  const distractor = buildExerciseDistractor(lesson);
  const coreConcepts = lesson.keyConcepts.slice(0, 3).join(", ");

  return [
    {
      id: `${baseId}-multiple-choice`,
      lessonId: lesson.id,
      moduleId: lesson.moduleId,
      courseId,
      type: "multiple_choice",
      prompt: `${lesson.exercisePrompt} Escolha a alternativa mais alinhada ao raciocínio da aula.`,
      alternatives: [
        lesson.expectedAnswer,
        lesson.commonMistake,
        distractor
      ],
      alternativeOptions: [
        { id: `${baseId}-option-correct`, text: lesson.expectedAnswer },
        { id: `${baseId}-option-common-mistake`, text: lesson.commonMistake },
        { id: `${baseId}-option-procedural-trap`, text: distractor }
      ],
      correctAnswer: lesson.expectedAnswer,
      expectedAnswer: lesson.expectedAnswer,
      explanation: `A resposta correta aplica o objetivo da aula: ${lesson.objective} A alternativa baseada no erro comum mostra a armadilha mais provável: ${lesson.commonMistake} Revise especialmente: ${coreConcepts}.`,
      difficulty: getExerciseDifficulty(lesson.moduleId, 1),
      order: 1,
      points: 10,
      publicationState: "published",
      technicalMetadata: exerciseTechnicalMetadata
    },
    {
      id: `${baseId}-true-false`,
      lessonId: lesson.id,
      moduleId: lesson.moduleId,
      courseId,
      type: "true_false",
      prompt: `Verdadeiro ou falso: ${lesson.conclusion} Antes de responder, pense em como isso apareceria no Microsoft Flight Simulator.`,
      correctAnswer: true,
      expectedAnswer: "Verdadeiro.",
      explanation: `A afirmação é verdadeira porque resume a conclusão operacional da aula. Se você marcou falso, revise a relação entre ${coreConcepts} e a aplicação prática no simulador: ${lesson.simulatorApplication}`,
      difficulty: getExerciseDifficulty(lesson.moduleId, 2),
      order: 2,
      points: 5,
      publicationState: "published",
      technicalMetadata: exerciseTechnicalMetadata
    },
    {
      id: `${baseId}-open-answer`,
      lessonId: lesson.id,
      moduleId: lesson.moduleId,
      courseId,
      type: "open_answer",
      prompt: lesson.exercisePrompt,
      expectedAnswer: lesson.expectedAnswer,
      explanation: `Compare sua resposta com a resposta esperada, verifique se citou os conceitos principais (${coreConcepts}) e marque sua autoavaliação. Se faltou explicar o que observar no simulador ou como corrigir o erro comum, envie o item para revisão.`,
      difficulty: getExerciseDifficulty(lesson.moduleId, 3),
      order: 3,
      points: 15,
      publicationState: "published",
      technicalMetadata: exerciseTechnicalMetadata
    }
  ];
});

function buildExerciseDistractor(lesson: LessonDocument) {
  if (lesson.moduleId.startsWith("module-g1000-")) {
    return "Seguir a indicação do mapa sem confirmar fonte ativa, FMA, perna selecionada e estabilidade da aeronave.";
  }

  if (lesson.moduleId.startsWith("module-ifr-")) {
    return "Continuar o procedimento apenas porque o GPS mostra uma linha magenta, mesmo sem conferir carta, altitude, mínimos e modos ativos.";
  }

  if (lesson.moduleId.startsWith("module-vfr-")) {
    return "Navegar olhando somente para o GPS, ignorando referências visuais, vento, tempo estimado e decisão de alternado.";
  }

  return "Aplicar comandos amplos sem estabilizar atitude, potência, trim e scan, aceitando o resultado apenas porque o simulador continuou voando.";
}

function getExerciseDifficulty(moduleId: string, order: number): ExerciseDocument["difficulty"] {
  if (moduleId.startsWith("module-ifr-") || moduleId.startsWith("module-g1000-")) {
    return order === 1 ? "medio" : "dificil";
  }

  if (moduleId.startsWith("module-vfr-")) {
    return order === 3 ? "medio" : "facil";
  }

  return order === 3 ? "medio" : "facil";
}

function getCourseIdByModuleId(moduleId: string) {
  if (moduleId.startsWith("module-g1000-")) {
    return "course-garmin-g1000-nxi";
  }

  if (moduleId.startsWith("module-vfr-")) {
    return navigationVfrCourseId;
  }

  if (moduleId.startsWith("module-ifr-")) {
    return navigationIfrCourseId;
  }

  return "course-fundamentos-pilotagem";
}

export const localFinalAssessmentDocuments: FinalAssessmentDocument[] = [
  {
    id: "assessment-final-fundamentos-pilotagem",
    courseId: "course-fundamentos-pilotagem",
    slug: "avaliacao-final-fundamentos-da-pilotagem",
    title: "Avaliação final - Fundamentos da Pilotagem",
    scenario:
      "Voo local visual no Microsoft Flight Simulator usando o Cessna 408 SkyCourier como aeronave de referência. O aluno deve preparar o cenário, escolher pista, decolar, voar circuito simples, aproximar estabilizado, pousar com controle ou arremeter se necessário.",
    instructions:
      "Responda com raciocínio de piloto iniciante: explique o que observar, quais comandos usar, como reconhecer erro e quando simplificar ou arremeter. Não use valores específicos do C408 sem documentação aplicável.",
    questions: [
      {
        id: "assessment-controls",
        prompt: "Explique a função básica de profundor, ailerons, leme, trim, flaps e potência.",
        expectedKeywords: ["profundor", "ailerons", "leme", "trim", "flaps", "potência"],
        weight: 12,
        concept: "Controles de voo",
        moduleId: fundamentalsModuleIds.situationalAwareness
      },
      {
        id: "assessment-weather-runway",
        prompt: "Como você usaria METAR, vento, pista e QNH antes da decolagem?",
        expectedKeywords: ["vento", "pista", "QNH", "visibilidade", "altímetro"],
        weight: 12,
        concept: "Preparação e ambiente",
        moduleId: fundamentalsModuleIds.situationalAwareness
      },
      {
        id: "assessment-instrument-scan",
        prompt: "Monte um scan básico para voo reto, curva rasa e início de descida.",
        expectedKeywords: ["atitude", "velocidade", "altitude", "VSI", "proa"],
        weight: 12,
        concept: "Scan de instrumentos",
        moduleId: fundamentalsModuleIds.instruments
      },
      {
        id: "assessment-four-forces-stall",
        prompt: "Relacione quatro forças, ângulo de ataque e prevenção de estol.",
        expectedKeywords: ["sustentação", "peso", "tração", "arrasto", "ângulo de ataque", "estol"],
        weight: 14,
        concept: "Física do voo",
        moduleId: fundamentalsModuleIds.physics
      },
      {
        id: "assessment-energy",
        prompt: "Explique como potência, atitude, configuração e velocidade trabalham juntas em subida, descida e aproximação.",
        expectedKeywords: ["potência", "atitude", "velocidade", "configuração", "energia"],
        weight: 14,
        concept: "Gerenciamento de energia",
        moduleId: fundamentalsModuleIds.energy
      },
      {
        id: "assessment-turns-coordination",
        prompt: "Como executar uma curva coordenada mantendo altitude, velocidade e proa desejada?",
        expectedKeywords: ["ailerons", "leme", "profundor", "coordenação", "proa"],
        weight: 10,
        concept: "Curvas coordenadas",
        moduleId: fundamentalsModuleIds.energy
      },
      {
        id: "assessment-vsi",
        prompt: "Como usar VSI, altímetro e tendência para nivelar sem oscilar?",
        expectedKeywords: ["VSI", "altímetro", "tendência", "antecipar", "trim"],
        weight: 10,
        concept: "Tendência dos instrumentos",
        moduleId: fundamentalsModuleIds.precision
      },
      {
        id: "assessment-traffic-pattern",
        prompt: "Descreva as pernas de um circuito visual e o que observar em cada uma.",
        expectedKeywords: ["contra o vento", "través", "vento", "base", "final"],
        weight: 10,
        concept: "Circuito de tráfego",
        moduleId: fundamentalsModuleIds.precision
      },
      {
        id: "assessment-stabilization",
        prompt: "Quais sinais indicam que uma aproximação visual deve terminar em arremetida?",
        expectedKeywords: ["alto", "rápido", "desalinhado", "instável", "arremeter"],
        weight: 10,
        concept: "Aproximação estabilizada e arremetida",
        moduleId: fundamentalsModuleIds.decision
      },
      {
        id: "assessment-complete-flight",
        prompt: "Descreva um primeiro voo completo guiado no simulador, da preparação ao debriefing.",
        expectedKeywords: ["PAVE", "decolagem", "circuito", "aproximação", "pouso", "debriefing"],
        weight: 16,
        concept: "Primeiro voo completo",
        moduleId: fundamentalsModuleIds.decision
      }
    ],
    questionCount: 8,
    passingScore: 60,
    criteria: "Aprovação com 60% ou mais, demonstrando domínio conceitual de controles, instrumentos, forças, energia, circuito, aproximação estabilizada, arremetida e primeiro voo completo no simulador.",
    allowRetake: true,
    shuffleQuestions: true,
    timeLimitMinutes: 30,
    publicationState: "published",
    technicalMetadata: exerciseTechnicalMetadata
  },
  {
    id: "assessment-final-navegacao-vfr",
    courseId: navigationVfrCourseId,
    slug: "avaliacao-final-navegacao-vfr",
    title: "Avaliação final - Navegação VFR",
    scenario:
      "Você vai planejar e executar no Microsoft Flight Simulator um voo VFR curto, diurno, com clima visual, usando o Cessna 408 SkyCourier como aeronave de referência sem inventar velocidades, consumo ou desempenho específico.",
    instructions:
      "Responda como se estivesse fazendo briefing para si mesmo antes do voo. Explique raciocínio, referências, cálculos simples, decisões e uso do GPS apenas como apoio.",
    questions: [
      {
        id: "assessment-vfr-concept",
        prompt: "Explique o que caracteriza um voo VFR e como ele difere de IFR.",
        expectedKeywords: ["referência visual", "VMC", "VFR", "IFR", "planejamento"],
        weight: 10,
        concept: "Conceito de VFR",
        moduleId: navigationVfrModuleIds.conceptsWeather
      },
      {
        id: "assessment-vfr-weather",
        prompt: "Como visibilidade, teto e nuvens influenciam a decisão de iniciar ou continuar um voo VFR?",
        expectedKeywords: ["visibilidade", "teto", "nuvens", "referências", "retornar"],
        weight: 10,
        concept: "Meteorologia visual",
        moduleId: navigationVfrModuleIds.conceptsWeather
      },
      {
        id: "assessment-vfr-charts",
        prompt: "Quais informações básicas você procura em cartas e publicações antes de voar uma rota visual?",
        expectedKeywords: ["aeródromo", "pista", "elevação", "obstáculos", "espaço aéreo"],
        weight: 10,
        concept: "Cartas e aeródromos",
        moduleId: navigationVfrModuleIds.chartsAirports
      },
      {
        id: "assessment-vfr-traffic-pattern",
        prompt: "Descreva entrada, pernas e saída de um circuito VFR sem tratar regras locais como universais.",
        expectedKeywords: ["perna do vento", "base", "final", "lado", "publicação"],
        weight: 10,
        concept: "Circuito de tráfego",
        moduleId: navigationVfrModuleIds.chartsAirports
      },
      {
        id: "assessment-vfr-heading-track",
        prompt: "Diferencie curso, proa e trajetória, explicando o efeito do vento.",
        expectedKeywords: ["curso", "proa", "trajetória", "vento", "deriva"],
        weight: 12,
        concept: "Proa e trajetória",
        moduleId: navigationVfrModuleIds.headingWind
      },
      {
        id: "assessment-vfr-time",
        prompt: "Mostre como estimar tempo até um checkpoint usando distância e velocidade no solo.",
        expectedKeywords: ["distância", "groundspeed", "tempo", "cronômetro", "checkpoint"],
        weight: 12,
        concept: "Distância, velocidade e tempo",
        moduleId: navigationVfrModuleIds.headingWind
      },
      {
        id: "assessment-vfr-drift",
        prompt: "Como reconhecer e corrigir deriva causada por vento lateral em navegação visual?",
        expectedKeywords: ["deriva", "vento lateral", "correção", "referência", "confirmar"],
        weight: 12,
        concept: "Vento e correção de deriva",
        moduleId: navigationVfrModuleIds.headingWind
      },
      {
        id: "assessment-vfr-checkpoints",
        prompt: "Como escolher checkpoints e referências para uma rota VFR curta?",
        expectedKeywords: ["rodovia", "rio", "cidade", "litoral", "checkpoint"],
        weight: 10,
        concept: "Pontos de referência",
        moduleId: navigationVfrModuleIds.routePlanning
      },
      {
        id: "assessment-vfr-alternate",
        prompt: "Por que combustível, reserva, alternado e ponto de decisão pertencem ao planejamento VFR?",
        expectedKeywords: ["combustível", "reserva", "alternado", "decisão", "meteorologia"],
        weight: 12,
        concept: "Alternado e decisão",
        moduleId: navigationVfrModuleIds.routePlanning
      },
      {
        id: "assessment-vfr-complete-flight",
        prompt: "Descreva um voo VFR completo planejado, executado e revisado no simulador.",
        expectedKeywords: ["briefing", "checkpoints", "vento", "GPS", "debriefing"],
        weight: 12,
        concept: "Voo VFR completo",
        moduleId: navigationVfrModuleIds.executionDecision
      }
    ],
    questionCount: 8,
    passingScore: 60,
    criteria: "Aprovação com 60% ou mais, demonstrando planejamento VFR, uso de cartas, referências visuais, vento, tempo, alternado, GPS como apoio e tomada de decisão.",
    allowRetake: true,
    shuffleQuestions: true,
    timeLimitMinutes: 35,
    publicationState: "published",
    technicalMetadata: exerciseTechnicalMetadata
  },
  {
    id: "assessment-final-navegacao-ifr",
    courseId: navigationIfrCourseId,
    slug: "avaliacao-final-navegacao-ifr",
    title: "Avaliação final - Navegação IFR",
    scenario:
      "Você vai planejar, briefingar, executar e revisar um voo IFR curto no Microsoft Flight Simulator usando o Cessna 408 SkyCourier como aeronave de referência didática, sem usar dados técnicos não verificados como se fossem oficiais.",
    instructions:
      "Responda como aluno que precisa demonstrar lógica IFR: explique o motivo de cada fase, como confirmar instrumentos, cartas, modos e decisões, e quando interromper uma aproximação.",
    questions: [
      {
        id: "assessment-ifr-concept",
        prompt: "Explique o que caracteriza um voo IFR e por que ele não se resume a seguir GPS.",
        expectedKeywords: ["IFR", "instrumentos", "procedimentos", "clearance", "cartas", "mínimos"],
        weight: 10,
        concept: "Conceito IFR",
        moduleId: navigationIfrModuleIds.conceptsInstruments
      },
      {
        id: "assessment-ifr-instrument-scan",
        prompt: "Monte um scan IFR para interceptação de curso em descida.",
        expectedKeywords: ["atitude", "altitude", "VSI", "velocidade", "HSI", "CDI"],
        weight: 10,
        concept: "Scan de instrumentos",
        moduleId: navigationIfrModuleIds.conceptsInstruments
      },
      {
        id: "assessment-ifr-vor-rnav",
        prompt: "Compare VOR/DME com GPS/RNAV em termos de lógica de navegação.",
        expectedKeywords: ["VOR", "radial", "DME", "GPS", "RNAV", "waypoint"],
        weight: 10,
        concept: "Auxílios de navegação",
        moduleId: navigationIfrModuleIds.navigationSystems
      },
      {
        id: "assessment-ifr-chart",
        prompt: "Quais itens devem entrar no briefing de uma carta de aproximação IFR?",
        expectedKeywords: ["cabeçalho", "frequência", "IAF", "FAF", "MAP", "mínimos", "missed"],
        weight: 12,
        concept: "Leitura de cartas IFR",
        moduleId: navigationIfrModuleIds.planningCharts
      },
      {
        id: "assessment-ifr-sid",
        prompt: "Explique a função de uma SID e o que deve ser conferido antes da decolagem.",
        expectedKeywords: ["SID", "pista", "transition", "altitude", "restrição", "obstáculos"],
        weight: 10,
        concept: "Saída IFR",
        moduleId: navigationIfrModuleIds.departuresEnrouteHolds
      },
      {
        id: "assessment-ifr-hold",
        prompt: "Quais informações são necessárias para voar um hold de forma organizada?",
        expectedKeywords: ["fixo", "inbound", "curvas", "altitude", "tempo", "entrada"],
        weight: 10,
        concept: "Hold",
        moduleId: navigationIfrModuleIds.departuresEnrouteHolds
      },
      {
        id: "assessment-ifr-ils",
        prompt: "Descreva a sequência de preparação, captura e monitoramento de uma aproximação ILS.",
        expectedKeywords: ["ILS", "localizer", "glide slope", "APR", "DA", "fonte"],
        weight: 12,
        concept: "Aproximação ILS",
        moduleId: navigationIfrModuleIds.arrivalsApproaches
      },
      {
        id: "assessment-ifr-rnav",
        prompt: "Diferencie RNAV LNAV e LPV em nível introdutório.",
        expectedKeywords: ["RNAV", "LNAV", "LPV", "MDA", "DA", "integridade"],
        weight: 10,
        concept: "Aproximação RNAV",
        moduleId: navigationIfrModuleIds.arrivalsApproaches
      },
      {
        id: "assessment-ifr-missed",
        prompt: "Quando e como executar uma aproximação perdida IFR?",
        expectedKeywords: ["DA", "MAP", "visual", "instável", "subida", "procedimento"],
        weight: 12,
        concept: "Missed Approach",
        moduleId: navigationIfrModuleIds.arrivalsApproaches
      },
      {
        id: "assessment-ifr-autopilot",
        prompt: "Explique a diferença entre modo armado e modo ativo no piloto automático.",
        expectedKeywords: ["armado", "ativo", "NAV", "HDG", "APR", "ALT"],
        weight: 10,
        concept: "Automação IFR",
        moduleId: navigationIfrModuleIds.automationCompleteFlight
      },
      {
        id: "assessment-ifr-complete-flight",
        prompt: "Descreva um voo IFR completo no simulador, do planejamento ao debriefing.",
        expectedKeywords: ["planejamento", "clearance", "SID", "rota", "STAR", "aproximação", "debriefing"],
        weight: 14,
        concept: "Voo IFR completo",
        moduleId: navigationIfrModuleIds.automationCompleteFlight
      }
    ],
    questionCount: 8,
    passingScore: 70,
    criteria: "Aprovação com 70% ou mais, demonstrando compreensão da lógica IFR, cartas, navegação, procedimentos, aproximações, automação, missed approach, alternado e tomada de decisão no simulador.",
    allowRetake: true,
    shuffleQuestions: true,
    timeLimitMinutes: 45,
    publicationState: "published",
    technicalMetadata: exerciseTechnicalMetadata
  },
  {
    id: "assessment-final-garmin-g1000-nxi-integrada",
    courseId: garminCourseId,
    slug: "avaliacao-final-garmin-g1000-nxi-integrada",
    title: "Avaliação final - Garmin G1000 NXi e voo integrado",
    scenario:
      "Você vai preparar e executar no Microsoft Flight Simulator um voo integrado com o Cessna 408 SkyCourier, usando fundamentos de pilotagem, planejamento VFR ou IFR, Garmin G1000 NXi, automação, aproximação, arremetida e debriefing. O objetivo é demonstrar raciocínio, não decorar botões.",
    instructions:
      "Responda separando procedimento real, adaptação de simulador e exercício didático. Não use velocidades, limites, consumo ou sequências críticas do C408 sem fonte oficial aplicável. Explique sempre como confirmar fonte de navegação, FMA, plano ativo, altitude selecionada e estabilidade da aeronave.",
    questions: [
      {
        id: "assessment-g1000-pfd-mfd-scan",
        prompt: "Como você organiza a leitura do PFD, MFD, HSI/CDI e FMA antes de acionar o piloto automático?",
        expectedKeywords: ["PFD", "MFD", "HSI", "CDI", "FMA", "fonte"],
        weight: 10,
        concept: "Leitura integrada dos displays",
        moduleId: "module-g1000-pfd-mfd"
      },
      {
        id: "assessment-g1000-source",
        prompt: "Explique por que confirmar GPS, NAV, LOC e perna ativa é essencial antes de seguir a orientação do Garmin.",
        expectedKeywords: ["GPS", "NAV", "LOC", "fonte", "perna ativa", "sequenciamento"],
        weight: 10,
        concept: "Fonte de navegação",
        moduleId: "module-g1000-gps-nav"
      },
      {
        id: "assessment-g1000-direct-to",
        prompt: "Quando Direct-To ajuda e quando ele pode prejudicar o planejamento VFR ou IFR?",
        expectedKeywords: ["Direct-To", "waypoint", "sequência", "consciência situacional", "plano"],
        weight: 10,
        concept: "Uso criterioso do Direct-To",
        moduleId: "module-g1000-direct-to"
      },
      {
        id: "assessment-g1000-flight-plan",
        prompt: "Quais conferências devem ser feitas no plano de voo antes da decolagem e antes da aproximação?",
        expectedKeywords: ["origem", "destino", "waypoints", "aproximação", "perna ativa", "distância"],
        weight: 10,
        concept: "Plano de voo",
        moduleId: "module-g1000-flight-plan"
      },
      {
        id: "assessment-g1000-autopilot-fma",
        prompt: "Diferencie HDG, NAV, APR, ALT, VS e FLC/IAS explicando o papel do FMA.",
        expectedKeywords: ["HDG", "NAV", "APR", "ALT", "VS", "FLC", "FMA"],
        weight: 12,
        concept: "Modos de automação",
        moduleId: "module-g1000-piloto-automatico"
      },
      {
        id: "assessment-g1000-ils",
        prompt: "Descreva a preparação e o monitoramento de uma aproximação ILS no simulador.",
        expectedKeywords: ["ILS", "localizer", "glide slope", "APR", "fonte", "mínimos"],
        weight: 12,
        concept: "Aproximação ILS",
        moduleId: "module-g1000-ils"
      },
      {
        id: "assessment-g1000-rnav",
        prompt: "Como carregar, ativar e monitorar uma aproximação RNAV sem perder consciência situacional?",
        expectedKeywords: ["RNAV", "GPS", "waypoint", "sequência", "mínimos", "missed"],
        weight: 12,
        concept: "Aproximação RNAV",
        moduleId: "module-g1000-rnav"
      },
      {
        id: "assessment-g1000-c408-operation",
        prompt: "Como integrar C408, peso, combustível, checklist educacional, Garmin e decisão de arremeter em um voo guiado?",
        expectedKeywords: ["C408", "peso", "combustível", "checklist", "Garmin", "arremetida"],
        weight: 14,
        concept: "Integração operacional no simulador",
        moduleId: "module-g1000-treinamento-c408"
      },
      {
        id: "assessment-g1000-troubleshooting",
        prompt: "O piloto automático não capturou a aproximação. Como você diagnostica o problema sem abandonar a pilotagem?",
        expectedKeywords: ["FMA", "fonte", "APR", "curso", "frequência", "estabilidade"],
        weight: 12,
        concept: "Troubleshooting",
        moduleId: "module-g1000-treinamento-c408"
      },
      {
        id: "assessment-g1000-integrated-debrief",
        prompt: "Monte um debriefing de voo integrado: o que revisar em pilotagem, navegação, Garmin, C408 e tomada de decisão?",
        expectedKeywords: ["debriefing", "estabilidade", "fonte", "FMA", "combustível", "decisão"],
        weight: 12,
        concept: "Debriefing integrado",
        moduleId: "module-g1000-treinamento-c408"
      }
    ],
    questionCount: 8,
    passingScore: 70,
    criteria: "Aprovação com 70% ou mais, demonstrando integração entre pilotagem básica, VFR, IFR, C408, Garmin G1000 NXi, automação, aproximações, troubleshooting, arremetida e debriefing no simulador.",
    allowRetake: true,
    shuffleQuestions: true,
    timeLimitMinutes: 45,
    publicationState: "published",
    technicalMetadata: exerciseTechnicalMetadata
  }
];

function spec(
  order: number,
  moduleId: string,
  title: string,
  slug: string,
  duration: string,
  concepts: string[],
  objective: string,
  introduction: string,
  explanation: string,
  example: string,
  mistake: string,
  simulator: string,
  exercise: string,
  expected: string,
  conclusion: string,
  next: string
): LessonSpec {
  return { order, moduleId, title, slug, duration, concepts, objective, introduction, explanation, example, mistake, simulator, exercise, expected, conclusion, next };
}

function createLessonDocument(item: LessonSpec): LessonDocument {
  const lesson = enrichLessonSpec(item);
  const lessonId = `lesson-${lesson.slug}`;

  return {
    id: lessonId,
    moduleId: lesson.moduleId,
    title: lesson.title,
    slug: lesson.slug,
    summary: lesson.objective,
    introduction: lesson.introduction,
    didacticExplanation: lesson.explanation,
    example: lesson.example,
    commonMistake: lesson.mistake,
    simulatorApplication: lesson.simulator,
    exercisePrompt: lesson.exercise,
    expectedAnswer: lesson.expected,
    conclusion: lesson.conclusion,
    nextLessonConnection: lesson.next,
    content: [
      { id: `content-${lesson.slug}-intro`, type: "paragraph", text: lesson.introduction },
      { id: `content-${lesson.slug}-explanation`, type: "paragraph", text: lesson.explanation },
      { id: `content-${lesson.slug}-callout`, type: "callout", text: lesson.example },
      { id: `content-${lesson.slug}-simulator`, type: "simulatorApplication", text: lesson.simulator },
      { id: `content-${lesson.slug}-summary`, type: "summary", text: lesson.conclusion },
      {
        id: `content-${lesson.slug}-sources`,
        type: "technicalSource",
        text: "Base de estudo: ICAO Annex 2, DECEA ICA 100-12, AISWEB, FAA Instrument Flying Handbook, FAA Instrument Procedures Handbook, FAA Pilot's Handbook of Aeronautical Knowledge, FAA AIM, EASA Easy Access Rules for Air Operations, referências oficiais Garmin G1000 NXi, materiais públicos da Textron Aviation sobre o SkyCourier e documentação/notas do Microsoft Flight Simulator. Conteúdo adaptado para prática didática no Microsoft Flight Simulator; regras locais, valores, funções específicas do aviônico e procedimentos operacionais devem ser verificados na documentação oficial aplicável."
      }
    ],
    order: lesson.order,
    estimatedDuration: lesson.duration,
    objective: lesson.objective,
    keyConcepts: lesson.concepts,
    exerciseId: `exercise-${lesson.slug}-multiple-choice`,
    exerciseIds: [`exercise-${lesson.slug}-multiple-choice`, `exercise-${lesson.slug}-true-false`, `exercise-${lesson.slug}-open-answer`],
    status: "not_started",
    actions: { canComplete: true, canContinue: true, canGoBack: lesson.order > 1 },
    publicationState: "published",
    technicalMetadata: lessonTechnicalMetadata
  };
}

function enrichLessonSpec(item: LessonSpec): LessonSpec {
  const enhancement = fundamentalsLessonEnhancements[item.slug];

  if (!enhancement) {
    return item;
  }

  return {
    ...item,
    ...enhancement,
    concepts: Array.from(new Set([...(item.concepts ?? []), ...(enhancement.concepts ?? [])]))
  };
}
