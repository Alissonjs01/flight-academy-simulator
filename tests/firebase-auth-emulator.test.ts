import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { applicationDefault, deleteApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const authBaseUrl = "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1";
const projectId = process.env.GCLOUD_PROJECT ?? process.env.FIREBASE_PROJECT_ID ?? "flight-academy-simulatorr";
const apiKey = "fake-api-key";
const appName = "auth-emulator-validation";

beforeAll(() => {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";

  if (!getApps().some((app) => app.name === appName)) {
    initializeApp({ projectId, credential: applicationDefault() }, appName);
  }
});

afterAll(async () => {
  const app = getApps().find((item) => item.name === appName);
  if (app) {
    await deleteApp(app);
  }
});

describe("Firebase Authentication Emulator", () => {
  it("cadastra com e-mail e senha, faz login válido e persiste token de sessão", async () => {
    const email = uniqueEmail("valid");
    const created = await signUp(email, "senha-segura");
    expect(created.localId).toBeTruthy();
    expect(created.idToken).toBeTruthy();

    const signedIn = await signIn(email, "senha-segura");
    expect(signedIn.localId).toBe(created.localId);
    expect(signedIn.refreshToken).toBeTruthy();
  });

  it("bloqueia login com senha incorreta", async () => {
    const email = uniqueEmail("wrong-password");
    await signUp(email, "senha-segura");
    await expect(signIn(email, "senha-errada")).rejects.toThrow(/INVALID_PASSWORD|INVALID_LOGIN_CREDENTIALS/);
  });

  it("bloqueia cadastro com e-mail já existente", async () => {
    const email = uniqueEmail("duplicate");
    await signUp(email, "senha-segura");
    await expect(signUp(email, "senha-segura")).rejects.toThrow(/EMAIL_EXISTS/);
  });

  it("bloqueia senha fraca", async () => {
    await expect(signUp(uniqueEmail("weak"), "123")).rejects.toThrow(/WEAK_PASSWORD/);
  });

  it("envia recuperação de senha no emulador", async () => {
    const email = uniqueEmail("reset");
    await signUp(email, "senha-segura");
    const response = await authRequest("accounts:sendOobCode", { requestType: "PASSWORD_RESET", email });
    expect(response.email).toBe(email);
  });

  it("trata usuário inexistente", async () => {
    await expect(signIn(uniqueEmail("missing"), "senha-segura")).rejects.toThrow(/EMAIL_NOT_FOUND|INVALID_LOGIN_CREDENTIALS/);
  });

  it("bloqueia usuário desativado", async () => {
    const email = uniqueEmail("disabled");
    const user = await getAuth(getApps().find((app) => app.name === appName)).createUser({ email, password: "senha-segura", disabled: true });
    await expect(signIn(email, "senha-segura")).rejects.toThrow(/USER_DISABLED/);
    await getAuth(getApps().find((app) => app.name === appName)).deleteUser(user.uid);
  });

  it("trata sessão expirada ou token inválido", async () => {
    await expect(authRequest("accounts:lookup", { idToken: "token-invalido" })).rejects.toThrow(/INVALID_ID_TOKEN|USER_NOT_FOUND/);
  });
});

async function signUp(email: string, password: string) {
  return authRequest("accounts:signUp", { email, password, returnSecureToken: true });
}

async function signIn(email: string, password: string) {
  return authRequest("accounts:signInWithPassword", { email, password, returnSecureToken: true });
}

async function authRequest(endpoint: string, body: Record<string, unknown>) {
  const response = await fetch(`${authBaseUrl}/${endpoint}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const payload = (await response.json()) as { error?: { message?: string } };

  if (!response.ok) {
    throw new Error(payload.error?.message ?? "AUTH_ERROR");
  }

  return payload as Record<string, string>;
}

function uniqueEmail(label: string) {
  return `${label}-${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`;
}
