import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { initializeTestEnvironment, assertFails, assertSucceeds, type RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";
import { getBytes, ref, uploadBytes } from "firebase/storage";

let testEnv: RulesTestEnvironment;

const projectId = "demo-flight-academy-simulator-storage-rules";

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId,
    storage: {
      rules: readFileSync(resolve("storage.rules"), "utf8")
    }
  });
});

afterEach(async () => {
  await testEnv.clearStorage();
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe("Storage Security Rules - futuro, não executado por padrão", () => {
  it("bloqueia upload não autenticado", async () => {
    const storage = testEnv.unauthenticatedContext().storage();
    await assertFails(uploadBytes(ref(storage, "profilePhotos/student-a/avatar.png"), imageBlob("image/png")));
  });

  it("bloqueia aluno enviando imagem administrativa", async () => {
    const storage = testEnv.authenticatedContext("student-a", { role: "student" }).storage();
    await assertFails(uploadBytes(ref(storage, "courseImages/course-a/main.png"), imageBlob("image/png")));
  });

  it("permite administrador enviar imagem de curso válida", async () => {
    const storage = testEnv.authenticatedContext("admin-a", { role: "admin" }).storage();
    await assertSucceeds(uploadBytes(ref(storage, "courseImages/course-a/main.png"), imageBlob("image/png")));
  });

  it("permite instrutor enviar imagem de aula válida", async () => {
    const storage = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).storage();
    await assertSucceeds(uploadBytes(ref(storage, "lessonImages/lesson-a/main.webp"), imageBlob("image/webp")));
  });

  it("bloqueia upload com tipo inválido", async () => {
    const storage = testEnv.authenticatedContext("admin-a", { role: "admin" }).storage();
    await assertFails(uploadBytes(ref(storage, "courseImages/course-a/main.txt"), imageBlob("text/plain")));
  });

  it("bloqueia upload acima do limite", async () => {
    const storage = testEnv.authenticatedContext("admin-a", { role: "admin" }).storage();
    const oversized = new Blob([new Uint8Array(6 * 1024 * 1024)], { type: "image/png" });
    await assertFails(uploadBytes(ref(storage, "courseImages/course-a/large.png"), oversized));
  });

  it("bloqueia leitura de foto privada de outro usuário", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await uploadBytes(ref(context.storage(), "profilePhotos/student-b/avatar.png"), imageBlob("image/png"));
    });
    const storage = testEnv.authenticatedContext("student-a", { role: "student" }).storage();
    await assertFails(getBytes(ref(storage, "profilePhotos/student-b/avatar.png")));
  });
});

function imageBlob(contentType: string) {
  return new Blob([new Uint8Array([1, 2, 3])], { type: contentType });
}
