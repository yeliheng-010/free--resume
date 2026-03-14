import { createSampleResumeVersion } from "@/data/sampleResume";
import { createId } from "@/lib/id";
import { isValidPhotoDataUrl } from "@/lib/photo";
import type {
  EducationItem,
  ProjectItem,
  ResumeBasics,
  ResumeData,
  ResumeLanguage,
  ResumeSectionKey,
  ResumeTemplate,
  ResumeTheme,
  ResumeVersion,
  ResumeWorkspace,
  SkillItem,
  WorkItem,
} from "@/types/resume";
import { DEFAULT_SECTION_ORDER } from "@/types/resume";

function asObject(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function normalizePhoto(value: unknown): string {
  const photo = asString(value);
  return photo && isValidPhotoDataUrl(photo) ? photo : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => asString(item).trim()).filter(Boolean);
}

function normalizeDate(value: unknown): string {
  return asString(value);
}

function normalizeBasics(value: unknown): ResumeBasics | null {
  const basics = asObject(value);
  if (!basics) {
    return null;
  }

  return {
    name: asString(basics.name),
    title: asString(basics.title),
    phone: asString(basics.phone),
    email: asString(basics.email),
    location: asString(basics.location),
    summary: asString(basics.summary),
    photo: normalizePhoto(basics.photo),
    website: asString(basics.website),
    github: asString(basics.github),
    linkedin: asString(basics.linkedin),
  };
}

function normalizeEducation(value: unknown): EducationItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      const current = asObject(item);
      if (!current) {
        return null;
      }

      return {
        id: asString(current.id) || createId("edu"),
        school: asString(current.school),
        degree: asString(current.degree),
        major: asString(current.major),
        startDate: normalizeDate(current.startDate),
        endDate: normalizeDate(current.endDate),
        description: asString(current.description),
      };
    })
    .filter((item): item is EducationItem => Boolean(item));
}

function normalizeWork(value: unknown): WorkItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      const current = asObject(item);
      if (!current) {
        return null;
      }

      return {
        id: asString(current.id) || createId("work"),
        company: asString(current.company),
        position: asString(current.position),
        startDate: normalizeDate(current.startDate),
        endDate: normalizeDate(current.endDate),
        description: asStringArray(current.description),
      };
    })
    .filter((item): item is WorkItem => Boolean(item));
}

function normalizeProjects(value: unknown): ProjectItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      const current = asObject(item);
      if (!current) {
        return null;
      }

      return {
        id: asString(current.id) || createId("project"),
        name: asString(current.name),
        role: asString(current.role),
        startDate: normalizeDate(current.startDate),
        endDate: normalizeDate(current.endDate),
        description: asStringArray(current.description),
        technologies: asStringArray(current.technologies),
      };
    })
    .filter((item): item is ProjectItem => Boolean(item));
}

function normalizeSkills(value: unknown): SkillItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      const current = asObject(item);
      if (!current) {
        return null;
      }

      return {
        id: asString(current.id) || createId("skill"),
        category: asString(current.category),
        items: asStringArray(current.items),
      };
    })
    .filter((item): item is SkillItem => Boolean(item));
}

export function normalizeResumeData(value: unknown): ResumeData | null {
  const root = asObject(value);
  if (!root) {
    return null;
  }

  const basics = normalizeBasics(root.basics);
  if (!basics) {
    return null;
  }

  return {
    basics,
    education: normalizeEducation(root.education),
    work: normalizeWork(root.work),
    projects: normalizeProjects(root.projects),
    skills: normalizeSkills(root.skills),
  };
}

export function normalizeResumeLanguage(value: unknown): ResumeLanguage {
  return value === "zh" ? "zh" : "en";
}

export function normalizeResumeTemplate(value: unknown): ResumeTemplate {
  return value === "modern" ? "modern" : "classic";
}

export function normalizeResumeTheme(value: unknown): ResumeTheme {
  if (value === "emerald" || value === "amber") {
    return value;
  }

  return "slate";
}

export function normalizeSectionOrder(value: unknown): ResumeSectionKey[] {
  if (!Array.isArray(value)) {
    return [...DEFAULT_SECTION_ORDER];
  }

  const keys = value.filter((item): item is ResumeSectionKey => DEFAULT_SECTION_ORDER.includes(item as ResumeSectionKey));
  const missing = DEFAULT_SECTION_ORDER.filter((item) => !keys.includes(item));

  return [...keys, ...missing];
}

export function normalizeResumeVersion(value: unknown): ResumeVersion | null {
  const root = asObject(value);
  if (!root) {
    return null;
  }

  const data = normalizeResumeData(root.data ?? root);
  if (!data) {
    return null;
  }

  const language = normalizeResumeLanguage(root.language);
  const createdAt = asString(root.createdAt) || new Date().toISOString();
  const updatedAt = asString(root.updatedAt) || createdAt;

  return {
    id: asString(root.id) || createId("resume"),
    name: asString(root.name) || (language === "zh" ? "未命名简历" : "Untitled Resume"),
    targetRole: asString(root.targetRole) || data.basics.title || (language === "zh" ? "目标岗位" : "Target Role"),
    language,
    template: normalizeResumeTemplate(root.template),
    theme: normalizeResumeTheme(root.theme),
    sectionOrder: normalizeSectionOrder(root.sectionOrder),
    data,
    createdAt,
    updatedAt,
  };
}

export function normalizeResumeWorkspace(value: unknown): ResumeWorkspace | null {
  const root = asObject(value);
  if (!root || !Array.isArray(root.resumes)) {
    return null;
  }

  const resumes = root.resumes.map((item) => normalizeResumeVersion(item)).filter((item): item is ResumeVersion => Boolean(item));
  if (resumes.length === 0) {
    return null;
  }

  const activeResumeId = asString(root.activeResumeId);
  const activeExists = resumes.some((item) => item.id === activeResumeId);

  return {
    activeResumeId: activeExists ? activeResumeId : resumes[0].id,
    resumes,
  };
}

export function createLegacyWorkspace(value: unknown, templateValue: unknown): ResumeWorkspace | null {
  const data = normalizeResumeData(value);
  if (!data) {
    return null;
  }

  const sample = createSampleResumeVersion();

  const legacyResume: ResumeVersion = {
    ...sample,
    data,
    template: normalizeResumeTemplate(templateValue),
    updatedAt: new Date().toISOString(),
    name: data.basics.name ? `${data.basics.name} Resume` : sample.name,
    targetRole: data.basics.title || sample.targetRole,
  };

  return {
    activeResumeId: legacyResume.id,
    resumes: [legacyResume],
  };
}

export function normalizeImportedResumePayload(value: unknown): ResumeVersion | null {
  const directVersion = normalizeResumeVersion(value);
  if (directVersion) {
    return directVersion;
  }

  const data = normalizeResumeData(value);
  if (!data) {
    return null;
  }

  const sample = createSampleResumeVersion();

  return {
    ...sample,
    data,
    name: data.basics.name ? `${data.basics.name} Resume` : sample.name,
    targetRole: data.basics.title || sample.targetRole,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
}

export function hasMeaningfulContent(data: ResumeData): boolean {
  const basicsValues = Object.values(data.basics).filter(Boolean);

  return (
    basicsValues.length > 0 ||
    data.education.length > 0 ||
    data.work.length > 0 ||
    data.projects.length > 0 ||
    data.skills.length > 0
  );
}
