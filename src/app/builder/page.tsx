import { Suspense } from "react";

import { ResumeBuilderApp } from "@/components/builder/ResumeBuilderApp";

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ResumeBuilderApp />
    </Suspense>
  );
}

