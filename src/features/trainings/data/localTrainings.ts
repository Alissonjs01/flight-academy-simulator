import type { TrainingDifficulty, TrainingDocument } from "@/features/trainings/types";
import { trainingExerciseMetadata } from "@/features/technical/defaults";

const aircraftId = "aircraft-cessna-408-skycourier";
const aircraftName = "Cessna 408 SkyCourier";
const simulatorNotice = "Treinamento educacional para simulador. Procedimentos reais devem seguir AFM, POH, QRH e documentação oficial aplicavel.";

const courses = {
  fundamentals: { id: "course-fundamentos-pilotagem", slug: "fundamentos-da-pilotagem" },
  vfr: { id: "course-navegacao-ifr", slug: "navegacao-ifr" },
  ifr: { id: "course-navegacao-ifr-instrumentos", slug: "navegacao-ifr-instrumentos" },
  garmin: { id: "course-garmin-g1000-nxi", slug: "garmin-g1000-nxi" }
} as const;

const c408TrainingMetadata = trainingExerciseMetadata({
  sourceType: "internal_training_material",
  sourceTitle: "Roteiros praticos C408, Garmin G1000 NXi, VFR e IFR para Microsoft Flight Simulator",
  sourceOrganization: "Flight Academy Simulator",
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  simulatorAircraftVariant: aircraftName,
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorDeveloper: "Microsoft / Asobo, conforme instalacao do usuario",
  simulatorAdaptationNotes:
    "Roteiros didaticos para consolidar aulas no simulador. Nao incluem velocidades, limites, memory items ou procedimentos criticos sem fonte oficial aplicavel.",
  knownSimulatorDifferences:
    "A implementacao do C408 no Microsoft Flight Simulator pode apresentar diferencas de checklist, de-ice, automacao, comandos e indicacoes conforme versao do simulador."
});

type TrainingInput = {
  id: string;
  slug: string;
  title: string;
  difficulty: TrainingDifficulty;
  duration: string;
  departureAirport: string;
  destinationAirport: string;
  conditions: string;
  objective: string;
  briefing: string;
  execution: string[];
  criteria: string[];
  debrief: string[];
  relatedCourse: keyof typeof courses;
  relatedLessonSlug?: string;
};

export const localTrainingDocuments: TrainingDocument[] = [
  createTraining({
    id: "training-c408-controles-basicos",
    slug: "controles-basicos-c408",
    title: "Controles basicos e resposta da aeronave",
    difficulty: "Inicial",
    duration: "25 min",
    departureAirport: "Area local com pista longa no simulador",
    destinationAirport: "Area local",
    conditions: "Ceu claro, vento fraco, turbulencia desligada ou leve",
    objective: "Reconhecer como profundor, ailerons, leme, potencia, flaps e trim alteram atitude, velocidade e trajetoria.",
    briefing:
      "Use altitude segura e carga de trabalho baixa. O foco nao e desempenho do C408, mas perceber causa e efeito: comando pequeno, aguardar resposta, observar instrumento e horizonte.",
    execution: [
      "Estabilize voo reto e nivelado em altitude segura.",
      "Aplique pequenos comandos de profundor, aileron e leme separadamente, retornando ao voo estabilizado apos cada observacao.",
      "Altere potencia gradualmente e observe tendencia de velocidade, atitude e necessidade de trim.",
      "Configure flaps somente dentro de uma margem segura do simulador e observe tendencia de arfagem e arrasto, sem usar valores como referencia operacional real."
    ],
    criteria: [
      "O aluno identifica o efeito primario de cada comando.",
      "As correcoes sao pequenas e verificadas nos instrumentos.",
      "O aluno evita comandos amplos e consegue voltar ao estado estabilizado."
    ],
    debrief: [
      "Qual comando gerou maior tendencia inesperada?",
      "Voce corrigiu antes de observar a resposta completa da aeronave?",
      "O trim foi usado para aliviar esforco ou para mascarar aeronave mal estabilizada?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "a-cadeia-de-controle"
  }),
  createTraining({
    id: "training-c408-voo-nivelado",
    slug: "voo-nivelado-c408",
    title: "Voo reto e nivelado",
    difficulty: "Inicial",
    duration: "25 min",
    departureAirport: "Qualquer aeroporto com area livre",
    destinationAirport: "Mesmo aeroporto ou area local",
    conditions: "Ceu claro, vento leve",
    objective: "Manter altitude, proa e velocidade com pequenas correcoes e leitura continua dos instrumentos.",
    briefing:
      "Voo nivelado nao e congelar a aeronave. E perceber tendencia cedo, corrigir pouco e confirmar se a tendencia mudou.",
    execution: [
      "Estabilize a aeronave em altitude segura.",
      "Escolha uma proa e mantenha referencia externa e HSI coerentes.",
      "Use atitude para altitude, potencia para energia e trim para reduzir carga apos estabilizar.",
      "A cada minuto, verbalize: altitude, proa, velocidade, tendencia e proxima correcao."
    ],
    criteria: [
      "Altitude, proa e velocidade permanecem dentro de metas pessoais razoaveis.",
      "As correcoes sao pequenas e espacadas.",
      "O aluno consegue explicar atitude, potencia, trim e tendencia."
    ],
    debrief: [
      "A aeronave ficou realmente estabilizada ou voce corrigiu o tempo inteiro?",
      "Voce olhou para fora ou ficou preso ao painel?",
      "Qual foi o primeiro sinal de desvio: atitude, altimetro, VSI ou velocidade?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "potencia-e-atitude"
  }),
  createTraining({
    id: "training-c408-curvas-coordenadas",
    slug: "curvas-coordenadas-c408",
    title: "Curvas coordenadas",
    difficulty: "Inicial",
    duration: "30 min",
    departureAirport: "Area local",
    destinationAirport: "Area local",
    conditions: "VFR, vento fraco, altitude segura",
    objective: "Executar curvas rasas mantendo altitude, velocidade e coordenacao, sem perseguir instrumentos isolados.",
    briefing:
      "A curva correta combina inclinacao, leme, profundor, potencia quando necessario e scan. O objetivo e entender a tendencia, nao fazer acrobacia.",
    execution: [
      "Entre em curva rasa para um lado e estabilize a inclinacao.",
      "Observe altitude, velocidade, coordenacao e proa de saida.",
      "Repita para o outro lado, usando menos comando e mais antecipacao.",
      "Finalize em proa escolhida e nivele as asas sem oscilar."
    ],
    criteria: [
      "A inclinacao nao aumenta sem controle.",
      "Altitude e velocidade permanecem previsiveis.",
      "O aluno coordena leme e aileron sem olhar apenas para um instrumento."
    ],
    debrief: [
      "Voce perdeu altitude por esquecer profundor?",
      "Voce saiu da curva na proa planejada?",
      "A bola/indicacao de coordenacao mostrou guinada desnecessaria?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "a-cadeia-de-controle"
  }),
  createTraining({
    id: "training-c408-subida-nivelamento",
    slug: "subida-e-nivelamento-c408",
    title: "Subida e nivelamento",
    difficulty: "Inicial",
    duration: "30 min",
    departureAirport: "Area local",
    destinationAirport: "Area local",
    conditions: "Vento leve, visibilidade boa",
    objective: "Praticar subida estabilizada e antecipacao do nivelamento sem depender de valores nao verificados.",
    briefing:
      "A subida deve ser planejada: atitude, potencia, velocidade, vigilancia dos motores e antecipacao do nivelamento.",
    execution: [
      "Defina altitude alvo e verbalize o plano de subida.",
      "Ajuste atitude e potencia de forma progressiva.",
      "Monitore velocidade, altimetro, VSI e indicacoes dos motores.",
      "Inicie o nivelamento antes da altitude alvo e reestabilize potencia, atitude e trim."
    ],
    criteria: [
      "O nivelamento comeca antes do alvo.",
      "Velocidade estabiliza apos nivelar.",
      "Nao ha comando brusco nem fixacao exclusiva no VSI."
    ],
    debrief: [
      "Voce chegou alto, baixo ou oscilando?",
      "Qual instrumento avisou primeiro que era hora de nivelar?",
      "A potencia foi ajustada cedo ou tarde demais?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "subidas"
  }),
  createTraining({
    id: "training-c408-descida-estabilizada",
    slug: "descida-estabilizada-c408",
    title: "Descida estabilizada",
    difficulty: "Inicial",
    duration: "30 min",
    departureAirport: "Area local",
    destinationAirport: "Area local",
    conditions: "Ceu claro, sem turbulencia relevante",
    objective: "Executar descida com razao, velocidade e energia previsiveis.",
    briefing:
      "Descida boa comeca antes do destino. Reduzir potencia sem pensar em energia costuma gerar aceleracao ou perfil instavel.",
    execution: [
      "Escolha altitude inicial, altitude final e distancia aproximada.",
      "Reduza potencia gradualmente e ajuste atitude para uma razao de descida confortavel.",
      "Monitore IAS, VSI, altimetro e distancia ate o ponto de nivelamento.",
      "Nivele com antecedencia e estabilize novamente."
    ],
    criteria: [
      "Razao de descida previsivel.",
      "Velocidade controlada.",
      "Nivelamento antecipado e sem grande oscilacao."
    ],
    debrief: [
      "A aeronave acelerou demais?",
      "Voce planejou a descida ou apenas reagiu?",
      "Qual correcao teria deixado o perfil mais suave?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "descidas"
  }),
  createTraining({
    id: "training-c408-trim",
    slug: "trim-e-controle-fino-c408",
    title: "Trim e controle fino",
    difficulty: "Inicial",
    duration: "20 min",
    departureAirport: "Area local",
    destinationAirport: "Area local",
    conditions: "VFR simples, vento leve",
    objective: "Usar trim para reduzir carga depois de estabilizar a aeronave, nao para corrigir erro grosseiro.",
    briefing:
      "Trim mal usado cria oscilacao e mascara configuracao ruim. Primeiro estabilize atitude e potencia; depois alivie o comando.",
    execution: [
      "Estabilize voo nivelado e observe esforco necessario no manche.",
      "Aplique pequenas entradas de trim e espere a resposta.",
      "Repita em subida e descida estabilizadas.",
      "Compare uma aproximacao com trim bem ajustado e outra corrigida apenas no manche."
    ],
    criteria: [
      "Trim aplicado em pequenos incrementos.",
      "Aeronave estabilizada antes do ajuste.",
      "Aluno reconhece quando o trim esta demais."
    ],
    debrief: [
      "O trim reduziu carga ou criou nova tendencia?",
      "Voce usou trim antes de estabilizar?",
      "Como isso afetou flare e aproximacao?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "novo-equilibrio"
  }),
  createTraining({
    id: "training-c408-reducao-velocidade",
    slug: "reducao-de-velocidade-c408",
    title: "Reducao de velocidade mantendo altitude",
    difficulty: "Inicial",
    duration: "25 min",
    departureAirport: "Area local",
    destinationAirport: "Area local",
    conditions: "Voo nivelado em condicao simples",
    objective: "Reduzir velocidade sem transformar o exercicio em descida acelerada ou oscilacao de altitude.",
    briefing:
      "Ao reduzir potencia, a aeronave tende a perder energia. Para manter altitude, ajuste atitude, espere resposta e reconfigure com metodo.",
    execution: [
      "Estabilize em voo nivelado.",
      "Reduza potencia gradualmente e observe a tendencia de velocidade.",
      "Use atitude para sustentar altitude, evitando puxar em excesso.",
      "Reaplique potencia e estabilize novamente."
    ],
    criteria: [
      "Altitude preservada com pequenas variacoes.",
      "Velocidade reduzida sem oscilacao grande.",
      "Aluno verbaliza tendencia antes de corrigir."
    ],
    debrief: [
      "A aeronave perdeu altitude ou velocidade demais?",
      "Voce corrigiu com atitude, potencia ou trim?",
      "O que mudaria se estivesse configurando para aproximacao?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "reducao-de-velocidade-mantendo-altitude"
  }),
  createTraining({
    id: "training-c408-voo-lento-estol",
    slug: "voo-lento-reconhecimento-estol-c408",
    title: "Voo lento, reconhecimento de estol e recuperacao no simulador",
    difficulty: "Intermediário",
    duration: "35 min",
    departureAirport: "Area local em altitude segura",
    destinationAirport: "Area local",
    conditions: "VFR, turbulencia desligada, altitude suficiente para recuperacao",
    objective: "Reconhecer baixa energia e aproximacao de estol como conceito, sem tratar o roteiro como procedimento real do C408.",
    briefing:
      "O exercicio e conceitual. Use altitude segura, reduza carga de trabalho e nao extrapole valores tecnicos do C408 sem manual aplicavel.",
    execution: [
      "Estabilize em altitude segura e reduza potencia de forma planejada.",
      "Observe atitude, velocidade, comandos mais pesados, tendencia de afundamento e alertas do simulador.",
      "Recupere priorizando reducao do angulo de ataque, controle direcional e energia.",
      "Debata por que tentar sustentar altitude a qualquer custo pode piorar o estol."
    ],
    criteria: [
      "Aluno reconhece sinais antes de perder controle.",
      "Recuperacao prioriza controle e energia.",
      "Nao foram usados memory items inventados."
    ],
    debrief: [
      "Qual sinal apareceu primeiro?",
      "Voce tentou puxar para salvar altitude?",
      "Como peso e configuracao poderiam alterar a margem?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "estol"
  }),
  createTraining({
    id: "training-c408-circuito",
    slug: "circuito-visual-c408",
    title: "Circuito visual",
    difficulty: "Intermediário",
    duration: "35 min",
    departureAirport: "Aerodromo simples no simulador",
    destinationAirport: "Mesmo aerodromo",
    conditions: "VFR diurno, vento leve ou moderado",
    objective: "Executar um circuito visual completo com briefing, referencias, estabilizacao e decisao de arremeter.",
    briefing:
      "O circuito deve ser uma sequencia planejada: pista, vento, perna, distancia lateral, configuracao, final e plano de arremetida.",
    execution: [
      "Escolha pista considerando vento e obstaculos visuais.",
      "Decole, suba, entre no circuito e verbalize cada perna.",
      "Prepare configuracao com antecedencia, sem correr atras da aeronave na final.",
      "Arremeta se alto, rapido, desalinhado ou sem estabilidade."
    ],
    criteria: [
      "Perna do vento, base e final reconhecidas.",
      "Aproximacao estabilizada antes da decisao de pouso.",
      "Arremetida e tratada como resultado aceitavel."
    ],
    debrief: [
      "Voce entrou largo ou apertado demais?",
      "A configuracao ficou pronta antes da final?",
      "Houve momento em que a arremetida seria a melhor decisao?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "exercicio-final-fundamentos"
  }),
  createTraining({
    id: "training-c408-decolagem",
    slug: "decolagem-c408",
    title: "Decolagem e subida inicial",
    difficulty: "Intermediário",
    duration: "30 min",
    departureAirport: "Pista longa no simulador",
    destinationAirport: "Circuito local",
    conditions: "VFR diurno, vento alinhado no inicio",
    objective: "Treinar alinhamento, aplicacao progressiva de potencia, controle direcional, rotacao conceitual e subida inicial.",
    briefing:
      "Nao use velocidades especificas sem fonte. O foco e reconhecer pista, proa, instrumentos vivos, controle direcional e decisao de rejeitar em nivel introdutorio.",
    execution: [
      "Faça briefing de pista, vento, obstaculos e acao caso algo esteja anormal.",
      "Alinhe, confirme proa e pista, aplique potencia de forma progressiva.",
      "Monitore instrumentos, controle direcional e atitude.",
      "Apos sair do solo, estabilize subida inicial antes de mexer em navegacao ou automacao."
    ],
    criteria: [
      "Pista e proa confirmadas antes da corrida.",
      "Controle direcional mantido.",
      "Subida inicial estabilizada antes de outras tarefas."
    ],
    debrief: [
      "Voce ficou atras da aeronave apos a decolagem?",
      "Algum alerta foi ignorado?",
      "O que justificaria rejeitar a decolagem no simulador?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "exercicio-final-fundamentos"
  }),
  createTraining({
    id: "training-c408-aproximacao-estabilizada",
    slug: "aproximacao-estabilizada-c408",
    title: "Aproximacao estabilizada",
    difficulty: "Intermediário",
    duration: "35 min",
    departureAirport: "Aerodromo simples no simulador",
    destinationAirport: "Mesmo aerodromo",
    conditions: "VFR, vento leve, visibilidade boa",
    objective: "Praticar criterios de estabilidade e decisao antes do pouso.",
    briefing:
      "Aproximacao boa e previsivel. Se a aeronave chega alta, rapida, desalinhada ou atrasada na configuracao, arremeter e a decisao correta no treino.",
    execution: [
      "Entre na perna final com antecedencia e energia controlada.",
      "Monitore alinhamento, razao de descida, velocidade e configuracao.",
      "Escolha ponto de toque visual e acompanhe tendencia.",
      "Arremeta se os criterios nao forem atendidos."
    ],
    criteria: [
      "Criterios de estabilidade verbalizados.",
      "Correcoes pequenas e antecipadas.",
      "Arremetida escolhida quando o perfil ficar instavel."
    ],
    debrief: [
      "A final ficou estabilizada?",
      "Voce tentou salvar uma aproximacao ruim?",
      "Qual criterio teria interrompido a tentativa?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "aproximacao-estabilizada"
  }),
  createTraining({
    id: "training-c408-pouso",
    slug: "pouso-c408",
    title: "Pouso e controle apos toque",
    difficulty: "Intermediário",
    duration: "35 min",
    departureAirport: "Circuito local",
    destinationAirport: "Mesmo aerodromo",
    conditions: "VFR, vento leve, pista longa",
    objective: "Treinar transicao, flare, toque, controle direcional e desaceleracao no simulador.",
    briefing:
      "O objetivo nao e pouso bonito a qualquer custo. E aproximacao estabilizada, toque controlado e gerenciamento seguro apos o pouso.",
    execution: [
      "Execute circuito ou aproximacao visual estabilizada.",
      "Na transicao, reduza taxa de descida com comandos pequenos.",
      "Apos o toque, mantenha eixo da pista e use desaceleracao de forma progressiva.",
      "Observe efeito de beta, reverso e freios apenas como comportamento do simulador, sem tratar como tecnica oficial."
    ],
    criteria: [
      "Toque ocorre apos aproximacao estabilizada.",
      "Controle direcional mantido apos pouso.",
      "Aluno diferencia beta, reverso e freio em nivel conceitual."
    ],
    debrief: [
      "O flare atrasou ou antecipou demais?",
      "O aviao permaneceu no eixo?",
      "A desaceleracao foi planejada ou brusca?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "aproximacao-estabilizada"
  }),
  createTraining({
    id: "training-c408-arremetida",
    slug: "arremetida-c408",
    title: "Arremetida",
    difficulty: "Intermediário",
    duration: "30 min",
    departureAirport: "Aerodromo simples no simulador",
    destinationAirport: "Circuito visual",
    conditions: "Condicoes visuais",
    objective: "Tratar arremetida como decisao normal de seguranca no simulador.",
    briefing:
      "Arremeter nao e fracasso. E interromper uma situacao que ficou instavel, reorganizar a aeronave e tentar de novo com metodo.",
    execution: [
      "Configure uma aproximacao simples.",
      "Declare arremetida quando alto, rapido, desalinhado ou atrasado na configuracao.",
      "Priorize atitude, potencia, controle direcional, configuracao e trajetoria.",
      "Reentre no circuito ou execute nova aproximacao planejada."
    ],
    criteria: [
      "Decisao sem atraso.",
      "Controle mantido durante transicao.",
      "Aluno explica por que arremeteu e como reorganizou a carga de trabalho."
    ],
    debrief: [
      "Qual foi o gatilho da arremetida?",
      "Voce configurou demais antes de controlar atitude?",
      "Como seria a nova tentativa?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "aproximacao-estabilizada"
  }),
  createTraining({
    id: "training-c408-taxi",
    slug: "taxi-do-c408",
    title: "Taxi do C408",
    difficulty: "Inicial",
    duration: "25 min",
    departureAirport: "Patio amplo no simulador",
    destinationAirport: "Ponto de espera da pista",
    conditions: "Vento leve, trafego desligado ou reduzido",
    objective: "Praticar controle de velocidade, direcao, frenagem e consciencia de area no solo.",
    briefing:
      "O C408 e uma aeronave utilitaria maior que treinadores leves. No simulador, use potencia, beta e freios de forma progressiva e observe sensibilidade.",
    execution: [
      "Planeje a rota de taxi antes de liberar freios.",
      "Use potencia minima para iniciar movimento e reduza assim que a aeronave rolar.",
      "Pratique curvas amplas, parada suave e alinhamento em taxiway.",
      "Observe se beta/reverso e freios estao sendo usados como muleta para excesso de velocidade."
    ],
    criteria: [
      "Velocidade de taxi permanece controlada.",
      "Curvas nao invadem areas indesejadas.",
      "Aluno antecipa paradas e evita frenagem brusca."
    ],
    debrief: [
      "Voce acelerou mais do que precisava?",
      "O uso de freio foi continuo ou pontual?",
      "A rota de taxi foi planejada antes de mover?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "exercicio-final-fundamentos"
  }),
  createTraining({
    id: "training-c408-partida",
    slug: "partida-do-c408",
    title: "Partida do C408 no simulador",
    difficulty: "Intermediário",
    duration: "30 min",
    departureAirport: "Patio com aeronave fria e escura no simulador",
    destinationAirport: "Patio",
    conditions: "Cenario parado, sem pressa operacional",
    objective: "Entender a logica de preparacao, area livre, energizacao, partida e estabilizacao sem inventar checklist oficial.",
    briefing:
      "Use o checklist educacional da plataforma e compare com o checklist do simulador. Qualquer divergencia tecnica deve ser tratada como ponto de revisao, nao como verdade operacional.",
    execution: [
      "Prepare cabine, freios, area externa, fontes eletricas e avisos.",
      "Execute a sequencia de partida conforme recursos do simulador e checklist educacional.",
      "Observe indicacoes de motor, geradores, alertas e estabilizacao.",
      "Repita identificando quais controles sao funcionais e quais parecem apenas visuais."
    ],
    criteria: [
      "Aluno nao pula preparacao de area livre e alertas.",
      "Estabilizacao de cada motor e confirmada antes de prosseguir.",
      "Divergencias do simulador sao registradas para revisao."
    ],
    debrief: [
      "Qual alerta apareceu antes ou depois da partida?",
      "Algum controle parecia visual e nao funcional?",
      "O checklist do simulador ficou coerente com o fluxo observado?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "exercicio-final-fundamentos"
  }),
  createTraining({
    id: "training-c408-beta-reverso",
    slug: "beta-e-reverso-c408",
    title: "Beta, reverso e desaceleracao no simulador",
    difficulty: "Intermediário",
    duration: "25 min",
    departureAirport: "Pista longa ou taxiway ampla no simulador",
    destinationAirport: "Mesmo local",
    conditions: "Sem trafego, vento leve",
    objective: "Diferenciar conceitualmente beta, reverso e freios, observando a implementacao do simulador.",
    briefing:
      "Nao trate o exercicio como autorizacao operacional real. O foco e sentir como o simulador representa baixa tracao, desaceleracao e controle direcional.",
    execution: [
      "Em taxi, compare desaceleracao com reducao de potencia, beta e freios.",
      "Apos pouso em pista longa, observe efeito de beta/reverso com comandos progressivos.",
      "Registre qualquer comportamento exagerado, atraso de resposta ou dificuldade de controle direcional.",
      "Repita reduzindo uso de freios para melhorar antecipacao."
    ],
    criteria: [
      "Aluno diferencia os recursos sem confundir conceitos.",
      "Nao ha uso brusco em baixa consciencia direcional.",
      "Comportamento do simulador e registrado como observacao, nao como fonte oficial."
    ],
    debrief: [
      "Beta foi usado para controlar taxi ou para corrigir excesso de velocidade?",
      "O reverso afetou direcao?",
      "Qual tecnica do simulador precisa ser confirmada em fonte oficial?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "aproximacao-estabilizada"
  }),
  createTraining({
    id: "training-c408-peso-combustivel",
    slug: "peso-combustivel-c408",
    title: "Configuracao de peso e combustivel",
    difficulty: "Intermediário",
    duration: "30 min",
    departureAirport: "Menu de peso e combustivel do simulador",
    destinationAirport: "Voo local curto",
    conditions: "Cenario parado, depois voo local VFR",
    objective: "Entender como carga, combustivel e peso afetam planejamento, desempenho e controle no simulador.",
    briefing:
      "Nao preencha tudo no maximo. Planeje missao, carga, combustivel, alternado e margem. Sem envelope oficial, use o simulador como laboratorio didatico.",
    execution: [
      "Crie uma configuracao leve e uma configuracao mais pesada dentro dos limites que o simulador permitir.",
      "Compare taxi, aceleracao, subida, nivelamento e aproximacao.",
      "Observe mudancas de energia, resposta aos comandos e necessidade de planejamento antecipado.",
      "Registre que valores reais dependem de AFM/POH e tabelas oficiais."
    ],
    criteria: [
      "Aluno explica relacao entre peso, combustivel e desempenho.",
      "Nao usa um numero unico como verdade universal.",
      "Debrief separa observacao do simulador de dado tecnico oficial."
    ],
    debrief: [
      "Qual configuracao exigiu mais antecipacao?",
      "A subida mudou de forma perceptivel?",
      "Voce manteve combustivel e alternado coerentes com a missao?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "pave"
  }),
  createTraining({
    id: "training-c408-g1000-pfd-mfd-fma",
    slug: "leitura-pfd-mfd-fma-c408",
    title: "Leitura de PFD, MFD e FMA",
    difficulty: "Intermediário",
    duration: "30 min",
    departureAirport: "Area local",
    destinationAirport: "Area local",
    conditions: "VFR simples com piloto automatico disponivel",
    objective: "Organizar a leitura de atitude, navegacao, mapa, fonte ativa e modos de voo antes de usar automacao.",
    briefing:
      "Antes de apertar botoes, confirme o que o G1000 esta mostrando. O Flight Mode Annunciator e a fonte ativa dizem se a aeronave entendeu sua intencao.",
    execution: [
      "Em voo estabilizado, identifique no PFD atitude, velocidade, altitude, HSI/CDI e FMA.",
      "No MFD, acompanhe mapa, plano ou destino ativo e distancia.",
      "Alterne cenarios de HDG e NAV observando modo armado e ativo.",
      "Explique cada indicacao antes de mudar a proxima configuracao."
    ],
    criteria: [
      "Fonte ativa e FMA conferidos antes de cada comando.",
      "Aluno distingue mapa bonito de navegacao correta.",
      "Nao ha manipulacao longa do painel enquanto a aeronave fica instavel."
    ],
    debrief: [
      "O FMA mostrou o modo esperado?",
      "A fonte GPS/NAV estava correta?",
      "Voce percebeu algum atraso ou comportamento especifico do simulador?"
    ],
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-pfd-e-mfd"
  }),
  createTraining({
    id: "training-c408-g1000-flight-plan",
    slug: "plano-de-voo-g1000-c408",
    title: "Plano de voo no G1000",
    difficulty: "Intermediário",
    duration: "35 min",
    departureAirport: "Aeroporto simples no simulador",
    destinationAirport: "Aeroporto proximo",
    conditions: "VFR ou IFR simples, baixa carga de trabalho",
    objective: "Conferir origem, destino, waypoints, perna ativa e sequenciamento antes de confiar no GPS.",
    briefing:
      "Um plano carregado nao significa plano correto. O aluno deve conferir rota, perna ativa, distancia e coerencia com a carta ou briefing.",
    execution: [
      "Carregue uma rota curta no simulador ou no G1000.",
      "Confirme origem, destino, waypoints, perna ativa e distancia ate o proximo ponto.",
      "Durante o voo, acompanhe sequenciamento e compare com referencias externas ou carta.",
      "Se algo parecer errado, pause a manipulacao, mantenha controle e reavalie."
    ],
    criteria: [
      "Plano conferido antes da decolagem ou ainda no solo.",
      "Perna ativa e destino fazem sentido.",
      "Aluno reconhece waypoint duplicado, perna errada ou Direct-To indevido."
    ],
    debrief: [
      "O GPS levou para onde voce esperava?",
      "Voce conferiu a rota antes de seguir a linha magenta?",
      "Qual erro de programacao seria perigoso em IMC?"
    ],
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-flight-plan"
  }),
  createTraining({
    id: "training-c408-g1000-navegacao",
    slug: "navegacao-basica-g1000-c408",
    title: "Navegacao basica com G1000",
    difficulty: "Intermediário",
    duration: "35 min",
    departureAirport: "Aeroporto simples no simulador",
    destinationAirport: "Waypoint proximo",
    conditions: "VFR, baixa carga de trabalho",
    objective: "Usar G1000 em navegacao simples sem perder controle da aeronave.",
    briefing:
      "GPS e ferramenta de apoio. Primeiro voe a aeronave; depois confirme fonte ativa, HSI, CDI, mapa e distancia.",
    execution: [
      "Estabilize o C408 em altitude segura.",
      "Confirme PFD, MFD, CDI/HSI e fonte ativa.",
      "Execute navegacao basica ou Direct-To simples.",
      "Compare o rumo sugerido com referencias visuais e com a posicao no mapa."
    ],
    criteria: [
      "Fonte ativa conferida.",
      "Mapa e instrumentos coerentes.",
      "A aeronave permanece estabilizada durante uso do painel."
    ],
    debrief: [
      "Voce usou GPS para confirmar ou para substituir todo o raciocinio?",
      "A aeronave saiu de atitude enquanto voce mexia no painel?",
      "O Direct-To preservou ou quebrou seu plano?"
    ],
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-direct-to"
  }),
  createTraining({
    id: "training-c408-g1000-hdg-nav-alt",
    slug: "hdg-nav-alt-c408",
    title: "HDG, NAV e ALT",
    difficulty: "Intermediário",
    duration: "30 min",
    departureAirport: "Area local",
    destinationAirport: "Area local",
    conditions: "VFR simples",
    objective: "Praticar modos laterais e captura de altitude entendendo modo armado e ativo.",
    briefing:
      "HDG segue seletor de proa; NAV segue fonte de navegacao quando capturada; ALT mantem altitude capturada. O FMA confirma o que esta ativo.",
    execution: [
      "Estabilize voo e ative Flight Director ou piloto automatico quando apropriado no simulador.",
      "Use HDG para voar proas selecionadas.",
      "Prepare NAV somente quando fonte e interceptacao fizerem sentido.",
      "Selecione altitude, acompanhe captura e confirme ALT no FMA."
    ],
    criteria: [
      "Aluno diferencia modo armado de ativo.",
      "Fonte NAV/GPS e conferida antes de NAV.",
      "ALT captura sem surpresa de nivelamento."
    ],
    debrief: [
      "O FMA confirmou o modo esperado?",
      "Voce esperava NAV capturar quando ainda nao havia interceptacao?",
      "A altitude selecionada estava correta antes da subida ou descida?"
    ],
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-piloto-automatico"
  }),
  createTraining({
    id: "training-c408-g1000-vs-flc",
    slug: "vs-flc-c408",
    title: "VS e FLC",
    difficulty: "Intermediário",
    duration: "30 min",
    departureAirport: "Area local",
    destinationAirport: "Area local",
    conditions: "VFR simples, altitude suficiente",
    objective: "Comparar controle vertical por razao de subida/descida e por velocidade alvo no simulador.",
    briefing:
      "VS mira razao vertical; FLC/IAS mira velocidade enquanto gerencia a trajetoria vertical. Ambos exigem potencia e monitoramento.",
    execution: [
      "Selecione altitude alvo e use VS com razao moderada.",
      "Observe velocidade e potencia necessaria para sustentar o perfil.",
      "Repita usando FLC/IAS quando disponivel na implementacao do simulador.",
      "Compare qual modo manteve melhor margem de velocidade."
    ],
    criteria: [
      "Aluno nao deixa VS levar a baixa velocidade.",
      "FLC/IAS e interpretado como ferramenta, nao piloto autonomo magico.",
      "FMA e altitude selecionada sao conferidos."
    ],
    debrief: [
      "A velocidade ficou protegida?",
      "A razao vertical escolhida era realista para a energia disponivel?",
      "Houve diferenca de comportamento do simulador?"
    ],
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-vs-e-flc"
  }),
  createTraining({
    id: "training-c408-g1000-apr-ils",
    slug: "apr-ils-c408",
    title: "APR e ILS",
    difficulty: "Avançado",
    duration: "45 min",
    departureAirport: "Aeroporto com ILS no simulador",
    destinationAirport: "Mesmo aeroporto ou destino curto",
    conditions: "IMC leve ou VMC com teto alto para treino inicial",
    objective: "Preparar e monitorar uma interceptacao ILS sem confundir GPS, NAV, LOC e glideslope.",
    briefing:
      "Use cartas apenas de fonte oficial quando praticar procedimento real. Aqui o foco e conceito: frequencia, curso, fonte, APR, FMA, localizer, glideslope, minima e arremetida.",
    execution: [
      "Configure uma aproximacao ILS curta e revise pista, curso e minima de forma educacional.",
      "Confirme fonte NAV/LOC apropriada e armamento APR.",
      "Intercepte localizer antes de esperar glideslope.",
      "Se nao capturar, voe manual ou HDG com seguranca, reavalie fonte, curso e FMA."
    ],
    criteria: [
      "Fonte e FMA conferidos antes da interceptacao.",
      "Aluno nao desce abaixo de minima sem referencia visual no treino IFR.",
      "Missed approach e tratado como opcao planejada."
    ],
    debrief: [
      "O localizer foi capturado antes do glideslope?",
      "APR estava armado ou apenas NAV/HDG ativo?",
      "Qual seria sua decisao na minima?"
    ],
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-ils"
  }),
  createTraining({
    id: "training-c408-g1000-rnav",
    slug: "rnav-c408",
    title: "RNAV no G1000",
    difficulty: "Avançado",
    duration: "45 min",
    departureAirport: "Aeroporto com aproximacao RNAV no simulador",
    destinationAirport: "Mesmo aeroporto ou destino curto",
    conditions: "VMC ou IMC leve controlado",
    objective: "Carregar, ativar, monitorar e revisar uma aproximacao RNAV no simulador.",
    briefing:
      "RNAV depende de sequenciamento correto, fonte GPS, waypoint ativo e entendimento de minimos. Nao trate guiamento vertical do simulador como garantia universal.",
    execution: [
      "Carregue uma aproximacao RNAV apropriada ao aeroporto escolhido.",
      "Confirme transicao, waypoint ativo, fonte GPS e sequencia.",
      "Acompanhe orientacao lateral e vertical quando disponivel.",
      "Execute missed approach se a aproximacao ficar instavel ou se nao houver referencia visual na minima."
    ],
    criteria: [
      "A aproximacao esta carregada e ativa corretamente.",
      "Aluno entende LNAV/LPV em nivel introdutorio.",
      "Missed approach e preparado antes da minima."
    ],
    debrief: [
      "A perna ativa era a esperada?",
      "Voce identificou minima e ponto de arremetida?",
      "O GPS estava orientando ou voce seguiu uma linha sem briefing?"
    ],
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-rnav"
  }),
  createTraining({
    id: "training-c408-g1000-missed",
    slug: "missed-approach-g1000-c408",
    title: "Missed approach com G1000",
    difficulty: "Avançado",
    duration: "40 min",
    departureAirport: "Aeroporto com procedimento de aproximacao no simulador",
    destinationAirport: "Mesmo aeroporto",
    conditions: "VMC inicialmente; depois IMC leve opcional",
    objective: "Executar arremetida IFR conceitual, reorganizar modos e seguir a logica de missed approach no simulador.",
    briefing:
      "Nao invente procedimento publicado. Use carta oficial quando aplicavel; se for treino livre, trate como exercicio de conceito e mantenha altitude/rota seguras.",
    execution: [
      "Briefing antes da aproximacao: gatilho da arremetida, direcao inicial, altitude e navegacao.",
      "Ao decidir arremeter, controle atitude e potencia antes de mexer no painel.",
      "Confirme FMA, fonte, modo lateral e vertical.",
      "Reorganize para nova aproximacao ou alternado."
    ],
    criteria: [
      "Decisao tomada sem atraso.",
      "Aeronave estabilizada antes de reprogramacao extensa.",
      "Aluno explica como o G1000 sequenciou ou nao o missed."
    ],
    debrief: [
      "Voce arremeteu no momento certo?",
      "O FMA mostrou modos coerentes?",
      "Voce ficou atras da aeronave ao reprogramar?"
    ],
    relatedCourse: "ifr",
    relatedLessonSlug: "ifr-missed-approach-arremetida"
  }),
  createTraining({
    id: "training-vfr-completo-c408",
    slug: "voo-vfr-completo-c408",
    title: "Voo VFR completo",
    difficulty: "Intermediário",
    duration: "60 min",
    departureAirport: "Origem escolhida pelo aluno com referencias visuais claras",
    destinationAirport: "Destino proximo com pista simples",
    conditions: "VFR diurno, teto e visibilidade confortaveis",
    objective: "Planejar, executar e revisar um voo VFR curto usando referencias visuais, tempo, vento e GPS apenas como apoio.",
    briefing:
      "Escolha rota curta, checkpoints claros e alternado simples. Nao invente frequencias ou dados de carta; use informacoes oficiais quando escolher aerodromos reais.",
    execution: [
      "Planeje rota, checkpoints, vento, combustivel simulado e alternado.",
      "Decole, navegue por referencias externas e use cronometro.",
      "Use G1000 para confirmar posicao, distancia e tempo estimado.",
      "Entre no circuito do destino e faca debriefing completo."
    ],
    criteria: [
      "Checkpoints identificados visualmente.",
      "Correcoes de vento explicadas.",
      "GPS usado como apoio, nao como unica fonte de consciencia situacional."
    ],
    debrief: [
      "Em que ponto voce ficou mais incerto da posicao?",
      "O tempo estimado bateu com o cronometro?",
      "A decisao de continuar, retornar ou alternar foi clara?"
    ],
    relatedCourse: "vfr",
    relatedLessonSlug: "vfr-voo-completo-planejado"
  }),
  createTraining({
    id: "training-ifr-completo-c408",
    slug: "voo-ifr-completo-c408",
    title: "Voo IFR completo",
    difficulty: "Avançado",
    duration: "75 min",
    departureAirport: "Origem com procedimento IFR disponivel no simulador",
    destinationAirport: "Destino com aproximacao ILS ou RNAV",
    conditions: "IMC leve controlado ou VMC com simulacao de regras IFR",
    objective: "Integrar plano IFR, cartas, automacao, navegacao, aproximacao, minima e missed approach planejado.",
    briefing:
      "Use cartas oficiais quando escolher rota real. O roteiro ensina logica IFR; nao substitui habilitacao, controle real ou publicacoes oficiais.",
    execution: [
      "Briefing de rota, saida, chegada, aproximacao, minimos, alternado e missed.",
      "Configure Garmin no solo, conferindo plano, fonte, altitude e FMA.",
      "Execute saida, rota, chegada e aproximacao sem ficar atras da aeronave.",
      "Finalize com pouso estabilizado ou missed approach e alternado."
    ],
    criteria: [
      "Cada fase tem briefing antes da execucao.",
      "FMA, fonte e altitude sao confirmados em cada mudanca.",
      "Aluno identifica quando a aproximacao deve ser interrompida."
    ],
    debrief: [
      "Voce sabia o proximo ponto antes de chegar nele?",
      "Algum modo ficou armado sem capturar?",
      "A aproximacao terminou por criterio ou por improviso?"
    ],
    relatedCourse: "ifr",
    relatedLessonSlug: "ifr-voo-completo"
  }),
  createTraining({
    id: "training-scenario-vfr-perda-posicao",
    slug: "cenario-perda-posicao-vfr",
    title: "Cenario: perda temporaria de posicao em VFR",
    difficulty: "Intermediário",
    duration: "40 min",
    departureAirport: "Rota VFR curta escolhida pelo aluno",
    destinationAirport: "Destino ou alternado visual",
    conditions: "VFR com referencias parcialmente repetitivas",
    objective: "Reconhecer incerteza de posicao, reduzir carga de trabalho e recuperar orientacao com metodo.",
    briefing:
      "Comece sem mapa externo. Use referencias planejadas, cronometro e depois G1000 como apoio para confirmar, nao para esconder o erro.",
    execution: [
      "Voe uma rota com checkpoints visuais e cronometro.",
      "Ao perceber que a referencia nao apareceu, mantenha controle e altitude segura.",
      "Identifique ultima posicao conhecida, proa, tempo decorrido e referencias maiores.",
      "Use GPS/Direct-To apenas depois de declarar o raciocinio e decidir retorno, alternado ou retomada da rota."
    ],
    criteria: [
      "Aluno reconhece incerteza sem continuar por orgulho.",
      "Controle da aeronave e mantido.",
      "Decisao final e explicada: retornar, alternar ou recuperar rota."
    ],
    debrief: [
      "Qual foi a ultima posicao confiavel?",
      "Voce reduziu a carga de trabalho?",
      "O GPS confirmou seu raciocinio ou substituiu ele?"
    ],
    relatedCourse: "vfr",
    relatedLessonSlug: "vfr-perda-de-orientacao-e-desvio"
  }),
  createTraining({
    id: "training-scenario-vento-cruzado",
    slug: "cenario-vento-cruzado",
    title: "Cenario: vento cruzado e decisao de pista",
    difficulty: "Intermediário",
    duration: "35 min",
    departureAirport: "Aerodromo com duas cabeceiras disponiveis no simulador",
    destinationAirport: "Mesmo aerodromo",
    conditions: "VFR, vento lateral moderado configurado no simulador",
    objective: "Escolher cabeceira, corrigir deriva no circuito e decidir arremeter se a final ficar instavel.",
    briefing:
      "Nao use limites de componente de vento sem fonte. O foco e ler vento, escolher pista mais favoravel e observar efeito na trajetoria.",
    execution: [
      "Configure vento cruzado moderado e identifique pista mais alinhada.",
      "Decole e observe deriva na perna do vento, base e final.",
      "Ajuste proa para manter trajetoria e evite virar final tarde.",
      "Arremeta se alinhamento, velocidade ou razao ficarem instaveis."
    ],
    criteria: [
      "Aluno diferencia proa e trajetoria.",
      "Escolha da cabeceira e justificada pelo vento.",
      "Decisao de arremeter ocorre antes de pouso improvisado."
    ],
    debrief: [
      "Qual componente do vento mais afetou a final?",
      "Voce corrigiu deriva cedo ou tarde?",
      "A escolha da pista foi a melhor disponivel?"
    ],
    relatedCourse: "vfr",
    relatedLessonSlug: "vfr-vento-deriva-correcao"
  }),
  createTraining({
    id: "training-scenario-apr-nao-captura",
    slug: "cenario-apr-nao-captura",
    title: "Cenario: APR nao captura",
    difficulty: "Avançado",
    duration: "40 min",
    departureAirport: "Aeroporto com ILS no simulador",
    destinationAirport: "Mesmo aeroporto",
    conditions: "VMC ou IMC leve para permitir recuperacao segura",
    objective: "Identificar por que uma aproximacao nao capturou localizer ou glideslope e recuperar sem perder controle.",
    briefing:
      "Erros comuns: fonte errada, APR nao armado, curso/frequencia inadequados, interceptacao ruim ou FMA mal interpretado.",
    execution: [
      "Configure uma aproximacao ILS com um erro intencional: fonte GPS ativa, APR nao armado ou interceptacao excessiva.",
      "Observe FMA, CDI, HSI, frequencia/fonte e trajetoria.",
      "Declare o erro, mantenha controle e corrija uma variavel por vez.",
      "Se a aproximacao ficar instavel, arremeta e reorganize."
    ],
    criteria: [
      "Aluno identifica o erro no FMA/fonte antes de culpar o simulador.",
      "Recuperacao nao sacrifica controle da aeronave.",
      "Missed approach e usado se a janela de estabilizacao foi perdida."
    ],
    debrief: [
      "O problema era modo, fonte, interceptacao ou configuracao?",
      "Quanto tempo voce demorou para perceber?",
      "Voce continuaria essa aproximacao no mundo real?"
    ],
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-falhas-e-erros-comuns"
  }),
  createTraining({
    id: "training-scenario-direct-to-mal-usado",
    slug: "cenario-direct-to-mal-usado",
    title: "Cenario: Direct-To mal utilizado",
    difficulty: "Intermediário",
    duration: "35 min",
    departureAirport: "Rota curta com tres waypoints",
    destinationAirport: "Destino proximo",
    conditions: "VFR ou IFR simples",
    objective: "Entender como Direct-To pode quebrar sequenciamento e consciencia de rota quando usado sem criterio.",
    briefing:
      "Direct-To resolve um destino imediato, mas pode pular perna, afastar da rota planejada ou esconder restricoes. Use como ferramenta, nao atalho automatico.",
    execution: [
      "Crie rota curta com origem, waypoint intermediario e destino.",
      "Acione Direct-To para um ponto errado ou posterior.",
      "Observe perna ativa, distancia, curso e impacto no planejamento.",
      "Recrie a sequencia correta ou decida nova rota com briefing."
    ],
    criteria: [
      "Aluno reconhece alteracao da perna ativa.",
      "Correcoes sao confirmadas no mapa e no HSI.",
      "Decisao de rota e verbalizada antes de seguir magenta."
    ],
    debrief: [
      "Qual waypoint foi ignorado?",
      "A linha magenta ainda representava seu plano?",
      "Como voce evitaria esse erro em IFR?"
    ],
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-direct-to"
  }),
  createTraining({
    id: "training-scenario-desvio-meteorologico",
    slug: "cenario-desvio-meteorologico",
    title: "Cenario: desvio meteorologico",
    difficulty: "Avançado",
    duration: "45 min",
    departureAirport: "Rota VFR ou IFR curta",
    destinationAirport: "Destino ou alternado",
    conditions: "Meteorologia degradando gradualmente no simulador",
    objective: "Tomar decisao de retorno, desvio ou alternado antes que o voo fique sem margem.",
    briefing:
      "Nao transforme mau tempo em desafio de coragem. O treino e perceber tendencia, proteger margem e decidir cedo.",
    execution: [
      "Planeje rota, alternado e combustivel simulado.",
      "Durante o voo, introduza camada de nuvens, chuva ou visibilidade reduzida de forma controlada.",
      "Compare condicao real do simulador com o briefing inicial.",
      "Decida: continuar, desviar, retornar ou alternar, justificando combustivel e rota."
    ],
    criteria: [
      "Decisao tomada antes de perder referencias ou estabilidade.",
      "Alternado e combustivel fazem parte do raciocinio.",
      "Aluno nao usa GPS para entrar em condicao insegura de proposito."
    ],
    debrief: [
      "Qual sinal mostrou que a margem estava diminuindo?",
      "Voce decidiu cedo ou esperou demais?",
      "Qual seria o alternado mais simples?"
    ],
    relatedCourse: "vfr",
    relatedLessonSlug: "vfr-meteorologia-em-rota"
  }),
  createTraining({
    id: "training-scenario-barometro-fonte-errados",
    slug: "cenario-barometro-fonte-errados",
    title: "Cenario: barometro ou fonte de navegacao errados",
    difficulty: "Avançado",
    duration: "35 min",
    departureAirport: "Rota IFR curta no simulador",
    destinationAirport: "Destino com aproximacao simples",
    conditions: "VMC para permitir auditoria visual do erro",
    objective: "Identificar erro de QNH, fonte GPS/NAV, altitude selecionada ou heading antes que ele afete a fase critica.",
    briefing:
      "O cenario comeca com um erro intencional. O aluno deve detectar, explicar impacto, corrigir e verificar resultado.",
    execution: [
      "Configure QNH incorreto, fonte GPS/NAV inadequada, altitude selecionada errada ou heading incorreto.",
      "Faça scan de instrumentos, FMA, altitude selecionada, HSI/CDI e briefing da proxima fase.",
      "Identifique a incoerencia e explique consequencia.",
      "Corrija, confirme e registre como evitar na proxima vez."
    ],
    criteria: [
      "Erro identificado antes da aproximacao final.",
      "Impacto operacional explicado.",
      "Correcao verificada em instrumento e briefing."
    ],
    debrief: [
      "Qual indicacao contradizia seu plano?",
      "Voce teria descido antes do permitido?",
      "Que chamada de briefing preveniria esse erro?"
    ],
    relatedCourse: "ifr",
    relatedLessonSlug: "ifr-pressao-altitudes-e-niveis"
  }),
  createTraining({
    id: "training-scenario-aproximacao-desestabilizada",
    slug: "cenario-aproximacao-desestabilizada",
    title: "Cenario: aproximacao desestabilizada",
    difficulty: "Intermediário",
    duration: "35 min",
    departureAirport: "Final curta no simulador",
    destinationAirport: "Mesmo aerodromo",
    conditions: "VFR ou IFR visual ao final",
    objective: "Reconhecer alto, rapido, desalinhado ou atrasado na configuracao e escolher arremetida.",
    briefing:
      "O objetivo e praticar decisao. A aproximacao comeca propositalmente ruim para treinar criterio, nao para salvar pouso.",
    execution: [
      "Entre na final alto ou rapido de forma controlada.",
      "Monitore velocidade, razao, alinhamento e configuracao.",
      "Declare se esta estabilizado ou nao.",
      "Arremeta e execute novo circuito ou nova aproximacao."
    ],
    criteria: [
      "Aluno nao força pouso instavel.",
      "Criterio de arremetida e verbalizado.",
      "Nova tentativa e organizada sem pressa."
    ],
    debrief: [
      "Qual criterio falhou primeiro?",
      "Voce demorou para decidir?",
      "O que faria diferente no planejamento da descida?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "aproximacao-estabilizada"
  }),
  createTraining({
    id: "training-scenario-alternado",
    slug: "cenario-alternado",
    title: "Cenario: desvio para alternado",
    difficulty: "Avançado",
    duration: "50 min",
    departureAirport: "Rota curta com destino e alternado",
    destinationAirport: "Alternado escolhido pelo aluno",
    conditions: "Destino degradando ou pista indisponivel no simulador",
    objective: "Praticar decisao de alternado, combustivel, reprogramacao e chegada com carga de trabalho controlada.",
    briefing:
      "Alternado nao e plano B decorativo. Ele deve ser conhecido antes do problema: direcao, distancia, meteorologia, pista e chegada.",
    execution: [
      "Planeje destino, alternado e combustivel simulado.",
      "Durante a chegada, simule meteorologia abaixo do esperado ou pista impraticavel.",
      "Declare decisao de alternar, rota, combustivel restante e configuracao do Garmin.",
      "Execute chegada ao alternado com debriefing."
    ],
    criteria: [
      "Decisao de alternado nao ocorre tarde demais.",
      "Reprogramacao nao compromete pilotagem.",
      "Combustivel e meteorologia sao considerados."
    ],
    debrief: [
      "Voce tinha alternado realista antes do problema?",
      "A reprogramacao do Garmin ficou limpa?",
      "Qual decisao teria sido melhor cinco minutos antes?"
    ],
    relatedCourse: "ifr",
    relatedLessonSlug: "ifr-alternado-reprogramacao"
  }),
  createTraining({
    id: "training-c408-falha-motor",
    slug: "falha-de-motor-simulada-c408",
    title: "Falha de motor simulada introdutoria",
    difficulty: "Intermediário",
    duration: "35 min",
    departureAirport: "Area local em altitude segura",
    destinationAirport: "Area local ou aeroporto proximo",
    conditions: "Altitude segura, cenario controlado e reversivel",
    objective: "Treinar prioridades conceituais em falha simulada sem criar procedimento de emergencia nao verificado.",
    briefing:
      "Este treino nao ensina memory item. Ele ensina Aviate, Navigate, Communicate, controle direcional, reducao de carga de trabalho e consulta ao checklist adequado.",
    execution: [
      "Use cenario controlado e reversivel em altitude segura.",
      "Simule reducao de potencia planejada em um motor apenas se souber desfazer rapidamente no simulador.",
      "Priorize controle direcional, atitude e velocidade segura conforme treinamento conceitual.",
      "Escolha rota, local de pouso ou retorno e declare necessidade de checklist oficial aplicavel."
    ],
    criteria: [
      "Controle preservado.",
      "Aluno nao fica fixado no motor e abandona pilotagem.",
      "Nao foram inventadas acoes criticas ou limites."
    ],
    debrief: [
      "Qual foi a primeira indicacao percebida?",
      "Voce manteve controle direcional?",
      "Em que momento consultaria checklist real ou QRH?"
    ],
    relatedCourse: "fundamentals",
    relatedLessonSlug: "planeio-apos-falha-de-motor"
  }),
  createGuidedFlight({
    id: "training-guided-c408-familiarizacao",
    slug: "voo-guiado-01-familiarizacao-c408",
    title: "Voo guiado 1 - Familiarizacao com o C408",
    difficulty: "Inicial",
    duration: "60 min",
    objective: "Conhecer a aeronave, energizar, partir, taxiar, decolar, voar circuito, pousar, estacionar e desligar.",
    relatedCourse: "fundamentals",
    relatedLessonSlug: "exercicio-final-fundamentos",
    focus: [
      "Preparacao: clima VFR, pista longa, trafego baixo e carga leve no simulador.",
      "Cockpit: reconheca PFD, MFD, controles principais, luzes, freios e alertas.",
      "Partida: use checklist educacional, confirme area livre, energizacao, motores estabilizados e geradores.",
      "Taxi: mantenha velocidade baixa e planeje rota ate o ponto de espera.",
      "Decolagem: alinhe, aplique potencia progressiva e estabilize subida inicial.",
      "Circuito: voe pernas claras, prepare aproximacao e arremeta se instavel.",
      "Pouso/taxi/desligamento: controle direcional, saia da pista, estacione e desligue com calma.",
      "Debriefing: registre controles desconhecidos, alertas observados e itens que precisam de revisao."
    ]
  }),
  createGuidedFlight({
    id: "training-guided-fundamentos-circuito",
    slug: "voo-guiado-02-fundamentos-circuito",
    title: "Voo guiado 2 - Fundamentos e circuito",
    difficulty: "Inicial",
    duration: "55 min",
    objective: "Consolidar voo manual, curvas, altitude, velocidade, trim, circuito, aproximacao e arremetida.",
    relatedCourse: "fundamentals",
    relatedLessonSlug: "exercicio-final-fundamentos",
    focus: [
      "Preparacao: escolha aeroporto simples, vento leve e circuito visual.",
      "Decolagem: mantenha eixo, atitude e controle direcional.",
      "Subida: estabilize antes de virar perna do vento.",
      "Cruzeiro local: pratique curvas coordenadas, nivelamento e trim.",
      "Circuito: verbalize contra o vento, traves, perna do vento, base e final.",
      "Aproximacao: controle energia com pequenas correcoes.",
      "Arremetida: execute pelo menos uma arremetida planejada antes do pouso final.",
      "Debriefing: compare aproximacao que continuou com a que terminou em arremetida."
    ]
  }),
  createGuidedFlight({
    id: "training-guided-vfr-curto",
    slug: "voo-guiado-03-vfr-curto",
    title: "Voo guiado 3 - Navegacao VFR curta",
    difficulty: "Intermediário",
    duration: "70 min",
    objective: "Planejar, navegar por referencias, controlar tempo, corrigir vento, entrar no circuito e pousar.",
    relatedCourse: "vfr",
    relatedLessonSlug: "vfr-voo-completo-planejado",
    focus: [
      "Preparacao: escolha dois aerodromos proximos e referencias grandes, como litoral, rodovia, rio ou cidade.",
      "Briefing: defina checkpoints, proa planejada, tempo estimado e alternado.",
      "Decolagem: inicie cronometro no ponto definido.",
      "Rota: compare referencia esperada, tempo e posicao real.",
      "Vento: se a trajetoria deslocar, ajuste proa e confirme se voltou para a linha planejada.",
      "Chegada: identifique aerodromo, pista, vento e circuito.",
      "Pouso: estabilize ou arremeta.",
      "Debriefing: anote diferenca entre tempo estimado e real."
    ]
  }),
  createGuidedFlight({
    id: "training-guided-vfr-gps-auxilio",
    slug: "voo-guiado-04-vfr-gps-auxilio",
    title: "Voo guiado 4 - VFR com GPS como auxilio",
    difficulty: "Intermediário",
    duration: "65 min",
    objective: "Manter navegacao visual usando o Garmin apenas como confirmacao e Direct-To com criterio.",
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-direct-to",
    focus: [
      "Preparacao: planeje rota visual antes de programar o Garmin.",
      "Cockpit: carregue destino ou waypoint e confira mapa, HSI e fonte.",
      "Rota: voe por referencias externas, usando o MFD para checagem periodica.",
      "Erro intencional: simule duvida de posicao e confirme com GPS sem abandonar o raciocinio visual.",
      "Direct-To: use para retorno controlado ou alternado, explicando o que sera pulado.",
      "Chegada: desligue dependencia mental da linha magenta e identifique pista visualmente.",
      "Debriefing: responda quando o GPS ajudou e quando distraiu."
    ]
  }),
  createGuidedFlight({
    id: "training-guided-primeiro-ifr",
    slug: "voo-guiado-05-primeiro-ifr",
    title: "Voo guiado 5 - Primeiro IFR",
    difficulty: "Avançado",
    duration: "80 min",
    objective: "Preparar plano, usar automacao, seguir rota simples e executar aproximacao com raciocinio IFR.",
    relatedCourse: "ifr",
    relatedLessonSlug: "ifr-voo-completo",
    focus: [
      "Preparacao: escolha rota curta com procedimento simples e use cartas oficiais quando forem aplicaveis.",
      "Briefing: origem, rota, altitude, chegada, aproximacao, minimos, missed e alternado.",
      "Cockpit: configure plano, altitude selecionada, fonte e radios conforme o treino.",
      "Saida: mantenha controle manual ou automacao simples sem perder FMA.",
      "Rota: antecipe proximo waypoint, altitude e modo.",
      "Descida: planeje energia antes da aproximacao.",
      "Aproximacao: estabilize e decida na minima.",
      "Debriefing: identifique momentos em que ficou atras da aeronave."
    ]
  }),
  createGuidedFlight({
    id: "training-guided-ils-completo",
    slug: "voo-guiado-06-ils-completo",
    title: "Voo guiado 6 - ILS completo",
    difficulty: "Avançado",
    duration: "70 min",
    objective: "Preparar frequencia, fonte, curso, APR, FMA, localizer, glideslope, minima e arremetida.",
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-ils",
    focus: [
      "Preparacao: selecione aeroporto com ILS no simulador e carta oficial se usar procedimento real.",
      "Briefing: pista, curso, frequencia, altitude de interceptacao, minima e missed.",
      "Cockpit: confira NAV/LOC, CDI/HSI, curso e FMA.",
      "Interceptacao: use HDG ou vetor para capturar localizer de forma controlada.",
      "APR: arme somente quando fonte e interceptacao fizerem sentido.",
      "Glideslope: confirme captura antes de reduzir demais a carga mental.",
      "Minima: decida pousar com referencia visual ou arremeter.",
      "Debriefing: registre se APR estava armado, ativo ou mal configurado."
    ]
  }),
  createGuidedFlight({
    id: "training-guided-rnav-completo",
    slug: "voo-guiado-07-rnav-completo",
    title: "Voo guiado 7 - RNAV completo",
    difficulty: "Avançado",
    duration: "70 min",
    objective: "Carregar procedimento RNAV, ativar, confirmar sequencia, acompanhar guiamento e executar missed approach.",
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-rnav",
    focus: [
      "Preparacao: escolha aproximacao RNAV simples e revise minima em carta oficial quando aplicavel.",
      "Cockpit: carregue procedimento, transicao e fonte GPS.",
      "Sequencia: confirme waypoint ativo, distancia e proximo ponto.",
      "Descida: observe orientacao vertical somente se disponivel e compreendida.",
      "Final: monitore estabilidade, fonte e minima.",
      "Missed: execute arremetida planejada se instavel ou sem referencia visual.",
      "Debriefing: diferencie o que foi RNAV real, simulacao e comportamento observado."
    ]
  }),
  createGuidedFlight({
    id: "training-guided-arremetida-nova-aproximacao",
    slug: "voo-guiado-08-arremetida-nova-aproximacao",
    title: "Voo guiado 8 - Arremetida e nova aproximacao",
    difficulty: "Avançado",
    duration: "65 min",
    objective: "Reconhecer aproximacao desestabilizada, arremeter, reorganizar Garmin e executar nova tentativa.",
    relatedCourse: "ifr",
    relatedLessonSlug: "ifr-missed-approach-arremetida",
    focus: [
      "Preparacao: defina gatilhos de arremetida antes da aproximacao.",
      "Erro intencional: entre alto, rapido, sem APR armado ou com configuracao atrasada.",
      "Decisao: declare arremetida cedo, sem tentar salvar a aproximacao.",
      "Execucao: controle atitude, potencia, trajetoria e configuracao.",
      "Garmin: confirme fonte, FMA, perna ativa e plano de nova aproximacao.",
      "Nova tentativa: reduza carga de trabalho e rebriefe antes da final.",
      "Debriefing: explique por que a primeira tentativa falhou."
    ]
  }),
  createGuidedFlight({
    id: "training-guided-desvio-alternado",
    slug: "voo-guiado-09-desvio-alternado",
    title: "Voo guiado 9 - Desvio para alternado",
    difficulty: "Avançado",
    duration: "75 min",
    objective: "Avaliar meteorologia, combustivel, decisao, reprogramacao, navegacao e chegada ao alternado.",
    relatedCourse: "ifr",
    relatedLessonSlug: "ifr-alternado-reprogramacao",
    focus: [
      "Preparacao: escolha destino e alternado antes da decolagem.",
      "Rota: acompanhe combustivel simulado, meteorologia e distancia restante.",
      "Problema: degrade meteorologia do destino ou simule pista indisponivel.",
      "Decisao: declare alternado antes de ficar sem margem.",
      "Garmin: use Direct-To ou novo plano explicando impacto no sequenciamento.",
      "Chegada: estabilize, configure e execute aproximacao simples.",
      "Debriefing: avalie se o alternado foi escolhido cedo o suficiente."
    ]
  }),
  createGuidedFlight({
    id: "training-guided-voo-integrado-final",
    slug: "voo-guiado-10-integrado-final",
    title: "Voo guiado 10 - Voo integrado final",
    difficulty: "Avançado",
    duration: "90 min",
    objective: "Integrar preparacao, peso, combustivel, C408, Garmin, VFR, IFR, aproximacao, decisao e debriefing.",
    relatedCourse: "garmin",
    relatedLessonSlug: "g1000-treinamento-no-c408",
    focus: [
      "Preparacao: defina missao curta, carga, combustivel, meteorologia, destino e alternado.",
      "Cockpit: execute checklist educacional, configure Garmin, confirme fonte, FMA e plano.",
      "Saida: voe manual ate estabilizar e depois use automacao apenas se fizer sentido.",
      "Rota: mantenha consciencia situacional visual, instrumental e de combustivel.",
      "Mudanca planejada: introduza erro ou degradacao meteorologica para tomada de decisao.",
      "Chegada: execute aproximacao ILS ou RNAV conforme nivel do aluno.",
      "Final: pouse estabilizado ou arremeta com criterio.",
      "Debriefing: registre tres acertos, tres pontos de revisao e proximo treino."
    ]
  })
];

function createTraining(input: TrainingInput): TrainingDocument {
  const course = courses[input.relatedCourse];

  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    aircraftId,
    aircraftName,
    difficulty: input.difficulty,
    duration: input.duration,
    departureAirport: input.departureAirport,
    destinationAirport: input.destinationAirport,
    conditions: `${input.conditions}. ${simulatorNotice}`,
    objective: input.objective,
    instructions: [
      `Configuracao inicial: ${input.conditions}.`,
      `Briefing: ${input.briefing}`,
      ...input.execution.map((step, index) => `Execucao ${index + 1}: ${step}`),
      `Debriefing: ${input.debrief.join(" ")}`
    ],
    completionCriteria: [
      ...input.criteria,
      ...input.debrief.map((question) => `Pergunta de debriefing: ${question}`)
    ],
    studentReport: "",
    personalNote: "",
    status: "not_started",
    relatedCourseId: course.id,
    relatedCourseSlug: course.slug,
    relatedLessonSlug: input.relatedLessonSlug,
    publicationState: "published",
    createdAt: "2026-07-24",
    updatedAt: "2026-07-24",
    version: 2,
    technicalMetadata: c408TrainingMetadata
  };
}

function createGuidedFlight(input: Omit<TrainingInput, "departureAirport" | "destinationAirport" | "conditions" | "briefing" | "execution" | "criteria" | "debrief"> & { focus: string[] }): TrainingDocument {
  return createTraining({
    ...input,
    departureAirport: "Definido pelo aluno conforme roteiro e dados oficiais disponiveis",
    destinationAirport: "Destino ou alternado definido no briefing do roteiro",
    conditions: "Meteorologia configurada no Microsoft Flight Simulator conforme objetivo do voo guiado",
    briefing: "Cada fase deve ser verbalizada antes da execucao: o que fazer, por que fazer, o que observar, qual erro pode ocorrer e como corrigir.",
    execution: input.focus,
    criteria: [
      "O aluno executa todas as fases sem pular briefing.",
      "As decisoes sao justificadas por estabilidade, navegacao, combustivel, meteorologia e carga de trabalho.",
      "O debriefing registra acertos, erros, revisoes e proximo treino."
    ],
    debrief: [
      "A aeronave ficou estabilizada nas fases criticas?",
      "O FMA mostrou o modo esperado quando houve automacao?",
      "A fonte de navegacao estava correta?",
      "Houve momento em que seria melhor arremeter, retornar ou alternar?"
    ]
  });
}
