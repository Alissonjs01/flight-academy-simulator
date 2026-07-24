"use client";

import { useMemo, useState } from "react";
import type { AvionicDocument, AvionicStudyStatus } from "@/features/avionics/types";
import { avionicStudyStatusLabels } from "@/features/avionics/statusLabels";
import { AvionicCard } from "@/components/avionics/AvionicCard";
import { EmptyState } from "@/components/ui/StateMessage";

const allOption = "Todos";

export function AvionicsCatalog({ avionics }: { avionics: AvionicDocument[] }) {
  const [query, setQuery] = useState("");
  const [manufacturer, setManufacturer] = useState(allOption);
  const [studyStatus, setStudyStatus] = useState<AvionicStudyStatus | typeof allOption>(allOption);

  const manufacturers = useMemo(() => [allOption, ...Array.from(new Set(avionics.map((avionic) => avionic.manufacturer)))], [avionics]);
  const statuses = useMemo(() => [allOption, ...Array.from(new Set(avionics.map((avionic) => avionic.studyStatus)))], [avionics]);

  const filteredAvionics = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    return avionics.filter((avionic) => {
      const text = [avionic.name, avionic.manufacturer, avionic.version].join(" ").toLocaleLowerCase("pt-BR");
      return (
        (!normalizedQuery || text.includes(normalizedQuery)) &&
        (manufacturer === allOption || avionic.manufacturer === manufacturer) &&
        (studyStatus === allOption || avionic.studyStatus === studyStatus)
      );
    });
  }, [avionics, manufacturer, query, studyStatus]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-md border border-white/[0.08] bg-white/[0.028] p-4 md:grid-cols-[minmax(0,1fr)_14rem_14rem]">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Busca</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por aviônico, fabricante ou versão"
            className="focus-ring mt-2 h-11 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 px-3 text-sm text-white placeholder:text-slate-500"
          />
        </label>
        <SelectFilter label="Fabricante" value={manufacturer} values={manufacturers} onChange={setManufacturer} />
        <SelectFilter
          label="Status"
          value={studyStatus}
          values={statuses}
          onChange={(value) => setStudyStatus(value as AvionicStudyStatus | typeof allOption)}
          formatValue={formatStatus}
        />
      </div>

      {filteredAvionics.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredAvionics.map((avionic) => (
            <AvionicCard key={avionic.id} avionic={avionic} />
          ))}
        </div>
      ) : (
        <EmptyState title="Nenhum aviônico encontrado" description="Ajuste a busca ou os filtros para visualizar os sistemas cadastrados." />
      )}
    </div>
  );
}

type SelectFilterProps = {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
  formatValue?: (value: string) => string;
};

function SelectFilter({ label, value, values, onChange, formatValue = (item) => item }: SelectFilterProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring mt-2 h-11 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 px-3 text-sm text-white"
      >
        {values.map((item) => (
          <option key={item} value={item}>
            {formatValue(item)}
          </option>
        ))}
      </select>
    </label>
  );
}

function formatStatus(status: string) {
  if (status === allOption) {
    return allOption;
  }

  return avionicStudyStatusLabels[status as AvionicStudyStatus] ?? status;
}
