import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const uid = process.argv[2];
const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.GCLOUD_PROJECT ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const isEmulator = Boolean(process.env.FIREBASE_AUTH_EMULATOR_HOST);

if (!uid) {
  console.error("Informe o UID: npm run admin:set -- <uid>");
  process.exit(1);
}

if (!projectId && !isEmulator) {
  console.error("Defina FIREBASE_PROJECT_ID ou use o emulador.");
  process.exit(1);
}

if (!getApps().length) {
  initializeApp(isEmulator ? { projectId: projectId ?? "demo-flight-academy-simulator" } : { projectId, credential: applicationDefault() });
}

async function main() {
  await getAuth().setCustomUserClaims(uid, { role: "admin" });
  await getFirestore().collection("users").doc(uid).set(
    {
      role: "admin",
      updatedAt: new Date().toISOString()
    },
    { merge: true }
  );
  console.log(`Custom Claim admin aplicado ao UID ${uid}. Faça logout/login para renovar o token.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
