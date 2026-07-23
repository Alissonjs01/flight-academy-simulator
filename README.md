# Flight Academy Simulator

Base inicial em Next.js para uma plataforma de estudos de pilotagem em simuladores de voo.

## Como abrir no computador

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o ambiente local:

```bash
npm run dev
```

3. Abra no navegador:

```text
http://localhost:3000
```

## Comandos uteis

```bash
npm run lint
npm run typecheck
npm run build
```

## O que existe nesta versao

- Next.js com App Router.
- TypeScript.
- Tailwind CSS.
- Modo escuro como padrao.
- Layout principal responsivo.
- Menu lateral recolhivel.
- Dashboard com dados ficticios.
- Paginas navegaveis para cursos, aulas, aeronaves, avionicos, checklists, treinamentos, progresso, configuracoes e admin.
- Organizacao de conteudo em Curso, Modulo, Aula, Exercicio e Progresso.
- Primeiro curso completo: Fundamentos da Pilotagem, com 6 modulos e 35 aulas.
- Exercicios por aula com multipla escolha, verdadeiro/falso e resposta aberta.
- Autoavaliacao de respostas abertas com observacao pessoal.
- Registro local de tentativas, acertos, erros e itens de revisao.
- Avaliacao final com perguntas sorteadas, historico de tentativas, nota percentual e criterios de aprovacao.
- Central de revisao em `/revisao`.
- Tela de resultado e certificado simbolico interno.
- Area de aeronaves com listagem, busca, filtros, progresso e pagina detalhada com abas.
- Area de avionicos com Garmin G1000 NXi, secoes preparadas, procedimentos, treinamentos e curso relacionado.
- Curso Garmin G1000 NXi — Fundamentos com 12 modulos e aulas introdutorias.
- Area de checklists com modo de estudo, modo operacional, progresso local e aviso de uso exclusivo em simulador.
- Area de treinamentos praticos para C408 com relato, nota pessoal e status salvos localmente.
- Repositorios e servicos locais preparados para uma implementacao futura com Firebase.
- Progresso, tentativas e revisoes temporarios salvos no localStorage.

## Observacao

Esta versao ainda nao possui banco de dados real, autenticacao real nem painel administrativo funcional. Os dados estao em arquivos locais para demonstrar a interface.

## Caminho futuro para Firebase

Os documentos locais em `src/features/content/data/localContent.ts` ja seguem uma estrutura compativel com Cloud Firestore:

```text
courses/{courseId}
courses/{courseId}/modules/{moduleId}
courses/{courseId}/modules/{moduleId}/lessons/{lessonId}
courses/{courseId}/modules/{moduleId}/lessons/{lessonId}/exercises/{exerciseId}
aircraft/{aircraftId}
aircraft/{aircraftId}/systems/{systemId}
aircraft/{aircraftId}/limitations/{limitationId}
aircraft/{aircraftId}/procedures/{procedureId}
aircraft/{aircraftId}/media/{mediaId}
avionics/{avionicId}
avionics/{avionicId}/sections/{sectionId}
avionics/{avionicId}/components/{componentId}
avionics/{avionicId}/procedures/{procedureId}
avionics/{avionicId}/trainings/{trainingId}
checklists/{checklistId}
checklists/{checklistId}/items/{checklistItemId}
trainings/{trainingId}
users/{userId}/progress/{courseId}
users/{userId}/courseProgress/{courseId}
users/{userId}/aircraftProgress/{aircraftId}
users/{userId}/avionicsProgress/{avionicId}
users/{userId}/userChecklistSessions/{sessionId}
users/{userId}/userTrainingRecords/{recordId}
users/{userId}/exerciseAttempts/{attemptId}
users/{userId}/exerciseResponses/{responseId}
users/{userId}/assessmentAttempts/{attemptId}
users/{userId}/reviewItems/{reviewItemId}
```

Para migrar, crie uma implementacao Firebase das interfaces em `src/features/content/repositories/contentRepository.ts` e substitua o repositorio usado pelos servicos em `src/services`. O progresso, tentativas, respostas e revisoes locais de `localStorage` devem virar documentos por usuario, protegidos por Firebase Authentication e Firebase Security Rules.

O Firebase Storage deve ser usado para imagens de cursos, anexos de aulas, PDFs, videos e materiais de checklist.

Veja tambem `docs/firebase-migration.md`.
