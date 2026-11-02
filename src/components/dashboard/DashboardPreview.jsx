import { LayoutDashboard, Receipt, Sparkles, RefreshCw, Tag } from 'lucide-react'
import AccountingPanel from './AccountingPanel.jsx'
import NewsPanel from './NewsPanel.jsx'
import PriceListPanel from './PriceListPanel.jsx'
import AiPanel from './AiPanel.jsx'
import TrendPanel from './TrendPanel.jsx'

const tabs = [
  { label: 'داشبورد', icon: LayoutDashboard, active: true },
  { label: 'حسابداری', icon: Receipt },
  { label: 'نرخ‌نامه', icon: Tag },
  { label: 'هوش مصنوعی', icon: Sparkles },
]

export default function DashboardPreview() {
  return (
    <div className="relative">
      {/* Ambient glow behind the panel */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,138,36,0.28),transparent_65%)] blur-2xl"
      />

      <div className="[perspective:2200px]">
        <div className="edge-glow rounded-[26px] border border-white/10 bg-white/[0.04] p-1.5 shadow-panel transition-transform duration-700 ease-out lg:[transform:rotateX(6deg)] lg:hover:[transform:rotateX(0deg)]">
          <div className="overflow-hidden rounded-[20px] border border-white/[0.06] bg-navy">
            {/* Window chrome */}
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="size-2 rounded-full bg-white/15" />
                </div>
                <div className="hidden items-center gap-1 sm:flex">
                  {tabs.map((tab) => (
                    <span
                      key={tab.label}
                      className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-medium transition-colors ${
                        tab.active ? 'bg-brand/15 text-brand' : 'text-muted/70'
                      }`}
                    >
                      <tab.icon className="size-3" />
                      {tab.label}
                    </span>
                  ))}
                </div>
              </div>
              <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-muted/80">
                panel.netyar.ir
              </span>
            </div>

            {/* Panels */}
            <div className="grid grid-cols-1 gap-2.5 p-2.5 sm:grid-cols-2 sm:p-3 lg:grid-cols-12">
              <AccountingPanel className="sm:col-span-1 lg:col-span-5" />
              <div className="space-y-2.5 lg:col-span-4">
                <NewsPanel />
                <PriceListPanel className="hidden lg:block" />
              </div>
              <AiPanel className="sm:col-span-1 lg:col-span-3" />
              <TrendPanel className="hidden sm:col-span-2 lg:col-span-3 lg:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating status chips */}
      <div className="animate-float-slow pointer-events-none absolute -top-5 start-6 hidden items-center gap-2 rounded-2xl border border-white/10 bg-navy-2/90 px-3 py-2 text-[11px] font-medium text-white shadow-panel backdrop-blur lg:flex">
        <span className="grid size-6 place-items-center rounded-lg bg-brand/15 text-brand">
          <Sparkles className="size-3.5" />
        </span>
        گزارش‌گیری خودکار
      </div>
      <div className="animate-float pointer-events-none absolute -bottom-5 end-8 hidden items-center gap-2 rounded-2xl border border-white/10 bg-navy-2/90 px-3 py-2 text-[11px] font-medium text-white shadow-panel backdrop-blur lg:flex">
        <span className="grid size-6 place-items-center rounded-lg bg-emerald-400/12 text-emerald-300">
          <RefreshCw className="size-3.5" />
        </span>
        همیشه به‌روز
      </div>
    </div>
  )
}
