export type UserRole = "student" | "instructor" | "admin";

export type StudentProfileDocument = {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string | null;
  role: UserRole;
  primarySimulator?: string;
  favoriteAircraftId?: string;
  experienceLevel?: string;
  studyGoal?: string;
  preferredUnit?: "metric" | "imperial" | "mixed";
  platformLanguage?: "pt-BR";
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  migrationCompleted: boolean;
  onboardingCompleted: boolean;
};
