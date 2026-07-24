import type { ChecklistDocument, ChecklistItemDocument, ChecklistItemKind, FlightPhase } from "@/features/checklists/types";
import { simulatorAdaptationMetadata } from "@/features/technical/defaults";

const aircraftId = "aircraft-cessna-408-skycourier";
const aircraftName = "Cessna 408 SkyCourier";
const updatedAt = "2026-07-24";
const simulatorNotice =
  "Material educacional para simulador. Procedimentos reais devem seguir AFM, POH, QRH e documentação oficial aplicável.";

export const checklistDisclaimer =
  "Os checklists da plataforma são destinados ao uso em simuladores. Eles não substituem checklists oficiais, QRH, POH, AFM ou manuais do fabricante.";

const c408ChecklistMetadata = simulatorAdaptationMetadata({
  sourceType: "simulator_developer_documentation",
  sourceTitle: "Textron Aviation SkyCourier public materials; Garmin G1000 NXi references; Microsoft Flight Simulator C408 release notes and in-simulator checklist context",
  sourceOrganization: "Textron Aviation; Garmin; Microsoft Flight Simulator",
  aircraftManufacturer: "Cessna",
  aircraftModel: "408 SkyCourier",
  simulatorAircraftVariant: aircraftName,
  simulatorPlatform: "Microsoft Flight Simulator",
  simulatorDeveloper: "Microsoft / Carenado",
  simulatorAdaptationNotes:
    "Checklist didático criado para organizar treino no Microsoft Flight Simulator. Não contém memory items, limites oficiais nem sequência operacional aprovada.",
  knownSimulatorDifferences:
    "Notas oficiais do MSFS 2024 registraram correções de checklist, tooltips, rádios, VS, áudio e sistemas de gelo do C408. A versão instalada pelo aluno deve ser conferida.",
  revisionNotes: "Etapa 6 de conteúdo prático. Itens críticos são críticos para o treino, não declarações de checklist real aprovado."
});

type ChecklistInput = {
  id: string;
  slug: string;
  flightPhase: FlightPhase;
  title: string;
  description: string;
  order: number;
  version: string;
  items: Array<{
    text: string;
    expectedResponse: string;
    observation: string;
    explanation: string;
    kind?: ChecklistItemKind;
  }>;
};

export const localChecklistDocuments: ChecklistDocument[] = [
  createChecklist({
    id: "checklist-c408-preparacao",
    slug: "c408-preparacao",
    flightPhase: "preparacao",
    title: "Preparação do voo no simulador",
    description: "Organiza objetivo, cenário, meteorologia, rota, peso, combustível didático e material de estudo antes de carregar a aeronave.",
    order: 1,
    version: "1.0-estudo",
    items: [
      item("Objetivo da sessão", "Definido em uma frase", "Ex.: circuito visual, Direct-To, ILS guiado ou voo integrado.", "Sem objetivo claro, o aluno treina tudo ao mesmo tempo e não sabe o que debriefar.", "critical"),
      item("Cenário", "Aeroporto, horário, clima e tráfego definidos", "Comece com clima claro e baixa carga de tráfego ao estudar fluxo novo.", "Cenário simples reduz carga mental e deixa o erro principal aparecer."),
      item("Rota e alternado didático", "Origem, destino, rota curta e alternativa escolhidos", "Não use frequências, cartas ou procedimentos inventados.", "Alternado é ferramenta de decisão: ele evita insistir no destino quando o cenário piora.", "critical"),
      item("Combustível e carga", "Configurados com margem educacional", "Não preencha tudo no máximo sem avaliar peso e objetivo do treino.", "Peso, combustível e carga mudam desempenho e energia; aqui o foco é consciência, não despacho real."),
      item("Material de apoio", "Aula, checklist ou treinamento relacionado aberto", "Use a plataforma como guia e o simulador como laboratório.", "A referência aberta ajuda a pausar, revisar e registrar dúvidas sem improvisar.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-inspecao-externa-estudo",
    slug: "c408-inspecao-externa-estudo",
    flightPhase: "preparacao",
    title: "Inspeção externa educacional",
    description: "Roteiro visual de estudo para reconhecer a aeronave e perceber condições óbvias no simulador, sem substituir inspeção oficial.",
    order: 2,
    version: "1.0-estudo",
    items: [
      item("Condição geral", "Sem danos visíveis, obstáculos ou capas no cenário", "Remova itens visuais do simulador quando disponíveis.", "A inspeção externa treina consciência da aeronave antes de sentar no cockpit.", "critical"),
      item("Asas e superfícies", "Superfícies visualmente livres e simétricas", "Não trate esta observação como inspeção estrutural real.", "Superfícies alteram controle; no simulador, este item reforça reconhecimento."),
      item("Trem, pneus e freios", "Sem anormalidade visual evidente", "Observe trem fixo e área ao redor das rodas.", "Problemas no solo costumam aparecer como taxi difícil, arrasto ou frenagem inesperada."),
      item("Motores, hélices e entradas", "Área livre e sem obstrução visual", "Não aproxime pessoas/objetos na simulação; use câmera externa.", "Hélices e entradas exigem respeito operacional real; no simulador, o foco é criar disciplina visual.", "critical"),
      item("Pitot, portas e combustível visual", "Itens reconhecidos e coerentes com o cenário", "Só use valores de combustível confirmados no painel ou menu do simulador.", "Reconhecer pontos externos ajuda a conectar teoria do C408 com operação prática.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-cockpit-inicial",
    slug: "c408-cockpit-inicial",
    flightPhase: "cockpit",
    title: "Cockpit inicial e controles",
    description: "Verificação didática de comandos, telas, posição de controles e estado inicial antes de energizar ou partir.",
    order: 3,
    version: "1.0-estudo",
    items: [
      item("Controles físicos", "Eixos e botões respondem corretamente", "Cheque manche/yoke, pedais, potência e freios antes de taxi.", "Configuração errada de controle invalida qualquer treino posterior.", "critical"),
      item("Freio de estacionamento", "Estado conhecido", "Confirme antes de aplicar potência ou iniciar partida.", "O aluno deve saber se a aeronave está contida no solo antes de qualquer fluxo."),
      item("Manetes e controles de motor", "Posição reconhecida, sem executar sequência real", "Não invente posição oficial sem manual.", "O objetivo é reconhecer potência, hélice/condição quando representados e evitar comando acidental."),
      item("PFD, MFD e alertas", "Telas e mensagens identificadas", "A trilha Garmin ensina leitura completa.", "Antes de agir, entenda se há aviso, mensagem ou configuração que muda o treino."),
      item("Briefing curto", "Primeira ação, pista/rota e interrupção verbalizadas", "Diga em voz alta o que fará se algo sair do esperado.", "Briefing transforma reação em decisão planejada.", "critical")
    ]
  }),
  createChecklist({
    id: "checklist-c408-energizacao",
    slug: "c408-energizacao",
    flightPhase: "cockpit",
    title: "Energização e aviônicos",
    description: "Fluxo educacional para verificar energia, telas, iluminação, alertas, plano e rádios no simulador.",
    order: 4,
    version: "1.0-estudo",
    items: [
      item("Bateria e energia", "Fonte elétrica simulada estabelecida", "Siga o fluxo disponível no simulador, não uma sequência real inventada.", "Sem energia coerente, telas, alertas e rádios podem não representar o estado esperado.", "critical"),
      item("Displays", "PFD/MFD inicializados e legíveis", "Observe se há mensagens persistentes.", "O aluno deve saber distinguir inicialização normal de aviso que exige investigação."),
      item("Barômetro", "QNH ou referência do cenário conferida", "Compare altitude indicada com elevação quando possível.", "Barômetro errado contamina altitudes, aproximações e mínimos."),
      item("Plano e Garmin", "Origem, destino, fonte e perna ativa revisados", "Não confie apenas no mapa do menu mundial.", "A navegação só é segura didaticamente quando a sequência carregada combina com o briefing."),
      item("Rádios e transponder", "Frequências/código coerentes com o exercício", "Use dados oficiais se simular procedimento realista.", "Sintonizar sem saber objetivo cria falsa preparação.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-antes-partida",
    slug: "c408-antes-da-partida",
    flightPhase: "partida",
    title: "Antes da partida",
    description: "Confirmações de segurança e organização antes de iniciar partida simulada, sem reproduzir checklist oficial.",
    order: 5,
    version: "1.0-estudo",
    items: [
      item("Área livre", "Hélices e entorno visualmente livres", "Use câmeras e bom senso no simulador.", "Partida é fase de risco real; aqui ela treina disciplina antes de acionar sistemas.", "critical"),
      item("Freios", "Aeronave contida", "Confirme freio de estacionamento ou freios aplicados conforme exercício.", "Movimento não intencional durante partida prejudica controle do cenário.", "critical"),
      item("Combustível didático", "Quantidade e seleção coerentes com treino", "Não invente posições ou consumo oficial.", "Partida e voo dependem de combustível; o aluno precisa saber o que configurou."),
      item("Beacon/iluminação externa", "Uso coerente com fase no simulador", "Use como aviso visual de operação de motores.", "Luzes reforçam disciplina de cabine e consciência externa."),
      item("Plano de abortar partida", "Parar e consultar referência se parâmetro anormal aparecer", "Não crie ação crítica sem fonte.", "O objetivo é reconhecer anormalidade e reduzir carga, não memorizar procedimento não verificado.", "critical")
    ]
  }),
  createChecklist({
    id: "checklist-c408-partida-motor-1",
    slug: "c408-partida-motor-1-estudo",
    flightPhase: "partida",
    title: "Partida do motor 1 - estudo",
    description: "Roteiro conceitual para observar início, estabilização e alertas do primeiro motor no simulador.",
    order: 6,
    version: "1.0-estudo",
    items: [
      item("Sequência do simulador", "Executada conforme checklist disponível no MSFS ou aula", "Não substituir por sequência de fórum ou memória.", "Sem documentação oficial pública completa, a plataforma ensina observação e verificação, não partida real.", "critical"),
      item("Indicações de motor", "Movimento coerente e estabilização observados", "Observe tendência, não apenas número isolado.", "A partida deve produzir indicações coerentes e estáveis no painel."),
      item("Alertas", "Sem warning/caution não compreendido", "Mensagem não é resolvida só por ser apagada.", "A investigação do alerta vale mais que seguir adiante por pressa.", "critical"),
      item("Gerador/fonte elétrica", "Estado conhecido após estabilização", "Use o painel do simulador como referência didática.", "Depois da partida, a fonte elétrica pode mudar; o aluno precisa entender o estado.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-partida-motor-2",
    slug: "c408-partida-motor-2-estudo",
    flightPhase: "partida",
    title: "Partida do motor 2 - estudo",
    description: "Roteiro conceitual para repetir a lógica de partida e comparar indicações entre motores.",
    order: 7,
    version: "1.0-estudo",
    items: [
      item("Área livre e freios", "Confirmados novamente", "Repetir confirmação evita automatismo perigoso.", "O segundo motor não elimina riscos de movimento ou distração.", "critical"),
      item("Sequência do simulador", "Executada conforme referência disponível", "Não use memory item não verificado.", "O objetivo é praticar fluxo, não validar procedimento real."),
      item("Comparação entre motores", "Indicações semelhantes e estáveis", "Diferenças grandes devem levar a pausa e investigação.", "Comparar lados ajuda a perceber anormalidade cedo.", "critical"),
      item("Alertas pós-partida", "Entendidos ou treino interrompido", "Não prossiga com mensagem crítica sem compreender.", "A decisão madura no simulador é pausar e revisar.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-apos-partida",
    slug: "c408-apos-partida",
    flightPhase: "antes-do-taxi",
    title: "Após a partida",
    description: "Organiza geradores, aviônicos, instrumentos, alertas, controles, freios e condição para taxi.",
    order: 8,
    version: "1.0-estudo",
    items: [
      item("Energia e geradores", "Estado coerente no painel", "Não assuma arquitetura elétrica sem fonte.", "O aluno deve saber se a aeronave está alimentada de forma estável."),
      item("Instrumentos e Garmin", "PFD, MFD, fonte, barômetro e FMA revisados", "Confirme antes de se mover.", "Taxi com painel confuso costuma virar decolagem com painel confuso.", "critical"),
      item("Controles de voo", "Resposta observada em comandos básicos", "Use apenas teste visual compatível com simulador.", "Controles invertidos ou mal calibrados precisam ser detectados no solo.", "critical"),
      item("Flaps, trim e configuração", "Estado reconhecido para o treino", "Não invente configuração oficial de decolagem.", "A configuração deve estar coerente com aula/checklist real quando aplicável."),
      item("Alertas e freios", "Sem alerta crítico pendente; freios verificados", "Teste controle de frenagem com cuidado.", "Freio e alerta são barreiras antes do taxi.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-taxi",
    slug: "c408-taxi",
    flightPhase: "taxi",
    title: "Taxi no C408",
    description: "Checklist de estudo para taxi controlado, rota no solo, freios, direção, potência, beta/reverso e instrumentos.",
    order: 9,
    version: "1.0-estudo",
    items: [
      item("Rota de taxi", "Caminho até ponto de espera definido", "Use mapa do aeroporto quando disponível.", "Saber a rota reduz pressa, curvas tardias e entrada errada em pista.", "critical"),
      item("Velocidade no solo", "Baixa e controlada", "O C408 simulado pode acelerar com pouca potência; antecipe.", "Taxi bom é lento o bastante para parar sem drama."),
      item("Freios e direção", "Resposta suave confirmada", "Teste em linha reta antes de curvas apertadas.", "Freio diferencial e direção devem ser previsíveis antes da pista.", "critical"),
      item("Beta/reverso", "Usado com cautela apenas se treinado", "Não confunda beta com reverso nem use agressivamente.", "O objetivo é controlar energia no solo sem abuso de freio ou potência."),
      item("Instrumentos durante taxi", "Bússola/proa, freios e alertas acompanhados", "Não fique cabeça baixa no Garmin.", "Taxi é voo no solo: ainda exige navegação e consciência externa.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-antes-decolagem",
    slug: "c408-antes-da-decolagem",
    flightPhase: "antes-da-decolagem",
    title: "Antes da decolagem",
    description: "Verificação didática de pista, vento, configuração, instrumentos, Garmin, modos iniciais e decisão de rejeitar/arremeter.",
    order: 10,
    version: "1.0-estudo",
    items: [
      item("Pista e vento", "Pista confirmada e vento compreendido", "Não decole de pista errada por seguir só a linha do GPS.", "Cabeceira, vento e comprimento disponível fazem parte do briefing.", "critical"),
      item("Configuração", "Flaps, trim e controles coerentes com aula/checklist aplicável", "Use documentação quando houver valor específico.", "Configuração errada compromete decolagem e controle inicial.", "critical"),
      item("Garmin e modos", "Fonte, plano, altitude selecionada, HDG/FD conferidos", "Não ligue AP na decolagem sem treino apropriado.", "A primeira curva e altitude precisam estar previstas antes da aceleração."),
      item("Motores e alertas", "Indicações estáveis e sem alerta crítico", "Não ignore warning/caution.", "Decolar com alerta não entendido é mau hábito de simulador.", "critical"),
      item("Critério de interrupção", "Interromper se controle, potência ou indicação não fizer sentido", "Não invente velocidades de rejeição.", "O critério educacional é decidir cedo se algo obviamente errado aparecer.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-alinhamento",
    slug: "c408-alinhamento",
    flightPhase: "decolagem",
    title: "Alinhamento na pista",
    description: "Confirmação final antes de aplicar potência: pista, proa, luzes, transponder, FMA e intenção inicial.",
    order: 11,
    version: "1.0-estudo",
    items: [
      item("Pista", "Cabeceira e proa coerentes", "Compare sinalização, bússola e briefing.", "Erro de pista é evitado com confirmação ativa.", "critical"),
      item("Linha central", "Aeronave alinhada e estabilizada", "Pare por um momento antes de aplicar potência.", "Alinhamento ruim vira controle direcional difícil."),
      item("Luzes e transponder", "Configurados conforme cenário", "Use padrões do simulador/ATC quando aplicável.", "Esses itens criam disciplina operacional sem exigir regra local específica."),
      item("FMA e altitude", "Modos iniciais conhecidos", "Confirme se não há modo inesperado ativo.", "O FMA conta o que a automação fará depois da decolagem.", "critical"),
      item("Cronômetro ou referência", "Usado se fizer parte do exercício", "Útil para VFR e debriefing.", "Registrar tempo ajuda a comparar plano e execução.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-decolagem-subida-inicial",
    slug: "c408-decolagem-subida-inicial",
    flightPhase: "decolagem",
    title: "Decolagem e subida inicial",
    description: "Checklist de observação para potência, controle direcional, atitude, aceleração, subida e configuração inicial.",
    order: 12,
    version: "1.0-estudo",
    items: [
      item("Potência e motores", "Indicações coerentes para o treino", "Use valores oficiais somente quando disponíveis.", "O aluno deve observar tendência e simetria antes de focar no mapa.", "critical"),
      item("Controle direcional", "Centro da pista mantido com comandos suaves", "Corrija cedo, sem oscilar.", "Bimoto e vento exigem atenção de leme/direção."),
      item("Atitude e aceleração", "Rotação e subida estabilizadas conforme aula", "Não use velocidade inventada.", "Atitude correta preserva energia e margem."),
      item("Trajetória inicial", "Primeira proa/curva e altitude previstas", "Não improvise logo após sair do solo.", "Subida inicial é fase de alta carga de trabalho.", "critical"),
      item("After takeoff didático", "Configuração, luzes e modos revisados quando seguro", "Faça só quando estabilizado.", "Aviate antes de mexer no painel.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-subida",
    slug: "c408-subida",
    flightPhase: "subida",
    title: "Subida",
    description: "Organiza velocidade, potência, altitude, FMA, gelo, combustível, motores e próxima fase.",
    order: 13,
    version: "1.0-estudo",
    items: [
      item("Velocidade e atitude", "Estáveis e compatíveis com treino", "Não force razão vertical sacrificando velocidade.", "Subida é gerenciamento de energia."),
      item("Potência e motores", "Monitorados por tendência", "Não invente limite numérico.", "Monitorar motor evita foco exclusivo no Garmin."),
      item("Altitude selecionada e FMA", "Alvo e modo vertical conferidos", "ALT armado/capturado deve ser observado.", "A automação só é confiável quando o FMA confirma.", "critical"),
      item("Gelo e meteorologia", "Condição avaliada", "Sistemas de gelo do C408 tiveram correções no MSFS; confirme sua versão.", "Não trate o simulador como autorização para atravessar gelo sem critério."),
      item("Próximo evento", "Cruzeiro ou restrição antecipado", "Prepare nivelamento antes do alvo.", "A boa subida termina antes da altitude escolhida.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-cruzeiro",
    slug: "c408-cruzeiro",
    flightPhase: "cruzeiro",
    title: "Cruzeiro",
    description: "Checklist de monitoramento: potência, motor, combustível, navegação, meteorologia, Garmin e chegada.",
    order: 14,
    version: "1.0-estudo",
    items: [
      item("Aeronave estabilizada", "Altitude, proa/rota e velocidade sob controle", "Use trim e pequenas correções.", "Cruzeiro não é pausa; é monitoramento com baixa carga."),
      item("Motor e combustível", "Tendências acompanhadas", "Consumo real depende de fonte oficial.", "Combustível deve ser comparado ao plano didático e alternado."),
      item("Garmin", "Próximo waypoint, ETA, fonte e FMA conferidos", "Compare MFD e PFD.", "O painel deve confirmar o plano, não substituir raciocínio.", "critical"),
      item("Meteorologia e rota", "Próxima decisão antecipada", "Desvio meteorológico deve ser decidido cedo.", "Esperar o problema chegar reduz opções."),
      item("Briefing de chegada", "Iniciado antes da descida", "Pista, procedimento, alternado e mínimos didáticos.", "Chegada boa começa em cruzeiro.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-preparacao-descida",
    slug: "c408-preparacao-descida",
    flightPhase: "descida",
    title: "Preparação da descida",
    description: "Reúne meteorologia, pista, aproximação, cartas, mínimos, frequências, barômetro, combustível e alternado.",
    order: 15,
    version: "1.0-estudo",
    items: [
      item("Meteorologia e pista", "Condição de destino e pista provável revisadas", "Não assuma que destino continuará igual ao planejado.", "Descida sem atualização vira chegada atrasada."),
      item("Procedimento ou circuito", "Tipo de chegada escolhido", "VFR, ILS, RNAV ou visual conforme treino.", "Escolher cedo reduz carga de trabalho no fim."),
      item("Garmin e fontes", "Procedimento carregado/revisado; fonte prevista", "Load e Activate não são a mesma coisa.", "Muitos erros de aproximação começam aqui.", "critical"),
      item("Barômetro e altitudes", "QNH, altitude alvo e restrições revisadas", "Regras variam por país.", "Altitude errada pode parecer capturada e ainda estar incorreta.", "critical"),
      item("Alternado e combustível", "Plano B ainda viável", "Use margem didática; não invente consumo oficial.", "A decisão de alternar deve existir antes da aproximação.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-descida",
    slug: "c408-descida",
    flightPhase: "descida",
    title: "Descida",
    description: "Monitora energia, velocidade, altitude, restrições, VS/FLC, gelo, luzes e navegação durante a descida.",
    order: 16,
    version: "1.0-estudo",
    items: [
      item("Perfil vertical", "Altura a perder e distância coerentes", "Use cálculo simples antes de confiar em VNAV.", "Descida planejada evita chegar alto e rápido.", "critical"),
      item("Modo vertical", "VS/FLC/VNAV e altitude selecionada conferidos", "FMA deve mostrar o que você espera.", "Modo errado pode cumprir trajetória errada com precisão."),
      item("Velocidade e potência", "Energia controlada", "Não deixe a velocidade crescer enquanto mexe no MFD.", "Energia demais vira aproximação desestabilizada."),
      item("Meteorologia/gelo", "Condição monitorada", "Use sistemas simulados com cautela e confirme versão.", "Mudança de clima pode exigir desvio, espera ou alternado."),
      item("Briefing atualizado", "Próxima fase verbalizada", "Pista, fonte, mínimos, arremetida e alternado.", "Briefing deve estar pronto antes da aproximação.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-aproximacao",
    slug: "c408-aproximacao-estabilizada",
    flightPhase: "aproximacao",
    title: "Aproximação estabilizada",
    description: "Checklist de decisão: fonte, pista, configuração, velocidade, trajetória, FMA e arremetida.",
    order: 17,
    version: "1.0-estudo",
    items: [
      item("Fonte e procedimento", "GPS/NAV/LOC coerente com aproximação", "RNAV e ILS usam lógicas diferentes.", "Fonte errada é causa central de falha de captura.", "critical"),
      item("FMA", "Modos ativos/armados esperados", "APR armado não é captura.", "O FMA é a confirmação da automação.", "critical"),
      item("Configuração e energia", "Velocidade, flaps e potência coerentes com treino", "Use valores oficiais somente com fonte.", "Configuração atrasada cria final instável."),
      item("Trajetória", "Alinhamento e razão de descida estáveis", "Corrija causa, não apenas efeito.", "Trajetória instável exige decisão, não improviso."),
      item("Decisão", "Continuar ou arremeter verbalizado", "Arremetida é opção normal.", "Se ficar alto, rápido, desalinhado ou confuso, arremeta.", "critical")
    ]
  }),
  createChecklist({
    id: "checklist-c408-antes-pouso",
    slug: "c408-antes-pouso",
    flightPhase: "pouso",
    title: "Antes do pouso",
    description: "Confirmação final de pista, vento, configuração, trem fixo, luzes, potência e plano de arremetida.",
    order: 18,
    version: "1.0-estudo",
    items: [
      item("Pista e vento", "Pista correta e vento compreendido", "Inclua vento cruzado e decisão de arremeter.", "Pouso é decisão contínua, não obrigação.", "critical"),
      item("Configuração", "Estado reconhecido e compatível com aula", "Não invente configuração oficial.", "Aeronave configurada tarde tende a estabilizar tarde."),
      item("Trem fixo", "Confirmado como fixo/visual conhecido", "O C408 possui trem fixo; use como consciência de configuração.", "Não transforme item em checklist de trem retrátil."),
      item("Autopilot", "Desconexão/monitoramento planejados", "Saiba quando assumirá manualmente.", "Aproximação guiada ainda exige piloto pronto."),
      item("Arremetida", "Plano verbalizado", "Potência, atitude, trajetória e reorganização.", "O plano de arremetida precisa existir antes do flare.", "critical")
    ]
  }),
  createChecklist({
    id: "checklist-c408-apos-pouso",
    slug: "c408-apos-pouso",
    flightPhase: "apos-pouso",
    title: "Após o pouso",
    description: "Organiza controle direcional, desaceleração, saída da pista, luzes, transponder, flaps, alertas e taxi.",
    order: 19,
    version: "1.0-estudo",
    items: [
      item("Controle direcional", "Mantido até velocidade de taxi", "Não relaxe após o toque.", "A pista ainda exige pilotagem depois do pouso.", "critical"),
      item("Desaceleração", "Beta/reverso/freios usados com cautela", "Não abuse de reverso ou freio no simulador.", "O objetivo é controle, não parar no menor espaço."),
      item("Saída da pista", "Realizada com segurança e sem cruzar pista ativa", "Use mapa se necessário.", "Consciência de solo continua após livrar a pista."),
      item("Configuração pós-pouso", "Flaps, luzes, transponder e trim revisados quando apropriado", "Sem pressa; primeiro controle a aeronave.", "Evita decolar novamente com configuração esquecida."),
      item("Alertas", "Mensagens verificadas", "Não ignore alertas surgidos no pouso.", "Debriefing começa já no taxi.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-taxi-apos-pouso",
    slug: "c408-taxi-apos-pouso",
    flightPhase: "apos-pouso",
    title: "Taxi após pouso",
    description: "Roteiro de taxi até estacionamento com velocidade, rota, freios, luzes, sistemas e organização de cabine.",
    order: 20,
    version: "1.0-estudo",
    items: [
      item("Rota até estacionamento", "Definida antes de mover", "Evite taxi improvisado em aeroportos maiores.", "Planejar solo evita entrar onde não deve."),
      item("Velocidade e freios", "Baixos e estáveis", "Freios superaquecidos reais não são foco; disciplina sim.", "Controle suave preserva treinamento e evita colisões no simulador.", "critical"),
      item("Luzes e transponder", "Ajustados conforme fase", "Use padrão do cenário/ATC simulado.", "Indica que a aeronave saiu da fase de pista."),
      item("Garmin/mapa", "Usado apenas como apoio", "Olhe para fora e para rota no solo.", "Cabeça baixa em taxi causa erro de trajetória."),
      item("Debriefing mental", "Um erro e uma melhoria já identificados", "Anote após estacionar.", "Aprendizado começa antes de desligar.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-estacionamento-desligamento",
    slug: "c408-estacionamento-desligamento",
    flightPhase: "corte-dos-motores",
    title: "Estacionamento e desligamento",
    description: "Fecha o voo no simulador: freio, potência, aviônicos, motores, luzes, alertas, portas e debriefing.",
    order: 21,
    version: "1.0-estudo",
    items: [
      item("Estacionamento", "Aeronave parada e freio aplicado", "Escolha posição segura no pátio.", "Antes de desligar, garanta que a aeronave não se moverá.", "critical"),
      item("Potência e motores", "Reduzidos/desligados conforme fluxo do simulador", "Não invente sequência real.", "O foco é encerrar com método e observar indicações."),
      item("Aviônicos e energia", "Telas e bateria desligadas conforme necessário", "Evite deixar estado inconsistente para próximo treino.", "Estado final limpo ajuda repetibilidade."),
      item("Luzes e portas", "Configuradas para aeronave estacionada", "Use como disciplina visual.", "O encerramento também ensina organização de cockpit."),
      item("Debriefing", "Relato, nota pessoal e item de revisão registrados", "Responda: o que funcionou, o que falhou, o que repetir.", "Sem debriefing, o voo vira passeio e não treino.", "critical")
    ]
  }),
  createChecklist({
    id: "checklist-c408-anormal-automacao",
    slug: "c408-anormal-automacao",
    flightPhase: "emergencia",
    title: "Anormal - automação ou navegação",
    description: "Checklist conceitual para fonte errada, modo inesperado, piloto automático desconectado ou Garmin confuso.",
    order: 22,
    version: "1.0-estudo",
    items: [
      item("Aviate", "Aeronave controlada manualmente ou em modo simples", "Atitude, velocidade, altitude e proa vêm primeiro.", "Não resolva menu antes de voar a aeronave.", "critical"),
      item("Fonte", "GPS/NAV/LOC confirmada", "Confira CDI/HSI e plano.", "Muitos problemas de NAV/APR são fonte errada."),
      item("FMA", "Modo ativo e armado lidos em voz alta", "A aeronave segue o FMA.", "Se o FMA não mostra sua intenção, corrija configuração ou voe manualmente.", "critical"),
      item("Plano/perna ativa", "Waypoint e sequência revisados", "Direct-To, OBS/SUSP e Activate Leg podem alterar tudo.", "Entenda a rota antes de reengajar automação."),
      item("Recuperação", "Uma variável corrigida por vez", "Se a aproximação ficou instável, arremeta.", "Correção metódica evita empilhar erros.")
    ]
  }),
  createChecklist({
    id: "checklist-c408-emergencia-conceitual",
    slug: "c408-emergencia-simulada",
    flightPhase: "emergencia",
    title: "Emergência simulada - prioridades",
    description: "Checklist conceitual para treinar prioridades sem inventar procedimento de emergência real.",
    order: 23,
    version: "1.0-estudo",
    items: [
      item("Aviate", "Atitude, velocidade e controle direcional preservados", "Não há memory item oficial cadastrado aqui.", "Toda emergência começa mantendo a aeronave voável.", "critical"),
      item("Reduzir carga", "Automação simplificada e tarefas não essenciais pausadas", "Desconecte ou simplifique se a automação confundir.", "Carga mental alta piora decisões."),
      item("Navigate", "Rota, terreno, pista/alternado ou área segura identificados", "Use GPS como apoio, não como piloto.", "Saber para onde ir vem depois de controlar."),
      item("Communicate", "Comunicação simulada somente após controle", "ATC, intenção, posição e necessidade conforme cenário.", "Comunicação não substitui controle."),
      item("Checklist oficial", "Consultar referência aplicável quando disponível", "Sem fonte, não invente sequência crítica.", "A plataforma ensina prioridade; o procedimento real vem da documentação oficial.", "critical")
    ]
  })
];

function item(text: string, expectedResponse: string, observation: string, explanation: string, kind: ChecklistItemKind = "normal") {
  return { text, expectedResponse, observation, explanation, kind };
}

function createChecklist(input: ChecklistInput): ChecklistDocument {
  const items: ChecklistItemDocument[] = input.items.map((itemInput, index) => ({
    id: `${input.id}-item-${index + 1}`,
    checklistId: input.id,
    text: itemInput.text,
    expectedResponse: itemInput.expectedResponse,
    observation: itemInput.observation,
    order: index + 1,
    kind: itemInput.kind ?? "normal",
    status: "pending",
    explanation: itemInput.explanation,
    technicalMetadata: c408ChecklistMetadata
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
      description: "Permite abrir explicações, consultar observações, estudar fora de sequência rígida e entender o motivo de cada item."
    },
    operationalMode: {
      enabled: true,
      description: "Interface compacta para marcar itens rapidamente no iPad durante treino em simulador, mantendo aviso de material educacional."
    },
    technicalMetadata: c408ChecklistMetadata
  };
}
