type BuilderOverviewProps = {
  counts: {
    education: number;
    work: number;
    projects: number;
    skills: number;
    versions: number;
  };
  storageMessage: string;
};

const metricItems = [
  { key: "versions", label: "版本", note: "针对不同岗位保存" },
  { key: "work", label: "工作", note: "职责与成果" },
  { key: "projects", label: "项目", note: "项目经验" },
  { key: "skills", label: "技能", note: "技能分组" },
] as const;

export function BuilderOverview({ counts, storageMessage }: BuilderOverviewProps) {
  return (
    <section className="no-print overflow-hidden rounded-[30px] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(239,246,255,0.92)_36%,rgba(248,250,252,0.96)_100%)] p-5 shadow-[0_20px_48px_rgba(15,23,42,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Workspace</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Build, compare, and tailor resumes fast</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            现在你可以在同一个工作区里维护多个岗位版本，切换语言、模板、主题色，并通过 JSON 进行备份或迁移。
          </p>
        </div>
        <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">{storageMessage}</div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metricItems.map((item) => (
          <div key={item.key} className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4">
            <div className="text-2xl font-semibold tracking-tight text-slate-900">{counts[item.key]}</div>
            <div className="mt-1 text-sm font-medium text-slate-700">{item.label}</div>
            <div className="mt-1 text-xs text-slate-500">{item.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

