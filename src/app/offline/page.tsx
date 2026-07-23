import { WifiOff } from "lucide-react";
import Link from "next/link";
import { Panel } from "@/components/ui/Panel";

export default function OfflinePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Panel className="border-aviation-amber/25 bg-aviation-amber/[0.07]">
        <WifiOff className="h-10 w-10 text-aviation-amber" />
        <h2 className="mt-5 text-2xl font-semibold text-white">Conteúdo indisponível offline</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          A plataforma está sem conexão ou a página solicitada ainda não foi carregada neste dispositivo. Conteúdos públicos já abertos podem continuar disponíveis, mas login, upload, publicação administrativa e sincronização dependem de conexão.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/dashboard" className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
            Voltar ao dashboard
          </Link>
          <Link href="/configuracoes" className="focus-ring rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
            Ver configurações PWA
          </Link>
        </div>
      </Panel>
    </div>
  );
}
