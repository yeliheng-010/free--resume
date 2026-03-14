import { sectionLabels } from "@/lib/resume-config";
import type { ResumeLanguage, ResumeSectionKey } from "@/types/resume";

type SectionOrderEditorProps = {
  language: ResumeLanguage;
  order: ResumeSectionKey[];
  onMove: (sectionKey: ResumeSectionKey, direction: "up" | "down") => void;
};

export function SectionOrderEditor({ language, order, onMove }: SectionOrderEditorProps) {
  const labels = sectionLabels[language];

  return (
    <section className="no-print rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">模块排序</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">调整预览中的模块顺序，适配不同岗位投递场景。</p>
      </div>

      <div className="space-y-2">
        {order.map((sectionKey, index) => (
          <div
            key={sectionKey}
            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3"
          >
            <div>
              <div className="text-sm font-semibold text-slate-900">{labels[sectionKey]}</div>
              <div className="mt-1 text-xs text-slate-500">位置 {index + 1}</div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onMove(sectionKey, "up")}
                disabled={index === 0}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                上移
              </button>
              <button
                type="button"
                onClick={() => onMove(sectionKey, "down")}
                disabled={index === order.length - 1}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                下移
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

