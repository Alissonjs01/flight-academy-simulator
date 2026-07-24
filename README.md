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

## Preparar no Netlify pelo GitHub

Esta aplicacao Next.js esta preparada para deploy no Netlify pelo repositorio GitHub. O arquivo `netlify.toml` define:

- comando de build: `npm run build`;
- pasta publicada: `.next`;
- Node.js 20;
- emuladores desativados;
- Storage desativado;
- conteudo publico inicial vindo dos dados locais.

A Netlify suporta Next.js com App Router usando o adaptador automatico atual. Nao foi instalado plugin manual nem fixada versao do adaptador.

No painel do Netlify, conecte o repositorio `Alissonjs01/flight-academy-simulator.git` e configure estas variaveis em **Site configuration > Environment variables**:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=valor_do_app_web_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=flight-academy-simulatorr.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=flight-academy-simulatorr
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=valor_do_app_web_firebase
NEXT_PUBLIC_FIREBASE_APP_ID=valor_do_app_web_firebase
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=false
NEXT_PUBLIC_FIREBASE_CONTENT_SOURCE=local
NEXT_PUBLIC_ENABLE_FIREBASE_STORAGE=false
NEXT_PUBLIC_ENABLE_PWA_IN_DEV=false
```

`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` e opcional nesta fase, porque Firebase Storage permanece desativado. Nao coloque conta de servico, chave privada, arquivo JSON administrativo ou segredo do Firebase Admin SDK no Netlify para este fluxo.

Antes de publicar, confirme no Firebase Console:

- Authentication com provedor E-mail/senha habilitado;
- Cloud Firestore criado;
- `firestore.rules` e `firestore.indexes.json` publicados pelo comando local `npm run deploy:firestore`;
- Storage nao ativado nesta etapa;
- plano Blaze nao habilitado para este projeto.

## Estado atual

Esta versao esta pronta para testes locais, Firebase Emulator Suite e conexao inicial ao projeto Firebase real do proprietario. O repositorio remoto GitHub tambem ja pode ser usado quando configurado localmente.

Modo Spark atual:

- Projeto configurado para funcionar no plano Spark utilizando apenas Authentication e Cloud Firestore, respeitando as cotas gratuitas do Firebase.
- Firebase Authentication possui cotas gratuitas e deve ser monitorado no Console.
- Cloud Firestore possui cotas gratuitas de leitura, escrita, exclusão e armazenamento.
- Firebase Storage permanece preparado no codigo, mas totalmente desativado nesta fase.
- O projeto nao deve ser migrado para Blaze nesta etapa.
- Firebase Hosting/App Hosting: nao foi implantado nesta etapa.
- Seeds em projeto real: devem ser executados somente com confirmacao explicita.

Funcionalidades reais no codigo:

- Firebase Authentication implementado para cadastro, login, logout e recuperacao de senha.
- Firestore implementado para perfis, progresso, tentativas, revisoes e conteudo quando configurado.
- Storage preparado para imagens permitidas, mas desligado por padrao no modo Spark atual.
- Security Rules e testes automatizados.
- Painel administrativo protegido por papeis.
- PWA com manifest, service worker, tela offline e configuracoes.

Funcionalidades que ainda dependem de configuracao externa:

- Login em Firebase real.
- Firestore real.
- Storage real, somente se voce decidir ativar esse servico no Firebase.
- Primeiro administrador real.
- Seed em projeto real.
- GitHub remoto.
- Deploy/publicacao.
- Teste fisico no iPad/Safari.

## Comandos uteis

```bash
npm run dev
npm run dev:real
npm run dev:emulators
npm run emulators
npm run test:pwa
npm run test:rules
npm run test:firebase
npm run deploy:firestore
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
- Repositorios locais e Firestore preparados por camada de servicos.
- Progresso, tentativas e revisoes salvos localmente quando Firebase nao esta configurado e sincronizados com Firestore quando ha usuario autenticado.
- Metadados de fidelidade tecnica, fonte, variante, status de verificacao e revisao preparados nos modelos de conteudo tecnico.
- Firebase Authentication, Firestore, Security Rules e Emulator Suite implementados. Storage fica preparado para ativacao futura.
- Painel administrativo funcional para gestao gradual de conteudos.
- Progressive Web App instalavel com estrategia conservadora de cache.

## Observacao

O codigo de Firebase e autenticacao e real, mas ainda aguarda as variaveis do seu projeto Firebase. Sem `.env.local`, a aplicacao mostra mensagem de configuracao ausente e nao autentica em producao. Para desenvolvimento seguro, use a Firebase Emulator Suite. Nao use o projeto `gestao-frota-bus` para esta plataforma.

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

O Firebase Storage pode ser usado futuramente para imagens de cursos, anexos de aulas, PDFs, videos e materiais de checklist, mas ele fica desativado no modo Spark atual.

Veja tambem `docs/firebase-migration.md`.

## Firebase

Esta etapa prepara e integra Firebase Authentication, Cloud Firestore, Security Rules e Emulator Suite. Firebase Storage esta preparado no codigo e nas regras, mas desativado por padrao para manter a plataforma usando apenas Auth + Firestore no plano Spark. A configuracao publica do SDK web fica em `.env.local`; credenciais privadas, contas de servico e JSONs administrativos nao devem ser versionados.

### Criar o projeto Firebase

1. No Console do Firebase, crie um projeto.
2. Ative Authentication com provedor E-mail/senha.
3. Crie o banco Cloud Firestore.
4. Nao ative Firebase Storage nem migre para Blaze nesta etapa.
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
NEXT_PUBLIC_ENABLE_FIREBASE_STORAGE=false
NEXT_PUBLIC_ENABLE_PWA_IN_DEV=false
FIREBASE_PROJECT_ID=...
CONFIRM_REAL_FIREBASE_SEED=
```

`NEXT_PUBLIC_FIREBASE_CONTENT_SOURCE=local` mantem os Server Components usando conteudo local. Use `firestore` somente quando houver uma estrategia de leitura autenticada no servidor ou paginas de conteudo client-side. Os dados privados do aluno ja sao gravados no Firestore quando o usuario esta autenticado.

`NEXT_PUBLIC_ENABLE_FIREBASE_STORAGE=false` mantem uploads desativados. Use `true` somente depois de ativar Storage no projeto Firebase e publicar `storage.rules`.

### Comandos

```bash
npm run dev
npm run emulators
npm run seed:emulator
npm run seed:firebase
npm run deploy:firestore
npm run test:rules
npm run lint
npm run typecheck
npm run build
```

Para usar emuladores na aplicacao local, defina `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true` em `.env.local` e rode `npm run emulators` em paralelo ao `npm run dev`, ou use `npm run dev:emulators`. Esses comandos padrao iniciam somente Authentication e Firestore.

### Login

Foram criadas as rotas:

- `/login`
- `/cadastro`
- `/recuperar-senha`

O cadastro cria o usuario no Firebase Authentication e cria `users/{uid}` no Firestore com papel inicial `student`. O login atualiza `lastLoginAt`. O logout limpa dados privados locais para reduzir risco de mistura entre usuarios no mesmo navegador.

### Migracao do localStorage

Ao autenticar, a plataforma detecta chaves locais reconhecidas de progresso, exercicios, revisoes, avaliacoes, checklists e treinamentos. O aluno pode migrar, ignorar ou excluir os dados locais. A migracao reescreve `userId` para o UID autenticado, grava em colecoes privadas e marca `migrationCompleted`.

### Regra de progresso do aluno

O progresso geral exibido no dashboard e no perfil e calculado apenas por conclusoes reais de aulas publicadas:

```text
progresso geral = aulas publicadas concluidas / total de aulas publicadas * 100
```

Uma conta nova sempre inicia com `0%`, `0` aulas concluidas, `0` checklists concluidos e nenhum curso iniciado. Abrir o dashboard ou a primeira aula nao marca conteudo como concluido. A primeira aula pode aparecer como aula atual, mas so entra no percentual depois que o aluno aciona a conclusao.

Quando ha Firebase Authentication ativo, o progresso local e associado ao UID da sessao atual e sincronizado para o Firestore. No logout e em troca de conta, a aplicacao limpa dados privados locais reconhecidos para evitar que um usuario visualize progresso do usuario anterior no mesmo navegador.

### Seed de conteudo

O seed idempotente esta em `scripts/seedFirestore.ts`. Ele carrega cursos, modulos, aulas, exercicios, avaliacoes, Cessna 408 SkyCourier, Garmin G1000 NXi, checklists e treinamentos usando IDs estaveis. Executar novamente atualiza os mesmos documentos sem duplicar.

O seed em projeto real e bloqueado por padrao. Para executar fora do emulador, defina `CONFIRM_REAL_FIREBASE_SEED` com exatamente o mesmo `projectId` de destino.

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

Para aplicar Firestore em um projeto real sem ativar Storage:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

Nao execute `firebase deploy` sem `--only`: o deploy generico pode tentar publicar Hosting, Storage, Functions ou outros servicos que nao fazem parte do modo Spark atual.

Quando e somente quando Storage estiver ativo no seu Firebase, publique tambem:

```bash
firebase deploy --only storage
```

### Erros comuns

- Se a app mostrar "Firebase nao configurado", revise `.env.local`.
- Se o login funcionar mas leituras falharem, confira Authentication, Rules e se o usuario tem UID correto.
- Se o emulador nao responder, confirme `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true` e portas 9099, 8080 e 9199 livres.
- Se um admin nao conseguir acessar, faca logout/login depois de aplicar Custom Claims.

## Painel administrativo

O painel fica em `/admin` e exige usuario autenticado com papel `instructor` ou `admin`. A protecao visual da rota e apenas conveniencia; a autorizacao real tambem fica nas Firebase Security Rules.

Papeis:

- `student`: estuda conteudos publicados e grava apenas o proprio progresso.
- `instructor`: cria e edita conteudos permitidos, rascunhos, publicacoes e uploads de midia, mas nao pode alterar papeis nem marcar conteudo tecnico como `verified`.
- `admin`: gerencia conteudo, papeis, publicacoes criticas, verificacao tecnica e exclusoes quando nao houver dependencias.

Para criar o primeiro administrador, crie o usuario por `/cadastro` e aplique Custom Claim em ambiente seguro:

```bash
npm run admin:set -- UID_DO_USUARIO
```

Depois faca logout/login para atualizar o token.

### Como criar e publicar conteudo

1. Acesse `/admin`.
2. Escolha a aba de conteudo: Cursos, Modulos, Aulas, Exercicios, Aeronaves, Avionicos, Checklists ou Treinamentos.
3. Use `Criar conteudo`.
4. Preencha os campos obrigatorios e salve como `Rascunho`.
5. Revise a pre-visualizacao e os metadados.
6. Publique somente quando a classificacao e o status de verificacao estiverem coerentes.

O editor de aulas usa campos estruturados e Markdown simples. HTML arbitrario nao deve ser armazenado sem sanitizacao.

### Fontes, revisao e verificacao

Conteudos tecnicos exibem campos de rastreabilidade para fonte, variante real, variante no simulador, versao do add-on, classificacao, status de verificacao, diferencas conhecidas e notas de revisao.

- Conteudo sem fonte confirmada deve permanecer `provisional_unverified` e `pending_verification`.
- Adaptacoes para Microsoft Flight Simulator devem explicar a adaptacao em `simulatorAdaptationNotes`.
- Divergencias entre fontes devem ser registradas em `revisionNotes` e marcadas como `conflicting_sources` quando necessario.
- Conteudo gerado por IA pode apoiar rascunhos didaticos, mas nao deve ser cadastrado como fonte.
- Somente `admin` pode marcar `verificationStatus: verified`.
- Depois de atualizacoes de aeronave, avionico ou add-on, revise `addonVersion`, `lastReviewedAt`, `knownSimulatorDifferences` e as notas de revisao.

### Uploads

Uploads administrativos estao preparados para:

- `courseImages/{courseId}`;
- `lessonImages/{lessonId}`;
- `aircraftImages/{aircraftId}`;
- `avionicsImages/{avionicId}`.

Tipos aceitos: JPG, PNG e WebP. Limites atuais: 5 MB para cursos/aulas e 8 MB para aeronaves/avionicos. Alunos nao podem enviar imagens administrativas. Fotos de perfil continuam restritas ao proprio usuario.

### Auditoria e historico

Alteracoes relevantes geram documentos em:

- `auditLogs`;
- `contentRevisions`.

Os registros guardam acao, entidade, usuario, papel, timestamp e campos alterados. Eles sao append-only pelas regras: editores podem criar e ler, mas nao alterar nem apagar logs existentes.

### Testes do painel e regras

```bash
npm run test:firebase
npm run test:rules
npm run lint
npm run typecheck
npm run build
```

Os testes padrao cobrem bloqueio de alunos no conteudo administrativo, permissao de instrutor, poderes de admin, bloqueio de `verified` para instrutor, campos imutaveis, auditoria e dados privados no Firestore. Regras de Storage ficam separadas em `npm run test:storage:rules` e nao sao executadas no fluxo padrao.

### Limitacoes atuais

- O painel oferece gerenciamento gradual e generico; editores especializados para sistemas, limitacoes, procedimentos e versoes comparadas de checklist ainda podem ser refinados.
- Exclusoes com dependencias sao bloqueadas pelo servico do painel quando detectaveis; regras do Firestore nao conseguem consultar todos os relacionamentos possiveis em cascata.
- Busca textual usa filtros client-side sobre lotes limitados. Para busca ampla, use um indice dedicado no futuro.
- Upload de documentos tecnicos e PDFs ainda nao foi habilitado; somente imagens autorizadas.

## Progressive Web App

A plataforma possui manifest, icons, metadados de instalacao e service worker proprio. O nome atual permanece `Flight Academy Simulator`; para trocar depois, atualize `src/app/layout.tsx` e `public/manifest.webmanifest`.

### Desenvolvimento

```bash
npm run dev
npm run dev:real
npm run dev:emulators
npm run emulators
npm run build
npm run start
```

No ambiente de desenvolvimento, o service worker nao e registrado por padrao para nao atrapalhar HMR e testes. Para testar a PWA localmente, use build/start ou defina `NEXT_PUBLIC_ENABLE_PWA_IN_DEV=true` temporariamente. Em producao, a aplicacao ignora `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true` para evitar conexao acidental aos emuladores.

### Instalar no iPad

1. Abra a plataforma no Safari.
2. Toque em Compartilhar.
3. Escolha Adicionar a Tela de Inicio.
4. Confirme o nome.
5. Abra pelo icone criado.

No iPad/iPhone o Safari nao usa `beforeinstallprompt`; por isso a tela de Configuracoes mostra instrucoes manuais.

### Instalar no Windows

No Chrome ou Edge, abra a plataforma e use o botao Instalar quando aparecer em Configuracoes ou o icone de instalacao da barra do navegador.

### Estrategia de cache

- Arquivos estaticos, icons, manifest e chunks versionados usam cache publico.
- Imagens e assets locais usam estrategia `stale while revalidate`.
- Paginas publicas carregadas podem ser reutilizadas como fallback offline.
- Dashboard, progresso, revisao, configuracoes e rotas privadas usam rede primeiro e nao sao persistidas como HTML privado.
- `/admin` nao e armazenado em cache manualmente.
- Requisicoes do Firebase Auth, Firestore e Storage nao sao interceptadas nem cacheadas manualmente.

O service worker nunca salva senhas, tokens, Custom Claims, service accounts, respostas privadas do Firestore ou conteudos administrativos em cache manual.

### O que funciona offline

Com seguranca, a PWA pode:

- abrir a estrutura visual ja carregada;
- exibir a tela offline;
- reutilizar assets publicos;
- consultar paginas educacionais publicas ja carregadas;
- manter dados locais reconhecidos ate migracao/sincronizacao quando o Firebase estiver configurado.

Ainda exigem conexao:

- cadastro;
- primeiro login;
- recuperacao de senha;
- upload de imagens;
- publicacao administrativa;
- verificacao tecnica;
- alteracao de papeis;
- conteudos nunca carregados antes;
- confirmacao real de sincronizacao com Firestore.

### Sincronizacao e logout

O progresso autenticado continua associado ao UID do Firebase quando a configuracao estiver ativa. O logout chama a limpeza de dados privados locais e avisa o service worker para remover caches privados manuais. Isso reduz o risco de um usuario ver dados do usuario anterior no mesmo dispositivo.

O Firestore offline persistence nao foi ativado globalmente nesta etapa. A decisao e proposital: iPad/Safari, multiplas abas, troca de usuario e painel administrativo exigem uma politica mais especifica antes de usar IndexedDB como cache oficial do Firestore. A aplicacao preserva a arquitetura para ativar isso por fluxo no futuro.

### Atualizacao da aplicacao

Quando um novo service worker fica disponivel, a interface mostra:

```text
Uma nova versao da plataforma esta disponivel.
```

O usuario pode atualizar agora ou depois. A aplicacao nao força recarregamento automatico durante exercicios, checklists, uploads ou edicao administrativa.

### Limpar cache

A pagina `/configuracoes` mostra status de instalacao, conexao, versao, armazenamento e botoes para:

- limpar cache publico;
- limpar dados locais privados;
- limpar todos os caches da PWA.

Cada acao pede confirmacao antes de remover dados.

### Testes da PWA

```bash
npm run test:pwa
npm run test:firebase
npm run test:rules
npm run lint
npm run typecheck
npm run build
```

Foram testados manifest, politica de cache, service worker, comandos de limpeza, fallback offline, testes Firebase com emuladores, lint, typecheck e build.

### Testes pendentes em dispositivos reais

Ainda devem ser conferidos manualmente quando voce estiver com os dispositivos:

- Safari no iPad em orientacao vertical e horizontal;
- instalacao via Adicionar a Tela de Inicio;
- abertura pela tela inicial;
- retorno apos suspensao do iPad;
- teclado virtual em formularios;
- uploads pelo Safari;
- painel administrativo em tela dividida;
- perda e retorno de conexao real;
- Chrome e Edge instalados no Windows.

Nao houve deploy nem validacao em Firebase real nesta etapa.

## Editores tecnicos especializados

O painel administrativo possui editores especializados para conteudo aeronautico, funcionando localmente e com Firebase Emulator Suite:

- sistemas da aeronave (`aircraftSystems`);
- limitacoes (`aircraftLimitations`);
- procedimentos (`aircraftProcedures`);
- performance (`aircraftPerformance`);
- aulas em blocos estruturados;
- checklists com versao, secoes e itens estaveis.

Esses editores preservam IDs, slugs e relacionamentos existentes. Os formularios genericos continuam disponiveis para cursos, modulos, exercicios, aeronaves, avionicos e treinamentos, enquanto os conteudos tecnicos usam campos especificos de fonte, variante, adaptacao ao simulador, revisao e verificacao.

Regras importantes:

- nao inventar dados tecnicos ausentes;
- nao publicar limitacao tecnica sem variante real aplicavel;
- nao marcar conteudo como `verified` sem fonte identificavel;
- instrutor pode criar e editar conteudo permitido, mas nao pode marcar `verified`;
- somente admin pode promover conteudo tecnico para verificado;
- IA nao pode ser registrada como fonte tecnica;
- checklists publicados devem gerar nova versao antes de alteracoes relevantes.

O fluxo detalhado esta em `TECHNICAL_CONTENT_WORKFLOW.md`.

## Pre-publicacao

Antes de conectar Firebase real, GitHub remoto ou publicar, siga o roteiro em `PRE_PUBLICATION_CHECKLIST.md`.

Prontidao atual: pronto para testes com Firebase real, mas nao pronto para publicacao. Publicacao exige Firebase real validado, regras implantadas, Storage real testado, GitHub configurado, deploy e teste em dispositivo real.

Nota de dependencias: `next`, `eslint-config-next` e `postcss` foram atualizados para patches mais recentes dentro da linha atual. `npm audit` ainda reporta vulnerabilidades que exigem salto maior de Next/ESLint/Firebase tooling ou alteracoes potencialmente quebradoras. Antes de publicacao, planeje uma etapa dedicada de upgrade maior e validacao completa.
