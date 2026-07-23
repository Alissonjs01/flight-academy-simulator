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
- Metadados de fidelidade tecnica, fonte, variante, status de verificacao e revisao preparados nos modelos de conteudo tecnico.

## Observacao

Esta versao ainda nao possui banco de dados real, autenticacao real nem painel administrativo funcional. Os dados estao em arquivos locais para demonstrar a interface.

## Política de fidelidade técnica e fontes aeronáuticas

Conteudos tecnicos de aeronaves, avionicos, sistemas, limitacoes, performance, checklists e procedimentos devem registrar fonte, variante, status de verificacao e historico de revisao sempre que aplicavel. Conteudo gerado por IA, texto didatico proprio ou anotacao interna nunca deve ser tratado como fonte primaria.

Prioridade de fontes:

1. AFM ou POH aplicavel a variante exata.
2. FCOM, QRH, SOP e documentacao do fabricante.
3. Manual oficial do equipamento ou avionico.
4. Documentacao oficial do desenvolvedor da aeronave no simulador.
5. Publicacoes aeronauticas oficiais.
6. Documentacao tecnica confiavel e claramente identificada.
7. Conteudo didatico proprio, identificado como explicacao ou exercicio.

Todo registro tecnico deve diferenciar `official_real_world`, `official_simulator_documentation`, `simulator_adaptation`, `training_exercise`, `educational_explanation` e `provisional_unverified`. Procedimento real, adaptacao para Microsoft Flight Simulator e exercicio didatico nao devem ser misturados na mesma classificacao.

Para registrar uma fonte, preencha os campos de metadados como `sourceType`, `sourceTitle`, `sourceOrganization`, `sourceEdition`, `sourceRevision`, `sourceDate`, `sourcePage`, `sourceUrl` e `sourceDocumentId`. Tambem registre fabricante, modelo, variante real, variante no simulador, plataforma, desenvolvedor do add-on e versao do add-on quando forem relevantes.

Um conteudo so deve ser marcado como `verified` quando a fonte aplicavel tiver sido conferida por uma pessoa responsavel, com `verifiedBy`, `verifiedAt` e `lastReviewedAt`. Conteudos incompletos ficam como `pending_verification`; fontes divergentes ficam como `conflicting_sources`; conteudos superados por nova revisao ficam como `obsolete`.

Divergencias entre fontes devem ser mantidas em `revisionNotes` e no historico de revisao, sem escolher um valor por conveniencia. Diferencas conhecidas entre aeronave real e simulador devem ser registradas em `knownSimulatorDifferences`, e qualquer adaptacao para simulador deve explicar o motivo em `simulatorAdaptationNotes`.

Conteudos ainda nao verificados devem usar `contentClassification: provisional_unverified` e `verificationStatus: pending_verification`, exibindo aviso visual. Nao use termos como oficial, aprovado ou verificado nesses casos.

Depois de atualizacoes do simulador, da aeronave, do add-on ou do avionico, revise os conteudos afetados, atualize `addonVersion`, `lastReviewedAt`, `revisionNotes` e adicione uma entrada no historico de revisao para informacoes criticas.

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
aircraft/{aircraftId}/performance/{performanceId}
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

## Firebase

Esta etapa prepara e integra Firebase Authentication, Cloud Firestore, Firebase Storage, Security Rules e Emulator Suite. A configuracao publica do SDK web fica em `.env.local`; credenciais privadas, contas de servico e JSONs administrativos nao devem ser versionados.

### Criar o projeto Firebase

1. No Console do Firebase, crie um projeto.
2. Ative Authentication com provedor E-mail/senha.
3. Crie o banco Cloud Firestore.
4. Ative Firebase Storage.
5. Registre um app Web e copie as configuracoes publicas do SDK.
6. Crie `.env.local` com base em `.env.example`.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=false
NEXT_PUBLIC_FIREBASE_CONTENT_SOURCE=local
FIREBASE_PROJECT_ID=...
```

`NEXT_PUBLIC_FIREBASE_CONTENT_SOURCE=local` mantem os Server Components usando conteudo local. Use `firestore` somente quando houver uma estrategia de leitura autenticada no servidor ou paginas de conteudo client-side. Os dados privados do aluno ja sao gravados no Firestore quando o usuario esta autenticado.

### Comandos

```bash
npm run dev
npm run emulators
npm run seed:emulator
npm run seed:firebase
npm run test:rules
npm run lint
npm run typecheck
npm run build
```

Para usar emuladores na aplicacao local, defina `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true` em `.env.local` e rode `npm run emulators` em paralelo ao `npm run dev`.

### Login

Foram criadas as rotas:

- `/login`
- `/cadastro`
- `/recuperar-senha`

O cadastro cria o usuario no Firebase Authentication e cria `users/{uid}` no Firestore com papel inicial `student`. O login atualiza `lastLoginAt`. O logout limpa dados privados locais para reduzir risco de mistura entre usuarios no mesmo navegador.

### Migracao do localStorage

Ao autenticar, a plataforma detecta chaves locais reconhecidas de progresso, exercicios, revisoes, avaliacoes, checklists e treinamentos. O aluno pode migrar, ignorar ou excluir os dados locais. A migracao reescreve `userId` para o UID autenticado, grava em colecoes privadas e marca `migrationCompleted`.

### Seed de conteudo

O seed idempotente esta em `scripts/seedFirestore.ts`. Ele carrega cursos, modulos, aulas, exercicios, avaliacoes, Cessna 408 SkyCourier, Garmin G1000 NXi, checklists e treinamentos usando IDs estaveis. Executar novamente atualiza os mesmos documentos sem duplicar.

Conteudos tecnicos provisórios permanecem com `contentClassification: provisional_unverified` e `verificationStatus: pending_verification`.

### Primeiro administrador

Crie o usuario normalmente pelo cadastro ou Console. Depois, em ambiente seguro com credenciais administrativas externas ou emulador, execute:

```bash
npm run admin:set -- UID_DO_USUARIO
```

Isso aplica Custom Claim `role=admin` e atualiza o perfil. Nunca coloque conta de servico no repositorio.

### Regras e indices

As regras ficam em:

- `firestore.rules`
- `storage.rules`

Os indices ficam em `firestore.indexes.json`.

Para aplicar em um projeto real:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

### Erros comuns

- Se a app mostrar "Firebase nao configurado", revise `.env.local`.
- Se o login funcionar mas leituras falharem, confira Authentication, Rules e se o usuario tem UID correto.
- Se o emulador nao responder, confirme `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true` e portas 9099, 8080 e 9199 livres.
- Se um admin nao conseguir acessar, faca logout/login depois de aplicar Custom Claims.
