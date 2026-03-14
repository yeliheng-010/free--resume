import { EditorSection } from "@/components/editor/EditorSection";
import { FormInput, FormTextarea } from "@/components/editor/FormField";
import { PhotoUploader } from "@/components/editor/PhotoUploader";
import type { ResumeBasics } from "@/types/resume";

type BasicsEditorProps = {
  basics: ResumeBasics;
  onChange: (field: keyof ResumeBasics, value: string) => void;
};

export function BasicsEditor({ basics, onChange }: BasicsEditorProps) {
  return (
    <EditorSection
      title="基本信息"
      description="填写个人资料、联系方式与求职摘要。建议摘要控制在 2 到 4 句话，突出经验年限、方向和成果。"
    >
      <PhotoUploader value={basics.photo} fullName={basics.name} onChange={(value) => onChange("photo", value)} />

      <div className="grid gap-3 sm:grid-cols-2">
        <FormInput label="姓名" value={basics.name} onChange={(value) => onChange("name", value)} placeholder="例如：Alex Chen" />
        <FormInput
          label="求职职位"
          value={basics.title}
          onChange={(value) => onChange("title", value)}
          placeholder="例如：Frontend Engineer"
        />
        <FormInput label="电话" type="tel" value={basics.phone} onChange={(value) => onChange("phone", value)} placeholder="+86 138-0000-1234" />
        <FormInput label="邮箱" type="email" value={basics.email} onChange={(value) => onChange("email", value)} placeholder="you@example.com" />
        <FormInput label="所在地" value={basics.location} onChange={(value) => onChange("location", value)} placeholder="Shanghai, China" />
        <FormInput
          label="个人网站"
          type="url"
          value={basics.website}
          onChange={(value) => onChange("website", value)}
          placeholder="https://your-site.com"
        />
        <FormInput
          label="GitHub"
          type="url"
          value={basics.github}
          onChange={(value) => onChange("github", value)}
          placeholder="https://github.com/username"
        />
        <FormInput
          label="LinkedIn"
          type="url"
          value={basics.linkedin}
          onChange={(value) => onChange("linkedin", value)}
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      <FormTextarea
        label="个人简介"
        helper="建议 2-4 句"
        value={basics.summary}
        onChange={(value) => onChange("summary", value)}
        placeholder="概括你的经验年限、核心方向、最有代表性的成果。"
      />
    </EditorSection>
  );
}
