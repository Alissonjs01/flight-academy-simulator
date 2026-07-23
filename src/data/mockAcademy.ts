import {
  BookOpen,
  BookMarked,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Plane,
  RadioTower,
  Route,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  TrendingUp
} from "lucide-react";
import type { Aircraft, Avionic, Category, Checklist, Course, RouteItem, TrainingMission } from "@/types/academy";

export const navigationItems: RouteItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Cursos", href: "/cursos", icon: BookOpen },
  { label: "Aeronaves", href: "/aeronaves", icon: Plane },
  { label: "Aviônicos", href: "/avionicos", icon: Gauge },
  { label: "Checklists", href: "/checklists", icon: ListChecks },
  { label: "Treinamentos", href: "/treinamentos", icon: Target },
  { label: "Progresso", href: "/progresso", icon: TrendingUp },
  { label: "Revisão", href: "/revisao", icon: BookMarked },
  { label: "Admin", href: "/admin", icon: SlidersHorizontal },
  { label: "Configurações", href: "/configuracoes", icon: Settings }
];

export const categories: Category[] = [
  { slug: "fundamentos", title: "Fundamentos da Pilotagem", description: "Atitude, potência, comandos, trim e consciência situacional." },
  { slug: "navegacao", title: "Navegação", description: "Rotas, cartas, waypoints, VOR, GPS e planejamento." },
  { slug: "meteorologia", title: "Meteorologia", description: "Leitura de METAR, TAF, vento, nuvens e tomada de decisão." },
  { slug: "comunicacoes", title: "Comunicações", description: "Fraseologia, fonia operacional e coordenação em voo." },
  { slug: "ifr", title: "IFR", description: "Procedimentos por instrumentos, aproximações e regras de voo." },
  { slug: "planejamento", title: "Planejamento de voo", description: "Combustível, alternados, peso, balanceamento e performance." },
  { slug: "emergencias", title: "Emergências", description: "Pane, arremetida, perda, fogo, aproximação estabilizada." },
  { slug: "avionicos", title: "Aviônicos", description: "Garmin G1000 NXi e fluxo de uso no cockpit." },
  { slug: "aeronaves", title: "Aeronaves", description: "Perfis, velocidades, limitações e técnicas por modelo." },
  { slug: "checklists", title: "Checklists", description: "Rotinas por fase de voo e padrões de cabine." },
  { slug: "treinamentos", title: "Treinamentos práticos", description: "Missões guiadas para praticar dentro do simulador." }
];

export const courses: Course[] = [
  {
    slug: "fundamentos-da-pilotagem",
    title: "Fundamentos da Pilotagem",
    subtitle: "Base técnica para voar com precisão antes de avançar para aviônicos, navegação e IFR.",
    category: "Fundamentos da Pilotagem",
    level: "Inicial",
    progress: 42,
    duration: "6h 20min",
    currentLessonSlug: "atitude-potencia-trim",
    modules: [
      {
        slug: "primeiros-controles",
        title: "Primeiros controles",
        progress: 70,
        lessons: [
          {
            slug: "orientacao-no-simulador",
            title: "Orientação no simulador",
            duration: "18 min",
            status: "concluida",
            summary: "Configuração básica, visão de cabine e leitura dos instrumentos primários."
          },
          {
            slug: "atitude-potencia-trim",
            title: "Atitude, potência e compensador",
            duration: "24 min",
            status: "atual",
            summary: "Controle fino da aeronave em subida, cruzeiro e descida."
          }
        ]
      },
      {
        slug: "circuito-de-trafego",
        title: "Circuito de tráfego",
        progress: 20,
        lessons: [
          {
            slug: "perna-do-vento-base-final",
            title: "Perna do vento, base e final",
            duration: "31 min",
            status: "disponivel",
            summary: "Sequência visual para manter padrão, velocidade e separação."
          },
          {
            slug: "aproximacao-estabilizada",
            title: "Aproximação estabilizada",
            duration: "28 min",
            status: "bloqueada",
            summary: "Critérios para decidir continuar, corrigir ou arremeter."
          }
        ]
      },
      {
        slug: "proxima-trilha",
        title: "Preparação para Garmin e navegação",
        progress: 0,
        lessons: [
          {
            slug: "introducao-ao-g1000-nxi",
            title: "Introdução ao Garmin G1000 NXi",
            duration: "35 min",
            status: "bloqueada",
            summary: "PFD, MFD, flight plan, direct-to e consciência lateral."
          }
        ]
      }
    ]
  },
  {
    slug: "garmin-g1000-nxi",
    title: "Garmin G1000 NXi",
    subtitle: "Fluxo de cockpit moderno para navegação, monitoramento e preparação IFR.",
    category: "Aviônicos",
    level: "Intermediário",
    progress: 8,
    duration: "5h 10min",
    currentLessonSlug: "introducao-ao-g1000-nxi",
    modules: []
  },
  {
    slug: "navegacao-ifr",
    title: "Navegação e IFR",
    subtitle: "Do planejamento ao voo por instrumentos com procedimentos práticos.",
    category: "IFR",
    level: "Avançado",
    progress: 0,
    duration: "8h 45min",
    currentLessonSlug: "cartas-e-procedimentos",
    modules: []
  }
];

export const aircraft: Aircraft[] = [
  {
    slug: "cessna-408-skycourier",
    name: "Cessna 408 SkyCourier",
    role: "Bimotor utilitário",
    focus: "Procedimentos, gerenciamento de energia e operação multimotor em simulador.",
    status: "Aeronave principal de estudo"
  }
];

export const avionics: Avionic[] = [
  {
    slug: "garmin-g1000-nxi",
    name: "Garmin G1000 NXi",
    platform: "Glass cockpit",
    focus: "PFD, MFD, flight plan, procedimentos IFR e monitoramento de voo.",
    status: "Trilha em preparação"
  }
];

export const checklists: Checklist[] = [
  {
    slug: "skycourier-pre-voo",
    title: "Pré-voo e partida",
    aircraft: "Cessna 408 SkyCourier",
    phase: "Solo",
    items: ["Energia elétrica configurada", "Combustível verificado", "Aviônicos inicializados", "Briefing de partida concluído"]
  },
  {
    slug: "skycourier-aproximacao",
    title: "Aproximação estabilizada",
    aircraft: "Cessna 408 SkyCourier",
    phase: "Aproximação",
    items: ["Altímetro ajustado", "Velocidade alvo confirmada", "Configuração de flap definida", "Arremetida revisada"]
  }
];

export const trainingMissions: TrainingMission[] = [
  {
    slug: "padrao-de-trafego-visual",
    title: "Padrão de tráfego visual",
    aircraft: "Cessna 408 SkyCourier",
    category: "Fundamentos da Pilotagem",
    duration: "35 min",
    status: "Disponível"
  },
  {
    slug: "uso-basico-do-direct-to",
    title: "Uso básico do Direct-To",
    aircraft: "Cessna 408 SkyCourier",
    category: "Aviônicos",
    duration: "25 min",
    status: "Em breve"
  }
];

export const dashboardSnapshot = {
  studentName: "Aluno",
  currentCourse: courses[0],
  currentLesson: courses[0].modules[0].lessons[1],
  aircraft: aircraft[0],
  estimatedStudyTime: "45 min hoje",
  studySequence: ["Revisar atitude e potência", "Praticar trim em cruzeiro", "Registrar conclusão da aula", "Abrir módulo de circuito"],
  systemStatus: [
    { label: "Aulas concluídas", value: "3" },
    { label: "Módulos ativos", value: "2" },
    { label: "Exercícios pendentes", value: "1" },
    { label: "Próxima avaliação", value: "IFR" }
  ],
  quickFocus: [
    { label: "Fonia", icon: RadioTower },
    { label: "Emergências", icon: ShieldCheck },
    { label: "Rotas", icon: Route }
  ]
};
