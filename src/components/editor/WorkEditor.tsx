import { EditorItemCard } from "@/components/editor/EditorItemCard";
import { EditorSection } from "@/components/editor/EditorSection";
import { FormInput, FormTextarea } from "@/components/editor/FormField";
import { SectionEmptyState } from "@/components/editor/SectionEmptyState";
import { addButtonClassName } from "@/components/editor/formStyles";
import { createId } from "@/lib/id";
import { arrayToLines, linesToArray } from "@/lib/text-format";
import type { WorkItem } from "@/types/resume";

type WorkEditorProps = {
  items: WorkItem[];
  onChange: (items: WorkItem[]) => void;
};

function updateItem(items: WorkItem[], index: number, patch: Partial<WorkItem>): WorkItem[] {
  return items.map((item, currentIndex) => (currentIndex === index ? { ...item, ...patch } : item));
}

export function WorkEditor({ items, onChange }: WorkEditorProps) {
  const addItem = () => {
    onChange([
      ...items,
      {
        id: createId("work"),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: [],
      },
    ]);
  };

  const deleteItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <EditorSection
      title="工作经历"
      description="职责与成果建议每行一条，预览区会自动转换为项目符号，更接近真实简历排版。"
      count={items.length}
    >
      {items.length === 0 ? (
        <SectionEmptyState title="还没有工作经历" description="至少填写一段工作经历，通常能显著提升简历完成度。" />
      ) : null}

      {items.map((item, index) => (
        <EditorItemCard
          key={item.id}
          title={`工作经历 ${index + 1}`}
          subtitle="重点写结果，不只写职责。优先量化影响。"
          onDelete={() => deleteItem(item.id)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput
              label="公司"
              value={item.company}
              onChange={(value) => onChange(updateItem(items, index, { company: value }))}
              placeholder="Acme Tech"
            />
            <FormInput
              label="职位"
              value={item.position}
              onChange={(value) => onChange(updateItem(items, index, { position: value }))}
              placeholder="Frontend Engineer"
            />
            <FormInput
              label="开始时间"
              value={item.startDate}
              onChange={(value) => onChange(updateItem(items, index, { startDate: value }))}
              placeholder="2023.07"
            />
            <FormInput
              label="结束时间"
              value={item.endDate}
              onChange={(value) => onChange(updateItem(items, index, { endDate: value }))}
              placeholder="Present"
            />
          </div>

          <FormTextarea
            label="职责与成果"
            helper="每行一条"
            rows={5}
            value={arrayToLines(item.description)}
            onChange={(value) => onChange(updateItem(items, index, { description: linesToArray(value) }))}
            placeholder="例如：\nBuilt and maintained a multi-tenant dashboard.\nReduced first-screen loading time by 32%."
          />
        </EditorItemCard>
      ))}

      <button type="button" onClick={addItem} className={addButtonClassName}>
        + 新增工作经历
      </button>
    </EditorSection>
  );
}

