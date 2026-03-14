type TemplateSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function TemplateSection({ title, children }: TemplateSectionProps) {
  return (
    <section className="resume-section mb-6">
      <h2
        className="mb-2 border-b pb-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ borderColor: "var(--resume-border)", color: "var(--resume-accent-muted)" }}
      >
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
