import { createId } from "@/lib/id";
import type { ResumeData, ResumeLanguage, ResumeVersion } from "@/types/resume";
import { DEFAULT_SECTION_ORDER } from "@/types/resume";

const EN_SAMPLE_RESUME_DATA: ResumeData = {
  basics: {
    name: "Alex Chen",
    title: "Frontend Engineer",
    phone: "+86 138-0000-1234",
    email: "alex.chen@email.com",
    location: "Shanghai, China",
    summary:
      "Frontend engineer with 3+ years of experience building SaaS products. Strong in Next.js, TypeScript, performance optimization, and reusable design systems.",
    website: "https://alexchen.dev",
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
  },
  education: [
    {
      id: "edu-1",
      school: "Tongji University",
      degree: "Bachelor",
      major: "Software Engineering",
      startDate: "2018.09",
      endDate: "2022.06",
      description: "Core coursework: Data Structures, Operating Systems, Networks, Human-Computer Interaction.",
    },
  ],
  work: [
    {
      id: "work-1",
      company: "Acme Tech",
      position: "Frontend Engineer",
      startDate: "2023.07",
      endDate: "Present",
      description: [
        "Built and maintained a multi-tenant analytics dashboard with Next.js and TypeScript.",
        "Reduced first-screen loading time by 32% through route-level code splitting and data loading optimization.",
        "Worked with product and design teams to build a reusable component library.",
      ],
    },
    {
      id: "work-2",
      company: "Bright Data Labs",
      position: "Frontend Intern",
      startDate: "2022.03",
      endDate: "2022.12",
      description: [
        "Implemented internal admin pages and improved form validation experience.",
        "Added unit tests for critical components and reduced regression bugs.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "AI Interview Assistant",
      role: "Frontend Lead",
      startDate: "2024.02",
      endDate: "2024.06",
      description: [
        "Designed the full interview simulation workflow and response feedback loop.",
        "Implemented responsive charts for interview score analysis and behavior review.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "ECharts"],
    },
    {
      id: "proj-2",
      name: "E-Commerce Analytics Console",
      role: "Fullstack Developer",
      startDate: "2023.11",
      endDate: "2024.01",
      description: [
        "Created KPI dashboards and custom filtering pipelines for merchandising teams.",
      ],
      technologies: ["React", "Node.js", "PostgreSQL"],
    },
  ],
  skills: [
    {
      id: "skill-1",
      category: "Programming",
      items: ["TypeScript", "JavaScript", "HTML", "CSS"],
    },
    {
      id: "skill-2",
      category: "Frameworks",
      items: ["React", "Next.js", "Node.js"],
    },
    {
      id: "skill-3",
      category: "Tools",
      items: ["Git", "Docker", "Figma", "Jest"],
    },
  ],
};

const ZH_SAMPLE_RESUME_DATA: ResumeData = {
  basics: {
    name: "陈立恒",
    title: "前端工程师",
    phone: "+86 138-0000-1234",
    email: "liheng.chen@email.com",
    location: "上海，中国",
    summary:
      "拥有 3 年以上 Web 产品开发经验，长期负责中后台与 SaaS 产品的前端架构、性能优化和组件体系建设，熟悉 Next.js、TypeScript 与现代化工程流程。",
    website: "https://liheng.dev",
    github: "https://github.com/lihengchen",
    linkedin: "https://linkedin.com/in/lihengchen",
  },
  education: [
    {
      id: "edu-1",
      school: "同济大学",
      degree: "本科",
      major: "软件工程",
      startDate: "2018.09",
      endDate: "2022.06",
      description: "主修课程：数据结构、操作系统、计算机网络、人机交互等。",
    },
  ],
  work: [
    {
      id: "work-1",
      company: "Acme Tech",
      position: "前端工程师",
      startDate: "2023.07",
      endDate: "至今",
      description: [
        "负责多租户数据看板的开发与迭代，技术栈为 Next.js 与 TypeScript。",
        "通过路由级拆包和数据请求优化，将首屏加载时间降低 32%。",
        "与产品、设计协作搭建可复用组件体系，提升交付效率与一致性。",
      ],
    },
    {
      id: "work-2",
      company: "Bright Data Labs",
      position: "前端实习生",
      startDate: "2022.03",
      endDate: "2022.12",
      description: [
        "参与内部管理后台页面开发，优化表单校验与错误提示体验。",
        "补充关键组件测试，减少线上回归问题。",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "AI 面试助手",
      role: "前端负责人",
      startDate: "2024.02",
      endDate: "2024.06",
      description: [
        "负责面试模拟流程与反馈闭环设计，实现完整交互链路。",
        "实现面试评分与行为分析可视化图表，支持桌面与移动端浏览。",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "ECharts"],
    },
    {
      id: "proj-2",
      name: "电商分析控制台",
      role: "全栈开发",
      startDate: "2023.11",
      endDate: "2024.01",
      description: [
        "为业务团队搭建关键指标看板与自定义筛选能力，支持多维分析。",
      ],
      technologies: ["React", "Node.js", "PostgreSQL"],
    },
  ],
  skills: [
    {
      id: "skill-1",
      category: "编程语言",
      items: ["TypeScript", "JavaScript", "HTML", "CSS"],
    },
    {
      id: "skill-2",
      category: "框架与库",
      items: ["React", "Next.js", "Node.js"],
    },
    {
      id: "skill-3",
      category: "工具",
      items: ["Git", "Docker", "Figma", "Jest"],
    },
  ],
};

function cloneData(data: ResumeData): ResumeData {
  return JSON.parse(JSON.stringify(data)) as ResumeData;
}

export function createSampleResumeData(language: ResumeLanguage = "en"): ResumeData {
  return cloneData(language === "zh" ? ZH_SAMPLE_RESUME_DATA : EN_SAMPLE_RESUME_DATA);
}

export function createSampleResumeVersion(options?: Partial<Pick<ResumeVersion, "language" | "template" | "theme" | "name" | "targetRole">>): ResumeVersion {
  const language = options?.language ?? "en";
  const now = new Date().toISOString();

  return {
    id: createId("resume"),
    name: options?.name ?? (language === "zh" ? "默认示例简历" : "Default Resume"),
    targetRole: options?.targetRole ?? (language === "zh" ? "前端工程师" : "Frontend Engineer"),
    language,
    template: options?.template ?? "classic",
    theme: options?.theme ?? "slate",
    sectionOrder: [...DEFAULT_SECTION_ORDER],
    data: createSampleResumeData(language),
    createdAt: now,
    updatedAt: now,
  };
}

