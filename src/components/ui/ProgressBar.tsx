type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-300">{label}</span>
          <span className="font-semibold text-white">{normalizedValue}%</span>
        </div>
      ) : null}
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div className="h-full rounded-full bg-aviation-cyan shadow-[0_0_18px_rgba(57,215,255,0.45)]" style={{ width: `${normalizedValue}%` }} />
      </div>
    </div>
  );
}
