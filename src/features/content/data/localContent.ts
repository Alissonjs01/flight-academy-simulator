import type {
  CourseDocument,
  ExerciseDocument,
  FinalAssessmentDocument,
  LessonDocument,
  ModuleDocument
} from "@/features/content/types";

export const simulatorOnlyDisclaimer =
  "Este curso é destinado exclusivamente ao aprendizado em simuladores de voo e não substitui formação aeronáutica oficial, instrução prática, manuais da aeronave, regulamentos ou orientação de instrutores certificados.";

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
    publicationState: "published"
  },
  {
    id: "course-garmin-g1000-nxi",
    slug: "garmin-g1000-nxi",
    title: "Garmin G1000 NXi — Fundamentos",
    description: "Curso introdutório para compreender a lógica do Garmin G1000 NXi, PFD, MFD, CDI/HSI, GPS/NAV, Direct-To, Flight Plan, piloto automático e aproximações no simulador.",
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
    publicationState: "published"
  },
  {
    id: "course-navegacao-ifr",
    slug: "navegacao-ifr",
    title: "Navegação e IFR",
    description: "Do planejamento ao voo por instrumentos com procedimentos práticos.",
    category: "IFR",
    imageIcon: "route",
    level: "Avançado",
    audience: "Alunos com domínio de fundamentos, Garmin e navegação básica",
    referenceAircraft: "Cessna 408 SkyCourier",
    language: "Português do Brasil",
    disclaimer: simulatorOnlyDisclaimer,
    estimatedDuration: "8h 45min",
    progressPercent: 0,
    moduleCount: 0,
    status: "locked",
    prerequisites: ["Garmin G1000 NXi", "Navegação básica"],
    updatedAt: "2026-07-23",
    order: 3,
    publicationState: "draft"
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
  ...garminModuleDocuments
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
  spec(5, fundamentalsModuleIds.decision, "Redução de velocidade mantendo altitude", "reducao-de-velocidade-mantendo-altitude", "25 min", ["Reduzir potência", "Manter altitude", "Atitude", "Velocidade", "Compensar"], "Reduzir velocidade sem perder altitude desnecessariamente.", "Para reduzir velocidade mantendo altitude, normalmente reduza potência e ajuste atitude para sustentar altitude enquanto a aeronave desacelera.", "Com menos potência, será necessário gerenciar pitch e compensação. O altímetro e o VSI confirmam se a altitude está sendo mantida.", "Reduzir de 140 para 110 nós em voo nivelado exige paciência: potência menor, atitude ajustada, compensação e observação da tendência.", "O erro comum é reduzir potência e deixar o nariz cair, transformando redução de velocidade em descida acelerada.", "No C408, em altitude segura, reduza potência e mantenha altitude até atingir velocidade alvo, fazendo pequenas correções.", "Descreva como reduzir de 140 para 110 nós mantendo altitude.", "A resposta deve mencionar reduzir potência, manter altitude com atitude, acompanhar IAS, compensar e estabilizar.", "Controle de velocidade em altitude fixa mostra maturidade no gerenciamento de energia.", "A próxima aula reúne tudo em um cenário final."),
  spec(6, fundamentalsModuleIds.decision, "Exercício final", "exercicio-final-fundamentos", "25 min", ["C408", "Descida", "Redução de velocidade", "Energia", "Estabilização"], "Resolver um cenário completo integrando potência, atitude, energia, velocidade, VSI e antecipação.", "O cenário final combina as principais ideias do curso: C408 a 7.000 pés e 140 nós, autorizado a descer para 4.000 pés e reduzir para 110 nós.", "A resposta não deve ser uma sequência mecânica. O aluno precisa explicar como gerencia energia: reduzir potência, ajustar atitude para descida, controlar velocidade, monitorar VSI, antecipar nivelamento e estabilizar a 4.000 pés.", "Uma execução madura começa planejando a descida, evitando deixar a aeronave acelerar demais e preparando a redução de razão vertical antes da altitude alvo.", "O erro comum é baixar o nariz para descer e só depois tentar corrigir a velocidade alta perto de 4.000 pés.", "No simulador, configure o C408 a 7.000 pés e 140 nós. Execute a descida para 4.000 pés buscando chegar estabilizado próximo de 110 nós.", "Descreva potência, atitude, energia, velocidade, VSI, antecipação, nivelamento e estabilização neste cenário.", "A resposta deve citar redução planejada de potência, atitude de descida controlada, gerenciamento de energia para não acelerar, VSI monitorado, início antecipado do nivelamento, ajuste de potência/atitude e estabilização a 4.000 pés e 110 nós.", "Você concluiu a base conceitual para controlar a aeronave com método no simulador.", "A conclusão do curso leva à avaliação final e, se aprovada, desbloqueia a trilha Garmin G1000 NXi.")
];

const garminLessonSpecs: LessonSpec[] = [
  spec(1, "module-g1000-como-pensa", "Como o G1000 pensa", "g1000-como-o-sistema-pensa", "30 min", ["Integração", "Fonte ativa", "Modo ativo", "Consciência"], "Entender o G1000 NXi como um sistema integrado, não apenas como telas separadas.", "Esta aula abre o curso Garmin G1000 NXi — Fundamentos e usa conteúdo introdutório para preparar a estrutura do estudo.", "O G1000 integra instrumentos, navegação, mapa, plano de voo, modos e alertas. O aluno deve sempre perguntar: qual fonte está ativa, qual modo está comandando e o que a aeronave realmente está fazendo?", "Antes de seguir uma linha magenta, confirme fonte ativa, CDI/HSI e posição no mapa.", "O erro comum é confiar na tela sem entender fonte, modo ou sequência.", "No C408, localize PFD, MFD, fonte de navegação e indicação lateral antes de acionar qualquer função.", "Explique por que o G1000 deve ser lido por fonte, modo e desempenho.", "A resposta deve citar fonte ativa, modo ativo, confirmação no painel e monitoramento do voo.", "O G1000 ajuda muito, mas exige método.", "A próxima aula separa funções do PFD e do MFD."),
  spec(1, "module-g1000-pfd-mfd", "PFD e MFD", "g1000-pfd-e-mfd", "30 min", ["PFD", "MFD", "Mapa", "Instrumentos"], "Separar claramente o papel do PFD e do MFD no fluxo de cockpit.", "Conteúdo introdutório para organizar a leitura dos displays principais.", "O PFD concentra instrumentos primários e modos. O MFD amplia mapa, rota, sistemas e planejamento. A divisão de atenção deve preservar a pilotagem básica.", "Em cruzeiro, confirme atitude e altitude no PFD enquanto acompanha rota, terreno e sistemas no MFD.", "O erro comum é olhar só o mapa e abandonar instrumentos primários.", "Use o C408 com G1000 NXi e identifique PFD, MFD, mapa, motor e plano de voo.", "Liste três informações do PFD e três do MFD.", "PFD: atitude, altitude, velocidade/proa. MFD: mapa, rota, motor/sistemas.", "Separar PFD e MFD reduz carga mental.", "A próxima aula apresenta CDI e HSI."),
  spec(1, "module-g1000-cdi-hsi", "CDI e HSI", "g1000-cdi-e-hsi", "30 min", ["CDI", "HSI", "Curso", "Desvio"], "Entender CDI e HSI como referências de navegação lateral.", "Conteúdo provisório para introduzir desvio lateral e consciência de curso.", "CDI e HSI mostram relação entre aeronave, curso e fonte de navegação. Antes de corrigir, confirme se está usando GPS, NAV, VOR ou LOC.", "Se a fonte estiver errada, a indicação lateral pode ser tecnicamente correta para uma navegação que você não pretendia seguir.", "O erro comum é perseguir a agulha sem confirmar a fonte.", "No simulador, alterne a fonte visualmente e observe o que muda no CDI/HSI.", "Explique por que confirmar a fonte é obrigatório antes de seguir o CDI.", "A resposta deve citar GPS/NAV/LOC, curso ativo e desvio lateral.", "CDI e HSI são úteis quando o piloto entende o que eles representam.", "A próxima aula separa GPS e NAV."),
  spec(1, "module-g1000-gps-nav", "GPS e NAV", "g1000-gps-e-nav", "30 min", ["GPS", "NAV", "VOR", "LOC"], "Diferenciar navegação GPS de navegação NAV no G1000.", "Conteúdo introdutório para preparar navegação lateral.", "GPS segue dados de satélite e plano de voo. NAV pode usar VOR ou LOC. A troca de fonte muda a lógica da indicação.", "Uma aproximação ILS exige fonte e sintonia coerentes, enquanto uma rota GPS usa sequenciamento do plano de voo.", "O erro comum é misturar GPS e NAV como se fossem a mesma coisa.", "No C408, identifique onde a fonte ativa aparece antes de voar uma rota curta.", "Compare GPS e NAV em uma frase.", "A resposta deve diferenciar plano/posição GPS de rádio navegação VOR/LOC.", "Fonte correta evita navegar uma intenção errada.", "A próxima aula apresenta Direct-To."),
  spec(1, "module-g1000-direct-to", "Direct-To", "g1000-direct-to", "30 min", ["Direct-To", "Waypoint", "Curso direto", "Consciência"], "Usar Direct-To como ferramenta simples sem perder contexto.", "Conteúdo provisório para ensinar o conceito antes dos detalhes técnicos.", "Direct-To cria uma navegação direta para um waypoint. Ele pode ser útil, mas também pode apagar a intenção mental do plano se usado sem critério.", "Ao desviar para um aeroporto próximo, confirme destino, curso, distância e terreno antes de aceitar.", "O erro comum é apertar Direct-To para resolver confusão de navegação.", "Pratique selecionar um waypoint próximo e confirme a indicação lateral antes de seguir.", "Quando Direct-To é útil e qual risco ele cria?", "A resposta deve citar destino direto, confirmação e risco de perder sequência/consciência.", "Direct-To é atalho, não substituto de planejamento.", "A próxima aula organiza o Flight Plan."),
  spec(1, "module-g1000-flight-plan", "Flight Plan", "g1000-flight-plan", "30 min", ["Plano de voo", "Waypoints", "Sequenciamento", "Rota"], "Entender o plano de voo como sequência lógica de navegação.", "Conteúdo introdutório para cadastrar aulas completas futuramente.", "Flight Plan organiza origem, destino, waypoints e procedimentos. O piloto deve conferir sequência, coerência e mapa antes de confiar no magenta.", "Uma rota visualmente bonita no mapa pode ter waypoint errado ou sequência inesperada.", "O erro comum é inserir a rota e não revisar a ordem dos pontos.", "Monte uma rota curta no simulador e verbalize cada waypoint antes da decolagem.", "O que deve ser revisado em um plano de voo?", "A resposta deve citar sequência, origem/destino, waypoints, mapa e coerência com a intenção.", "Planejar no G1000 exige revisão ativa.", "A próxima aula entra no piloto automático."),
  spec(2, "module-g1000-flight-plan", "OBS", "g1000-obs", "30 min", ["OBS", "Curso manual", "Sequenciamento", "Consciência"], "Preparar o entendimento inicial do modo OBS no G1000.", "Conteúdo provisório para futura aula técnica sobre OBS.", "OBS pode permitir trabalhar um curso manual e suspender ou alterar a lógica normal de sequenciamento. Antes de usar, o aluno deve entender o que será mantido manualmente.", "Em um treino de interceptação, OBS pode ajudar a visualizar curso, mas exige confirmar se o sequenciamento automático está coerente com a intenção.", "O erro comum é deixar OBS ativo sem perceber que a navegação não está sequenciando como esperado.", "No simulador, identifique onde OBS aparece e verbalize se ele está ativo ou não antes de prosseguir.", "Por que OBS exige atenção especial?", "A resposta deve citar curso manual, sequenciamento e risco de seguir lógica diferente da esperada.", "OBS é uma ferramenta de controle de curso, não um botão para apertar no susto.", "A próxima aula apresenta piloto automático."),
  spec(1, "module-g1000-piloto-automatico", "Piloto automático", "g1000-piloto-automatico", "30 min", ["Autopilot", "Modos", "Monitoramento", "Comando"], "Compreender o piloto automático como executor de modos selecionados.", "Conteúdo provisório para preparar estudos de modos laterais e verticais.", "O piloto automático segue modos ativos, não intenções vagas. O aluno deve confirmar lateral, vertical, altitude e armamentos.", "Se ALT, VS ou NAV estão diferentes do esperado, a aeronave pode obedecer algo que o piloto não pretendia.", "O erro comum é ligar o piloto automático e parar de monitorar.", "No C408, observe os anúncios de modo antes e depois de acionar o piloto automático.", "Explique a diferença entre ligar piloto automático e confirmar modos.", "A resposta deve citar modos ativos/armados e monitoramento contínuo.", "Automação exige supervisão.", "A próxima aula compara VS e FLC."),
  spec(2, "module-g1000-piloto-automatico", "Altitude selecionada", "g1000-altitude-selecionada", "30 min", ["Altitude selecionada", "Bug", "Captura", "Modo vertical"], "Entender a altitude selecionada como referência essencial para modos verticais.", "Conteúdo provisório para futura aula técnica sobre altitude selecionada.", "A altitude selecionada informa ao sistema o alvo vertical pretendido. O piloto deve conferir o bug, o modo vertical ativo e a captura esperada.", "Selecionar altitude errada pode fazer a automação cumprir perfeitamente um objetivo errado.", "O erro comum é alterar VS ou FLC sem conferir o alvo de altitude.", "No C408, ajuste uma altitude alvo e observe como ela aparece no PFD antes de ativar modo vertical.", "Por que conferir altitude selecionada antes de modos verticais?", "A resposta deve citar alvo, bug de altitude, captura e monitoramento.", "Altitude selecionada é parte da intenção formalizada no painel.", "A próxima aula compara VS e FLC."),
  spec(1, "module-g1000-vs-flc", "VS e FLC", "g1000-vs-e-flc", "30 min", ["VS", "FLC", "Velocidade", "Energia"], "Comparar modos verticais VS e FLC em termos de energia.", "Conteúdo introdutório para estudo de modos verticais.", "VS busca razão vertical; FLC busca velocidade alvo. Ambos exigem monitoramento de energia, potência e atitude.", "Uma razão vertical agressiva pode degradar velocidade; FLC ajuda preservar velocidade, mas ainda depende de potência disponível.", "O erro comum é comandar VS alto demais e só perceber a perda de velocidade tarde.", "No simulador, observe como velocidade muda em VS e como atitude muda em FLC.", "Qual diferença essencial entre VS e FLC?", "A resposta deve citar razão vertical no VS e velocidade alvo no FLC.", "Modos verticais são decisões de energia.", "A próxima aula introduz VNAV."),
  spec(1, "module-g1000-vnav", "VNAV", "g1000-vnav", "30 min", ["VNAV", "Perfil vertical", "Restrição", "Planejamento"], "Entender VNAV como planejamento vertical, não como mágica.", "Conteúdo provisório para estruturar aulas futuras de perfil vertical.", "VNAV ajuda pensar em descidas e restrições, mas depende de dados corretos, modos adequados e monitoramento do piloto.", "Para cumprir uma restrição, é preciso entender distância, altitude desejada e razão vertical necessária.", "O erro comum é esperar que o VNAV corrija planejamento atrasado.", "Crie um cenário simples de descida e compare distância restante com altitude a perder.", "O que o VNAV precisa para ser útil?", "A resposta deve citar perfil, restrição, dados corretos e monitoramento.", "VNAV começa no planejamento.", "A próxima aula introduz ILS."),
  spec(1, "module-g1000-ils", "ILS", "g1000-ils", "30 min", ["ILS", "LOC", "Glideslope", "NAV"], "Introduzir a preparação para uma aproximação ILS no G1000.", "Conteúdo introdutório para estudos IFR em simulador.", "ILS usa localizer e glideslope, normalmente com fonte NAV/LOC coerente. O G1000 deve ser configurado e monitorado antes da interceptação.", "Se a fonte estiver em GPS quando deveria estar em LOC, a consciência da aproximação fica comprometida.", "O erro comum é armar aproximação sem conferir fonte, frequência, curso e briefing.", "No simulador, carregue uma aproximação ILS e identifique fonte, curso e indicação vertical.", "Liste verificações iniciais antes de um ILS.", "A resposta deve citar fonte, frequência, curso, localizer, glideslope e briefing.", "ILS exige preparação antes da final.", "A próxima aula introduz RNAV."),
  spec(1, "module-g1000-rnav", "RNAV", "g1000-rnav", "30 min", ["RNAV", "GPS", "Sequenciamento", "Aproximação"], "Introduzir aproximações RNAV no G1000 NXi.", "Conteúdo provisório para preparar aulas práticas futuras.", "RNAV usa lógica GPS e sequenciamento. O aluno deve conferir procedimento carregado, perna ativa, mapa e indicações laterais/verticais disponíveis.", "Uma perna ativa errada pode orientar a aeronave para ponto ou curso inesperado.", "O erro comum é carregar a aproximação e não verificar perna ativa.", "No simulador, carregue uma RNAV e identifique waypoint inicial, perna ativa e sequenciamento.", "O que verificar antes de seguir uma RNAV?", "A resposta deve citar procedimento, perna ativa, mapa, sequenciamento e mínimos quando aplicável.", "RNAV exige conferência de lógica GPS.", "A próxima aula fecha com treino no C408."),
  spec(1, "module-g1000-treinamento-c408", "Treinamento no C408", "g1000-treinamento-no-c408", "30 min", ["C408", "Fluxo", "Treino", "Monitoramento"], "Aplicar o fluxo introdutório do G1000 no Cessna 408 SkyCourier.", "Conteúdo provisório para conectar o curso ao avião principal da plataforma.", "O objetivo é treinar sem pressa: manter controle da aeronave, conferir fonte, modos e mapa, e só então usar funções de navegação.", "Um bom exercício começa em voo estabilizado antes de mexer em menus.", "O erro comum é aprender o botão antes de aprender o fluxo mental.", "No C408, execute um voo curto usando PFD/MFD, CDI/HSI e um Direct-To simples.", "Descreva um fluxo seguro para treinar G1000 no C408.", "A resposta deve citar estabilizar a aeronave, confirmar fonte/modo, executar ação e monitorar desempenho.", "O G1000 deve ampliar a consciência, não roubar atenção.", "O curso fica pronto para receber aulas técnicas completas."),
  spec(2, "module-g1000-treinamento-c408", "Falhas e erros comuns", "g1000-falhas-e-erros-comuns", "30 min", ["Fonte errada", "Modo errado", "Sequenciamento", "Carga de trabalho"], "Reconhecer erros comuns ao estudar o G1000 no simulador.", "Conteúdo provisório para futura aula de falhas, armadilhas e recuperação de consciência situacional.", "A maior parte dos problemas iniciais vem de fonte errada, modo errado, plano incompleto, Direct-To usado sem critério ou excesso de atenção ao painel.", "Se algo parece errado, volte ao básico: aviate, confirme fonte/modo, confira mapa e compare com a intenção original.", "O erro comum é tentar corrigir pelo menu antes de estabilizar a aeronave.", "No C408, simule uma confusão simples de navegação e pratique recuperar o fluxo: voar, identificar, corrigir, monitorar.", "Cite três erros comuns no G1000 e como reduzir o risco.", "A resposta deve citar fonte, modo, plano/Direct-To e monitoramento da aeronave.", "O melhor uso do G1000 começa com fundamentos sólidos.", "A trilha fica preparada para aprofundamento técnico gradual.")
];

export const localLessonDocuments: LessonDocument[] = [
  ...lessonSpecs.map(createLessonDocument),
  ...garminLessonSpecs.map(createLessonDocument)
];

export const localExerciseDocuments: ExerciseDocument[] = localLessonDocuments.flatMap((lesson) => {
  const courseId = lesson.moduleId.startsWith("module-g1000-") ? "course-garmin-g1000-nxi" : "course-fundamentos-pilotagem";
  const baseId = lesson.exerciseId.replace(/-multiple-choice$/, "");

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
        "Executar comandos amplos e depois observar se o resultado ficou aceitável."
      ],
      correctAnswer: lesson.expectedAnswer,
      expectedAnswer: lesson.expectedAnswer,
      explanation: `A alternativa correta reforça o objetivo da aula: ${lesson.objective}`,
      difficulty: "facil",
      order: 1,
      points: 10,
      publicationState: "published"
    },
    {
      id: `${baseId}-true-false`,
      lessonId: lesson.id,
      moduleId: lesson.moduleId,
      courseId,
      type: "true_false",
      prompt: `Verdadeiro ou falso: ${lesson.conclusion}`,
      correctAnswer: true,
      expectedAnswer: "Verdadeiro.",
      explanation: `A afirmação resume a conclusão da aula e deve orientar a prática no simulador: ${lesson.conclusion}`,
      difficulty: "facil",
      order: 2,
      points: 5,
      publicationState: "published"
    },
    {
      id: `${baseId}-open-answer`,
      lessonId: lesson.id,
      moduleId: lesson.moduleId,
      courseId,
      type: "open_answer",
      prompt: lesson.exercisePrompt,
      expectedAnswer: lesson.expectedAnswer,
      explanation: `Compare sua resposta com a resposta esperada e marque se o conceito ficou claro para orientar a revisão.`,
      difficulty: "medio",
      order: 3,
      points: 15,
      publicationState: "published"
    }
  ];
});

export const localFinalAssessmentDocuments: FinalAssessmentDocument[] = [
  {
    id: "assessment-final-fundamentos-pilotagem",
    courseId: "course-fundamentos-pilotagem",
    slug: "avaliacao-final-fundamentos-da-pilotagem",
    title: "Avaliação final - Fundamentos da Pilotagem",
    scenario:
      "Cessna 408 SkyCourier em voo estabilizado a 7.000 pés e 140 nós. Você recebe autorização simulada para descer a 4.000 pés e reduzir para 110 nós.",
    instructions:
      "Descreva a sequência de raciocínio e execução. Esta avaliação é interna e simbólica, destinada apenas à plataforma de estudos em simulador.",
    questions: [
      {
        id: "assessment-power",
        prompt: "Como você ajustaria a potência para iniciar a descida sem deixar a velocidade fugir?",
        expectedKeywords: ["reduzir potência", "monitorar velocidade", "energia"],
        weight: 15,
        concept: "Potência e energia",
        moduleId: fundamentalsModuleIds.energy
      },
      {
        id: "assessment-attitude",
        prompt: "Qual papel da atitude na descida e na redução para 110 nós?",
        expectedKeywords: ["atitude", "razão de descida", "velocidade"],
        weight: 15,
        concept: "Atitude e desempenho",
        moduleId: fundamentalsModuleIds.energy
      },
      {
        id: "assessment-energy",
        prompt: "Explique a troca entre altitude, velocidade e energia durante o cenário.",
        expectedKeywords: ["energia potencial", "energia cinética", "gerenciamento"],
        weight: 20,
        concept: "Gerenciamento de energia",
        moduleId: fundamentalsModuleIds.energy
      },
      {
        id: "assessment-vsi",
        prompt: "Como você usaria VSI e altímetro sem perseguir instrumentos?",
        expectedKeywords: ["VSI", "altímetro", "tendência", "antecipar"],
        weight: 15,
        concept: "Tendência dos instrumentos",
        moduleId: fundamentalsModuleIds.precision
      },
      {
        id: "assessment-leveloff",
        prompt: "Quando e como você iniciaria o nivelamento em 4.000 pés?",
        expectedKeywords: ["antes", "nivelamento", "VSI", "potência"],
        weight: 20,
        concept: "Nivelamento antecipado",
        moduleId: fundamentalsModuleIds.precision
      },
      {
        id: "assessment-stabilization",
        prompt: "Como saberia que o C408 está estabilizado ao final?",
        expectedKeywords: ["4.000 pés", "110 nós", "VSI", "potência", "atitude"],
        weight: 15,
        concept: "Estabilização",
        moduleId: fundamentalsModuleIds.decision
      }
    ],
    questionCount: 4,
    passingScore: 60,
    criteria: "Aprovação com 60% ou mais, demonstrando raciocínio de energia, potência, atitude, tendência e estabilização.",
    allowRetake: true,
    shuffleQuestions: true,
    timeLimitMinutes: 30,
    publicationState: "published"
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
  const lessonId = `lesson-${item.slug}`;

  return {
    id: lessonId,
    moduleId: item.moduleId,
    title: item.title,
    slug: item.slug,
    summary: item.objective,
    introduction: item.introduction,
    didacticExplanation: item.explanation,
    example: item.example,
    commonMistake: item.mistake,
    simulatorApplication: item.simulator,
    exercisePrompt: item.exercise,
    expectedAnswer: item.expected,
    conclusion: item.conclusion,
    nextLessonConnection: item.next,
    content: [
      { id: `content-${item.slug}-intro`, type: "paragraph", text: item.introduction },
      { id: `content-${item.slug}-explanation`, type: "paragraph", text: item.explanation },
      { id: `content-${item.slug}-callout`, type: "callout", text: item.example }
    ],
    order: item.order,
    estimatedDuration: item.duration,
    objective: item.objective,
    keyConcepts: item.concepts,
    exerciseId: `exercise-${item.slug}-multiple-choice`,
    exerciseIds: [`exercise-${item.slug}-multiple-choice`, `exercise-${item.slug}-true-false`, `exercise-${item.slug}-open-answer`],
    status: "not_started",
    actions: { canComplete: true, canContinue: true, canGoBack: item.order > 1 },
    publicationState: "published"
  };
}
