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
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-aviation-cyan to-aviation-mint" style={{ width: `${normalizedValue}%` }} />
      </div>
    </div>
  );
}
