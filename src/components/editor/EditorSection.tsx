type EditorSectionProps = {
  title: string;
  description?: string;
  count?: number;
  children: React.ReactNode;
};

export function EditorSection({ title, description, count, children }: EditorSectionProps) {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
          {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{description}</p> : null}
        </div>
        {typeof count === "number" ? (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
            {count} 项
          </span>
        ) : null}
      </header>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
