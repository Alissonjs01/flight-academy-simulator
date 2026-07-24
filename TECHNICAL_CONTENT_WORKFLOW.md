# Fluxo de conteudo tecnico aeronautico

Este projeto e voltado a estudos em simulador, mas conteudo tecnico nao deve ser inventado, aproximado ou apresentado como oficial sem fonte e verificacao.

## Criar conteudo tecnico

1. Escolha a entidade correta no painel administrativo: sistemas, limitacoes, procedimentos, performance, aulas ou checklists.
2. Informe IDs estaveis de relacionamento, como `aircraftId`, `courseId`, `moduleId` ou `lessonId`.
3. Selecione a variante real aplicavel e, quando houver, a variante do simulador.
4. Deixe campos tecnicos vazios quando nao houver fonte.
5. Use `contentClassification: provisional_unverified` e `verificationStatus: pending_verification` para conteudo sem confirmacao.

## Registrar fonte

Registre a fonte no editor de fontes tecnicas:

- `sourceType`;
- `sourceTitle`;
- `sourceOrganization`;
- `sourceEdition`;
- `sourceRevision`;
- `sourceDate`;
- `sourcePage`;
- `sourceUrl`;
- `sourceDocumentId`;
- notas de revisao.

Nao cadastre como fonte: ChatGPT, IA, inteligencia artificial, modelo de linguagem ou texto sem origem identificavel.

## Selecionar variante

Nao misture dados entre variantes. Para limitacoes publicadas, a variante real e obrigatoria. Quando o simulador usar uma variante diferente, registre `simulatorAircraftVariant`, `simulatorDeveloper` e `addonVersion`.

## Classificar conteudo

Use:

- `official_real_world`: somente com fonte real aplicavel e verificacao administrativa.
- `official_simulator_documentation`: documentacao oficial do desenvolvedor do add-on/simulador.
- `simulator_adaptation`: procedimento adaptado ao Microsoft Flight Simulator.
- `training_exercise`: exercicio ou missao didatica.
- `educational_explanation`: explicacao educacional.
- `provisional_unverified`: conteudo pendente ou sem fonte confirmada.

## Enviar para revisao

Instrutores podem criar e editar conteudo permitido e marcar para revisao. O painel registra metadados, revisoes e auditoria para rastreabilidade.

## Verificar

Somente administrador autorizado pode marcar `verificationStatus: verified`. Conteudo `verified` exige fonte identificavel e nao pode usar IA como fonte.

## Registrar conflito

Quando houver divergencia entre fontes, use `verificationStatus: conflicting_sources`, registre as fontes envolvidas e explique o conflito em `revisionNotes` ou `reviewReason`.

## Criar revisao

Alteracoes relevantes geram auditoria e snapshots em `contentRevisions`. Ao editar checklist publicado, crie uma nova versao e informe o motivo da revisao.

## Comparar versoes

O comparador administrativo mostra campos alterados e listas ordenadas comparadas por ID estavel. Ele identifica itens adicionados, removidos e movidos sem depender apenas do indice.

## Arquivar

Prefira arquivamento quando houver progresso de alunos, sessoes, tentativas, relacoes ou historico. Nao faca exclusao em cascata silenciosa.

## Analisar impacto antes de excluir

Antes de excluir ou arquivar, revise o painel de impacto. Ele destaca dependencias provaveis, como cursos, aulas, checklists, treinamentos, progresso, sessoes e revisoes.

## Diferencas do simulador

Registre diferencas conhecidas em `knownSimulatorDifferences` e explique adaptacoes em `simulatorAdaptationNotes`. Nao apresente adaptacao de simulador como procedimento real.

## Uso de IA

IA pode ajudar a organizar texto e revisar clareza, mas nunca deve ser registrada como autoridade tecnica. A fonte deve ser um documento, publicacao ou material identificavel.
