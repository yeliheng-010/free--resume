"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { createSampleResumeData, createSampleResumeVersion } from "@/data/sampleResume";
import {
  createLegacyWorkspace,
  normalizeImportedResumePayload,
  normalizeResumeWorkspace,
} from "@/lib/resume-normalizer";
import { LEGACY_RESUME_STORAGE_KEY, LEGACY_TEMPLATE_STORAGE_KEY, WORKSPACE_STORAGE_KEY } from "@/lib/storage";
import type {
  ResumeData,
  ResumeLanguage,
  ResumeSectionKey,
  ResumeTemplate,
  ResumeTheme,
  ResumeVersion,
  ResumeWorkspace,
} from "@/types/resume";

type SaveStateKind = "ready" | "restored" | "saved" | "error" | "info";

export type SaveState = {
  kind: SaveStateKind;
  message: string;
};

type ResumeMetaPatch = Partial<Pick<ResumeVersion, "name" | "targetRole" | "language" | "template" | "theme">>;

type UseResumeBuilderResult = {
  workspace: ResumeWorkspace;
  activeResume: ResumeVersion;
  saveState: SaveState;
  canDeleteActiveResume: boolean;
  setActiveResumeId: (id: string) => void;
  updateActiveResumeData: (updater: (previous: ResumeData) => ResumeData) => void;
  updateActiveResumeMeta: (patch: ResumeMetaPatch) => void;
  updateSectionOrder: (sectionKey: ResumeSectionKey, direction: "up" | "down") => void;
  createNewResumeVersion: () => void;
  duplicateActiveResume: () => void;
  deleteActiveResume: () => void;
  resetActiveToSampleData: () => void;
  importResumeJson: (file: File) => Promise<void>;
  exportActiveResumeJson: () => void;
};

function cloneData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createInitialWorkspace(): ResumeWorkspace {
  const sample = createSampleResumeVersion();

  return {
    activeResumeId: sample.id,
    resumes: [sample],
  };
}

function getNow(): string {
  return new Date().toISOString();
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function createSavedMessage(): SaveState {
  return {
    kind: "saved",
    message: `已自动保存 ${formatTime(new Date())}`,
  };
}

function applyResumePatch(resume: ResumeVersion, patch: ResumeMetaPatch): ResumeVersion {
  const next = {
    ...resume,
    ...patch,
    updatedAt: getNow(),
  };

  if (patch.language && patch.language !== resume.language) {
    next.data = {
      ...next.data,
      basics: {
        ...next.data.basics,
        title: next.data.basics.title || (patch.language === "zh" ? "目标职位" : "Target Role"),
      },
    };
  }

  return next;
}

export function useResumeBuilder(): UseResumeBuilderResult {
  const [workspace, setWorkspace] = useState<ResumeWorkspace>(createInitialWorkspace);
  const [isHydrated, setIsHydrated] = useState(false);
  const shouldSkipNextSave = useRef(true);
  const [saveState, setSaveState] = useState<SaveState>({
    kind: "ready",
    message: "已载入示例数据",
  });

  useEffect(() => {
    try {
      const storedWorkspace = localStorage.getItem(WORKSPACE_STORAGE_KEY);

      if (storedWorkspace) {
        const parsed = normalizeResumeWorkspace(JSON.parse(storedWorkspace));
        if (parsed) {
          setWorkspace(parsed);
          setSaveState({
            kind: "restored",
            message: "已恢复本地工作区",
          });
        } else {
          localStorage.removeItem(WORKSPACE_STORAGE_KEY);
          setWorkspace(createInitialWorkspace());
          setSaveState({
            kind: "error",
            message: "检测到异常工作区数据，已回退到示例简历",
          });
        }
      } else {
        const legacyResume = localStorage.getItem(LEGACY_RESUME_STORAGE_KEY);
        const legacyTemplate = localStorage.getItem(LEGACY_TEMPLATE_STORAGE_KEY);
        const migratedWorkspace = legacyResume ? createLegacyWorkspace(JSON.parse(legacyResume), legacyTemplate) : null;

        if (migratedWorkspace) {
          setWorkspace(migratedWorkspace);
          localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(migratedWorkspace));
          localStorage.removeItem(LEGACY_RESUME_STORAGE_KEY);
          localStorage.removeItem(LEGACY_TEMPLATE_STORAGE_KEY);
          setSaveState({
            kind: "info",
            message: "已迁移旧版本地数据",
          });
        }
      }
    } catch {
      localStorage.removeItem(WORKSPACE_STORAGE_KEY);
      localStorage.removeItem(LEGACY_RESUME_STORAGE_KEY);
      localStorage.removeItem(LEGACY_TEMPLATE_STORAGE_KEY);
      setWorkspace(createInitialWorkspace());
      setSaveState({
        kind: "error",
        message: "本地数据解析失败，已恢复为示例工作区",
      });
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (shouldSkipNextSave.current) {
      shouldSkipNextSave.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspace));
        setSaveState(createSavedMessage());
      } catch {
        setSaveState({
          kind: "error",
          message: "自动保存失败，请检查浏览器存储空间或隐私设置",
        });
      }
    }, 280);

    return () => {
      window.clearTimeout(timer);
    };
  }, [workspace, isHydrated]);

  const activeResume = useMemo(() => {
    return workspace.resumes.find((item) => item.id === workspace.activeResumeId) ?? workspace.resumes[0];
  }, [workspace]);

  const updateResume = (updater: (resume: ResumeVersion) => ResumeVersion) => {
    setWorkspace((previous) => ({
      ...previous,
      resumes: previous.resumes.map((item) => (item.id === previous.activeResumeId ? updater(item) : item)),
    }));
  };

  const setActiveResumeId = (id: string) => {
    setWorkspace((previous) => {
      if (!previous.resumes.some((item) => item.id === id)) {
        return previous;
      }

      return {
        ...previous,
        activeResumeId: id,
      };
    });
    setSaveState({
      kind: "info",
      message: "已切换简历版本",
    });
  };

  const updateActiveResumeData = (updater: (previous: ResumeData) => ResumeData) => {
    updateResume((resume) => ({
      ...resume,
      data: updater(resume.data),
      updatedAt: getNow(),
    }));
  };

  const updateActiveResumeMeta = (patch: ResumeMetaPatch) => {
    updateResume((resume) => applyResumePatch(resume, patch));
  };

  const updateSectionOrder = (sectionKey: ResumeSectionKey, direction: "up" | "down") => {
    updateResume((resume) => {
      const currentIndex = resume.sectionOrder.indexOf(sectionKey);
      const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (currentIndex < 0 || targetIndex < 0 || targetIndex >= resume.sectionOrder.length) {
        return resume;
      }

      const nextOrder = [...resume.sectionOrder];
      const [moved] = nextOrder.splice(currentIndex, 1);
      nextOrder.splice(targetIndex, 0, moved);

      return {
        ...resume,
        sectionOrder: nextOrder,
        updatedAt: getNow(),
      };
    });
  };

  const createNewResumeVersion = () => {
    setWorkspace((previous) => {
      const nextLanguage: ResumeLanguage = activeResume?.language ?? "en";
      const nextTemplate: ResumeTemplate = activeResume?.template ?? "classic";
      const nextTheme: ResumeTheme = activeResume?.theme ?? "slate";
      const nextResume = createSampleResumeVersion({
        language: nextLanguage,
        template: nextTemplate,
        theme: nextTheme,
        name: nextLanguage === "zh" ? "新的岗位版本" : "New Resume Version",
        targetRole: nextLanguage === "zh" ? "目标岗位" : "Target Role",
      });

      return {
        activeResumeId: nextResume.id,
        resumes: [nextResume, ...previous.resumes],
      };
    });

    setSaveState({
      kind: "info",
      message: "已新建简历版本",
    });
  };

  const duplicateActiveResume = () => {
    setWorkspace((previous) => {
      const source = previous.resumes.find((item) => item.id === previous.activeResumeId);
      if (!source) {
        return previous;
      }

      const now = getNow();
      const duplicate: ResumeVersion = {
        ...cloneData(source),
        id: createSampleResumeVersion().id,
        name: source.language === "zh" ? `${source.name} 副本` : `${source.name} Copy`,
        createdAt: now,
        updatedAt: now,
      };

      return {
        activeResumeId: duplicate.id,
        resumes: [duplicate, ...previous.resumes],
      };
    });

    setSaveState({
      kind: "info",
      message: "已复制当前简历版本",
    });
  };

  const deleteActiveResume = () => {
    setWorkspace((previous) => {
      if (previous.resumes.length <= 1) {
        return previous;
      }

      const filtered = previous.resumes.filter((item) => item.id !== previous.activeResumeId);

      return {
        activeResumeId: filtered[0].id,
        resumes: filtered,
      };
    });

    setSaveState({
      kind: "info",
      message: "已删除当前简历版本",
    });
  };

  const resetActiveToSampleData = () => {
    updateResume((resume) => ({
      ...resume,
      data: createSampleResumeData(resume.language),
      updatedAt: getNow(),
    }));

    setSaveState({
      kind: "ready",
      message: "已重置为对应语言的示例数据",
    });
  };

  const importResumeJson = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = normalizeImportedResumePayload(JSON.parse(text));

      if (!parsed) {
        setSaveState({
          kind: "error",
          message: "导入失败，JSON 结构不符合简历格式",
        });
        return;
      }

      const now = getNow();
      const importedResume: ResumeVersion = {
        ...parsed,
        id: createSampleResumeVersion().id,
        createdAt: now,
        updatedAt: now,
      };

      setWorkspace((previous) => ({
        activeResumeId: importedResume.id,
        resumes: [importedResume, ...previous.resumes],
      }));

      setSaveState({
        kind: "info",
        message: "已从 JSON 导入新的简历版本",
      });
    } catch {
      setSaveState({
        kind: "error",
        message: "JSON 解析失败，请检查文件内容",
      });
    }
  };

  const exportActiveResumeJson = () => {
    try {
      const payload = JSON.stringify(activeResume, null, 2);
      const blob = new Blob([payload], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const safeName = (activeResume.name || "resume").toLowerCase().replace(/\s+/g, "-");

      anchor.href = url;
      anchor.download = `${safeName}.json`;
      anchor.click();
      URL.revokeObjectURL(url);

      setSaveState({
        kind: "info",
        message: "已导出当前简历 JSON",
      });
    } catch {
      setSaveState({
        kind: "error",
        message: "导出 JSON 失败，请稍后重试",
      });
    }
  };

  return {
    workspace,
    activeResume,
    saveState,
    canDeleteActiveResume: workspace.resumes.length > 1,
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
  };
}

