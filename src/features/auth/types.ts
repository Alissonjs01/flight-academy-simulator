export type UserRole = "student" | "instructor" | "admin";

export type StudentProfileDocument = {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  migrationCompleted: boolean;
  onboardingCompleted: boolean;
};
