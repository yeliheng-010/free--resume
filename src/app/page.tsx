import Link from "next/link";

const featureCards = [
  {
    title: "多版本管理",
    description: "针对前端、产品、设计等不同岗位保存多份简历版本，切换时保留各自模板与主题设置。",
  },
  {
    title: "实时 A4 预览",
    description: "编辑区与预览区同步更新，导出前就能看到更接近真实打印稿的排版效果。",
  },
  {
    title: "JSON 备份迁移",
    description: "支持导入 / 导出 JSON 简历数据，方便跨设备备份、恢复或共享简历内容。",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(226,232,240,0.72)_26%,rgba(248,250,252,0.96)_58%),linear-gradient(150deg,#f8fafc_0%,#eff6ff_100%)]">
      <section className="relative mx-auto max-w-[1280px] px-6 pb-20 pt-8 lg:px-10">
        <div className="rounded-[32px] border border-white/70 bg-white/80 px-6 py-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur xl:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Free Resume Builder</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">
                A focused resume workspace for building tailored job-ready resumes
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                免费在线简历生成器，支持实时预览、模板切换、主题色、语言切换、多版本管理与 JSON 数据备份。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/builder"
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(15,23,42,0.22)] transition hover:bg-slate-800"
              >
                进入 Builder
              </Link>
              <Link
                href="/templates"
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                浏览模板
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(160deg,rgba(15,23,42,0.96),rgba(30,41,59,0.94))] p-7 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Why It Feels Different</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Resume versions by role</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">为同一个人维护多份针对不同岗位的简历，而不是反复覆盖一份内容。</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Theme + template + language</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">模板、主题和中英文输出可以组合使用，适配不同投递渠道和岗位场景。</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">A4-first preview</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">在编辑阶段就尽量接近真实打印稿，减少导出后再返工调格式的时间。</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Portable JSON data</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">支持 JSON 导入导出，适合备份、迁移设备，或者给后续服务端版本做数据基础。</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_46px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Product Highlights</p>
              <div className="mt-5 space-y-4">
                {featureCards.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5">
              <div className="text-3xl font-semibold tracking-tight text-slate-950">2</div>
              <div className="mt-2 text-sm font-medium text-slate-700">专业模板</div>
              <p className="mt-1 text-sm leading-6 text-slate-500">Classic 与 Modern 两套模板，保持 ATS-friendly，同时保持视觉差异。</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5">
              <div className="text-3xl font-semibold tracking-tight text-slate-950">3</div>
              <div className="mt-2 text-sm font-medium text-slate-700">主题色</div>
              <p className="mt-1 text-sm leading-6 text-slate-500">内置 Slate、Emerald、Amber 三套简洁专业主题色，可实时切换。</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5">
              <div className="text-3xl font-semibold tracking-tight text-slate-950">100%</div>
              <div className="mt-2 text-sm font-medium text-slate-700">前端可用</div>
              <p className="mt-1 text-sm leading-6 text-slate-500">不依赖复杂外部服务，核心能力都能在浏览器端直接使用。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

