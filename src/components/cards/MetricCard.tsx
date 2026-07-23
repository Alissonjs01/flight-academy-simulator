import type { LucideIcon } from "lucide-react";
import { Panel } from "@/components/ui/Panel";

type MetricCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export function MetricCard({ label, value, icon: Icon }: MetricCardProps) {
  return (
    <Panel className="flex min-h-28 items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-aviation-cyan/25 bg-aviation-cyan/10 text-aviation-cyan">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
      </div>
    </Panel>
  );
}
