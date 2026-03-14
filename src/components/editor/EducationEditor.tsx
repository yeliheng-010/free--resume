import { EditorItemCard } from "@/components/editor/EditorItemCard";
import { EditorSection } from "@/components/editor/EditorSection";
import { FormInput, FormTextarea } from "@/components/editor/FormField";
import { SectionEmptyState } from "@/components/editor/SectionEmptyState";
import { addButtonClassName } from "@/components/editor/formStyles";
import { createId } from "@/lib/id";
import type { EducationItem } from "@/types/resume";

type EducationEditorProps = {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
};

function updateItem(items: EducationItem[], index: number, patch: Partial<EducationItem>): EducationItem[] {
  return items.map((item, currentIndex) => (currentIndex === index ? { ...item, ...patch } : item));
}

export function EducationEditor({ items, onChange }: EducationEditorProps) {
  const addItem = () => {
    onChange([
      ...items,
      {
        id: createId("edu"),
        school: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const deleteItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <EditorSection
      title="教育经历"
      description="适合填写学校、学历、专业、主修课程、荣誉或 GPA 等内容。"
      count={items.length}
    >
      {items.length === 0 ? (
        <SectionEmptyState title="还没有教育经历" description="新增一条教育经历后，会同步展示在右侧预览中。" />
      ) : null}

      {items.map((item, index) => (
        <EditorItemCard
          key={item.id}
          title={`教育经历 ${index + 1}`}
          subtitle="建议写清学校、学历、专业和补充说明。"
          onDelete={() => deleteItem(item.id)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput label="学校" value={item.school} onChange={(value) => onChange(updateItem(items, index, { school: value }))} placeholder="Tongji University" />
            <FormInput label="学历" value={item.degree} onChange={(value) => onChange(updateItem(items, index, { degree: value }))} placeholder="Bachelor" />
            <FormInput label="专业" value={item.major} onChange={(value) => onChange(updateItem(items, index, { major: value }))} placeholder="Software Engineering" />
            <FormInput label="开始时间" value={item.startDate} onChange={(value) => onChange(updateItem(items, index, { startDate: value }))} placeholder="2018.09" />
            <FormInput label="结束时间" value={item.endDate} onChange={(value) => onChange(updateItem(items, index, { endDate: value }))} placeholder="2022.06 / Present" />
          </div>

          <FormTextarea
            label="补充说明"
            helper="课程、成绩、荣誉"
            rows={3}
            value={item.description}
            onChange={(value) => onChange(updateItem(items, index, { description: value }))}
            placeholder="例如：核心课程、奖学金、竞赛、研究方向。"
          />
        </EditorItemCard>
      ))}

      <button type="button" onClick={addItem} className={addButtonClassName}>
        + 新增教育经历
      </button>
    </EditorSection>
  );
}
