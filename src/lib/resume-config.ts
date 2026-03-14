import type { CSSProperties } from "react";

import type { ResumeLanguage, ResumeSectionKey, ResumeTemplate, ResumeTheme } from "@/types/resume";

export const languageOptions: Array<{ value: ResumeLanguage; label: string; helper: string }> = [
  { value: "zh", label: "中文", helper: "中文标题与模块名" },
  { value: "en", label: "English", helper: "English headings and labels" },
];

export const themeOptions: Array<{ value: ResumeTheme; label: string; helper: string }> = [
  { value: "slate", label: "Slate", helper: "稳重、克制、通用" },
  { value: "emerald", label: "Emerald", helper: "清爽、专业、偏产品感" },
  { value: "amber", label: "Amber", helper: "温暖、克制、偏创意岗位" },
];

export const templateOptions: Array<{ value: ResumeTemplate; label: string; helper: string }> = [
  { value: "classic", label: "Classic", helper: "传统单栏，适合大多数岗位" },
  { value: "modern", label: "Modern", helper: "左右分栏，信息层次更强" },
];

export const sectionLabels: Record<ResumeLanguage, Record<ResumeSectionKey, string>> = {
  zh: {
    summary: "个人简介",
    work: "工作经历",
    projects: "项目经历",
    education: "教育经历",
    skills: "技能",
  },
  en: {
    summary: "Summary",
    work: "Experience",
    projects: "Projects",
    education: "Education",
    skills: "Skills",
  },
};

export const emptyPreviewMessage: Record<ResumeLanguage, string> = {
  zh: "从左侧开始填写内容，右侧会实时生成简历预览。",
  en: "Start filling the form on the left to generate your resume preview.",
};

const themeStyles: Record<ResumeTheme, CSSProperties> = {
  slate: {
    "--resume-accent": "#0f172a",
    "--resume-accent-soft": "#e2e8f0",
    "--resume-accent-muted": "#475569",
    "--resume-border": "#cbd5e1",
    "--resume-sidebar": "#f8fafc",
    "--resume-chip": "#f1f5f9",
  } as CSSProperties,
  emerald: {
    "--resume-accent": "#065f46",
    "--resume-accent-soft": "#d1fae5",
    "--resume-accent-muted": "#047857",
    "--resume-border": "#a7f3d0",
    "--resume-sidebar": "#ecfdf5",
    "--resume-chip": "#d1fae5",
  } as CSSProperties,
  amber: {
    "--resume-accent": "#92400e",
    "--resume-accent-soft": "#fef3c7",
    "--resume-accent-muted": "#b45309",
    "--resume-border": "#fcd34d",
    "--resume-sidebar": "#fffaf0",
    "--resume-chip": "#fef3c7",
  } as CSSProperties,
};

export function getThemeStyle(theme: ResumeTheme): CSSProperties {
  return themeStyles[theme];
}

