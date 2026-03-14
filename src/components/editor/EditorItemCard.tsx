import { deleteButtonClassName } from "@/components/editor/formStyles";

type EditorItemCardProps = {
  title: string;
  subtitle?: string;
  onDelete: () => void;
  children: React.ReactNode;
};

export function EditorItemCard({ title, subtitle, onDelete, children }: EditorItemCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        <button type="button" onClick={onDelete} className={deleteButtonClassName}>
          删除
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </article>
  );
}

