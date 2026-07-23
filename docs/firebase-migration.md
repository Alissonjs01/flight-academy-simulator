# Migração futura para Firebase

Esta versão usa dados locais e `localStorage`, mas a camada de repositórios foi organizada para permitir troca por Firebase sem reconstruir as páginas.

## Coleções sugeridas

```text
courses/{courseId}
courses/{courseId}/modules/{moduleId}
courses/{courseId}/modules/{moduleId}/lessons/{lessonId}
courses/{courseId}/modules/{moduleId}/lessons/{lessonId}/exercises/{exerciseId}
courses/{courseId}/assessments/{assessmentId}
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
avionics/{avionicId}/courses/{courseRelationId}
checklists/{checklistId}
checklists/{checklistId}/items/{checklistItemId}
trainings/{trainingId}
users/{userId}
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
users/{userId}/certificates/{courseId}
```

## Mapeamento atual

- `CourseDocument` vira documento em `courses`.
- `ModuleDocument` vira documento em `courses/{courseId}/modules`.
- `LessonDocument` vira documento em `courses/{courseId}/modules/{moduleId}/lessons`.
- `ExerciseDocument` vira documento em `courses/{courseId}/modules/{moduleId}/lessons/{lessonId}/exercises`.
- `StudentProgressDocument` vira documento em `users/{userId}/progress/{courseId}`.
- `FinalAssessmentDocument` vira documento em `courses/{courseId}/assessments`.
- `ExerciseAttemptDocument` vira documento em `users/{userId}/exerciseAttempts`.
- Respostas individuais podem ser duplicadas em `users/{userId}/exerciseResponses` quando for necessário consultar respostas sem carregar tentativas completas.
- `AssessmentAttemptDocument` vira documento em `users/{userId}/assessmentAttempts`.
- `ReviewItemDocument` vira documento em `users/{userId}/reviewItems`.
- O resumo consolidado de curso vira documento em `users/{userId}/courseProgress/{courseId}`.
- `CertificateDocument` vira documento em `users/{userId}/certificates`.
- `AircraftDocument` vira documento em `aircraft`.
- `AircraftSystemDocument` vira documento em `aircraft/{aircraftId}/systems`.
- `AircraftLimitationDocument` vira documento em `aircraft/{aircraftId}/limitations`.
- `AircraftProcedureDocument` vira documento em `aircraft/{aircraftId}/procedures`.
- `AircraftMediaReference` vira documento em `aircraft/{aircraftId}/media` e deve apontar para URL pública ou assinada do Firebase Storage.
- O progresso de estudo por aeronave vira documento em `users/{userId}/aircraftProgress/{aircraftId}`.
- `AvionicDocument` vira documento em `avionics`.
- `AvionicSectionDocument` vira documento em `avionics/{avionicId}/sections`.
- `AvionicComponentDocument` vira documento em `avionics/{avionicId}/components`.
- `AvionicProcedureDocument` vira documento em `avionics/{avionicId}/procedures`.
- `AvionicTrainingDocument` vira documento em `avionics/{avionicId}/trainings`.
- Relações entre aviônicos e cursos ficam em `avionics/{avionicId}/courses`.
- O progresso de estudo por aviônico vira documento em `users/{userId}/avionicsProgress/{avionicId}`.
- `ChecklistDocument` vira documento em `checklists`.
- `ChecklistItemDocument` vira subcoleção em `checklists/{checklistId}/items`.
- `UserChecklistSessionDocument` vira documento em `users/{userId}/userChecklistSessions`.
- `TrainingDocument` vira documento em `trainings`.
- `UserTrainingRecordDocument` vira documento em `users/{userId}/userTrainingRecords`.

## Exercícios e avaliações

Os exercícios locais já usam IDs estáveis por aula:

- `exercise-{lessonSlug}-multiple-choice`
- `exercise-{lessonSlug}-true-false`
- `exercise-{lessonSlug}-open-answer`

As tentativas são armazenadas separadamente do conteúdo. No Firebase, o conteúdo publicado deve ficar em coleções de leitura, enquanto respostas, tentativas, notas pessoais, autoavaliações e itens de revisão devem ser gravados sob `users/{userId}` usando o `uid` do Firebase Authentication.

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
