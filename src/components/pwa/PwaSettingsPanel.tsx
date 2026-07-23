"use client";

import { Download, HardDrive, MonitorDown, RefreshCw, ShieldAlert, Smartphone, Trash2, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { ConnectivityStatus } from "@/components/pwa/ConnectivityStatus";
import { usePwa } from "@/components/pwa/PwaProvider";
import { Panel } from "@/components/ui/Panel";
import { pwaVersion } from "@/features/pwa/cachePolicy";
import { clearAllPwaCaches, clearApplicationLocalData, clearPwaPublicCaches } from "@/services/pwaService";

export function PwaSettingsPanel() {
  const { isOnline, isStandalone, isIos, isSafari, canInstall, storage, install, refreshStorage } = usePwa();
  const [message, setMessage] = useState<string | undefined>();
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    void refreshStorage();
  }, [refreshStorage]);

  async function runCleanup(kind: "public" | "private" | "all") {
    const descriptions = {
      public: "Isso remove arquivos públicos em cache. Dados sincronizados no Firebase não serão apagados.",
      private: "Isso remove dados privados locais deste navegador e caches privados manuais. Alterações locais não sincronizadas podem ser perdidas.",
      all: "Isso remove todos os caches da PWA neste navegador. Será necessário recarregar conteúdos pela conexão."
    };

    if (!confirm(`${descriptions[kind]}\n\nContinuar?`)) {
      return;
    }

    setIsWorking(true);
    setMessage(undefined);
    try {
      if (kind === "public") {
        await clearPwaPublicCaches();
      } else if (kind === "private") {
        await clearApplicationLocalData();
      } else {
        await clearAllPwaCaches();
      }
      await refreshStorage();
      setMessage("Limpeza concluída neste navegador.");
    } catch {
      setMessage("Não foi possível concluir a limpeza agora.");
    } finally {
      setIsWorking(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-3">
        <ConnectivityStatus />
        <Panel>
          <div className="flex items-center gap-3">
            {isStandalone ? <MonitorDown className="h-5 w-5 text-aviation-cyan" /> : <Download className="h-5 w-5 text-aviation-cyan" />}
            <div>
              <p className="font-semibold text-white">{isStandalone ? "Instalado" : "Modo navegador"}</p>
              <p className="mt-1 text-sm text-slate-400">{isStandalone ? "Aberto como aplicativo." : "Pode ser instalado quando o navegador permitir."}</p>
            </div>
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center gap-3">
            <HardDrive className="h-5 w-5 text-aviation-cyan" />
            <div>
              <p className="font-semibold text-white">Versão {pwaVersion}</p>
              <p className="mt-1 text-sm text-slate-400">{formatStorage(storage?.usageBytes)} usados de {formatStorage(storage?.quotaBytes)}.</p>
            </div>
          </div>
        </Panel>
      </div>

      <Panel>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Instalação</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">A experiência instalada usa a mesma autenticação Firebase e as mesmas regras de segurança. O modo offline é limitado ao que já foi carregado e a arquivos públicos seguros.</p>
          </div>
          {canInstall ? (
            <button type="button" onClick={() => void install()} className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
              <Download className="h-4 w-4" />
              Instalar
            </button>
          ) : null}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-aviation-cyan" />
              <p className="font-semibold text-white">iPad e iPhone</p>
            </div>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              <li>1. Abra a plataforma no Safari.</li>
              <li>2. Toque em Compartilhar.</li>
              <li>3. Escolha Adicionar à Tela de Início.</li>
              <li>4. Confirme o nome e abra pelo ícone.</li>
            </ol>
            {isIos || isSafari ? <p className="mt-3 text-xs text-aviation-amber">Você parece estar em Safari/iOS. O botão automático de instalação pode não aparecer nesse navegador.</p> : null}
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center gap-2">
              <MonitorDown className="h-4 w-4 text-aviation-cyan" />
              <p className="font-semibold text-white">Windows, Chrome e Edge</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">Quando suportado, use o botão Instalar desta tela ou o ícone de instalação na barra do navegador.</p>
          </div>
        </div>
      </Panel>

      <Panel>
        <h3 className="text-lg font-semibold text-white">Offline e sincronização</h3>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <StatusLine icon={isOnline ? Wifi : WifiOff} title={isOnline ? "Conexão disponível" : "Sem conexão"} description={isOnline ? "Operações Firebase podem sincronizar quando configuradas." : "Cadastro, login, upload e admin dependem de conexão."} />
          <StatusLine icon={ShieldAlert} title="Dados privados protegidos" description="Firestore/Auth/Storage não são cacheados manualmente pelo service worker." />
        </div>
        <div className="mt-4 rounded-md border border-aviation-amber/25 bg-aviation-amber/[0.07] p-4 text-sm leading-6 text-aviation-amber">
          Não limpe dados locais se houver exercício, checklist ou formulário administrativo em andamento sem confirmar que tudo foi salvo.
        </div>
      </Panel>

      <Panel>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Armazenamento local</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Use estes controles para resolver problemas de atualização, troca de usuário ou cache corrompido neste navegador.</p>
          </div>
          <button type="button" onClick={() => void refreshStorage()} className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
            <RefreshCw className="h-4 w-4" />
            Verificar
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" disabled={isWorking} onClick={() => void runCleanup("public")} className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">
            <Trash2 className="h-4 w-4" />
            Limpar cache público
          </button>
          <button type="button" disabled={isWorking} onClick={() => void runCleanup("private")} className="focus-ring inline-flex items-center gap-2 rounded-md border border-aviation-amber/30 bg-aviation-amber/[0.08] px-3 py-2 text-sm font-semibold text-aviation-amber disabled:opacity-60">
            <Trash2 className="h-4 w-4" />
            Limpar dados locais
          </button>
          <button type="button" disabled={isWorking} onClick={() => void runCleanup("all")} className="focus-ring inline-flex items-center gap-2 rounded-md border border-red-400/30 bg-red-400/[0.08] px-3 py-2 text-sm font-semibold text-red-100 disabled:opacity-60">
            <Trash2 className="h-4 w-4" />
            Limpar tudo
          </button>
        </div>
        {message ? <p className="mt-4 text-sm text-slate-300">{message}</p> : null}
      </Panel>
    </div>
  );
}

function StatusLine({ icon: Icon, title, description }: { icon: typeof Wifi; title: string; description: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-5 w-5 text-aviation-cyan" />
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

function formatStorage(value?: number) {
  if (!value) {
    return "indisponível";
  }

  if (value < 1024 * 1024) {
    return `${Math.round(value / 1024)} KB`;
  }

  return `${Math.round(value / (1024 * 1024))} MB`;
}
