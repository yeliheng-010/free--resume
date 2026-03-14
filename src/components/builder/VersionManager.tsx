import { FormInput } from "@/components/editor/FormField";
import type { ResumeVersion } from "@/types/resume";

type VersionManagerProps = {
  resumes: ResumeVersion[];
  activeResume: ResumeVersion;
  canDeleteActiveResume: boolean;
  onActiveResumeChange: (id: string) => void;
  onCreate: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMetaChange: (patch: Partial<Pick<ResumeVersion, "name" | "targetRole">>) => void;
};

export function VersionManager({
  resumes,
  activeResume,
  canDeleteActiveResume,
  onActiveResumeChange,
  onCreate,
  onDuplicate,
  onDelete,
  onMetaChange,
}: VersionManagerProps) {
  return (
    <section className="no-print rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">版本管理</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            为不同岗位维护多份简历版本，切换时不会丢失各自的模板、语言和内容。
          </p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          {resumes.length} 份简历
        </span>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.12em] text-slate-500">当前版本</span>
        <select
          value={activeResume.id}
          onChange={(event) => onActiveResumeChange(event.target.value)}
          className="w-full rounded-xl border border-slate-300/90 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200/70"
        >
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>
              {resume.name}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <FormInput
          label="版本名称"
          value={activeResume.name}
          onChange={(value) => onMetaChange({ name: value })}
          placeholder="例如：前端岗 - SaaS 方向"
        />
        <FormInput
          label="目标岗位"
          value={activeResume.targetRole}
          onChange={(value) => onMetaChange({ targetRole: value })}
          placeholder="例如：Frontend Engineer"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCreate}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          新建版本
        </button>
        <button
          type="button"
          onClick={onDuplicate}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          复制当前版本
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={!canDeleteActiveResume}
          className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
        >
          删除当前版本
        </button>
      </div>
    </section>
  );
}
