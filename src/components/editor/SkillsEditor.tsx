import { EditorItemCard } from "@/components/editor/EditorItemCard";
import { EditorSection } from "@/components/editor/EditorSection";
import { FormInput } from "@/components/editor/FormField";
import { SectionEmptyState } from "@/components/editor/SectionEmptyState";
import { addButtonClassName } from "@/components/editor/formStyles";
import { createId } from "@/lib/id";
import { arrayToComma, commaToArray } from "@/lib/text-format";
import type { SkillItem } from "@/types/resume";

type SkillsEditorProps = {
  items: SkillItem[];
  onChange: (items: SkillItem[]) => void;
};

function updateItem(items: SkillItem[], index: number, patch: Partial<SkillItem>): SkillItem[] {
  return items.map((item, currentIndex) => (currentIndex === index ? { ...item, ...patch } : item));
}

export function SkillsEditor({ items, onChange }: SkillsEditorProps) {
  const addItem = () => {
    onChange([
      ...items,
      {
        id: createId("skill"),
        category: "",
        items: [],
      },
    ]);
  };

  const deleteItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <EditorSection
      title="技能模块"
      description="按分类组织技能，会让预览更清楚，也更接近正式简历的表达方式。"
      count={items.length}
    >
      {items.length === 0 ? (
        <SectionEmptyState title="还没有技能分组" description="建议至少添加 2 到 3 个技能分类，例如语言、框架、工具。" />
      ) : null}

      {items.map((item, index) => (
        <EditorItemCard
          key={item.id}
          title={`技能分组 ${index + 1}`}
          subtitle="例如 Programming、Frameworks、Tools。"
          onDelete={() => deleteItem(item.id)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput label="分类" value={item.category} onChange={(value) => onChange(updateItem(items, index, { category: value }))} placeholder="Programming" />
            <FormInput
              label="技能项"
              helper="逗号分隔"
              value={arrayToComma(item.items)}
              onChange={(value) => onChange(updateItem(items, index, { items: commaToArray(value) }))}
              placeholder="TypeScript, React, Next.js"
            />
          </div>
        </EditorItemCard>
      ))}

      <button type="button" onClick={addItem} className={addButtonClassName}>
        + 新增技能分组
      </button>
    </EditorSection>
  );
}
