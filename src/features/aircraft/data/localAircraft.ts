import type {
  AircraftAvionicDocument,
  AircraftChecklistDocument,
  AircraftCourseRelationDocument,
  AircraftDocument,
  AircraftLimitationDocument,
  AircraftMediaReference,
  AircraftPerformanceDocument,
  AircraftProcedureDocument,
  AircraftSystemDocument,
  AircraftTrainingDocument
} from "@/features/aircraft/types";
import { c408ChecklistIds } from "@/features/checklists/data/localChecklists";
import { provisionalTechnicalMetadata, simulatorAdaptationMetadata, trainingExerciseMetadata } from "@/features/technical/defaults";

const createdAt = "2026-07-23T00:00:00.000Z";
const updatedAt = "2026-07-23T00:00:00.000Z";
const provisional = "Dados provisórios. Verificar manuais, documentação do fabricante e configuração exata do simulador antes de usar como referência.";
const safetyNote =
  "Procedimentos reais devem ser sempre verificados nos manuais adequados, documentos oficiais, checklists da aeronave e orientação de instrutores certificados. Esta plataforma é apenas para estudo em simulador.";
const c408TechnicalMetadata = provisionalTechnicalMetadata({
  sourceType: "manufacturer_documentation",
  sourceTitle: "Textron Aviation Cessna SkyCourier specifications; Textron Aviation media releases; Pratt & Whitney Canada PT6A-65SC; McCauley C779 SkyCourier propeller; Microsoft Flight Simulator Marketplace/update notes",
  sourceOrganization: "Textron Aviation; Pratt & Whitney Canada; McCauley Propeller Systems; Microsoft Flight Simulator",
  sourceUrl: "https://cessna.txtav.com/en/turboprop/skycourier-passenger",
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  aircraftVariant: "SkyCourier Passenger e Freighter, conforme especificação indicada no campo",
  simulatorAircraftVariant: "Cessna 408 SkyCourier",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorDeveloper: "Microsoft / Carenado",
  addonVersion: "Versão do add-on não registrada no projeto local",
  contentClassification: "educational_explanation",
  verificationStatus: "pending_verification",
  simulatorAdaptationNotes: "Conteúdo técnico-didático para estudo no simulador. Especificações públicas foram separadas de procedimentos operacionais, que continuam dependentes de AFM/POH/checklists oficiais.",
  knownSimulatorDifferences: "Modelo Microsoft/Carenado no MSFS 2024; C408 também aparece como item Microsoft/Carenado no Marketplace para MSFS 2020. Patch notes oficiais citam correções em de-ice, checklists e tooltips; fórum oficial relata limitações de sistemas, peso/carga e comportamento de partida."
});
const c408SimulatorAdaptationMetadata = simulatorAdaptationMetadata({
  sourceType: "simulator_developer_documentation",
  sourceTitle: "Microsoft Flight Simulator Cessna 408 SkyCourier update notes and Marketplace references; Textron public specifications for real-world context",
  sourceOrganization: "Microsoft Flight Simulator; Textron Aviation",
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  aircraftVariant: "SkyCourier, variante simulada não documentada no repositório local",
  simulatorAircraftVariant: "Cessna 408 SkyCourier",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorDeveloper: "Microsoft / Carenado",
  addonVersion: "Versão do add-on não registrada no projeto local",
  knownSimulatorDifferences: "Patch notes oficiais e relatos do fórum indicam que alguns sistemas, checklists, carga útil, de-ice e partida podem divergir da aeronave real ou depender da versão instalada."
});
const c408TrainingMetadata = trainingExerciseMetadata({
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  simulatorAircraftVariant: "Cessna 408 SkyCourier",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorAdaptationNotes: "Treinamento didático para simulador; não representa procedimento aeronáutico oficial."
});

function mainImage(aircraftId: string, slug: string, alt: string, url?: string, caption = "Imagem validada ainda não vinculada. Esta etapa preserva o estudo textual sem usar mídia sem licença."): AircraftMediaReference {
  return {
    id: `media-${slug}-main`,
    aircraftId,
    kind: "main",
    alt,
    storagePath: `aircraft/${slug}/main.jpg`,
    url,
    caption,
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
    category: "Bimotor turboélice utilitário",
    engineType: "Pratt & Whitney Canada PT6A-65SC turbopropulsor",
    numberOfEngines: 2,
    cruiseSpeed: "210 KTAS máximo publicado pela Cessna/Textron; trate como referência de fabricante, não como promessa para todo peso, clima, altitude ou configuração.",
    range: "920 NM na versão passageiros e 940 NM na versão cargueira, conforme fichas públicas Textron; alcance real depende de carga, combustível, vento, altitude e reserva.",
    serviceCeiling: "25.000 ft de altitude máxima operacional publicada pela Cessna/Textron.",
    capacity: "Versão passageiros: até 19 ocupantes e 5.000 lb de payload máximo publicado. Versão cargueira: 2 ocupantes e até 6.000 lb de carga/payload publicado.",
    description:
      "O Cessna 408 SkyCourier é um bimotor turboélice utilitário de asa alta, trem fixo e grande cabine, desenvolvido pela Textron Aviation para transporte regional de carga, passageiros e missões especiais. A aeronave real existe nas configurações cargueira, passageiros e combi, com motores PT6A-65SC, hélices McCauley C779 de quatro pás, aviônicos Garmin G1000 NXi e foco em alta utilização, carregamento rápido e operação regional. Na plataforma, o C408 é a única aeronave visível ao aluno e serve como referência prática para estudar preparação, cockpit, taxi, decolagem, subida, cruzeiro, descida, aproximação, pouso, arremetida e limitações do simulador. O modelo local identificado é Microsoft/Carenado no Microsoft Flight Simulator; a variante exata, versão do add-on e profundidade de sistemas não estão registradas no repositório e devem ser confirmadas no simulador instalado.",
    mainImage: mainImage(
      "aircraft-cessna-408-skycourier",
      "cessna-408-skycourier",
      "Cessna 408 SkyCourier em pátio com montanhas ao fundo",
      "/images/aircraft/c408/overview.png",
      "Imagem ilustrativa fornecida para a plataforma."
    ),
    gallery: [],
    studyStatus: "current",
    progressPercent: 28,
    systemIds: [
      "system-c408-overview-structure",
      "system-c408-cockpit-layout",
      "system-c408-flight-controls",
      "system-c408-powerplant",
      "system-c408-propellers",
      "system-c408-fuel",
      "system-c408-electrical",
      "system-c408-landing-gear-brakes",
      "system-c408-ice-protection",
      "system-c408-lighting-cabin",
      "system-c408-avionics",
      "system-c408-alerts"
    ],
    limitationIds: [
      "limitation-c408-variant-source",
      "limitation-c408-speeds",
      "limitation-c408-weight",
      "limitation-c408-fuel",
      "limitation-c408-weather",
      "limitation-c408-simulator-fidelity"
    ],
    procedureIds: [
      "procedure-c408-preflight",
      "procedure-c408-cockpit-power",
      "procedure-c408-engine-start",
      "procedure-c408-after-start-taxi",
      "procedure-c408-before-takeoff",
      "procedure-c408-takeoff",
      "procedure-c408-climb-cruise",
      "procedure-c408-descent-approach",
      "procedure-c408-landing-rollout",
      "procedure-c408-go-around",
      "procedure-c408-shutdown",
      "procedure-c408-abnormal-intro"
    ],
    performanceIds: [
      "performance-c408-passenger-specs",
      "performance-c408-freighter-specs",
      "performance-c408-dimensions",
      "performance-c408-powerplant",
      "performance-c408-weight-balance-study",
      "performance-c408-runway-planning"
    ],
    checklistIds: c408ChecklistIds,
    trainingIds: [
      "training-c408-exterior-cockpit-recognition",
      "training-c408-power-start",
      "training-c408-taxi-braking",
      "training-c408-takeoff-climb",
      "training-c408-traffic-pattern",
      "training-c408-energy-management",
      "training-c408-approach-landing",
      "training-c408-go-around",
      "training-c408-weight-fuel",
      "training-c408-complete-flight"
    ],
    relatedCourseIds: ["course-fundamentos-pilotagem", "course-navegacao-ifr", "course-navegacao-ifr-instrumentos", "course-garmin-g1000-nxi"],
    installedAvionicIds: ["avionic-garmin-g1000-nxi"],
    publicationState: "published",
    createdAt,
    updatedAt,
    technicalMetadata: c408TechnicalMetadata
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
    id: "system-c408-overview-structure",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Estrutura, missão e configuração",
    slug: "estrutura-missao-configuracao",
    category: "other",
    summary: "Bimotor turboélice utilitário de asa alta, trem fixo e cabine ampla, projetado para carga, passageiros e missões regionais.",
    details:
      "O SkyCourier é um projeto clean-sheet da Textron Aviation para operadores que precisam transportar carga ou passageiros em rotas regionais com alta utilização. A asa alta facilita margem de hélice em solo, acesso à cabine e operação utilitária; o trem de pouso fixo reduz complexidade operacional; a configuração bimotora oferece redundância, mas exige estudo de assimetria de potência. A versão cargueira real aceita até três contêineres LD3 e tem porta de carga ampla; a versão passageiros leva até 19 ocupantes. A plataforma usa o C408 como aeronave principal de estudo, mas não presume que a variante do simulador tenha todos os sistemas, cargas visuais ou lógica operacional da aeronave real.",
    components: ["Asa alta", "Fuselagem utilitária", "Trem de pouso fixo", "Cabine de carga ou passageiros", "Dois motores de asa"],
    controls: ["Portas e acessos conforme variante simulada", "Configuração de peso/carga pelo menu do MSFS", "Controles de voo convencionais"],
    indications: ["Peso e combustível no menu do simulador", "Mensagens de cockpit conforme implementação", "Configuração visual dependente da variante instalada"],
    normalOperation:
      "Use esta seção para entender a lógica da aeronave antes dos checklists: grande inércia, alto arrasto relativo em configurações utilitárias, necessidade de planejamento de energia e atenção ao taxi.",
    notes: ["A variante exata do add-on não está registrada no projeto; confirme no hangar do simulador."],
    order: 1,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "system-c408-cockpit-layout",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Organização do cockpit",
    slug: "organizacao-do-cockpit",
    category: "other",
    summary: "Mapa mental do cockpit: painel principal, displays, pedestal, controles de potência, combustível, iluminação e áreas de atenção.",
    details:
      "O estudo do cockpit deve começar por regiões. No painel principal ficam as referências de voo, aviônicos, alertas e indicações principais. No pedestal ou console central ficam comandos de potência e hélice/condição conforme a representação do modelo, além de trim, flaps e outros controles operacionais. Áreas de iluminação, elétricas e combustível devem ser aprendidas pela função, não pela decoração visual. No simulador, alguns interruptores podem ser funcionais, parcialmente funcionais ou apenas visuais; por isso, cada sessão deve começar com reconhecimento: localizar, acionar com cautela, observar resposta e registrar diferenças.",
    components: ["Painel principal", "PFD/MFD", "Pedestal", "Controles de motores", "Trim", "Flaps", "Luzes", "Alertas"],
    controls: ["Master/bateria", "Aviônicos", "Power levers", "Propeller/condition quando representado", "Flaps", "Trim", "Parking brake"],
    indications: ["Flight Mode Annunciator", "CAS/alertas quando implementados", "Torque/ITT/NG ou indicações equivalentes", "Combustível", "Pressão/altitude"],
    normalOperation:
      "Treine localização antes de executar: aponte para cada controle, diga o que ele faz, quando é usado e qual indicação confirma resposta.",
    abnormalConsiderations:
      "Se um controle visual não produzir efeito no simulador, trate como limitação do add-on e não como indicação de que o sistema real não exista.",
    order: 2,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "system-c408-flight-controls",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Comandos de voo",
    slug: "comandos-de-voo",
    category: "flightControls",
    summary: "Ailerons, profundor, leme, trim e flaps devem ser estudados como sistema de controle e gerenciamento de energia.",
    details:
      "O C408 usa a lógica clássica de comandos: ailerons controlam rolagem, profundor controla arfagem, leme controla guinada e coordenação, trim reduz esforço contínuo depois de estabilizar, e flaps alteram sustentação, arrasto e atitude de aproximação. Por ser bimotor turboélice, mudanças de potência podem alterar tendência direcional e energia de forma perceptível. A plataforma não registra dados de envelope de CG ou velocidades específicas por configuração; portanto, pratique com valores do simulador apenas como referência didática e valide números técnicos no manual aplicável.",
    components: ["Ailerons", "Profundor", "Leme", "Trim", "Flaps", "Pedais"],
    controls: ["Yoke/manche", "Pedais", "Trim", "Seletor de flaps", "Power levers"],
    indications: ["Atitude", "IAS", "VSI", "Altímetro", "Proa", "Posição de flaps"],
    normalOperation:
      "Use comandos pequenos, aguarde tendência e confirme nos instrumentos. Durante flare e aproximação, controle velocidade e trajetória com coordenação de potência, atitude, trim e configuração.",
    abnormalConsiderations:
      "Assimetria de potência cria tendência de guinada e exige controle direcional imediato. Esta seção é introdutória e não substitui procedimentos de falha de motor.",
    cautions: ["Não pratique falhas assimétricas perto do solo sem cenário controlado no simulador."],
    order: 3,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "system-c408-powerplant",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Grupo motopropulsor",
    slug: "grupo-motopropulsor",
    category: "propulsion",
    summary: "Dois Pratt & Whitney Canada PT6A-65SC, publicados pela Textron com 1.110 shp cada, movem hélices McCauley C779.",
    details:
      "O PT6A é uma família de motores turboélice de fluxo reverso consagrada. No C408, a fonte oficial Textron/Cessna publica o modelo PT6A-65SC com potência de 1.110 shp. Em termos didáticos, o motor transforma energia da turbina em potência no eixo para mover a hélice; o piloto monitora torque, temperatura, rotação e indicações associadas conforme o cockpit. A operação real depende de limites e procedimentos do AFM/POH, que não estão incorporados aqui. No simulador, observe se partida, resposta de potência, torque, temperatura e alertas têm profundidade suficiente para treino ou se são simplificados.",
    components: ["2 motores PT6A-65SC", "Sistema de indicação de motor", "Comandos de potência", "Integração com hélices"],
    controls: ["Power levers", "Comandos de condição/hélice conforme simulação", "Starter", "Ignition/start logic conforme modelo"],
    indications: ["Torque", "Temperatura", "NG/N1 conforme cockpit", "RPM de hélice", "Fluxo/combustível"],
    normalOperation:
      "Aplique potência de forma progressiva, observe simetria entre motores e confirme tendência de aceleração antes de tomar decisões de controle.",
    abnormalConsiderations:
      "Falha ou diferença significativa de potência reduz desempenho e cria guinada. Reconheça, mantenha controle e siga checklist aplicável; não use esta plataforma como memory item real.",
    warnings: ["Não foram cadastrados limites numéricos de motor porque AFM/POH aplicável não foi incorporado ao projeto."],
    order: 4,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "system-c408-propellers",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Hélices McCauley C779",
    slug: "helices-mccauley-c779",
    category: "propulsion",
    summary: "Hélices C779 de quatro pás, 110 polegadas, full-feathering e reversible pitch, conforme fonte McCauley/Textron.",
    details:
      "A hélice converte potência do eixo em tração. A C779 publicada para o SkyCourier é uma hélice de quatro pás de alumínio, 110 polegadas, com feathering e reverso. Feather alinha as pás para reduzir arrasto em situação específica; reverso muda o passo para ajudar desaceleração no solo; beta é uma faixa de passo baixo/controle de tração em solo e não deve ser confundida com reverso total. No simulador, comportamento de beta, reverso e taxi pode depender muito do modelo e dos controles configurados.",
    components: ["McCauley C779", "Quatro pás", "Feathering", "Reversible pitch", "Controle hidráulico de passo"],
    controls: ["Power levers", "Faixa beta/reverso quando implementada", "Controles de hélice/condição conforme cockpit"],
    indications: ["RPM", "Torque", "Resposta de aceleração/desaceleração", "Tendência direcional"],
    normalOperation:
      "No taxi, use potência mínima e freios com moderação. Em pouso, entenda que beta/reverso é ferramenta de desaceleração em solo, não solução para aproximação mal estabilizada.",
    cautions: ["Não confunda beta com reverso; não aplique reverso em voo no estudo didático."],
    order: 5,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "system-c408-fuel",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Combustível e carga útil",
    slug: "combustivel-carga-util",
    category: "fuel",
    summary: "A fonte Cessna publica 720 gal / 4.826 lb de combustível utilizável; carga e combustível competem dentro do peso máximo.",
    details:
      "A ficha Cessna/Textron publica combustível utilizável de 720 gal / 2.725 L, equivalente a 4.826 lb / 2.189 kg. Isso não significa que toda missão deve sair com tanque cheio. Em aeronaves utilitárias, combustível, passageiros, carga e bagagem competem dentro do peso máximo de decolagem. Consumo varia com potência, altitude, temperatura, peso, vento e fase do voo; por isso, esta plataforma não apresenta consumo fixo universal. No MSFS, a tela de peso e combustível deve ser usada como ferramenta de estudo para perceber como carga e combustível afetam desempenho.",
    components: ["Tanques de combustível", "Indicações de quantidade", "Alimentação aos motores", "Reabastecimento single-point na aeronave real"],
    controls: ["Configuração de combustível no MSFS", "Seletores/bombas conforme implementação", "Power levers influenciando fluxo"],
    indications: ["Quantidade", "Fluxo", "Peso total", "Autonomia estimada quando disponível"],
    normalOperation:
      "Planeje combustível com rota, alternado, reserva didática e margem. Depois compare consumo previsto e observado no simulador.",
    cautions: ["Não use consumo observado no simulador como dado oficial de despacho real."],
    order: 6,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "system-c408-electrical",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Sistema elétrico",
    slug: "sistema-eletrico",
    category: "electrical",
    summary: "Estudo em nível educacional de bateria, geradores, barramentos, aviônicos e consequências de falhas.",
    details:
      "A documentação pública consultada confirma a presença de integração elétrica/aviônica e recursos operacionais como ground service bus em material Textron, mas não fornece neste projeto uma arquitetura elétrica completa de AFM. Portanto, o conteúdo deve ficar em nível conceitual: bateria energiza sistemas essenciais em solo, geradores alimentam a aeronave após partida, barramentos distribuem energia e aviônicos dependem de alimentação estável. No simulador, verifique quais falhas elétricas e disjuntores são realmente modelados antes de criar cenários.",
    components: ["Bateria", "Geradores", "Barramentos", "Avionics bus", "Ground service bus na aeronave real"],
    controls: ["Battery/master", "Generator switches quando representados", "Avionics", "Luzes"],
    indications: ["Volts/amps quando disponíveis", "Alertas elétricos", "Inicialização dos displays"],
    normalOperation:
      "A lógica de energização é: alimentar o cockpit, confirmar alertas esperados, preparar partida, depois confirmar geração elétrica estável após os motores.",
    abnormalConsiderations:
      "Falha elétrica pode afetar aviônicos, iluminação, alertas e navegação. No simulador, a profundidade da falha pode ser parcial.",
    order: 7,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "system-c408-landing-gear-brakes",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Trem de pouso, direção e freios",
    slug: "trem-de-pouso-freios",
    category: "landingGear",
    summary: "Trem fixo, roda de nariz, freios diferenciais e controle de velocidade no solo são centrais no treinamento do C408.",
    details:
      "O trem fixo reduz etapas de configuração, mas não elimina disciplina de solo. No taxi, uma aeronave turboélice grande pode acelerar com facilidade se o aluno usa potência demais. Controle de velocidade combina potência mínima, direção suave, freio diferencial quando necessário e planejamento das curvas. Beta e reverso, quando implementados, ajudam em solo, mas abuso pode mascarar erro de planejamento ou configuração de controles.",
    components: ["Trem fixo", "Roda de nariz", "Freios principais", "Parking brake", "Pedais/direção"],
    controls: ["Pedais", "Freios", "Parking brake", "Power levers", "Beta/reverso quando disponível"],
    indications: ["Velocidade no solo", "Tendência de curva", "Aquecimento/uso de freios não necessariamente simulado"],
    normalOperation:
      "Taxi bem feito é lento e previsível. Faça teste suave de freios, evite potência contínua alta e antecipe curvas.",
    cautions: ["Relatos de comunidade citam sensibilidade/velocidade de taxi dependendo da versão e configuração."],
    order: 8,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "system-c408-ice-protection",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Proteção contra gelo",
    slug: "protecao-contra-gelo",
    category: "iceProtection",
    summary: "A proteção contra gelo deve ser tratada com cautela: a capacidade real depende de certificação/equipamento, e a simulação pode ser parcial.",
    details:
      "Esta etapa não incorpora manual operacional completo sobre gelo. O estudo deve separar três coisas: itens reais confirmados por documentação aplicável, interruptores ou indicações visíveis no simulador, e efeito realmente modelado. Patch notes oficiais do MSFS 2024 citaram correção de sistemas de de-ice do C408, indicando que a implementação pode depender da versão. Em treinamento, gelo deve ser tratado como ameaça: aumenta arrasto, degrada sustentação, afeta motores/hélices/sensores e pode exigir desvio ou saída da condição.",
    components: ["Pitot heat", "Proteção de hélice/superfícies conforme variante", "De-ice/anti-ice conforme simulação", "Alertas quando implementados"],
    controls: ["Interruptores de anti-ice/de-ice conforme cockpit", "Inertial separators quando representados", "Pitot heat"],
    indications: ["Alertas", "Mudança de desempenho", "Acúmulo visual quando simulado"],
    abnormalConsiderations:
      "Não considere a aeronave invulnerável ao gelo no simulador. Se gelo aparecer, reduza carga de trabalho, saia da condição e revise o voo.",
    warnings: ["Não há autorização operacional real de gelo registrada neste conteúdo."],
    order: 9,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "system-c408-lighting-cabin",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Iluminação, portas e cabine",
    slug: "iluminacao-portas-cabine",
    category: "lighting",
    summary: "Luzes externas/internas, portas e configuração de cabine devem ser estudadas por fase de voo e pela resposta no simulador.",
    details:
      "A operação didática de luzes segue função: beacon antes de partida/motores, navigation conforme operação, strobe em áreas de pista/voo quando apropriado, taxi para movimento no solo, landing para decolagem/pouso, painel/instrumentos conforme ambiente e luzes de cabine/carga conforme necessidade. A aeronave real tem portas de tripulação, passageiros e/ou carga conforme variante. No simulador, portas podem ser funcionais, parcialmente funcionais ou apenas visuais, e o carregamento visual de carga pode não refletir a carga real configurada.",
    components: ["Beacon", "Navigation lights", "Strobes", "Taxi/landing lights", "Panel lights", "Portas", "Cabine/carga"],
    controls: ["Switches de iluminação", "Controles de portas quando implementados", "Configuração de carga/passageiros no MSFS"],
    indications: ["Luzes visíveis", "Mensagens/alertas quando implementados", "Estado visual das portas"],
    normalOperation:
      "Associe cada luz à fase do voo e use o reconhecimento visual para confirmar no simulador, sem presumir que todos os avisos reais estejam modelados.",
    order: 10,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "system-c408-avionics",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Aviônicos e painel",
    slug: "avionicos-painel",
    category: "avionics",
    summary: "A aeronave real é publicada com Garmin G1000 NXi; nesta etapa o foco é visão geral e integração, não botões profundos.",
    details:
      "O Garmin G1000 NXi integra PFD, MFD, navegação, comunicação, plano de voo, alertas, mapa, motor e piloto automático conforme configuração da aeronave. Para o aluno do C408, a pergunta inicial é: onde está a informação primária de voo, qual fonte de navegação está ativa, quais modos estão armados/ativos e que alerta exige ação? O curso profundo do Garmin será tratado na etapa própria; aqui o objetivo é saber que o painel existe para confirmar o estado da aeronave, não para substituir pilotagem.",
    components: ["PFD", "MFD", "Garmin G1000 NXi", "Flight Mode Annunciator", "Piloto automático", "Rádios/navegação"],
    controls: ["CDI/source", "Flight plan", "HDG/NAV/APR/ALT/VS/FLC conforme implementação", "Rádios COM/NAV"],
    indications: ["Atitude", "IAS", "Altitude", "HSI/CDI", "Mapa", "CAS/alertas", "Modos ativos/armados"],
    normalOperation:
      "Leia primeiro instrumentos e modos; depois use mapa e plano. Antes de seguir automação, confirme fonte, perna ativa, altitude selecionada e modo vertical/lateral.",
    abnormalConsiderations:
      "Relatos de usuários citam indicações ou sistemas rasos em algumas versões; confirme sempre pelo comportamento observado no simulador.",
    order: 11,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "system-c408-alerts",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Alertas, CAS e anormalidades",
    slug: "alertas-cas-anormalidades",
    category: "warningSystems",
    summary: "Alertas devem ser lidos, compreendidos e relacionados ao sistema afetado; não apenas apagados.",
    details:
      "A aeronave real equipada com aviônicos modernos apresenta mensagens e alertas integrados ao cockpit, mas esta etapa não registra uma lista oficial completa de CAS. Para estudo, trate alertas por prioridade: controlar a aeronave, identificar sistema, verificar se é aviso, caution ou mensagem informativa conforme apresentação, executar checklist aplicável e decidir se continua, retorna ou alterna. No simulador, alguns alertas podem ser simplificados, duplicados ou ausentes conforme versão.",
    components: ["Mensagens no painel", "Alertas visuais", "Alertas sonoros quando implementados", "Indicações de sistema"],
    controls: ["Softkeys/acknowledge conforme aviônico", "Checklist do simulador", "Controles do sistema afetado"],
    indications: ["Cor/nível do alerta", "Mensagem textual", "Mudança de parâmetro", "Comportamento da aeronave"],
    abnormalConsiderations:
      "Não apague alerta sem entender causa provável. Em treinamento, pause, registre mensagem e compare com sistema, checklist e comportamento.",
    cautions: ["Não use esta lista como QRH; checklists anormais serão tratados em etapa própria se houver fonte suficiente."],
    order: 12,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  }
];

export const localAircraftLimitationDocuments: AircraftLimitationDocument[] = [
  {
    id: "limitation-c408-variant-source",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Variante e fonte aplicável",
    category: "operational",
    value: "Os dados públicos variam entre SkyCourier Passenger e SkyCourier Freighter; a variante exata do modelo instalado no MSFS não está registrada no projeto.",
    condition: "Aplicável a todo estudo técnico do C408",
    note: "Não misture peso, payload, alcance ou configuração entre variantes sem identificar a fonte. Use Passenger quando o cenário for passageiros e Freighter quando o cenário for carga.",
    caution: "O simulador pode representar uma variante visual/operacional diferente da ficha pública usada como referência.",
    applicability: "Cessna 408 SkyCourier Passenger/Freighter e Microsoft/Carenado C408",
    aircraftVariant: "Passenger e Freighter, conforme campo",
    simulatorAircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier, variante não confirmada no repositório",
    simulatorImplementation: "unknown",
    order: 1,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "limitation-c408-speeds",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Velocidades e envelopes",
    category: "airspeed",
    value: "Maximum Cruise Speed 210 KTAS; Maximum Limit Speed 210 KIAS; Stall Speed 74 KCAS, conforme fichas públicas Cessna/Textron.",
    condition: "Valores de ficha pública, não tabela operacional por peso/configuração.",
    note: "Use os números para reconhecer ordem de grandeza da aeronave. Velocidades de operação, aproximação, configuração, falha ou vento cruzado devem vir de AFM/POH/checklist aplicável.",
    caution: "Não use 210 KTAS como meta universal de cruzeiro nem 74 KCAS como velocidade operacional de aproximação.",
    applicability: "Passenger e Freighter, conforme fichas públicas consultadas",
    aircraftVariant: "SkyCourier Passenger/Freighter",
    simulatorAircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    simulatorImplementation: "partial",
    order: 2,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "limitation-c408-weight",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Peso e balanceamento",
    category: "weight",
    value: "Maximum Ramp Weight 19.070 lb; Maximum Takeoff Weight 19.000 lb; Maximum Landing Weight 18.600 lb. Useful Load: 6.345 lb Passenger / 7.870 lb Freighter.",
    condition: "Fichas públicas Cessna/Textron; CG/envelope não incorporado.",
    note: "Não basta preencher passageiros, carga e combustível ao máximo. Combustível utilizável publicado é 4.826 lb; payload com tanque cheio muda por variante. Centro de gravidade e envelope exigem documentação operacional.",
    warning: "Envelope de CG, pesos por estação e limites detalhados não foram cadastrados.",
    applicability: "Passenger/Freighter, com valores separados por variante quando indicado",
    aircraftVariant: "SkyCourier Passenger/Freighter",
    simulatorAircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    simulatorImplementation: "partial",
    order: 3,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "limitation-c408-fuel",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Combustível utilizável",
    category: "fuel",
    value: "720 gal / 2.725 L / 4.826 lb / 2.189 kg de combustível utilizável publicado pela Cessna/Textron.",
    condition: "Valor de ficha pública. Consumo e autonomia dependem de potência, altitude, temperatura, peso, vento, fase de voo e reserva.",
    note: "Use a tela de peso e combustível do MSFS para estudar troca entre carga e combustível, mas não trate consumo observado como dado oficial.",
    applicability: "SkyCourier Passenger/Freighter",
    aircraftVariant: "Passenger/Freighter",
    simulatorAircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    simulatorImplementation: "partial",
    order: 4,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "limitation-c408-weather",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Condições meteorológicas",
    category: "weather",
    value: "Capacidades meteorológicas e gelo não devem ser presumidas a partir de interruptores visíveis no simulador.",
    condition: "Sem AFM/POH incorporado para autorização operacional detalhada.",
    note: "O curso pode usar IMC, chuva, vento, turbulência e gelo como cenários didáticos no MSFS, mas operação real exige certificação, equipamento, treinamento e documentação aplicável.",
    warning: "Não considerar proteção contra gelo como autorização irrestrita.",
    simulatorImplementation: "partial",
    order: 5,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "limitation-c408-simulator-fidelity",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Fidelidade do modelo Microsoft/Carenado",
    category: "operational",
    value: "Modelo de simulador identificado como Microsoft/Carenado; sistemas e comportamento podem ser simplificados.",
    condition: "Baseado em referências oficiais do Marketplace/update notes e relatos do fórum oficial.",
    note: "Patch notes oficiais mencionam correções em de-ice, checklists, tooltips e sons de cockpit. Relatos de comunidade citam limitações de sistemas, carga/career, partida, indicações e comportamento de taxi. Trate relatos como complementares, não oficiais.",
    caution: "Não deduzir funcionamento real a partir de bug ou simplificação do simulador.",
    simulatorImplementation: "partial",
    order: 6,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  }
];

export const localAircraftPerformanceDocuments: AircraftPerformanceDocument[] = [
  {
    id: "performance-c408-passenger-specs",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Ficha pública - versão passageiros",
    type: "other",
    aircraftVariant: "SkyCourier Passenger",
    engine: "2 x Pratt & Whitney Canada PT6A-65SC",
    configuration: "19 ocupantes / operação de passageiros",
    weightOrMass: "MTOW 19.000 lb; MLW 18.600 lb; Useful Load 6.345 lb; Maximum Payload 5.000 lb",
    altitude: "Maximum Operating Altitude 25.000 ft",
    speed: "Maximum Cruise Speed 210 KTAS; Maximum Limit Speed 210 KIAS; Stall Speed 74 KCAS",
    fuel: "Usable Fuel 720 gal / 4.826 lb",
    distance: "Takeoff Field Length 3.580 ft; Landing Distance 2.540 ft",
    value: "Maximum Range 920 NM; Maximum Occupants 19",
    unit: "Imperial com equivalentes métricos na fonte",
    conditions: "Dados promocionais/técnicos públicos da Cessna/Textron; não substituem tabelas operacionais.",
    note: "Use como referência de ordem de grandeza. Para cálculo real, é necessário AFM/POH com peso, temperatura, pista, vento, obstáculos e configuração.",
    order: 1,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "performance-c408-freighter-specs",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Ficha pública - versão cargueira",
    type: "other",
    aircraftVariant: "SkyCourier Freighter",
    engine: "2 x Pratt & Whitney Canada PT6A-65SC",
    configuration: "2 ocupantes / cabine cargueira para até três LD3",
    weightOrMass: "MTOW 19.000 lb; MLW 18.600 lb; Useful Load 7.870 lb; Maximum Payload 6.000 lb",
    altitude: "Maximum Operating Altitude 25.000 ft",
    speed: "Maximum Cruise Speed 210 KTAS; Maximum Limit Speed 210 KIAS; Stall Speed 74 KCAS",
    fuel: "Usable Fuel 720 gal / 4.826 lb",
    distance: "Takeoff Distance 2.700 ft; Ground Roll 1.730 ft; Landing Distance 2.540 ft",
    value: "Maximum Range 940 NM; Cargo volume 884 cu ft",
    unit: "Imperial com equivalentes métricos na fonte",
    conditions: "Dados públicos Cessna/Textron; configuração cargueira real.",
    note: "Não misturar payload cargueiro com configuração de passageiros. O modelo MSFS pode não refletir visualmente ou funcionalmente toda lógica de carga.",
    order: 2,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "performance-c408-dimensions",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Dimensões principais",
    type: "other",
    aircraftVariant: "SkyCourier Passenger/Freighter",
    configuration: "Estrutura comum publicada",
    value: "Comprimento 55 ft 1 in / 16,8 m; altura 20 ft 8 in / 6,3 m; envergadura 72 ft 3 in / 22,02 m; área de asa 441 sq ft / 40,97 m².",
    unit: "ft/in, m, sq ft, m²",
    conditions: "Fichas públicas Cessna/Textron.",
    note: "Cabine passageiros publicada: altura 71 in / 1,80 m; largura 74 in / 1,88 m; comprimento 23 ft 4 in / 7,11 m. Door/cargo dimensions dependem da variante; usar fonte específica quando estudar carregamento.",
    order: 3,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "performance-c408-powerplant",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Motor e hélice",
    type: "other",
    aircraftVariant: "SkyCourier Passenger/Freighter",
    engine: "Pratt & Whitney Canada PT6A-65SC",
    powerSetting: "1.110 shp publicado pela Cessna/Textron e Pratt & Whitney Canada",
    value: "Hélice McCauley C779, quatro pás, 110 polegadas, feathering e reversing propeller.",
    unit: "shp, polegadas",
    conditions: "Dados de fabricante/fornecedor; não inclui limites operacionais detalhados.",
    note: "A resposta de potência no simulador deve ser observada por torque, RPM, tendência direcional e aceleração, mas limites reais dependem de manual aplicável.",
    order: 4,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  },
  {
    id: "performance-c408-weight-balance-study",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Estudo de peso e balanceamento no simulador",
    type: "weightAndBalance",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    configuration: "Menu de peso e combustível do MSFS",
    weightOrMass: "Não usar envelope real; use a tela do simulador para observar tendências.",
    fuel: "Combustível total reduz payload disponível dentro do peso máximo.",
    value: "Atividade educacional: compare aeronave leve, média e pesada e observe decolagem, subida, flare e frenagem.",
    conditions: "Simulador; sem envelope CG oficial incorporado.",
    note: "Não coloque todos os sliders no máximo. Estude como carga traseira/dianteira, combustível e peso total alteram controle e desempenho, mas não chame isso de cálculo real.",
    order: 5,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "performance-c408-runway-planning",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Planejamento prático de pista",
    type: "takeoffDistance",
    aircraftVariant: "SkyCourier Passenger/Freighter e simulação MSFS",
    configuration: "Decolagem e pouso em estudo",
    altitude: "Avaliar elevação e altitude densidade",
    temperature: "Temperatura alta degrada desempenho",
    wind: "Vento de proa ajuda; vento de cauda prejudica",
    runwayCondition: "Superfície, inclinação e contaminação exigem fonte operacional",
    distance: "Passenger takeoff field length 3.580 ft; Freighter takeoff distance 2.700 ft, conforme fichas públicas",
    value: "Use pista disponível com margem didática e não trate ficha pública como cálculo para qualquer condição.",
    conditions: "Dados de ficha pública; cálculo real requer tabelas oficiais.",
    note: "No MSFS, compare pista curta, peso alto, dia quente e vento de cauda. Debriefing: a aeronave acelerou, subiu e parou como esperado?",
    order: 6,
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
  }
];

export const localAircraftProcedureDocuments: AircraftProcedureDocument[] = [
  {
    id: "procedure-c408-preflight",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "preflight",
    title: "Preparação antes do voo",
    applicability: "Microsoft Flight Simulator; estudo normal do C408",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Antes de carregar o voo ou com aeronave fria e parada.",
    expectedResult: "Aluno entende missão, peso, combustível, rota, pista, meteorologia e limitações do cenário antes de energizar.",
    steps: [
      "Escolha aeroporto, pista e meteorologia compatíveis com seu nível de treino.",
      "Defina missão: local, navegação VFR, IFR curto, circuito, peso/carga ou treino de pouso.",
      "Revise peso, combustível, passageiros/carga e centro de gravidade no menu do MSFS, sem exceder limites publicados.",
      "Confira rota, alternado, altitude, pista disponível, vento e obstáculos em nível educacional.",
      "Faça reconhecimento externo: asa alta, motores, hélices, trem fixo, portas, luzes e superfícies de comando.",
      "Abra checklist aplicável do simulador ou da plataforma, lembrando que checklists oficiais serão tratados em etapa própria."
    ],
    simulatorAdaptation: "Usar a tela de peso e combustível do MSFS como ferramenta didática; não como cálculo operacional real.",
    safetyNote,
    order: 1,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-cockpit-power",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "cockpitPreparation",
    title: "Energização e organização do cockpit",
    applicability: "Estudo normal em simulador",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Aeronave parada, freio de estacionamento aplicado e área segura.",
    expectedResult: "Cockpit energizado, displays reconhecidos, alertas iniciais entendidos e partida preparada.",
    steps: [
      "Confirme freio de estacionamento, manetes em posição segura e controles físicos calibrados.",
      "Energize bateria/master conforme o modelo instalado e observe quais displays e alertas aparecem.",
      "Ligue aviônicos quando apropriado e aguarde inicialização de PFD/MFD.",
      "Ajuste iluminação de painel, conferindo se switches externos não criam conflito visual.",
      "Leia alertas iniciais: diferencie mensagens esperadas em solo de anormalidades.",
      "Configure altímetro, rádio/rota ou plano de voo apenas depois de estabilizar a leitura do painel."
    ],
    simulatorAdaptation: "Alguns alertas ou switches podem ser simplificados; registre controles visuais sem função quando identificados.",
    safetyNote,
    order: 2,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-engine-start",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "engineStart",
    title: "Partida dos motores - lógica de estudo",
    applicability: "Treino conceitual; não substitui checklist real",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Cockpit energizado, área livre e checklist do simulador disponível.",
    expectedResult: "Aluno entende sequência geral, parâmetros a observar e diferenças do simulador sem memorizar procedimento não verificado.",
    cautions: ["Não foram cadastrados limites de partida, ITT, NG ou tempo de starter."],
    steps: [
      "Confirme área livre, beacon/luzes adequadas e freios aplicados.",
      "Prepare combustível, condição, inertial separator/ignition e starter conforme checklist disponível no simulador.",
      "Inicie um motor e observe rotação, temperatura, pressão/indicações e estabilização.",
      "Não avance para o segundo motor enquanto o primeiro não estiver estável e sem alerta relevante.",
      "Repita para o segundo motor, comparando simetria entre os lados.",
      "Se a partida não ocorrer, interrompa a tentativa no simulador, estabilize a situação e revise configuração em vez de insistir."
    ],
    simulatorAdaptation:
      "Fórum oficial relata comportamento de partida e inertial separators variando por versão. Trate qualquer divergência como limitação do modelo e registre no debriefing.",
    safetyNote,
    order: 3,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-after-start-taxi",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "taxi",
    title: "Após partida e taxi",
    applicability: "Treino de solo no MSFS",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Motores estabilizados e rota de taxi planejada.",
    expectedResult: "Aeronave movimentada com baixa velocidade, controle direcional e freios preservados.",
    steps: [
      "Confirme geradores/energia, aviônicos, alertas, flaps, trim e instrumentos básicos.",
      "Libere freios com potência mínima e espere a aeronave começar a rolar antes de adicionar mais potência.",
      "Teste freios suavemente logo no início do taxi.",
      "Use pedais e freio diferencial com antecedência, evitando curvas bruscas.",
      "Controle velocidade; se acelerar demais, reduza potência antes de depender só dos freios.",
      "Use beta/reverso apenas se estiver implementado e apenas em solo, entendendo que beta não é reverso total."
    ],
    simulatorAdaptation: "Relatos de usuários citam taxi sensível em algumas versões. Ajuste curvas de eixo e use baixa potência.",
    safetyNote,
    order: 4,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-before-takeoff",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "beforeTakeoff",
    title: "Antes da decolagem",
    applicability: "Treino normal em simulador",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Ponto de espera, pista e vento definidos.",
    expectedResult: "Aluno entra na pista com briefing, configuração e decisão de rejeição claros.",
    steps: [
      "Revise pista, vento, comprimento disponível, obstáculos e ponto de rejeição didático.",
      "Configure flaps e trim conforme checklist do simulador/documentação aplicável; não invente posições.",
      "Confirme fontes de navegação, altímetro, transponder, luzes e alertas.",
      "Verifique que piloto automático está desligado; Flight Director pode ser usado apenas se você entender o modo.",
      "Faça briefing: o que espero ver na corrida, quando rejeito, qual atitude inicial e qual primeira navegação.",
      "Alinhe somente quando a cabine estiver organizada e a próxima ação já estiver clara."
    ],
    safetyNote,
    order: 5,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-takeoff",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "takeoff",
    title: "Treino de decolagem estabilizada",
    applicability: "Treino normal em simulador",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Aeronave alinhada, pista livre e briefing feito.",
    expectedResult: "Decolagem controlada, simétrica e com subida inicial estável.",
    steps: [
      "Alinhe com o eixo e pare a tendência lateral antes de aplicar potência.",
      "Aplique potência progressivamente, observando simetria entre motores, torque e aceleração.",
      "Mantenha eixo com pedais; não corrija tarde com comandos grandes.",
      "Monitore velocidade, atitude e pista restante; rejeite se algo essencial ficar incoerente.",
      "Rotacione suavemente conforme comportamento seguro/documentação aplicável, sem usar número inventado.",
      "Estabeleça atitude de subida inicial, compense e confirme razão positiva antes de qualquer automação."
    ],
    simulatorAdaptation: "Se o modelo apresentar aceleração ou dinâmica excessivamente sensível, reduza agressividade de comandos e pratique com peso moderado.",
    safetyNote,
    order: 6,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-climb-cruise",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "climb",
    title: "Subida, nivelamento e cruzeiro",
    applicability: "Treino normal em simulador",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Subida inicial estabilizada e rota definida.",
    expectedResult: "Aluno gerencia energia, potência, navegação e monitoramento sem perseguir o piloto automático.",
    steps: [
      "Após estabilizar subida, reduza carga de trabalho: atitude, potência, trim e navegação.",
      "Monitore torque, temperatura, RPM/indicações de hélice e combustível sem inventar limites.",
      "Recolha/configure flaps conforme checklist aplicável e confirme aceleração.",
      "No nivelamento, reduza razão vertical antes da altitude alvo e ajuste potência para cruzeiro didático.",
      "Use piloto automático somente depois de confirmar modo lateral, modo vertical e altitude selecionada.",
      "Prepare descida com antecedência: distância, vento, terreno, carta, pista e energia."
    ],
    safetyNote,
    order: 7,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-descent-approach",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "approach",
    title: "Descida e aproximação",
    applicability: "Treino normal em simulador",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Cruzeiro concluído e chegada planejada.",
    expectedResult: "Aeronave chega à final configurada, alinhada e com energia controlada.",
    steps: [
      "Calcule descida de forma didática: altitude a perder, distância disponível e razão vertical razoável.",
      "Reduza potência com antecedência para não chegar alto e rápido.",
      "Faça briefing de pista, vento, aproximação, configuração, arremetida e ameaça principal.",
      "Configure flaps e trim progressivamente, confirmando velocidade, razão de descida e alinhamento.",
      "Em aproximação por instrumentos, confirme fonte, modo, mínimos e missed antes do FAF/final.",
      "Se ficar alto, rápido, desalinhado ou confuso, estabilize ou arremeta."
    ],
    safetyNote,
    order: 8,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-approach",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "landing",
    title: "Aproximação estabilizada",
    applicability: "Treino normal em simulador",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Aeronave em aproximação final ou base-final.",
    expectedResult: "Aluno identifica estabilidade e decide pousar ou arremeter sem forçar a conclusão.",
    steps: [
      "Defina critérios antes da final: alinhamento, trajetória, velocidade, razão de descida, configuração e potência.",
      "Monitore se correções ficam pequenas e previsíveis.",
      "Corrija causas: excesso de energia, baixa potência, alinhamento ruim ou configuração atrasada.",
      "Prepare o flare com transição suave, sem puxar para salvar velocidade errada.",
      "Se qualquer critério essencial falhar, arremeta cedo."
    ],
    safetyNote,
    order: 9,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-landing-rollout",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "afterLanding",
    title: "Pouso, corrida e saída da pista",
    applicability: "Treino normal em simulador",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Aeronave cruzando a cabeceira em aproximação estabilizada.",
    expectedResult: "Toque controlado, manutenção de eixo, desaceleração segura e saída organizada.",
    steps: [
      "Mantenha alinhamento com leme/pedais e controle de potência até o flare.",
      "Faça flare progressivo; evite cortar energia cedo demais se isso causar afundamento brusco.",
      "Após toque, mantenha eixo, abaixe nariz com controle e confirme aeronave no solo.",
      "Use freios, beta ou reverso conforme implementação e apenas depois de entender a resposta.",
      "Saia da pista em velocidade segura e somente então reorganize luzes, flaps, transponder e taxi."
    ],
    simulatorAdaptation: "Se reverso/beta ou freios parecerem exagerados, ajuste controles e pratique desaceleração em pista longa.",
    safetyNote,
    order: 10,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-go-around",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "goAround",
    title: "Arremetida",
    applicability: "Treino normal em simulador",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Aproximação instável, pista sem condição, instrução ATC ou decisão de treino.",
    expectedResult: "Aeronave volta a subir com controle direcional, energia e navegação organizada.",
    steps: [
      "Decida cedo e verbalize: arremetida.",
      "Aplique potência de forma coordenada e controle tendência de guinada.",
      "Selecione atitude de subida segura e confirme aceleração/razão positiva.",
      "Reconfigure flaps em etapas conforme checklist aplicável; não recolha tudo de uma vez sem entender energia.",
      "Siga navegação publicada ou circuito combinado no briefing.",
      "Depois de estabilizar, comunique/reorganize e decida nova aproximação, espera ou alternado."
    ],
    safetyNote,
    order: 11,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-shutdown",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "trainingOnly",
    phase: "shutdown",
    title: "Estacionamento e desligamento",
    applicability: "Treino normal em simulador",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Aeronave fora da pista e estacionada.",
    expectedResult: "Cockpit seguro, motores desligados e sessão encerrada com debriefing.",
    steps: [
      "Estacione em local seguro, aplique freio e reduza potência.",
      "Organize aviônicos e luzes sem apagar informações necessárias ao debriefing.",
      "Desligue motores conforme checklist do simulador/documentação aplicável.",
      "Desligue geradores, aviônicos, bateria/master e luzes na sequência adequada ao modelo.",
      "Abra portas/carga apenas se o simulador permitir e se fizer sentido para a missão.",
      "Faça debriefing: energia, taxi, decolagem, aproximação, pouso, alertas e diferenças do simulador."
    ],
    safetyNote,
    order: 12,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "procedure-c408-abnormal-intro",
    aircraftId: "aircraft-cessna-408-skycourier",
    type: "abnormal",
    phase: "emergency",
    title: "Introdução a anormalidades no simulador",
    applicability: "Treino introdutório, sem memory items",
    aircraftVariant: "Microsoft/Carenado Cessna 408 SkyCourier",
    entryConditions: "Somente em altitude segura ou cenário controlado.",
    expectedResult: "Aluno reconhece anormalidade, mantém controle e evita inventar procedimento.",
    warnings: ["Esta seção não ensina checklist anormal real."],
    cautions: ["Falha de motor em bimotor exige treinamento específico; aqui o foco é conceito e controle inicial."],
    steps: [
      "Mantenha controle: atitude, proa, velocidade e altitude segura.",
      "Identifique a indicação anormal: potência, elétrica, gelo, alerta, navegação ou piloto automático.",
      "Reduza carga de trabalho: desconecte automação se ela estiver piorando a situação.",
      "Compare motor esquerdo/direito quando houver assimetria e observe tendência de guinada.",
      "Use checklist aplicável do simulador ou documentação oficial; não invente memory item.",
      "Decida: continuar, retornar, alternar, arremeter ou encerrar o treino."
    ],
    simulatorAdaptation: "Falhas podem ser simplificadas ou ausentes no add-on. Use esta seção como disciplina de decisão, não como prova de sistema real.",
    safetyNote,
    order: 13,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  }
];

export const localAircraftChecklistDocuments: AircraftChecklistDocument[] = [
  {
    id: "checklist-c408-preflight",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Pré-voo e preparação de estudo",
    phase: "Solo",
    items: [
      "Objetivo da sessão definido: solo, decolagem, navegação, aproximação ou voo completo.",
      "Peso, combustível e carga revisados no MSFS sem exceder limites publicados.",
      "Meteorologia, pista, rota e alternado didático conferidos.",
      "Cockpit reconhecido por áreas: energia, motores, aviônicos, flaps, trim, luzes e freios.",
      "Checklist oficial ou checklist do simulador deve ser consultado antes de tratar a sequência como operacional."
    ],
    order: 1,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  },
  {
    id: "checklist-c408-approach",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Aproximação estabilizada",
    phase: "Aproximação",
    items: [
      "Briefing de pista, vento, aproximação, mínimos didáticos e arremetida concluído.",
      "Fonte de navegação, modo ativo/armado e altitude selecionada conferidos quando houver automação.",
      "Configuração, trim, potência e trajetória estabilizados antes da final curta.",
      "Velocidade e razão de descida monitoradas sem usar valores não verificados como oficiais.",
      "Critério de arremetida definido antes de tentar pousar."
    ],
    order: 2,
    publicationState: "published",
    technicalMetadata: c408SimulatorAdaptationMetadata
  }
];

export const localAircraftTrainingDocuments: AircraftTrainingDocument[] = [
  {
    id: "training-c408-exterior-cockpit-recognition",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Reconhecimento externo e cockpit",
    objective:
      "Objetivo: localizar asa alta, trem fixo, motores, hélices, portas, luzes, superfícies de comando, PFD/MFD, pedestal, flaps, trim, freios e controles de potência. Configuração inicial: aeronave fria e parada. Critério de sucesso: apontar cada área e explicar sua função antes de acionar.",
    duration: "30 min",
    status: "available",
    order: 1,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "training-c408-power-start",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Energização e partida didática",
    objective:
      "Objetivo: compreender a lógica de bateria, aviônicos, alertas iniciais, preparação para partida e estabilização de motores. Configuração inicial: solo, freio aplicado e clima calmo. Critério de sucesso: iniciar sem pressa, observar parâmetros e registrar diferenças do simulador.",
    duration: "35 min",
    status: "available",
    order: 2,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "training-c408-taxi-braking",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Taxi, direção e frenagem",
    objective:
      "Objetivo: treinar potência mínima, direção por pedais, freio diferencial, controle de velocidade, curvas e uso cauteloso de beta/reverso quando implementado. Critério de sucesso: manter taxi lento, previsível e sem depender de frenagem excessiva.",
    duration: "30 min",
    status: "available",
    order: 3,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "training-c408-takeoff-climb",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Decolagem e subida manual",
    objective:
      "Objetivo: alinhar, aplicar potência progressiva, manter eixo, observar simetria, rotacionar suavemente e estabilizar subida. Instrumentos a observar: IAS, atitude, proa, VSI, torque/temperatura e alertas. Debriefing: controle direcional, energia e antecipação.",
    duration: "40 min",
    status: "available",
    order: 4,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "training-c408-traffic-pattern",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Padrão de tráfego visual",
    objective:
      "Objetivo: voar circuito visual com uma aeronave maior e mais inercial que treinadores leves. Passos: decolar, subir, nivelar na perna do vento, configurar com antecedência, estabilizar final e arremeter se necessário. Critério de sucesso: manter planejamento de energia e não chegar atrasado à final.",
    duration: "35 min",
    status: "available",
    order: 5,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "training-c408-energy-management",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Gerenciamento de energia",
    objective:
      "Objetivo: comparar descida planejada, redução de potência, arrasto, flaps, trim, nivelamento e estabilização. Configuração inicial: 5 a 10 minutos de cruzeiro antes da descida. Critério de sucesso: chegar à aproximação sem excesso de altitude, velocidade ou carga de trabalho.",
    duration: "40 min",
    status: "available",
    order: 6,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "training-c408-approach-landing",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Aproximação, flare e pouso",
    objective:
      "Objetivo: estabilizar aproximação, manter alinhamento, controlar potência, transição para flare, toque, corrida e saída. Erros comuns: cortar potência cedo demais, puxar para salvar velocidade, frear tarde e usar reverso para compensar aproximação instável.",
    duration: "45 min",
    status: "available",
    order: 7,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "training-c408-go-around",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Arremetida no C408",
    objective:
      "Objetivo: decidir cedo, aplicar potência coordenada, controlar guinada, selecionar atitude de subida, reorganizar configuração e navegar para nova tentativa. Critério de sucesso: arremeter sem perda de controle direcional ou confusão de automação.",
    duration: "35 min",
    status: "available",
    order: 8,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "training-c408-weight-fuel",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Peso, combustível e desempenho observado",
    objective:
      "Objetivo: comparar C408 leve, médio e pesado no MSFS. Passos: alterar combustível/carga, repetir decolagem e aproximação em pista longa, anotar aceleração, subida, flare e frenagem. Critério de sucesso: explicar tendência sem chamar o resultado de tabela oficial.",
    duration: "40 min",
    status: "available",
    order: 9,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "training-c408-complete-flight",
    aircraftId: "aircraft-cessna-408-skycourier",
    title: "Voo curto completo",
    objective:
      "Objetivo: executar preparação, energização, partida, taxi, decolagem, subida, cruzeiro curto, descida, aproximação, pouso, taxi, estacionamento e desligamento. Debriefing: listar três acertos, três erros, diferenças do simulador e um item para revisar.",
    duration: "1h 15min",
    status: "available",
    order: 10,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
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
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "aircraft-course-c408-g1000",
    aircraftId: "aircraft-cessna-408-skycourier",
    courseId: "course-garmin-g1000-nxi",
    title: "Garmin G1000 NXi — Fundamentos",
    slug: "garmin-g1000-nxi",
    relation: "Aeronave de referência para estudo do painel e aviônicos.",
    order: 2,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "aircraft-course-c408-vfr",
    aircraftId: "aircraft-cessna-408-skycourier",
    courseId: "course-navegacao-ifr",
    title: "Navegação VFR",
    slug: "navegacao-ifr",
    relation: "Aeronave usada em exemplos práticos de rota visual, energia, referências e circuito sem inventar velocidades específicas.",
    order: 3,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
  },
  {
    id: "aircraft-course-c408-ifr",
    aircraftId: "aircraft-cessna-408-skycourier",
    courseId: "course-navegacao-ifr-instrumentos",
    title: "Navegação IFR",
    slug: "navegacao-ifr-instrumentos",
    relation: "Plataforma de estudo para entender automação, aproximações, energia e tomada de decisão IFR em simulador.",
    order: 4,
    publicationState: "published",
    technicalMetadata: c408TrainingMetadata
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
    publicationState: "published",
    technicalMetadata: c408TechnicalMetadata
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
    performanceIds: [],
    checklistIds: [],
    trainingIds: [],
    relatedCourseIds: [],
    installedAvionicIds: [],
    publicationState: "draft",
    createdAt,
    updatedAt,
    technicalMetadata: provisionalTechnicalMetadata({
      aircraftManufacturer: manufacturer,
      aircraftModel: model,
      simulatorPlatform: "Microsoft Flight Simulator",
      revisionNotes: "Cadastro reservado para futura pesquisa e validação técnica."
    })
  };
}
