# Checklist pre-publicacao

Use este roteiro quando estiver no computador com acesso a sua conta Google/Firebase e ao seu GitHub. Nao coloque segredos no repositorio.

## Conta, Firebase e ambiente

- [ ] Entrar na sua conta Google correta.
- [ ] Confirmar que o projeto `gestao-frota-bus` nao sera usado para esta plataforma.
- [ ] Criar ou selecionar um projeto Firebase exclusivo para o Flight Academy Simulator.
- [ ] Confirmar nome do projeto.
- [ ] Confirmar `projectId`.
- [ ] Confirmar regiao antes de criar Firestore/Storage. Exemplo: `southamerica-east1` reduz latencia no Brasil; `us-central1` costuma ter maior disponibilidade. A regiao nao e simples de mudar depois.
- [ ] Decidir se Google Analytics ficara desativado nesta fase.
- [ ] Registrar um aplicativo Web no Firebase.
- [ ] Copiar a configuracao publica do SDK Web.
- [ ] Criar `.env.local` a partir de `.env.example`.
- [ ] Preencher somente variaveis publicas do SDK Web em `.env.local`.
- [ ] Confirmar que `.env.local` esta ignorado pelo Git:

```bash
git check-ignore -v .env.local
```

## Firebase CLI

- [ ] Autenticar a Firebase CLI com sua conta:

```bash
firebase login
```

- [ ] Confirmar a conta ativa:

```bash
firebase login:list
```

- [ ] Listar projetos e conferir o destino:

```bash
firebase projects:list
```

- [ ] Criar `.firebaserc` com o projeto correto:

```bash
firebase use --add
```

- [ ] Confirmar que `.firebaserc` aponta para o projeto da plataforma, nao para outro sistema.

## Servicos Firebase

- [ ] Ativar Authentication.
- [ ] Ativar provedor E-mail/senha.
- [ ] Nao ativar Google login nesta fase.
- [ ] Criar Cloud Firestore.
- [ ] Criar Firebase Storage.
- [ ] Nao usar regras abertas no Console.
- [ ] Publicar Firestore Rules:

```bash
firebase deploy --only firestore:rules
```

- [ ] Publicar Firestore Indexes:

```bash
firebase deploy --only firestore:indexes
```

- [ ] Publicar Storage Rules:

```bash
firebase deploy --only storage
```

## Seed inicial

- [ ] Rodar seed primeiro no emulador:

```bash
npm run seed:emulator
```

- [ ] Conferir o conteudo no Emulator UI.
- [ ] Confirmar o `projectId` real antes do seed real.
- [ ] Executar seed real somente com confirmacao explicita:

```bash
set CONFIRM_REAL_FIREBASE_SEED=SEU_PROJECT_ID
set FIREBASE_PROJECT_ID=SEU_PROJECT_ID
npm run seed:firebase
```

- [ ] Confirmar que os documentos nao foram duplicados.
- [ ] Confirmar que conteudos provisórios continuam `provisional_unverified` e `pending_verification`.

## Primeiro administrador

- [ ] Criar sua conta pela tela `/cadastro`.
- [ ] Copiar seu UID no Firebase Authentication.
- [ ] Aplicar o papel admin localmente com credenciais administrativas seguras:

```bash
set FIREBASE_PROJECT_ID=SEU_PROJECT_ID
npm run admin:set -- SEU_UID
```

- [ ] Nunca versionar service account.
- [ ] Fazer logout/login para renovar Custom Claims.
- [ ] Confirmar acesso ao `/admin`.
- [ ] Confirmar que um aluno comum nao acessa `/admin`.

## Testes funcionais

- [ ] Testar cadastro.
- [ ] Testar login.
- [ ] Testar logout.
- [ ] Testar recuperacao de senha.
- [ ] Testar rota protegida sem login.
- [ ] Testar dashboard.
- [ ] Concluir uma aula.
- [ ] Confirmar progresso no Firestore.
- [ ] Sair e entrar novamente.
- [ ] Confirmar progresso recuperado.
- [ ] Criar segundo usuario.
- [ ] Confirmar isolamento entre usuarios.
- [ ] Criar rascunho no admin.
- [ ] Confirmar que rascunho nao aparece para aluno.
- [ ] Testar upload de imagem permitido por admin/instructor.
- [ ] Testar bloqueio de upload por student.

## GitHub

- [ ] Criar repositorio no seu GitHub.
- [ ] Conferir arquivos antes do push:

```bash
git status
git ls-files | findstr /i ".env service key credential secret firebase-adminsdk"
```

- [ ] Configurar remote:

```bash
git remote add origin URL_DO_SEU_REPOSITORIO
```

- [ ] Fazer primeiro push:

```bash
git push -u origin main
```

## Publicacao

- [ ] Escolher plataforma de publicacao.
- [ ] Configurar variaveis de ambiente no provedor.
- [ ] Publicar build.
- [ ] Testar dominio.
- [ ] Testar HTTPS.
- [ ] Testar login real no dominio publicado.
- [ ] Testar Firestore real no dominio publicado.
- [ ] Testar Storage real no dominio publicado.

## PWA e dispositivos

- [ ] Abrir no iPad Safari.
- [ ] Instalar com Compartilhar > Adicionar a Tela de Inicio.
- [ ] Abrir pelo icone.
- [ ] Testar orientacao vertical.
- [ ] Testar orientacao horizontal.
- [ ] Testar teclado virtual.
- [ ] Testar checklist operacional.
- [ ] Testar painel admin no iPad.
- [ ] Testar perda e retorno de conexao.
- [ ] Testar logout e troca de usuario.
- [ ] Testar aviso de atualizacao da PWA.
- [ ] Testar Chrome/Edge no Windows.

## Revisao final

- [ ] Executar testes locais:

```bash
npm run test:pwa
npm run test:rules
npm run test:firebase
npm run lint
npm run typecheck
npm run build
```

- [ ] Rodar auditoria de dependencias:

```bash
npm audit --audit-level=moderate
```

- [ ] Confirmar que nenhum segredo foi publicado.
- [ ] Revisar logs do Firebase.
- [ ] Revisar regras implantadas.
- [ ] Revisar indices implantados.
- [ ] Revisar custos/quotas no Console Firebase.
