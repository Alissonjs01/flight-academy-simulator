import { doc, serverTimestamp, setDoc, writeBatch } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase/client";
import type { AssessmentAttemptDocument, ExerciseAttemptDocument, LessonDocument, ReviewItemDocument } from "@/features/content/types";
import type { StudentProgressDocument } from "@/features/progress/types";
import type { UserChecklistSessionDocument } from "@/features/checklists/types";
import type { UserTrainingRecordDocument } from "@/features/trainings/types";

const defaultCourseId = "course-fundamentos-pilotagem";

function currentUid() {
  if (!isFirebaseConfigured()) {
    return undefined;
  }

  return getFirebaseAuth().currentUser?.uid;
}

export function syncProgressToFirestore(progress: StudentProgressDocument, courseId = defaultCourseId, courseLessons: LessonDocument[] = []) {
  const uid = currentUid();

  if (!uid) {
    return;
  }

  const db = getFirebaseDb();
  const publishedCourseLessons = courseLessons.filter((lesson) => lesson.publicationState === "published");
  const courseLessonIds = new Set(publishedCourseLessons.map((lesson) => lesson.id));
  const completedLessonIds = Array.from(new Set(progress.completedLessonIds.filter((lessonId) => typeof lessonId === "string")));
  const completedCourseLessonIds = completedLessonIds.filter((lessonId) => courseLessonIds.has(lessonId));
  const totalLessons = publishedCourseLessons.length;
  const completedLessons = completedCourseLessonIds.length;
  const progressPercent = totalLessons > 0 ? Math.min(100, Math.round((completedLessons / totalLessons) * 100)) : 0;
  const isCourseCompleted = totalLessons > 0 && completedLessons === totalLessons;
  const updatedAt = progress.updatedAt;

  const batch = writeBatch(db);
  batch.set(
    doc(db, "userCourseProgress", `${uid}_${courseId}`),
    {
      id: `${uid}_${courseId}`,
      userId: uid,
      studentId: uid,
      courseId,
      completedLessonIds: completedCourseLessonIds,
      ...(progress.currentLessonId && courseLessonIds.has(progress.currentLessonId) ? { currentLessonId: progress.currentLessonId } : {}),
      ...(progress.lastLessonId && courseLessonIds.has(progress.lastLessonId) ? { lastLessonId: progress.lastLessonId } : {}),
      completedLessons,
      totalLessons,
      progressPercent,
      status: isCourseCompleted ? "completed" : completedLessons > 0 ? "in_progress" : "not_started",
      ...(isCourseCompleted ? { completedAt: updatedAt } : {}),
      updatedAt,
      updatedAtServer: serverTimestamp()
    },
    { merge: true }
  );

  completedCourseLessonIds.forEach((lessonId) => {
    batch.set(
      doc(db, "userLessonProgress", `${uid}_${lessonId}`),
      {
        id: `${uid}_${lessonId}`,
        userId: uid,
        studentId: uid,
        lessonId,
        courseId,
        status: "completed",
        completedAt: updatedAt,
        updatedAt,
        updatedAtServer: serverTimestamp()
      },
      { merge: true }
    );
  });

  void batch.commit();
}

export function syncExerciseAttemptToFirestore(attempt: ExerciseAttemptDocument) {
  syncPrivateDocument("exerciseAttempts", attempt);
}

export function syncReviewItemToFirestore(item: ReviewItemDocument) {
  syncPrivateDocument("reviewItems", item);
}

export function syncAssessmentAttemptToFirestore(attempt: AssessmentAttemptDocument) {
  syncPrivateDocument("assessmentAttempts", attempt);
}

export function syncChecklistSessionToFirestore(session: UserChecklistSessionDocument) {
  syncPrivateDocument("userChecklistSessions", session);
}

export function syncTrainingRecordToFirestore(record: UserTrainingRecordDocument) {
  syncPrivateDocument("userTrainingRecords", record);
}

function syncPrivateDocument<T extends { id: string; userId: string }>(collectionName: string, value: T) {
  const uid = currentUid();

  if (!uid) {
    return;
  }

  const id = value.id.replaceAll("local-student", uid);

  void setDoc(
    doc(getFirebaseDb(), collectionName, id),
    {
      ...value,
      id,
      userId: uid,
      updatedAtServer: serverTimestamp()
    },
    { merge: true }
  );
}
