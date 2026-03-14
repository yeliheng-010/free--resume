import { ResumePhoto } from "@/components/preview/ResumePhoto";
import { emptyPreviewMessage, sectionLabels } from "@/lib/resume-config";
import { hasMeaningfulContent } from "@/lib/resume-normalizer";
import type { ResumeSectionKey, ResumeVersion } from "@/types/resume";

type ModernTemplateProps = {
  resume: ResumeVersion;
};

function renderDate(startDate: string, endDate: string): string {
  return [startDate, endDate].filter(Boolean).join(" - ");
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--resume-accent-muted)" }}>
      {title}
    </h2>
  );
}

export function ModernTemplate({ resume }: ModernTemplateProps) {
  const { basics, education, work, projects, skills } = resume.data;
  const titles = sectionLabels[resume.language];
  const hasContent = hasMeaningfulContent(resume.data);

  const sectionRenderers: Record<ResumeSectionKey, React.ReactNode | null> = {
    summary: basics.summary ? (
      <section className="resume-section mb-6">
        <SectionTitle title={titles.summary} />
        <p className="text-slate-700">{basics.summary}</p>
      </section>
    ) : null,
    work: work.length > 0 ? (
      <section className="resume-section mb-6">
        <SectionTitle title={titles.work} />
        <div className="space-y-4">
          {work.map((item) => (
            <article key={item.id} className="resume-entry">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{item.position}</h3>
                  <p className="text-slate-700">{item.company}</p>
                </div>
                <p className="shrink-0 text-[11.5px] font-medium text-slate-500">{renderDate(item.startDate, item.endDate)}</p>
              </div>
              {item.description.length > 0 ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700 marker:text-[color:var(--resume-accent-muted)]">
                  {item.description.map((point, index) => (
                    <li key={`${item.id}-desc-${index}`}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    ) : null,
    projects: projects.length > 0 ? (
      <section className="resume-section mb-6">
        <SectionTitle title={titles.projects} />
        <div className="space-y-4">
          {projects.map((item) => (
            <article key={item.id} className="resume-entry">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  {item.role ? <p className="text-slate-600">{item.role}</p> : null}
                </div>
                <p className="shrink-0 text-[11.5px] font-medium text-slate-500">{renderDate(item.startDate, item.endDate)}</p>
              </div>
              {item.description.length > 0 ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700 marker:text-[color:var(--resume-accent-muted)]">
                  {item.description.map((point, index) => (
                    <li key={`${item.id}-project-${index}`}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {item.technologies.length > 0 ? (
                <p className="mt-2 text-slate-700">
                  <span className="font-semibold">Tech:</span> {item.technologies.join(", ")}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    ) : null,
    education: education.length > 0 ? (
      <section className="resume-section mb-6">
        <SectionTitle title={titles.education} />
        <div className="space-y-4">
          {education.map((item) => (
            <article key={item.id} className="resume-entry">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{item.school}</h3>
                  <p className="text-slate-700">{[item.degree, item.major].filter(Boolean).join(" | ")}</p>
                </div>
                <p className="shrink-0 text-[11.5px] font-medium text-slate-500">{renderDate(item.startDate, item.endDate)}</p>
              </div>
              {item.description ? <p className="mt-2 text-slate-700">{item.description}</p> : null}
            </article>
          ))}
        </div>
      </section>
    ) : null,
    skills: skills.length > 0 ? (
      <section className="resume-section mb-6">
        <SectionTitle title={titles.skills} />
        <div className="space-y-3">
          {skills.map((item) => (
            <div key={item.id} className="resume-entry">
              <h3 className="font-semibold text-slate-900">{item.category}</h3>
              <p className="mt-1 text-slate-700">{item.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,
  };

  return (
    <div className="grid h-full grid-cols-[232px_1fr] bg-white text-[12.2px] leading-[1.68] text-slate-800">
      <aside className="border-r px-7 py-10" style={{ borderColor: "var(--resume-border)", background: "var(--resume-sidebar)" }}>
        {basics.photo ? (
          <div className="mb-6">
            <ResumePhoto
              src={basics.photo}
              alt={basics.name ? `${basics.name} photo` : "Resume photo"}
              width={120}
              height={148}
              className="h-[148px] w-[120px] rounded-[24px]"
            />
          </div>
        ) : null}

        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Resume</p>
        <h1 className="mt-3 text-[30px] font-semibold leading-tight tracking-tight" style={{ color: "var(--resume-accent)" }}>
          {basics.name || "Your Name"}
        </h1>
        <p className="mt-2 text-[13px] font-medium tracking-[0.12em] text-slate-600">{basics.title || "Target Position"}</p>

        <section className="resume-section mt-7">
          <SectionTitle title={resume.language === "zh" ? "联系方式" : "Contact"} />
          <div className="space-y-2 text-[11.8px] text-slate-700">
            {basics.phone ? <p>{basics.phone}</p> : null}
            {basics.email ? <p>{basics.email}</p> : null}
            {basics.location ? <p>{basics.location}</p> : null}
            {basics.website ? <p>{basics.website}</p> : null}
            {basics.github ? <p>{basics.github}</p> : null}
            {basics.linkedin ? <p>{basics.linkedin}</p> : null}
            {!basics.phone && !basics.email && !basics.location ? (
              <p className="text-slate-400">
                {resume.language === "zh" ? "请先填写联系方式" : "Add contact details from the editor."}
              </p>
            ) : null}
          </div>
        </section>

        <section className="resume-section mt-7">
          <SectionTitle title={resume.language === "zh" ? "版本信息" : "Version"} />
          <div className="space-y-2 text-[11.8px] text-slate-700">
            <p>{resume.name}</p>
            <p>{resume.targetRole}</p>
            <p>{resume.language === "zh" ? "照片会跟随导出 PDF 一起显示" : "Photo will be preserved in PDF export"}</p>
          </div>
        </section>
      </aside>

      <main className="px-9 py-10">
        {resume.sectionOrder.map((sectionKey) => (
          <div key={sectionKey}>{sectionRenderers[sectionKey]}</div>
        ))}

        {!hasContent ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-5 py-6 text-center text-sm text-slate-500">
            {emptyPreviewMessage[resume.language]}
          </div>
        ) : null}
      </main>
    </div>
  );
}

