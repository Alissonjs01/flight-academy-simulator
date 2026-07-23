export function getFirebaseAuthErrorMessage(error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";

  const messages: Record<string, string> = {
    "auth/email-already-in-use": "Este e-mail já está cadastrado.",
    "auth/invalid-email": "Informe um e-mail válido.",
    "auth/invalid-credential": "E-mail ou senha inválidos.",
    "auth/user-disabled": "Este usuário foi desativado.",
    "auth/user-not-found": "Usuário não encontrado.",
    "auth/wrong-password": "E-mail ou senha inválidos.",
    "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
    "auth/too-many-requests": "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
    "auth/network-request-failed": "Falha de rede ao falar com o Firebase.",
    "auth/requires-recent-login": "Sua sessão expirou. Faça login novamente."
  };

  return messages[code] ?? "Não foi possível concluir a autenticação. Verifique os dados e tente novamente.";
}

export function getFirebaseDataErrorMessage(error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";

  const messages: Record<string, string> = {
    "permission-denied": "Você não tem permissão para acessar ou alterar estes dados.",
    unauthenticated: "Sua sessão expirou. Faça login novamente.",
    unavailable: "O Firebase está indisponível no momento.",
    "not-found": "Registro não encontrado."
  };

  return messages[code] ?? "Não foi possível acessar os dados no Firebase.";
}
