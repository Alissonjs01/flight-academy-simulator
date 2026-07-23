type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-4">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aviation-cyan">{eyebrow}</p> : null}
      <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">{title}</h2>
      {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p> : null}
    </div>
  );
}
