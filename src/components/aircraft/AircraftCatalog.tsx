"use client";

import { useMemo, useState } from "react";
import type { AircraftDocument, AircraftStudyStatus } from "@/features/aircraft/types";
import { aircraftStudyStatusLabels } from "@/features/aircraft/statusLabels";
import { AircraftCard } from "@/components/aircraft/AircraftCard";
import { EmptyState } from "@/components/ui/StateMessage";

type AircraftCatalogProps = {
  aircraft: AircraftDocument[];
};

const allOption = "Todos";

export function AircraftCatalog({ aircraft }: AircraftCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(allOption);
  const [studyStatus, setStudyStatus] = useState<AircraftStudyStatus | typeof allOption>(allOption);

  const categories = useMemo(() => [allOption, ...Array.from(new Set(aircraft.map((item) => item.category)))], [aircraft]);
  const statuses = useMemo(() => [allOption, ...Array.from(new Set(aircraft.map((item) => item.studyStatus)))], [aircraft]);

  const filteredAircraft = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    return aircraft.filter((item) => {
      const text = [item.manufacturer, item.model, item.fullName, item.category].join(" ").toLocaleLowerCase("pt-BR");
      return (
        (!normalizedQuery || text.includes(normalizedQuery)) &&
        (category === allOption || item.category === category) &&
        (studyStatus === allOption || item.studyStatus === studyStatus)
      );
    });
  }, [aircraft, category, query, studyStatus]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-md border border-white/[0.08] bg-white/[0.028] p-4 md:grid-cols-[minmax(0,1fr)_14rem_14rem]">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Busca</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por fabricante ou modelo"
            className="focus-ring mt-2 h-11 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 px-3 text-sm text-white placeholder:text-slate-500"
          />
        </label>
        <SelectFilter label="Categoria" value={category} values={categories} onChange={setCategory} />
        <SelectFilter
          label="Status de estudo"
          value={studyStatus}
          values={statuses}
          onChange={(value) => setStudyStatus(value as AircraftStudyStatus | typeof allOption)}
          formatValue={formatStatus}
        />
      </div>

      {filteredAircraft.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredAircraft.map((item) => (
            <AircraftCard key={item.id} aircraft={item} />
          ))}
        </div>
      ) : (
        <EmptyState title="Nenhuma aeronave encontrada" description="Ajuste a busca ou os filtros para visualizar os cadastros preparados." />
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

  return aircraftStudyStatusLabels[status as AircraftStudyStatus] ?? status;
}
