"use client";

import { useEffect, useRef } from "react";
import { useDeferredValue } from "react";

import { useSearchParams } from "next/navigation";

import { BasicsEditor } from "@/components/editor/BasicsEditor";
import { EducationEditor } from "@/components/editor/EducationEditor";
import { ProjectsEditor } from "@/components/editor/ProjectsEditor";
import { SkillsEditor } from "@/components/editor/SkillsEditor";
import { WorkEditor } from "@/components/editor/WorkEditor";
import { PresentationPanel } from "@/components/builder/PresentationPanel";
import { SectionOrderEditor } from "@/components/builder/SectionOrderEditor";
import { VersionManager } from "@/components/builder/VersionManager";
import { ActionBar } from "@/components/layout/ActionBar";
import { BuilderOverview } from "@/components/layout/BuilderOverview";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { useResumeBuilder } from "@/hooks/useResumeBuilder";
import type { ResumeBasics, ResumeData, ResumeLanguage, ResumeTemplate, ResumeTheme } from "@/types/resume";

function resolveFileTitle(name: string): string {
  const normalized = name.trim();
  if (!normalized) {
    return "resume";
  }

  return normalized.toLowerCase().replace(/\s+/g, "-");
}

export function ResumeBuilderApp() {
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    workspace,
    activeResume,
    saveState,
    canDeleteActiveResume,
    setActiveResumeId,
    updateActiveResumeData,
    updateActiveResumeMeta,
    updateSectionOrder,
    createNewResumeVersion,
    duplicateActiveResume,
    deleteActiveResume,
    resetActiveToSampleData,
    importResumeJson,
    exportActiveResumeJson,
  } = useResumeBuilder();
  const deferredResume = useDeferredValue(activeResume);

  useEffect(() => {
    const template = searchParams.get("template");
    const language = searchParams.get("language");
    const theme = searchParams.get("theme");
    const patch: Partial<Pick<typeof activeResume, "template" | "language" | "theme">> = {};

    if (template === "classic" || template === "modern") {
      patch.template = template as ResumeTemplate;
    }

    if (language === "zh" || language === "en") {
      patch.language = language as ResumeLanguage;
    }

    if (theme === "slate" || theme === "emerald" || theme === "amber") {
      patch.theme = theme as ResumeTheme;
    }

    const hasChanged =
      (patch.template && patch.template !== activeResume.template) ||
      (patch.language && patch.language !== activeResume.language) ||
      (patch.theme && patch.theme !== activeResume.theme);

    if (hasChanged) {
      updateActiveResumeMeta(patch);
    }
  }, [activeResume.id, activeResume.language, activeResume.template, activeResume.theme, searchParams, updateActiveResumeMeta]);

  const updateBasics = <K extends keyof ResumeBasics>(field: K, value: ResumeBasics[K]) => {
    updateActiveResumeData((previous) => ({
      ...previous,
      basics: {
        ...previous.basics,
        [field]: value,
      },
    }));
  };

  const updateSection = <K extends keyof Pick<ResumeData, "education" | "work" | "projects" | "skills">>(
    key: K,
    value: ResumeData[K],
  ) => {
    updateActiveResumeData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const exportPdf = () => {
    const previousTitle = document.title;
    document.title = `${resolveFileTitle(activeResume.name)}-resume`;

    const restoreTitle = () => {
      document.title = previousTitle;
      window.removeEventListener("afterprint", restoreTitle);
    };

    window.addEventListener("afterprint", restoreTitle);
    window.setTimeout(() => {
      window.print();
    }, 60);
  };

  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    await importResumeJson(file);
    event.target.value = "";
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(241,245,249,0.95),rgba(226,232,240,0.55)_28%,rgba(248,250,252,0.95)_58%),linear-gradient(160deg,#f8fafc_0%,#eff6ff_45%,#f8fafc_100%)]">
      <ActionBar
        saveState={saveState}
        onReset={resetActiveToSampleData}
        onExportPdf={exportPdf}
        onImportJson={triggerImport}
        onExportJson={exportActiveResumeJson}
      />

      <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />

      <main className="mx-auto grid w-full max-w-[1560px] grid-cols-1 gap-6 px-4 py-5 lg:grid-cols-[620px_minmax(0,1fr)] lg:px-6 lg:py-6">
        <section className="no-print space-y-4">
          <BuilderOverview
            counts={{
              versions: workspace.resumes.length,
              education: activeResume.data.education.length,
              work: activeResume.data.work.length,
              projects: activeResume.data.projects.length,
              skills: activeResume.data.skills.length,
            }}
            storageMessage={saveState.message}
          />

          <VersionManager
            resumes={workspace.resumes}
            activeResume={activeResume}
            canDeleteActiveResume={canDeleteActiveResume}
            onActiveResumeChange={setActiveResumeId}
            onCreate={createNewResumeVersion}
            onDuplicate={duplicateActiveResume}
            onDelete={deleteActiveResume}
            onMetaChange={updateActiveResumeMeta}
          />

          <PresentationPanel
            language={activeResume.language}
            template={activeResume.template}
            theme={activeResume.theme}
            onLanguageChange={(language) => updateActiveResumeMeta({ language })}
            onTemplateChange={(template) => updateActiveResumeMeta({ template })}
            onThemeChange={(theme) => updateActiveResumeMeta({ theme })}
          />

          <SectionOrderEditor language={activeResume.language} order={activeResume.sectionOrder} onMove={updateSectionOrder} />

          <BasicsEditor basics={activeResume.data.basics} onChange={updateBasics} />
          <EducationEditor items={activeResume.data.education} onChange={(value) => updateSection("education", value)} />
          <WorkEditor items={activeResume.data.work} onChange={(value) => updateSection("work", value)} />
          <ProjectsEditor items={activeResume.data.projects} onChange={(value) => updateSection("projects", value)} />
          <SkillsEditor items={activeResume.data.skills} onChange={(value) => updateSection("skills", value)} />
        </section>

        <section className="print-area">
          <ResumePreview resume={deferredResume} />
        </section>
      </main>
    </div>
  );
}
