import { controlClassName, helperTextClassName, labelClassName } from "@/components/editor/formStyles";

type SharedFieldProps = {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  helper?: string;
  placeholder?: string;
  className?: string;
};

type FormInputProps = SharedFieldProps & {
  type?: "text" | "email" | "tel" | "url";
};

type FormTextareaProps = SharedFieldProps & {
  rows?: number;
};

export function FormInput({
  label,
  value,
  onChange,
  helper,
  placeholder,
  type = "text",
  className,
}: FormInputProps) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className={labelClassName}>{label}</span>
        {helper ? <span className={helperTextClassName}>{helper}</span> : null}
      </div>
      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={className ?? controlClassName}
      />
    </label>
  );
}

export function FormTextarea({
  label,
  value,
  onChange,
  helper,
  placeholder,
  rows = 4,
  className,
}: FormTextareaProps) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className={labelClassName}>{label}</span>
        {helper ? <span className={helperTextClassName}>{helper}</span> : null}
      </div>
      <textarea
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={className ?? `${controlClassName} min-h-[112px] resize-y`}
      />
    </label>
  );
}

