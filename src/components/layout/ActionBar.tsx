import Link from "next/link";

import type { SaveState } from "@/hooks/useResumeBuilder";

type ActionBarProps = {
  saveState: SaveState;
  onReset: () => void;
  onExportPdf: () => void;
  onImportJson: () => void;
  onExportJson: () => void;
};

function getStatusClassName(kind: SaveState["kind"]): string {
  if (kind === "error") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (kind === "saved") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (kind === "restored") {
    return "border-sky-200 bg-sky-50 text-sky-700";
  }

  if (kind === "info") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-600";
}

export function ActionBar({ saveState, onReset, onExportPdf, onImportJson, onExportJson }: ActionBarProps) {
  return (
    <header className="no-print sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1560px] flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition hover:text-slate-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/templates" className="transition hover:text-slate-900">
              Templates
            </Link>
            <span>/</span>
            <span className="text-slate-900">Builder</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Free Resume Builder Workspace</h1>
            <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClassName(saveState.kind)}`}>
              {saveState.message}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onImportJson}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            导入 JSON
          </button>
          <button
            type="button"
            onClick={onExportJson}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            导出 JSON
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            重置示例数据
          </button>
          <button
            type="button"
            onClick={onExportPdf}
            className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.2)] transition hover:bg-slate-800"
          >
            导出 PDF
          </button>
        </div>
      </div>
    </header>
  );
}

