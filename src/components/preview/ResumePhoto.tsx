import Image from "next/image";

type ResumePhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export function ResumePhoto({ src, alt, width, height, className }: ResumePhotoProps) {
  return (
    <div
      className={`overflow-hidden border bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] ${className ?? ""}`}
      style={{ borderColor: "var(--resume-border)" }}
    >
      <Image unoptimized src={src} alt={alt} width={width} height={height} className="h-full w-full object-cover" />
    </div>
  );
}

