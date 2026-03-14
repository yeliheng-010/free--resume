import Link from "next/link";

import { templateOptions, themeOptions } from "@/lib/resume-config";

const templateDetails = {
  classic: {
    title: "Classic",
    description: "单栏结构，抬头集中，适合研发、运营、市场等大多数岗位。",
    bullets: ["信息密度高，阅读路径稳定", "打印友好，接近传统求职简历", "适合强调连续工作经历"],
  },
  modern: {
    title: "Modern",
    description: "左右分栏，侧边栏承载联系方式与技能，适合产品、设计、前端等更看重信息层级的岗位。",
    bullets: ["技能与联系方式更突出", "主内容区更适合展示项目与成果", "视觉层次更强，但仍保持简洁专业"],
  },
} as const;

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(226,232,240,0.72)_26%,rgba(248,250,252,0.96)_58%),linear-gradient(150deg,#f8fafc_0%,#eff6ff_100%)] px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Templates</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Choose the resume style that fits your target role</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              两套模板都保持 ATS-friendly，但在信息密度、版式结构和视觉层级上有明确差异。你可以先挑模板，再进入 Builder 继续编辑。
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              返回首页
            </Link>
            <Link
              href="/builder"
              className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(15,23,42,0.22)] transition hover:bg-slate-800"
            >
              打开 Builder
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {templateOptions.map((template) => {
            const details = templateDetails[template.value];

            return (
              <section
                key={template.value}
                className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="border-b border-slate-200 px-6 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{template.value}</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{details.title}</h2>
                    </div>
                    <Link
                      href={`/builder?template=${template.value}`}
                      className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      使用该模板
                    </Link>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{details.description}</p>
                </div>

                <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-5">
                    {template.value === "classic" ? (
                      <div className="rounded-[20px] border border-slate-200 bg-white px-6 py-6 shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
                        <div className="border-b border-slate-200 pb-4 text-center">
                          <div className="text-2xl font-semibold text-slate-900">ALEX CHEN</div>
                          <div className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-500">Frontend Engineer</div>
                        </div>
                        <div className="mt-5 space-y-4 text-sm text-slate-600">
                          <div>
                            <div className="border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Experience</div>
                            <div className="mt-2 h-3 w-4/5 rounded bg-slate-200" />
                            <div className="mt-2 h-3 w-full rounded bg-slate-100" />
                            <div className="mt-2 h-3 w-11/12 rounded bg-slate-100" />
                          </div>
                          <div>
                            <div className="border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Projects</div>
                            <div className="mt-2 h-3 w-3/4 rounded bg-slate-200" />
                            <div className="mt-2 h-3 w-full rounded bg-slate-100" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid rounded-[20px] border border-slate-200 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.08)] lg:grid-cols-[0.88fr_1.12fr]">
                        <div className="border-r border-slate-200 bg-slate-50 px-4 py-5">
                          <div className="text-xl font-semibold text-slate-900">ALEX CHEN</div>
                          <div className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">Frontend Engineer</div>
                          <div className="mt-5 space-y-2">
                            <div className="h-3 w-5/6 rounded bg-slate-200" />
                            <div className="h-3 w-4/6 rounded bg-slate-100" />
                            <div className="h-3 w-3/5 rounded bg-slate-100" />
                          </div>
                        </div>
                        <div className="px-5 py-5">
                          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Experience</div>
                          <div className="mt-3 h-3 w-4/5 rounded bg-slate-200" />
                          <div className="mt-2 h-3 w-full rounded bg-slate-100" />
                          <div className="mt-2 h-3 w-11/12 rounded bg-slate-100" />
                          <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Projects</div>
                          <div className="mt-3 h-3 w-3/4 rounded bg-slate-200" />
                          <div className="mt-2 h-3 w-full rounded bg-slate-100" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Best For</h3>
                    <div className="mt-3 space-y-3">
                      {details.bullets.map((bullet) => (
                        <div key={bullet} className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-sm leading-6 text-slate-600">
                          {bullet}
                        </div>
                      ))}
                    </div>

                    <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Theme Preview</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {themeOptions.map((theme) => (
                        <Link
                          key={theme.value}
                          href={`/builder?template=${template.value}&theme=${theme.value}`}
                          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          {theme.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

