import Link from "next/link";

import { languageOptions, templateOptions, themeOptions } from "@/lib/resume-config";
import type { ResumeLanguage, ResumeTemplate, ResumeTheme } from "@/types/resume";

type PresentationPanelProps = {
  language: ResumeLanguage;
  template: ResumeTemplate;
  theme: ResumeTheme;
  onLanguageChange: (language: ResumeLanguage) => void;
  onTemplateChange: (template: ResumeTemplate) => void;
  onThemeChange: (theme: ResumeTheme) => void;
};

function ToggleGroup<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: Array<{ value: T; label: string; helper: string }>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-slate-500">{title}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                isActive ? "border-slate-900 bg-slate-900 text-white shadow-lg" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="text-sm font-semibold">{option.label}</div>
              <div className={`mt-1 text-xs ${isActive ? "text-slate-300" : "text-slate-500"}`}>{option.helper}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PresentationPanel({
  language,
  template,
  theme,
  onLanguageChange,
  onTemplateChange,
  onThemeChange,
}: PresentationPanelProps) {
  return (
    <section className="no-print rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">展示设置</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">控制简历语言、模板和主题色，预览会实时更新。</p>
        </div>
        <Link
          href="/templates"
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          打开模板页
        </Link>
      </div>

      <div className="space-y-5">
        <ToggleGroup title="简历语言" options={languageOptions} value={language} onChange={onLanguageChange} />
        <ToggleGroup title="模板" options={templateOptions} value={template} onChange={onTemplateChange} />
        <ToggleGroup title="主题色" options={themeOptions} value={theme} onChange={onThemeChange} />
      </div>
    </section>
  );
}
