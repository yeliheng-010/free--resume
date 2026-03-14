import { getThemeStyle, templateOptions } from "@/lib/resume-config";
import type { ResumeVersion } from "@/types/resume";

import { ClassicTemplate } from "@/components/preview/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/preview/templates/ModernTemplate";

type ResumePreviewProps = {
  resume: ResumeVersion;
};

export function ResumePreview({ resume }: ResumePreviewProps) {
  const templateInfo = templateOptions.find((item) => item.value === resume.template);

  return (
    <div className="preview-panel sticky top-[106px] mx-auto w-full max-w-[920px]">
      <div className="no-print mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-[0_14px_32px_rgba(15,23,42,0.06)] backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Live Preview</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">{templateInfo?.label ?? "Resume Template"}</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{resume.language === "zh" ? "中文" : "English"}</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{resume.theme}</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">A4 print layout</span>
        </div>
      </div>

      <div className="resume-stage">
        <div
          id="resume-print-root"
          style={getThemeStyle(resume.theme)}
          className={`resume-paper ${resume.template === "classic" ? "resume-paper--classic" : "resume-paper--modern"}`}
        >
          {resume.template === "classic" ? <ClassicTemplate resume={resume} /> : <ModernTemplate resume={resume} />}
        </div>
      </div>
    </div>
  );
}
