export type ResumeTemplate = "classic" | "modern";
export type ResumeLanguage = "zh" | "en";
export type ResumeTheme = "slate" | "emerald" | "amber";
export type ResumeSectionKey = "summary" | "work" | "projects" | "education" | "skills";

export const DEFAULT_SECTION_ORDER: ResumeSectionKey[] = ["summary", "work", "projects", "education", "skills"];

export type ResumeBasics = {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  summary: string;
  photo?: string;
  website?: string;
  github?: string;
  linkedin?: string;
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type WorkItem = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
};

export type ProjectItem = {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
};

export type SkillItem = {
  id: string;
  category: string;
  items: string[];
};

export type ResumeData = {
  basics: ResumeBasics;
  education: EducationItem[];
  work: WorkItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
};

export type ResumeVersion = {
  id: string;
  name: string;
  targetRole: string;
  language: ResumeLanguage;
  template: ResumeTemplate;
  theme: ResumeTheme;
  sectionOrder: ResumeSectionKey[];
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
};

export type ResumeWorkspace = {
  activeResumeId: string;
  resumes: ResumeVersion[];
};
