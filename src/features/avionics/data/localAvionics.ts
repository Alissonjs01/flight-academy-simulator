import type {
  AvionicComponentDocument,
  AvionicCourseRelationDocument,
  AvionicDocument,
  AvionicMediaReference,
  AvionicProcedureDocument,
  AvionicSectionDocument,
  AvionicTrainingDocument
} from "@/features/avionics/types";
import { educationalExplanationMetadata, simulatorAdaptationMetadata, trainingExerciseMetadata } from "@/features/technical/defaults";

const createdAt = "2026-07-23T00:00:00.000Z";
const updatedAt = "2026-07-24T00:00:00.000Z";
const avionicId = "avionic-garmin-g1000-nxi";

const g1000TechnicalMetadata = educationalExplanationMetadata({
  sourceType: "avionics_manual",
  sourceTitle: "Garmin Support: G1000 NXi - Cessna 408 SkyCourier; Textron Aviation SkyCourier public materials; Microsoft Flight Simulator release notes",
  sourceOrganization: "Garmin; Textron Aviation; Microsoft Flight Simulator",
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  aircraftVariant: "SkyCourier, variant not fully registered in this project",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorDeveloper: "Microsoft / Carenado",
  simulatorAircraftVariant: "Cessna 408 SkyCourier, exact simulator package/version not registered",
  simulatorAdaptationNotes:
    "Conteúdo educacional para estudar a lógica do Garmin G1000 NXi no Cessna 408 SkyCourier do simulador. Funções específicas devem ser conferidas na versão instalada do Microsoft Flight Simulator antes de tratar como disponíveis.",
  knownSimulatorDifferences:
    "Notas oficiais do MSFS 2024 registraram correções no C408 envolvendo Working Title G1000 v2, sintonia de rádios, checklist, tooltips, áudio e sistemas de gelo. A versão exata presente no ambiente do aluno deve ser confirmada no simulador.",
  revisionNotes:
    "Etapa 5 de conteúdo. A identificação G1000 NXi é sustentada por Garmin e Textron; detalhes de software, opções e implementação simulada permanecem pendentes de validação na instalação local."
});

const g1000SimulatorAdaptationMetadata = simulatorAdaptationMetadata({
  sourceType: "simulator_developer_documentation",
  sourceTitle: "Microsoft Flight Simulator Cessna 408 SkyCourier release notes and Garmin G1000 NXi support references",
  sourceOrganization: "Microsoft Flight Simulator; Garmin",
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorDeveloper: "Microsoft / Carenado",
  simulatorAircraftVariant: "Cessna 408 SkyCourier, exact simulator package/version not registered",
  simulatorAdaptationNotes:
    "Procedimentos escritos como fluxo didático para simulador. Eles ajudam a estudar intenção, confirmação e monitoramento, mas não substituem guia do piloto, AFM, SOP ou treinamento real.",
  knownSimulatorDifferences:
    "A fidelidade de Direct-To, Flight Plan, procedimentos, VNAV, captura de aproximação e piloto automático pode variar entre MSFS 2020, MSFS 2024 e atualizações do modelo."
});

const g1000TrainingMetadata = trainingExerciseMetadata({
  sourceTitle: "Treinamento didático local para Garmin G1000 NXi no C408",
  sourceOrganization: "Flight Academy Simulator",
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorDeveloper: "Microsoft / Carenado",
  simulatorAircraftVariant: "Cessna 408 SkyCourier",
  simulatorAdaptationNotes: "Treinamento para simulador; não representa procedimento operacional oficial, checklist aprovado ou instrução real."
});

function media(kind: AvionicMediaReference["kind"], slug: string, alt: string): AvionicMediaReference {
  return {
    id: `media-g1000-${slug}`,
    avionicId,
    kind,
    alt,
    storagePath: `avionics/garmin-g1000-nxi/${slug}.jpg`,
    caption: "Referência visual local para estudo. Diagramas oficiais devem ser vinculados somente quando houver licença ou fonte autorizada.",
    publicationState: "published",
    createdAt,
    updatedAt,
    technicalMetadata: g1000TechnicalMetadata
  };
}

const componentIds = [
  "component-g1000-pfd",
  "component-g1000-mfd",
  "component-g1000-cdi-hsi",
  "component-g1000-fms-controls",
  "component-g1000-com-nav",
  "component-g1000-transponder",
  "component-g1000-flight-director-fma",
  "component-g1000-autopilot",
  "component-g1000-baro",
  "component-g1000-engine-fuel",
  "component-g1000-alerts"
];

const procedureIds = [
  "procedure-g1000-preflight-screen-scan",
  "procedure-g1000-baro-radios-transponder",
  "procedure-g1000-source-selection",
  "procedure-g1000-direct-to",
  "procedure-g1000-flight-plan",
  "procedure-g1000-procedures-load-activate",
  "procedure-g1000-ils",
  "procedure-g1000-rnav",
  "procedure-g1000-autopilot-modes",
  "procedure-g1000-troubleshooting"
];

const trainingIds = [
  "training-g1000-c408-pfd-mfd-scan",
  "training-g1000-c408-baro-radios",
  "training-g1000-c408-direct-to",
  "training-g1000-c408-flight-plan",
  "training-g1000-c408-source-nav",
  "training-g1000-c408-autopilot",
  "training-g1000-c408-approach",
  "training-g1000-c408-rnav",
  "training-g1000-c408-troubleshooting",
  "training-g1000-c408-complete-flight"
];

export const localAvionicDocuments: AvionicDocument[] = [
  {
    id: avionicId,
    slug: "garmin-g1000-nxi",
    name: "Garmin G1000 NXi",
    manufacturer: "Garmin",
    version: "NXi - Cessna 408 SkyCourier",
    description:
      "Suite integrada de aviônicos associada ao Cessna 408 SkyCourier. O curso ensina a ler PFD e MFD, confirmar fonte GPS/NAV, revisar plano de voo, usar Direct-To, carregar procedimentos, monitorar Flight Director/FMA e supervisionar piloto automático no Microsoft Flight Simulator. A identificação G1000 NXi é sustentada por Garmin e Textron; a versão exata do add-on Microsoft/Carenado e todas as funções simuladas devem ser confirmadas na instalação do aluno.",
    image: media("main", "main", "Garmin G1000 NXi no Cessna 408 SkyCourier"),
    compatibleAircraftIds: ["aircraft-cessna-408-skycourier"],
    courseIds: ["course-garmin-g1000-nxi"],
    componentIds,
    procedureIds,
    trainingIds,
    progressPercent: 8,
    studyStatus: "current",
    publicationState: "published",
    createdAt,
    updatedAt,
    technicalMetadata: g1000TechnicalMetadata
  }
];

type SectionContent = {
  slug: string;
  title: string;
  lessonSlug: string;
  highlights: string[];
  summary: string;
  body: string;
  examples: string[];
  exercisePrompts: string[];
  relatedTrainingIds?: string[];
};

const sections: SectionContent[] = [
  {
    slug: "visao-geral",
    title: "Visão geral",
    lessonSlug: "g1000-como-o-sistema-pensa",
    highlights: ["Integração", "Fonte ativa", "Modo ativo", "Monitoramento"],
    summary: "Entenda o G1000 NXi como um sistema integrado de voo, navegação, motores, alertas e automação.",
    body:
      "O Garmin G1000 NXi deve ser estudado como uma cadeia de intenção e confirmação. O piloto define uma fonte de navegação, uma rota ou procedimento, uma altitude, um modo lateral e um modo vertical; depois confirma se o PFD, o HSI/CDI, o MFD e o Flight Mode Annunciator mostram a mesma intenção. No C408 do simulador, a disciplina mais importante é verbalizar: fonte ativa, perna ativa, modo ativo, modo armado, altitude selecionada e desempenho real da aeronave. A suite real possui variações por aeronave, software e opções instaladas; por isso este material ensina a lógica sem afirmar que toda função real esteja implementada no modelo Microsoft/Carenado.",
    examples: [
      "Antes de acionar NAV, confirme se a fonte é GPS ou NAV, se a perna ativa é a esperada e se o FMA mudará de modo armado para modo capturado.",
      "Durante uma aproximação, APR armado não é captura: acompanhe quando LOC, GS ou uma orientação vertical disponível realmente aparecem como ativos."
    ],
    exercisePrompts: ["Explique o fluxo fonte, plano, modo, FMA e desempenho antes de ligar o piloto automático."],
    relatedTrainingIds: ["training-g1000-c408-complete-flight"]
  },
  {
    slug: "pfd",
    title: "PFD",
    lessonSlug: "g1000-pfd-e-mfd",
    highlights: ["Atitude", "Velocidade", "Altitude", "FMA"],
    summary: "Leia o Primary Flight Display como a tela principal de controle e confirmação.",
    body:
      "O PFD concentra as informações que mantêm o voo sob controle: horizonte artificial, pitch, bank, fita de velocidade, fita de altitude, VSI, proa, HSI/CDI, fonte de navegação, altitude selecionada, barômetro, Flight Director e FMA. A leitura deve ser organizada: primeiro controle a aeronave, depois confirme navegação e automação. Em voo manual, o PFD mostra o desempenho que resulta de atitude e potência. Com Flight Director ou piloto automático, ele também mostra quais comandos laterais e verticais estão sendo solicitados. No simulador, nunca deixe mapa, menu ou plano de voo roubar a prioridade do PFD.",
    examples: [
      "Em subida, leia atitude, velocidade, tendência de altitude, modo vertical e altitude selecionada antes de mexer em qualquer menu.",
      "Se a aeronave vira para o lado errado, olhe o HSI, a fonte, a perna ativa e o FMA antes de culpar o piloto automático."
    ],
    exercisePrompts: ["Liste cinco itens do PFD que devem ser conferidos antes de confiar na automação."],
    relatedTrainingIds: ["training-g1000-c408-pfd-mfd-scan"]
  },
  {
    slug: "mfd",
    title: "MFD",
    lessonSlug: "g1000-pfd-e-mfd",
    highlights: ["Mapa", "Plano ativo", "Motor", "Sistemas"],
    summary: "Use o Multi Function Display para planejamento, mapa, rota e monitoramento complementar.",
    body:
      "O MFD amplia a consciência situacional. Ele normalmente mostra mapa, range, declutter, waypoints, aeroportos, terreno, tráfego quando disponível, rota ativa, distância, tempo estimado, páginas de motor, combustível, sistemas, alertas e informações auxiliares. A regra prática é: o MFD ajuda a prever; o PFD confirma o voo. No C408, use o MFD para revisar sequência de waypoints, visualizar procedimentos e monitorar tendência de motor e combustível sem abandonar atitude, altitude e velocidade. Algumas camadas reais, como clima datalink, cartas ou tráfego, podem depender de opções, banco de dados e implementação do simulador.",
    examples: [
      "Antes da decolagem, compare lista de waypoints no plano de voo com o desenho no mapa.",
      "Em cruzeiro, use range maior para antecipar chegada, terreno, desvios e início da descida."
    ],
    exercisePrompts: ["Explique a diferença prática entre usar o MFD para prever e o PFD para confirmar."],
    relatedTrainingIds: ["training-g1000-c408-pfd-mfd-scan"]
  },
  {
    slug: "cdi",
    title: "CDI",
    lessonSlug: "g1000-cdi-e-hsi",
    highlights: ["Desvio lateral", "GPS/NAV", "LOC", "Sensibilidade"],
    summary: "Entenda o Course Deviation Indicator como indicação de desvio em relação à fonte selecionada.",
    body:
      "O CDI mostra o desvio lateral em relação ao curso da fonte ativa. Essa frase tem três partes importantes: existe uma fonte, existe um curso, e existe um desvio. Se a fonte estiver em GPS, o CDI representa a navegação GPS ou o procedimento RNAV carregado. Se estiver em NAV/LOC, ele representa um rádio auxílio, VOR ou localizer sintonizado e identificado. Seguir o CDI sem confirmar fonte é um erro clássico. Em aproximações, a sensibilidade e a indicação podem mudar conforme o tipo de procedimento e a fase; no simulador, confirme visualmente a fonte e a lógica antes de confiar.",
    examples: [
      "Se o ILS não captura, confira se o CDI está em LOC/NAV e não em GPS.",
      "Se o CDI mostra desvio mas a rota no mapa parece correta, procure perna ativa errada ou fonte incompatível."
    ],
    exercisePrompts: ["Por que o CDI pode estar correto e ainda assim conduzir para uma intenção errada?"],
    relatedTrainingIds: ["training-g1000-c408-source-nav"]
  },
  {
    slug: "hsi",
    title: "HSI",
    lessonSlug: "g1000-cdi-e-hsi",
    highlights: ["Proa", "Curso", "Bearing", "Consciência lateral"],
    summary: "Use o HSI para relacionar proa, curso, fonte e trajetória.",
    body:
      "O HSI organiza a navegação lateral em torno da proa da aeronave. Ele ajuda a enxergar o curso selecionado, o desvio lateral, a fonte ativa e, quando disponíveis, bearing pointers ou informações complementares. O piloto deve separar heading, track e course: heading é para onde o nariz aponta, track é a trajetória sobre o solo, course é a linha desejada. Vento, interceptação e modo lateral podem fazer esses números divergirem. No G1000 NXi, o HSI é uma das melhores formas de detectar se a automação está tentando interceptar a linha correta ou apenas obedecendo um comando mal configurado.",
    examples: [
      "Em vetoração, use HDG para comandar proa, mas monitore no HSI se a trajetória aproxima a aeronave do curso desejado.",
      "Em GPS NAV, confirme se a seta/curso e o mapa contam a mesma história."
    ],
    exercisePrompts: ["Explique heading, track e course usando o HSI como referência."],
    relatedTrainingIds: ["training-g1000-c408-source-nav"]
  },
  {
    slug: "gps",
    title: "GPS",
    lessonSlug: "g1000-gps-e-nav",
    highlights: ["Plano de voo", "Waypoints", "Sequenciamento", "RNAV"],
    summary: "Use a navegação GPS como sequência de pontos que precisa ser revisada.",
    body:
      "GPS no G1000 NXi não é apenas uma linha magenta. Ele depende de posição, banco de dados, plano de voo, perna ativa e sequenciamento. O piloto precisa conferir origem, destino, waypoints, procedimentos, transições, restrições e desenho no mapa. Direct-To, Activate Leg e Activate Approach podem alterar a sequência de maneiras diferentes. No MSFS, o plano carregado pelo menu mundial ou pelo painel pode conter transições inesperadas, duplicações ou uma perna ativa que não corresponde ao briefing. A solução é revisar lista e mapa antes da decolagem e antes de cada procedimento.",
    examples: [
      "Se o avião passa pelo waypoint e não sequencia, procure OBS/SUSP, perna manual, descontinuidade ou procedimento não ativado.",
      "Se a aeronave vira para ponto inesperado após Direct-To, revise o que foi ativado e se a rota original foi preservada."
    ],
    exercisePrompts: ["Quais itens devem ser revisados antes de confiar em uma rota GPS carregada?"],
    relatedTrainingIds: ["training-g1000-c408-flight-plan"]
  },
  {
    slug: "nav",
    title: "NAV",
    lessonSlug: "g1000-gps-e-nav",
    highlights: ["VOR", "LOC", "NAV1/NAV2", "Identificação"],
    summary: "Separe navegação por rádio da navegação GPS.",
    body:
      "NAV trabalha com auxílios de rádio como VOR e localizer, conforme equipamento, frequência e cobertura disponíveis. A disciplina é sintonizar frequência, identificar o auxílio quando possível, selecionar fonte correta, conferir curso e monitorar TO/FROM ou indicação aplicável. Um ILS exige localizer e glideslope conforme carta; uma rota GPS não depende da frequência NAV. Misturar GPS e NAV gera o erro mais comum em aproximações: o piloto arma APR esperando captura de ILS, mas o painel ainda está guiando por GPS ou por frequência incorreta.",
    examples: [
      "Antes de interceptar LOC, confirme frequência ativa, identificação, curso publicado e fonte NAV/LOC no CDI.",
      "Para VOR, confirme radial/curso e indicação TO/FROM antes de corrigir a agulha."
    ],
    exercisePrompts: ["Compare GPS e NAV em termos de fonte, indicação e erro comum."],
    relatedTrainingIds: ["training-g1000-c408-source-nav"]
  },
  {
    slug: "direct-to",
    title: "Direct-To",
    lessonSlug: "g1000-direct-to",
    highlights: ["Destino direto", "Curso", "Sequência", "Recuperação"],
    summary: "Use Direct-To como ferramenta de decisão, não como botão de pânico.",
    body:
      "Direct-To cria navegação direta para um waypoint selecionado. Ele é útil para desvio, alternado, interceptação simples ou recuperação de posição, mas muda a geometria e pode interromper a sequência planejada. Antes de ativar, confirme destino, distância, curso, terreno, espaço aéreo, combustível didático e impacto no plano. Depois de ativar, confira CDI/HSI, mapa, perna ativa e FMA se o piloto automático estiver usando NAV. Para voltar ao plano original, talvez seja necessário reativar uma perna, reabrir o flight plan ou recarregar um procedimento.",
    examples: [
      "Use Direct-To para alternado apenas depois de decidir que o destino original não é mais a melhor opção.",
      "Não use Direct-To para corrigir uma aproximação mal carregada sem entender que pontos do procedimento serão pulados."
    ],
    exercisePrompts: ["Quando Direct-To ajuda e quando ele piora a consciência situacional?"],
    relatedTrainingIds: ["training-g1000-c408-direct-to"]
  },
  {
    slug: "flight-plan",
    title: "Flight Plan",
    lessonSlug: "g1000-flight-plan",
    highlights: ["Origem", "Destino", "Perna ativa", "Procedimentos"],
    summary: "Trate o plano de voo como roteiro editável que precisa de revisão ativa.",
    body:
      "O Flight Plan organiza origem, destino, waypoints, aerovias quando aplicável, saída, chegada, aproximação e missed approach conforme banco de dados e seleção do piloto. O aluno deve saber abrir a lista, inserir ou remover ponto, revisar sequência, identificar perna ativa, comparar com mapa, corrigir duplicações e compreender a diferença entre carregar e ativar procedimento. No simulador, revise especialmente o que veio do planejador externo: transições automáticas podem criar caminho longo ou incoerente.",
    examples: [
      "Antes do taxi, leia o plano em voz alta: origem, saída, primeiro fix, rota, chegada, aproximação e alternado didático.",
      "Se houver waypoint duplicado, descubra se é parte do procedimento ou erro de conexão antes de apagar."
    ],
    exercisePrompts: ["Explique a diferença entre revisar o flight plan e apenas olhar a linha no mapa."],
    relatedTrainingIds: ["training-g1000-c408-flight-plan"]
  },
  {
    slug: "obs",
    title: "OBS",
    lessonSlug: "g1000-obs",
    highlights: ["Curso manual", "Sequenciamento", "SUSP", "Interceptação"],
    summary: "Entenda OBS como controle manual de curso e sequenciamento.",
    body:
      "OBS permite trabalhar um curso selecionado de forma manual e pode suspender ou modificar o sequenciamento automático, conforme contexto do sistema. Isso é útil para treinar interceptação, manter um curso específico ou entender geometria, mas exige atenção: se OBS/SUSP permanecer ativo, o GPS pode deixar de avançar como o piloto espera. A pergunta antes de usar é: quero sequenciamento automático ou quero manter este curso manualmente? No MSFS, observe com calma a indicação antes de entrar em aproximação ou procedimento.",
    examples: [
      "Em treino, selecione um curso para interceptar e confirme se o GPS não está avançando para o próximo ponto sem intenção.",
      "Antes de uma aproximação RNAV, confirme se não ficou SUSP/OBS ativo por acidente."
    ],
    exercisePrompts: ["Por que OBS pode ser útil em treino e perigoso se esquecido ativo?"],
    relatedTrainingIds: ["training-g1000-c408-troubleshooting"]
  },
  {
    slug: "piloto-automatico",
    title: "Piloto automático",
    lessonSlug: "g1000-piloto-automatico",
    highlights: ["AP", "FD", "FMA", "Modos"],
    summary: "Supervisione a automação por modos ativos, armados e desempenho real.",
    body:
      "O piloto automático não sabe sua intenção; ele segue modos. AP engaja a automação, Flight Director mostra comandos, HDG/NAV/APR comandam lateralmente, VS/FLC/ALT/VNAV quando disponível comandam verticalmente, e a altitude selecionada limita ou define capturas. O FMA é a confirmação principal: ele mostra modos ativos e armados. Depois de cada botão, olhe o FMA e o desempenho. Se algo não combina, volte a voar manualmente, estabilize, confirme fonte, plano, altitude e modo antes de tentar novamente.",
    examples: [
      "NAV armado não significa que NAV capturou. Acompanhe quando o modo passa a ativo.",
      "APR armado antes de fonte correta, frequência correta ou interceptação adequada pode não capturar localizer ou glidepath."
    ],
    exercisePrompts: ["Explique a diferença entre ligar AP e confirmar os modos que ele realmente está seguindo."],
    relatedTrainingIds: ["training-g1000-c408-autopilot"]
  },
  {
    slug: "altitude-selecionada",
    title: "Altitude selecionada",
    lessonSlug: "g1000-altitude-selecionada",
    highlights: ["Bug de altitude", "Captura", "ALT", "Modo vertical"],
    summary: "Use a altitude selecionada como intenção vertical formalizada.",
    body:
      "Selecionar uma altitude não faz a aeronave subir ou descer sozinha; ela define um alvo para modos verticais e captura. Para chegar até ela, é necessário um modo vertical coerente, como VS, FLC ou outro disponível. O piloto deve distinguir altitude atual, altitude selecionada, altitude autorizada, altitude publicada e altitude mínima. No C408 simulado, antes de qualquer subida, descida ou aproximação, verbalize: qual altitude devo manter, qual está selecionada, qual modo vertical está ativo e quando espero a captura ALT.",
    examples: [
      "Se você seleciona 5.000 pés mas não ativa VS/FLC, a aeronave pode apenas manter a altitude atual.",
      "Se a altitude selecionada está errada, a automação pode capturar o nível errado com total precisão."
    ],
    exercisePrompts: ["Por que altitude selecionada e modo vertical precisam ser conferidos juntos?"],
    relatedTrainingIds: ["training-g1000-c408-autopilot"]
  },
  {
    slug: "vs",
    title: "VS",
    lessonSlug: "g1000-vs-e-flc",
    highlights: ["Razão vertical", "Velocidade", "Energia", "Captura"],
    summary: "Use Vertical Speed com consciência de energia.",
    body:
      "VS comanda uma razão vertical. Ele é simples para pequenas descidas e ajustes, mas pode degradar velocidade em subida se a razão selecionada exigir mais energia do que a potência disponível. A boa prática didática é selecionar altitude alvo, escolher razão moderada, ajustar potência, monitorar velocidade, VSI e FMA, e esperar captura de altitude. Se a velocidade cai demais, reduza razão, aumente potência quando apropriado ou retome voo manual.",
    examples: [
      "Uma descida de 500 a 800 pés por minuto pode ser fácil de monitorar; uma razão agressiva perto do solo ou com baixa potência aumenta carga de trabalho.",
      "Em subida, VS alto demais pode transformar automação em armadilha de baixa velocidade."
    ],
    exercisePrompts: ["Explique por que VS exige monitoramento de velocidade, não só de altitude."],
    relatedTrainingIds: ["training-g1000-c408-autopilot"]
  },
  {
    slug: "flc",
    title: "FLC",
    lessonSlug: "g1000-vs-e-flc",
    highlights: ["Velocidade alvo", "Potência", "Atitude", "Energia"],
    summary: "Entenda Flight Level Change como modo vertical baseado em velocidade alvo.",
    body:
      "FLC busca uma velocidade selecionada ajustando atitude, enquanto o piloto gerencia potência. Em subida, potência disponível e velocidade alvo determinam razão de subida resultante. Em descida, potência reduzida e velocidade alvo determinam trajetória. FLC costuma proteger melhor a velocidade do que VS, mas não resolve potência incorreta, alvo errado ou altitude selecionada errada. No MSFS 2024, notas oficiais registraram correção relacionada a VS no C408; por isso compare sempre rótulo, comando e comportamento da sua versão instalada.",
    examples: [
      "Para subir, selecione altitude, escolha velocidade alvo apropriada ao treino, ajuste potência e confirme FLC no FMA.",
      "Se FLC parece não responder, verifique se AP/FD, altitude alvo, potência e velocidade selecionada fazem sentido."
    ],
    exercisePrompts: ["Compare VS e FLC em uma subida longa no simulador."],
    relatedTrainingIds: ["training-g1000-c408-autopilot"]
  },
  {
    slug: "vnav",
    title: "VNAV",
    lessonSlug: "g1000-vnav",
    highlights: ["Perfil vertical", "Restrição", "TOD", "Monitoramento"],
    summary: "Use VNAV como planejamento vertical sujeito a dados e implementação.",
    body:
      "VNAV ajuda a planejar perfis verticais com base em altitudes, restrições, distância e trajetória vertical. Ele não substitui cálculo mental, briefing nem autorização. Antes de confiar, confirme se o procedimento carregado possui restrições adequadas, se a altitude selecionada permite a descida, se o modo está apenas armado ou ativo e se a versão simulada realmente suporta a função pretendida. Quando houver dúvida, use cálculo simples: altitude a perder, distância restante e razão de descida necessária.",
    examples: [
      "Se você precisa perder 6.000 pés em 20 NM, pense em cerca de 300 pés por NM antes de depender do VNAV.",
      "Se a restrição não aparece no plano ou a altitude selecionada bloqueia a descida, VNAV pode não comandar o que você espera."
    ],
    exercisePrompts: ["Quais pré-condições tornam VNAV útil e quais tornam VNAV enganoso?"],
    relatedTrainingIds: ["training-g1000-c408-autopilot"]
  },
  {
    slug: "ils",
    title: "ILS",
    lessonSlug: "g1000-ils",
    highlights: ["LOC", "Glideslope", "NAV", "APR"],
    summary: "Prepare uma aproximação ILS por fonte, frequência, curso, interceptação e FMA.",
    body:
      "ILS combina orientação lateral pelo localizer e orientação vertical pelo glideslope. A preparação didática é: briefing da carta, frequência, identificação, curso, fonte NAV/LOC, altitude de interceptação, pista, mínimos, aproximação perdida e modo APR. O localizer geralmente é capturado antes do glideslope; APR armado não significa captura; entrar alto ou com fonte errada pode impedir captura. No C408 simulado, monitore FMA, CDI/HSI e indicação vertical, e esteja pronto para desconectar automação se ela não fizer sentido.",
    examples: [
      "Antes do FAF, confirme fonte NAV/LOC, LOC armado ou ativo, GS armado quando disponível e altitude correta para interceptação.",
      "Se o glideslope não aparece, verifique frequência, fonte, curso, distância, altitude e se o procedimento foi carregado/ativado de forma coerente."
    ],
    exercisePrompts: ["Liste as verificações antes de armar APR para uma aproximação ILS."],
    relatedTrainingIds: ["training-g1000-c408-approach"]
  },
  {
    slug: "rnav",
    title: "RNAV",
    lessonSlug: "g1000-rnav",
    highlights: ["GPS", "Sequenciamento", "LNAV", "Mínimos"],
    summary: "Execute RNAV entendendo GPS, perna ativa, mínimos e orientação vertical disponível.",
    body:
      "Aproximações RNAV dependem de GPS, banco de dados, procedimento carregado, transição correta, perna ativa e critérios publicados. Algumas aproximações podem oferecer orientação vertical como LPV ou glidepath, conforme equipamento, banco de dados e implementação; outras são apenas LNAV. Não afirme que uma função existe sem ver a indicação no painel e a carta correspondente. O aluno deve confirmar GPS como fonte, sequenciamento, sensibilidade do CDI quando aplicável, mínimos corretos e missed approach.",
    examples: [
      "Antes da final RNAV, identifique IAF, IF, FAF e MAP na sequência do plano.",
      "Se a aeronave não sequencia após MAP ou procedure turn, estabilize, use mapa e plano para recuperar a lógica antes de seguir."
    ],
    exercisePrompts: ["O que deve ser conferido antes de seguir uma aproximação RNAV no G1000?"],
    relatedTrainingIds: ["training-g1000-c408-rnav"]
  },
  {
    slug: "falhas-erros-comuns",
    title: "Falhas e erros comuns",
    lessonSlug: "g1000-falhas-e-erros-comuns",
    highlights: ["Fonte errada", "Modo errado", "Perna ativa", "Recuperação"],
    summary: "Resolva problemas comuns voltando ao fluxo de controle, fonte, plano, modo e desempenho.",
    body:
      "Troubleshooting no G1000 começa com aviate: estabilize atitude, potência, altitude e proa. Depois diagnostique fonte, plano, modo e desempenho. Se NAV não captura, verifique fonte, interceptação, perna ativa e FMA. Se APR não captura, confirme frequência, curso, GPS/NAV, altitude e distância. Se VS derruba velocidade, reduza razão ou use outro modo. Se Direct-To bagunçou a rota, revise perna ativa e plano original. Se o FMA mostra algo diferente do esperado, a aeronave está obedecendo o que está no FMA, não o que você imaginou. Em caso de dúvida, desconecte automação, voe manualmente e simplifique.",
    examples: [
      "Sintoma: o avião vira para longe da rota. Verifique HDG ativo, NAV armado sem captura, fonte errada ou Direct-To para waypoint diferente.",
      "Sintoma: glideslope não captura. Verifique fonte LOC/NAV, frequência, altitude de interceptação, APR armado e se entrou alto demais."
    ],
    exercisePrompts: ["Monte uma sequência de cinco verificações quando o G1000 não faz o esperado."],
    relatedTrainingIds: ["training-g1000-c408-troubleshooting"]
  }
];

export const localAvionicSectionDocuments: AvionicSectionDocument[] = sections.map((section, index) => ({
  id: `section-g1000-${section.slug}`,
  avionicId,
  slug: section.slug,
  title: section.title,
  summary: section.summary,
  body: section.body,
  image: media("section", section.slug, `Referência visual da seção ${section.title} do Garmin G1000 NXi`),
  highlights: section.highlights,
  examples: section.examples,
  exercisePrompts: section.exercisePrompts,
  relatedTrainingIds: section.relatedTrainingIds ?? ["training-g1000-c408-complete-flight"],
  relatedAircraftIds: ["aircraft-cessna-408-skycourier"],
  internalLessonSlugs: [section.lessonSlug],
  order: index + 1,
  publicationState: "published",
  createdAt,
  updatedAt,
  technicalMetadata: g1000TechnicalMetadata
}));

export const localAvionicComponentDocuments: AvionicComponentDocument[] = [
  component("component-g1000-pfd", "PFD", "Tela primária de voo: atitude, velocidade, altitude, HSI/CDI, Flight Director e FMA.", "pfd", 1),
  component("component-g1000-mfd", "MFD", "Tela multifuncional para mapa, rota, plano ativo, páginas auxiliares, motor, combustível e alertas.", "mfd", 2),
  component("component-g1000-cdi-hsi", "CDI/HSI", "Indicação lateral que depende da fonte ativa: GPS, NAV, VOR ou LOC.", "cdi", 3),
  component("component-g1000-fms-controls", "Controles FMS", "Knobs e teclas de Flight Plan, Direct-To, Procedures, Menu, Clear e Enter para inserir, revisar e ativar navegação.", "flight-plan", 4),
  component("component-g1000-com-nav", "Rádios COM/NAV", "Gerenciamento de frequências ativas e standby, COM1/COM2, NAV1/NAV2 e identificação de auxílio quando disponível.", "nav", 5),
  component("component-g1000-transponder", "Transponder", "Código, modo, altitude e IDENT para interação com ATC do simulador e consciência operacional.", "nav", 6),
  component("component-g1000-flight-director-fma", "Flight Director e FMA", "Barras de comando e anúncios de modos ativos/armados, essenciais para confirmar a automação.", "piloto-automatico", 7),
  component("component-g1000-autopilot", "Piloto automático", "Modos laterais e verticais que executam comandos selecionados e exigem supervisão contínua.", "piloto-automatico", 8),
  component("component-g1000-baro", "Barômetro", "Ajuste de pressão local ou padrão que afeta altitude indicada, níveis de voo e mínimos.", "altitude-selecionada", 9),
  component("component-g1000-engine-fuel", "Engine e Fuel Pages", "Indicações de motor e combustível para monitoramento por fase de voo, sem substituir limites oficiais.", "mfd", 10),
  component("component-g1000-alerts", "Alertas e mensagens", "Avisos, cautions, warnings e mensagens que devem ser investigados, não apenas apagados.", "falhas-erros-comuns", 11)
];

export const localAvionicProcedureDocuments: AvionicProcedureDocument[] = [
  procedure(
    "procedure-g1000-preflight-screen-scan",
    "Varredura inicial das telas",
    "pfd",
    [
      "Energize a aeronave conforme fluxo de estudo do simulador e aguarde estabilização das telas.",
      "Confira PFD: atitude, velocidade, altitude, proa, fonte de navegação, barômetro e mensagens.",
      "Confira MFD: mapa, range, rota carregada, páginas de motor/combustível e alertas.",
      "Leia o FMA e confirme que nenhum modo inesperado está ativo antes de iniciar taxi ou decolagem.",
      "Se houver alerta, entenda a causa didática antes de simplesmente limpar a mensagem."
    ],
    "Use esta varredura como disciplina de estudo. Não é checklist oficial do C408."
  ),
  procedure(
    "procedure-g1000-baro-radios-transponder",
    "Barômetro, rádios e transponder",
    "nav",
    [
      "Ajuste QNH ou pressão padrão conforme fase do voo e regra/região aplicável ao cenário.",
      "Confirme se a altitude indicada faz sentido com a elevação do aeródromo ou nível planejado.",
      "Sintonize COM ativo e standby conforme ATIS, solo, torre ou frequência do exercício.",
      "Sintonize NAV somente quando o exercício exigir VOR, LOC ou ILS; identifique a fonte antes de seguir.",
      "Configure o transponder conforme instrução do simulador ou exercício e confirme modo de altitude quando apropriado."
    ],
    "Pressão, frequências e códigos variam por país, carta e cenário. Use dados oficiais quando simular operação realista."
  ),
  procedure(
    "procedure-g1000-source-selection",
    "Seleção de fonte GPS/NAV",
    "cdi",
    [
      "Defina se a navegação pretendida é GPS/RNAV ou rádio navegação NAV/VOR/LOC.",
      "Selecione a fonte no CDI/HSI e confirme visualmente a indicação no PFD.",
      "Compare a fonte com o plano: GPS para rota e RNAV; NAV/LOC para VOR, localizer ou ILS.",
      "Antes de acionar NAV ou APR, confirme perna ativa, frequência quando aplicável, curso e FMA.",
      "Se a aeronave não captura, retorne à fonte, curso e interceptação antes de alterar outros menus."
    ],
    "Fonte errada é uma das principais causas de confusão no G1000."
  ),
  procedure(
    "procedure-g1000-direct-to",
    "Uso criterioso do Direct-To",
    "direct-to",
    [
      "Estabilize a aeronave antes de abrir a função Direct-To.",
      "Selecione o waypoint desejado e confirme identificador, nome, distância e curso.",
      "Avalie terreno, espaço aéreo, combustível didático e impacto no plano original.",
      "Ative somente quando a intenção estiver clara.",
      "Depois da ativação, confira CDI/HSI, mapa, perna ativa e FMA se o piloto automático estiver em NAV."
    ],
    "Direct-To é útil para decisão clara; usado para resolver confusão sem diagnóstico, costuma piorar a rota."
  ),
  procedure(
    "procedure-g1000-flight-plan",
    "Revisão e edição de Flight Plan",
    "flight-plan",
    [
      "Abra o plano de voo e leia origem, destino e todos os waypoints em ordem.",
      "Compare a lista com o mapa e com o briefing mental da rota.",
      "Insira, remova ou reposicione waypoints somente depois de entender o efeito no sequenciamento.",
      "Revise procedimentos carregados, transições, aproximação e missed approach.",
      "Antes da decolagem ou descida, confirme perna ativa e próximo evento."
    ],
    "Não confie em plano importado sem revisão. O mapa pode parecer correto mesmo com sequência inadequada."
  ),
  procedure(
    "procedure-g1000-procedures-load-activate",
    "Carregar e ativar procedimentos",
    "flight-plan",
    [
      "Selecione aeroporto, tipo de procedimento, pista e transição conforme carta ou cenário didático.",
      "Use Load para inserir e revisar o procedimento sem ativá-lo imediatamente.",
      "Use Activate apenas quando for hora de sequenciar para a aproximação ou fase pretendida.",
      "Evite Activate Vectors-to-Final sem entender que partes do procedimento podem ser ignoradas.",
      "Após carregar ou ativar, confira lista, mapa, perna ativa, fonte e FMA."
    ],
    "Load, Activate, Activate Leg e Direct-To não são equivalentes; cada um altera a lógica de navegação de forma diferente."
  ),
  procedure(
    "procedure-g1000-ils",
    "Preparação para ILS",
    "ils",
    [
      "Faça briefing da carta: pista, frequência, curso, altitudes, mínimos e missed approach.",
      "Sintonize e identifique o localizer conforme dados aplicáveis ao cenário.",
      "Confirme fonte NAV/LOC no CDI/HSI, curso adequado e interceptação planejada.",
      "Selecione altitude de interceptação e arme APR no momento apropriado.",
      "Monitore FMA: localizer e glideslope devem passar de armados para capturados antes de confiar na descida."
    ],
    "APR armado não é captura. Se entrar alto, com fonte errada ou frequência errada, a aproximação pode não funcionar."
  ),
  procedure(
    "procedure-g1000-rnav",
    "Preparação para RNAV",
    "rnav",
    [
      "Carregue a aproximação RNAV correta com pista e transição coerentes.",
      "Revise IAF, IF, FAF, MAP, sequência, distâncias e mínimos.",
      "Confirme fonte GPS e perna ativa antes de acionar NAV ou APR quando disponível.",
      "Identifique se há orientação vertical disponível no painel e na carta; não assuma LPV ou glidepath.",
      "Monitore sequenciamento e esteja pronto para missed approach se a final não estiver estabilizada."
    ],
    "RNAV depende de banco de dados, fonte GPS e sequenciamento correto; não é um ILS com nome diferente."
  ),
  procedure(
    "procedure-g1000-autopilot-modes",
    "Seleção e monitoramento de modos",
    "piloto-automatico",
    [
      "Defina intenção lateral: HDG, NAV ou APR.",
      "Defina intenção vertical: ALT, VS, FLC ou VNAV quando disponível e apropriado.",
      "Selecione altitude alvo antes de comandar subida ou descida.",
      "Engaje Flight Director/AP conforme o exercício e confirme FMA.",
      "Depois de cada mudança, monitore atitude, velocidade, altitude, proa, rota e modo ativo."
    ],
    "A aeronave segue o FMA, não a intenção que ficou apenas na cabeça do piloto."
  ),
  procedure(
    "procedure-g1000-troubleshooting",
    "Recuperação de configuração errada",
    "falhas-erros-comuns",
    [
      "Aviate: estabilize manualmente ou simplifique a automação.",
      "Confirme fonte: GPS, NAV1, NAV2 ou LOC.",
      "Confirme plano: waypoint, perna ativa, procedimento, Direct-To ou OBS/SUSP.",
      "Confirme FMA: modo lateral ativo/armado e modo vertical ativo/armado.",
      "Corrija uma variável por vez e observe se a resposta da aeronave confirma a correção."
    ],
    "Se a situação ficar confusa, desconecte automação, voe a aeronave e reconstrua a lógica passo a passo."
  )
];

export const localAvionicTrainingDocuments: AvionicTrainingDocument[] = [
  training("training-g1000-c408-pfd-mfd-scan", "Scan PFD/MFD no C408", "Identificar PFD, MFD, FMA, HSI/CDI, mapa, motor e alertas sem perder controle básico.", "25 min", 1),
  training("training-g1000-c408-baro-radios", "Barômetro, rádios e transponder", "Ajustar pressão, sintonizar COM/NAV e configurar transponder em cenário didático simples.", "25 min", 2),
  training("training-g1000-c408-direct-to", "Direct-To no C408", "Praticar destino direto sem perder atitude, altitude, fonte ativa e consciência lateral.", "25 min", 3),
  training("training-g1000-c408-flight-plan", "Plano de voo simples", "Criar, revisar e corrigir uma rota curta com origem, destino, waypoints e perna ativa.", "35 min", 4),
  training("training-g1000-c408-source-nav", "GPS/NAV e CDI/HSI", "Alternar fontes, observar CDI/HSI e reconhecer quando a fonte não combina com a intenção.", "30 min", 5),
  training("training-g1000-c408-autopilot", "HDG, NAV, ALT, VS e FLC", "Treinar modos laterais e verticais verificando FMA, altitude selecionada, velocidade e captura.", "45 min", 6),
  training("training-g1000-c408-approach", "Aproximação ILS guiada", "Preparar fonte NAV/LOC, frequência, curso, APR, FMA e estabilização em uma aproximação ILS didática.", "45 min", 7),
  training("training-g1000-c408-rnav", "Aproximação RNAV guiada", "Carregar uma RNAV, revisar sequência, fonte GPS, perna ativa, mínimos e missed approach.", "45 min", 8),
  training("training-g1000-c408-troubleshooting", "Recuperação de configuração errada", "Resolver falhas didáticas de fonte, modo, Direct-To, perna ativa e captura de aproximação.", "35 min", 9),
  training("training-g1000-c408-complete-flight", "Voo completo usando Garmin", "Usar o G1000 NXi em todas as fases de um voo curto no C408: preparação, taxi, decolagem, subida, cruzeiro, descida, aproximação, arremetida opcional e pós-pouso.", "1h 10min", 10)
];

export const localAvionicCourseRelations: AvionicCourseRelationDocument[] = [
  {
    id: "avionic-course-g1000-fundamentos",
    avionicId,
    courseId: "course-garmin-g1000-nxi",
    title: "Garmin G1000 NXi — Fundamentos",
    slug: "garmin-g1000-nxi",
    relation: "Curso técnico e didático para aprender a lógica do G1000 NXi no Cessna 408 SkyCourier antes de avançar para IFR, checklists e operação completa.",
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

function procedure(id: string, title: string, sectionSlug: string, steps: string[], note: string): AvionicProcedureDocument {
  return {
    id,
    avionicId,
    title,
    sectionSlug,
    steps,
    note,
    order: procedureIds.indexOf(id) + 1,
    publicationState: "published",
    technicalMetadata: g1000SimulatorAdaptationMetadata
  };
}

function training(id: string, title: string, objective: string, duration: string, order: number): AvionicTrainingDocument {
  return {
    id,
    avionicId,
    title,
    objective,
    relatedAircraftIds: ["aircraft-cessna-408-skycourier"],
    duration,
    status: "available",
    order,
    publicationState: "published",
    technicalMetadata: g1000TrainingMetadata
  };
}
