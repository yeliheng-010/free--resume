"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import { processPhotoUpload } from "@/lib/photo";

type PhotoUploaderProps = {
  value?: string;
  fullName?: string;
  onChange: (value: string) => void;
};

type FeedbackState = {
  kind: "idle" | "error" | "success";
  message: string;
};

function getFeedbackClassName(kind: FeedbackState["kind"]): string {
  if (kind === "error") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (kind === "success") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-500";
}

export function PhotoUploader({ value, fullName, onChange }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>({
    kind: "idle",
    message: "支持 JPG / PNG / WebP，上传后会自动压缩并保存到当前简历版本。",
  });

  const openFilePicker = () => {
    if (!isProcessing) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsProcessing(true);
    setFeedback({
      kind: "idle",
      message: "正在压缩图片，请稍候…",
    });

    const result = await processPhotoUpload(file);

    if (result.ok) {
      onChange(result.dataUrl);
      setFeedback({
        kind: "success",
        message: "照片已上传并压缩保存，导出 PDF 时会一起显示。",
      });
    } else {
      setFeedback({
        kind: "error",
        message: result.message,
      });
    }

    event.target.value = "";
    setIsProcessing(false);
  };

  const handleDelete = () => {
    onChange("");
    setFeedback({
      kind: "success",
      message: "照片已移除。",
    });
  };

  return (
    <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(248,250,252,0.9))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">个人照片</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">建议使用正面、清晰、背景简洁的证件照或职业头像。</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500">
          ATS-friendly
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex h-[140px] w-[112px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50">
          {value ? (
            <Image
              unoptimized
              src={value}
              alt={fullName ? `${fullName} photo` : "Resume photo"}
              width={112}
              height={140}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="px-4 text-center text-xs leading-5 text-slate-400">上传后会在简历头部显示</div>
          )}
        </div>

        <div className="min-w-[220px] flex-1">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openFilePicker}
              disabled={isProcessing}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {value ? "替换照片" : isProcessing ? "处理中…" : "上传照片"}
            </button>
            {value ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isProcessing}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                删除照片
              </button>
            ) : null}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className={`mt-3 rounded-2xl border px-4 py-3 text-sm leading-6 ${getFeedbackClassName(feedback.kind)}`}>
            {feedback.message}
          </div>

          <ul className="mt-3 space-y-1 text-xs leading-5 text-slate-500">
            <li>文件大小上限 5MB，系统会自动压缩到更适合本地保存的体积。</li>
            <li>支持上传、替换、删除，刷新页面后仍会保留。</li>
            <li>导出 PDF 时会保留照片显示。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
