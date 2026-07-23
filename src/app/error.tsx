"use client";

import { ErrorState } from "@/components/ui/StateMessage";

export default function Error() {
  return <ErrorState title="Algo saiu do eixo" description="Não foi possível carregar esta área da plataforma. Volte ao dashboard e tente novamente." />;
}
