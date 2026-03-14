import { EditorItemCard } from "@/components/editor/EditorItemCard";
import { EditorSection } from "@/components/editor/EditorSection";
import { FormInput, FormTextarea } from "@/components/editor/FormField";
import { SectionEmptyState } from "@/components/editor/SectionEmptyState";
import { addButtonClassName } from "@/components/editor/formStyles";
import { createId } from "@/lib/id";
import { arrayToComma, arrayToLines, commaToArray, linesToArray } from "@/lib/text-format";
import type { ProjectItem } from "@/types/resume";

type ProjectsEditorProps = {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
};

function updateItem(items: ProjectItem[], index: number, patch: Partial<ProjectItem>): ProjectItem[] {
  return items.map((item, currentIndex) => (currentIndex === index ? { ...item, ...patch } : item));
}

export function ProjectsEditor({ items, onChange }: ProjectsEditorProps) {
  const addItem = () => {
    onChange([
      ...items,
      {
        id: createId("project"),
        name: "",
        role: "",
        startDate: "",
        endDate: "",
        description: [],
        technologies: [],
      },
    ]);
  };

  const deleteItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <EditorSection
      title="项目经历"
      description="项目描述建议每行一条，技术栈使用逗号分隔。保持内容精炼，突出业务价值与职责边界。"
      count={items.length}
    >
      {items.length === 0 ? (
        <SectionEmptyState title="还没有项目经历" description="你可以补充最能体现能力的项目，尤其是与目标岗位相关的项目。" />
      ) : null}

      {items.map((item, index) => (
        <EditorItemCard
          key={item.id}
          title={`项目经历 ${index + 1}`}
          subtitle="建议写清角色、周期、技术栈和结果。"
          onDelete={() => deleteItem(item.id)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput label="项目名称" value={item.name} onChange={(value) => onChange(updateItem(items, index, { name: value }))} placeholder="AI Interview Assistant" />
            <FormInput label="角色" value={item.role} onChange={(value) => onChange(updateItem(items, index, { role: value }))} placeholder="Frontend Lead" />
            <FormInput label="开始时间" value={item.startDate} onChange={(value) => onChange(updateItem(items, index, { startDate: value }))} placeholder="2024.02" />
            <FormInput label="结束时间" value={item.endDate} onChange={(value) => onChange(updateItem(items, index, { endDate: value }))} placeholder="2024.06 / Present" />
          </div>

          <FormTextarea
            label="项目描述"
            helper="每行一条"
            rows={5}
            value={arrayToLines(item.description)}
            onChange={(value) => onChange(updateItem(items, index, { description: linesToArray(value) }))}
            placeholder={"例如：\nDesigned the interview simulation workflow.\nImplemented responsive charts for score analysis."}
          />

          <FormInput
            label="技术栈"
            helper="逗号分隔"
            value={arrayToComma(item.technologies)}
            onChange={(value) => onChange(updateItem(items, index, { technologies: commaToArray(value) }))}
            placeholder="Next.js, TypeScript, Tailwind CSS"
          />
        </EditorItemCard>
      ))}

      <button type="button" onClick={addItem} className={addButtonClassName}>
        + 新增项目经历
      </button>
    </EditorSection>
  );
}
