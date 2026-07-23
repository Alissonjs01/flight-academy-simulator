# Migração futura para Firebase

Esta versão usa dados locais e `localStorage`, mas a camada de repositórios foi organizada para permitir troca por Firebase sem reconstruir as páginas.

## Coleções sugeridas

```text
courses/{courseId}
modules/{moduleId}
lessons/{lessonId}
exercises/{exerciseId}
assessments/{assessmentId}
aircraft/{aircraftId}
aircraftSystems/{systemId}
aircraftLimitations/{limitationId}
aircraftPerformance/{performanceId}
aircraftProcedures/{procedureId}
aircraftMedia/{mediaId}
avionics/{avionicId}
avionicsSections/{sectionId}
avionicsComponents/{componentId}
avionicsProcedures/{procedureId}
avionicsTrainings/{trainingId}
avionicsCourses/{courseRelationId}
checklists/{checklistId}
checklistItems/{checklistItemId}
trainings/{trainingId}
users/{userId}
userCourseProgress/{progressId}
userLessonProgress/{lessonProgressId}
exerciseAttempts/{attemptId}
assessmentAttempts/{attemptId}
reviewItems/{reviewItemId}
userChecklistSessions/{sessionId}
userTrainingRecords/{recordId}
```

## Mapeamento atual

- `CourseDocument` vira documento em `courses`.
- `ModuleDocument` vira documento em `modules` com `courseId`.
- `LessonDocument` vira documento em `lessons` com `moduleId` e `courseId` derivavel.
- `ExerciseDocument` vira documento em `exercises` com `lessonId`, `moduleId` e `courseId`.
- `StudentProgressDocument` vira documento em `userCourseProgress` e detalhes por aula ficam em `userLessonProgress`.
- `FinalAssessmentDocument` vira documento em `assessments`.
- `ExerciseAttemptDocument` vira documento em `exerciseAttempts`.
- `AssessmentAttemptDocument` vira documento em `assessmentAttempts`.
- `ReviewItemDocument` vira documento em `reviewItems`.
- `AircraftDocument` vira documento em `aircraft`.
- `AircraftSystemDocument` vira documento em `aircraftSystems`.
- `AircraftLimitationDocument` vira documento em `aircraftLimitations`.
- `AircraftPerformanceDocument` vira documento em `aircraftPerformance`.
- `AircraftProcedureDocument` vira documento em `aircraftProcedures`.
- `AircraftMediaReference` vira documento em `aircraftMedia` e deve apontar para URL pública ou assinada do Firebase Storage.
- `AvionicDocument` vira documento em `avionics`.
- `AvionicSectionDocument` vira documento em `avionicsSections`.
- `AvionicComponentDocument` vira documento em `avionicsComponents`.
- `AvionicProcedureDocument` vira documento em `avionicsProcedures`.
- `AvionicTrainingDocument` vira documento em `avionicsTrainings`.
- Relações entre aviônicos e cursos ficam em `avionicsCourses`.
- `ChecklistDocument` vira documento em `checklists`.
- `ChecklistItemDocument` vira documento em `checklistItems` com `checklistId`.
- `UserChecklistSessionDocument` vira documento em `userChecklistSessions`.
- `TrainingDocument` vira documento em `trainings`.
- `UserTrainingRecordDocument` vira documento em `userTrainingRecords`.

## Fidelidade tecnica e rastreabilidade

Os documentos tecnicos podem incluir `technicalMetadata` para fonte, variante, status de verificacao e historico de revisao. Esse campo deve acompanhar procedimentos, limitacoes, performance, sistemas, checklists, itens de checklist, treinamentos, aulas tecnicas, exercicios e secoes de avionicos.

Campos importantes:

- `contentClassification`: separa procedimento real oficial, documentacao oficial do simulador, adaptacao para simulador, exercicio didatico, explicacao educacional e conteudo provisório nao verificado.
- `verificationStatus`: indica se o conteudo esta verificado, parcialmente verificado, pendente, com fontes conflitantes ou obsoleto.
- `sourceTitle`, `sourceOrganization`, `sourceEdition`, `sourceRevision`, `sourceDate`, `sourcePage`, `sourceUrl` e `sourceDocumentId`: identificam a fonte usada.
- `aircraftManufacturer`, `aircraftModel`, `aircraftVariant`, `simulatorAircraftVariant`, `simulatorPlatform`, `simulatorDeveloper` e `addonVersion`: impedem mistura de variantes e versoes.
- `simulatorAdaptationNotes` e `knownSimulatorDifferences`: registram adaptacoes e diferencas entre aeronave real e implementacao no simulador.
- `verifiedBy`, `verifiedAt`, `lastReviewedAt`, `revisionNotes` e `revisionHistory`: mantem rastreabilidade da revisao humana.

Conteudo gerado por IA ou material didatico proprio pode existir como `educational_explanation` ou `training_exercise`, mas nao deve ser cadastrado como fonte. Conteudos locais que ainda nao passaram por validacao devem permanecer como `provisional_unverified` e `pending_verification`.

## Exercícios e avaliações

Os exercícios locais já usam IDs estáveis por aula:

- `exercise-{lessonSlug}-multiple-choice`
- `exercise-{lessonSlug}-true-false`
- `exercise-{lessonSlug}-open-answer`

As tentativas são armazenadas separadamente do conteúdo. No Firebase, o conteúdo publicado fica em coleções de leitura, enquanto respostas, tentativas, notas pessoais, autoavaliações e itens de revisão ficam em coleções privadas com `userId` obrigatório e validado contra o `uid` do Firebase Authentication nas Security Rules.

Avaliações finais devem salvar:

- perguntas sorteadas por ID;
- respostas do aluno;
- nota percentual;
- aprovação ou reprovação;
- assuntos com maior dificuldade;
- módulos recomendados para revisão;
- histórico completo de tentativas.

## Arquivos preparados

- `src/features/content/types.ts`: contratos dos documentos.
- `src/features/content/repositories/contentRepository.ts`: interfaces que as páginas consomem indiretamente.
- `src/features/content/repositories/localContentRepository.ts`: implementação local atual.
- `src/features/content/repositories/firestoreContentRepository.contract.ts`: caminhos e contrato para a implementação Firebase.
- `src/services/courseService.ts`, `src/services/moduleService.ts`, `src/services/lessonService.ts` e `src/services/progressService.ts`: camada que deve trocar o repositório local pelo Firebase.
- `src/features/content/seed/firebaseSeed.ts`: função que monta o payload inicial para importação futura no Firestore.

## Firebase Authentication

Quando a autenticação for ativada, o `studentId` local deve ser substituído por `auth.currentUser.uid`. O progresso, tentativas, respostas abertas, resultados e revisão devem ser gravados por usuário em `users/{userId}`.

## Firebase Storage

Use Firebase Storage para imagens de cursos, capas de módulos, anexos de aulas, PDFs, vídeos curtos, arquivos de checklist, materiais complementares e mídia de aeronaves.

Para aeronaves, uma convenção simples é:

```text
aircraft/{aircraftSlug}/main.jpg
aircraft/{aircraftSlug}/panel.jpg
aircraft/{aircraftSlug}/gallery/{mediaId}.jpg
avionics/{avionicSlug}/main.jpg
avionics/{avionicSlug}/diagrams/{sectionSlug}.jpg
```

O documento Firestore deve guardar metadados, `storagePath`, legenda, texto alternativo e a URL resolvida quando disponível.

## Security Rules

Regras iniciais recomendadas:

- Conteúdo publicado pode ser lido por usuários autenticados.
- Aeronaves publicadas podem ser lidas por usuários autenticados.
- Aviônicos publicados podem ser lidos por usuários autenticados.
- Rascunhos só podem ser lidos por administradores.
- Progresso só pode ser lido e escrito pelo próprio usuário.
- Progresso de aeronaves só pode ser lido e escrito pelo próprio usuário.
- Progresso de aviônicos só pode ser lido e escrito pelo próprio usuário.
- Sessões de checklist e registros de treinamento só podem ser lidos e escritos pelo próprio usuário.
- Tentativas, respostas, itens de revisão, resultados de avaliação e certificados simbólicos só podem ser lidos pelo próprio usuário e administradores autorizados.
- Escrita em cursos, módulos, aulas, exercícios, aeronaves, aviônicos, checklists, treinamentos, sistemas, limitações, procedimentos e mídia deve exigir papel administrativo.
