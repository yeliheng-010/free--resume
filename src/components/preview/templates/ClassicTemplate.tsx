import { ResumePhoto } from "@/components/preview/ResumePhoto";
import { TemplateSection } from "@/components/preview/TemplateSection";
import { emptyPreviewMessage, sectionLabels } from "@/lib/resume-config";
import { hasMeaningfulContent } from "@/lib/resume-normalizer";
import type { ResumeSectionKey, ResumeVersion } from "@/types/resume";

type ClassicTemplateProps = {
  resume: ResumeVersion;
};

function renderDate(startDate: string, endDate: string): string {
  return [startDate, endDate].filter(Boolean).join(" - ");
}

export function ClassicTemplate({ resume }: ClassicTemplateProps) {
  const { basics, education, work, projects, skills } = resume.data;
  const titles = sectionLabels[resume.language];
  const contactItems = [basics.phone, basics.email, basics.location].filter(Boolean);
  const profileLinks = [basics.website, basics.github, basics.linkedin].filter(Boolean);
  const hasPhoto = Boolean(basics.photo);
  const techLabel = resume.language === "zh" ? "技术栈" : "Tech";

  const sectionRenderers: Record<ResumeSectionKey, React.ReactNode | null> = {
    summary: basics.summary ? (
      <TemplateSection title={titles.summary}>
        <p className="text-slate-700">{basics.summary}</p>
      </TemplateSection>
    ) : null,
    work: work.length > 0 ? (
      <TemplateSection title={titles.work}>
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
                  <li key={`${item.id}-${index}`}>{point}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </TemplateSection>
    ) : null,
    projects: projects.length > 0 ? (
      <TemplateSection title={titles.projects}>
        {projects.map((item) => (
          <article key={item.id} className="resume-entry">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {item.name}
                  {item.role ? <span className="font-normal text-slate-500"> | {item.role}</span> : null}
                </h3>
              </div>
              <p className="shrink-0 text-[11.5px] font-medium text-slate-500">{renderDate(item.startDate, item.endDate)}</p>
            </div>
            {item.description.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700 marker:text-[color:var(--resume-accent-muted)]">
                {item.description.map((point, index) => (
                  <li key={`${item.id}-point-${index}`}>{point}</li>
                ))}
              </ul>
            ) : null}
            {item.technologies.length > 0 ? (
              <p className="mt-2 text-slate-600">
                <span className="font-semibold text-slate-700">{techLabel}:</span> {item.technologies.join(", ")}
              </p>
            ) : null}
          </article>
        ))}
      </TemplateSection>
    ) : null,
    education: education.length > 0 ? (
      <TemplateSection title={titles.education}>
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
      </TemplateSection>
    ) : null,
    skills: skills.length > 0 ? (
      <TemplateSection title={titles.skills}>
        <div className="space-y-2">
          {skills.map((item) => (
            <p key={item.id} className="resume-entry">
              <span className="font-semibold text-slate-800">{item.category}:</span>{" "}
              <span className="text-slate-700">{item.items.join(", ")}</span>
            </p>
          ))}
        </div>
      </TemplateSection>
    ) : null,
  };

  return (
    <div className="h-full bg-[linear-gradient(180deg,#fffefb_0%,#ffffff_18%,#fffefb_100%)] px-[54px] py-[46px] text-[12.2px] leading-[1.68] text-slate-800">
      <header className="resume-keep mb-8 border-b pb-5" style={{ borderColor: "var(--resume-border)" }}>
        <div className={hasPhoto ? "grid grid-cols-[1fr_112px] items-center gap-6" : "text-center"}>
          <div className={hasPhoto ? "text-left" : "text-center"}>
            <h1 className="text-[34px] font-semibold tracking-[0.04em]" style={{ color: "var(--resume-accent)" }}>
              {basics.name || "Your Name"}
            </h1>
            <p className="mt-2 text-[13px] uppercase tracking-[0.24em] text-slate-600">{basics.title || "Target Position"}</p>

            {contactItems.length > 0 ? (
              <div className={`mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-slate-600 ${hasPhoto ? "justify-start" : "justify-center"}`}>
                {contactItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-[11.5px] text-slate-400">
                {resume.language === "zh" ? "请在左侧填写电话、邮箱和所在地" : "Add phone, email, and location from the left panel."}
              </p>
            )}

            {profileLinks.length > 0 ? (
              <div className={`mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-slate-500 ${hasPhoto ? "justify-start" : "justify-center"}`}>
                {profileLinks.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            ) : null}
          </div>

          {basics.photo ? (
            <div className="justify-self-end">
              <ResumePhoto
                src={basics.photo}
                alt={basics.name ? `${basics.name} photo` : "Resume photo"}
                width={112}
                height={140}
                className="h-[140px] w-[112px] rounded-[22px]"
              />
            </div>
          ) : null}
        </div>
      </header>

      {resume.sectionOrder.map((sectionKey) => (
        <div key={sectionKey}>{sectionRenderers[sectionKey]}</div>
      ))}

      {!hasMeaningfulContent(resume.data) ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-5 py-6 text-center text-sm text-slate-500">
          {emptyPreviewMessage[resume.language]}
        </div>
      ) : null}
    </div>
  );
}
