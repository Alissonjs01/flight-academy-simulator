import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase/client";
import type { AssessmentAttemptDocument, ExerciseAttemptDocument, ReviewItemDocument } from "@/features/content/types";
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

export function syncProgressToFirestore(progress: StudentProgressDocument) {
  const uid = currentUid();

  if (!uid) {
    return;
  }

  void setDoc(
    doc(getFirebaseDb(), "userCourseProgress", `${uid}_${defaultCourseId}`),
    {
      ...progress,
      id: `${uid}_${defaultCourseId}`,
      userId: uid,
      studentId: uid,
      courseId: defaultCourseId,
      updatedAtServer: serverTimestamp()
    },
    { merge: true }
  );
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
