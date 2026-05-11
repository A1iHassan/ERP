import { useState } from "react";

export default function StatisticsPage() {
  const [chartPeriod, setChartPeriod] = useState<string>("W");

  const chartData = [
    { month: "JAN", height: 65 },
    { month: "FEB", height: 45 },
    { month: "MAR", height: 85, active: true },
    { month: "APR", height: 55 },
    { month: "MAY", height: 75 },
    { month: "JUN", height: 40 },
  ];

  const topAssets = [
    {
      name: "Xenon Reactor Unit 4",
      category: "Core Power",
      util: 88,
      yield: "+$124k",
      yieldColor: "text-green-600",
      status: "Optimal",
      statusBg: "bg-green-100 text-green-700",
    },
    {
      name: "Alpha Logistics Fleet",
      category: "Transport",
      util: 95,
      yield: "+$89k",
      yieldColor: "text-green-600",
      status: "Optimal",
      statusBg: "bg-green-100 text-green-700",
    },
    {
      name: "Cryo-Storage Block B",
      category: "Infrastructure",
      util: 42,
      yield: "-$12k",
      yieldColor: "text-error",
      status: "Maintenance",
      statusBg: "bg-error-container text-on-error-container",
    },
  ];

  return (
    <div className="pt-8 pb-12 px-12">
      {/* Page Header */}
      <div className="pl-11 mb-12">
        <h2 className="text-4xl font-headline font-extrabold tracking-tight mb-2">
          Performance Analytics
        </h2>
        <p className="text-on-surface-variant font-body">
          Operational integrity and financial velocity across the ecosystem.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* KPI Cards */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between group hover:shadow-lg transition-shadow duration-300">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 block">
              Asset Utilization
            </span>
            <h3 className="text-5xl font-headline font-black mb-2">94.2%</h3>
            <div className="flex items-center gap-2 text-sm text-green-600 font-bold">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>
              <span>+2.4% vs last quarter</span>
            </div>
          </div>
          <div className="mt-8 h-24 flex items-end gap-1">
            {[40, 55, 35, 94, 50].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm transition-all duration-500 ${
                  i === 3
                    ? "bg-primary"
                    : "bg-surface-container-high group-hover:h-[70%]"
                }`}
                style={{ height: `${i === 3 ? h : h * 0.8}%` }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-surface-container p-8 rounded-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-4 block">
              Financial Velocity
            </span>
            <h3 className="text-5xl font-headline font-black mb-2">$2.4M</h3>
            <p className="text-on-surface-variant text-sm font-medium">
              Monthly Recurring Revenue
            </p>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
            <span className="material-symbols-outlined text-[120px]">
              account_balance_wallet
            </span>
          </div>
          <div className="mt-12 flex justify-between items-center bg-surface-container-lowest/50 p-4 rounded-lg backdrop-blur-sm">
            <span className="text-xs font-semibold">Projected Q4</span>
            <span className="text-sm font-bold text-primary">$8.1M</span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-primary-container p-8 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary-container mb-4 block">
                Active Deployments
              </span>
              <span className="material-symbols-outlined text-on-primary-container">
                rocket_launch
              </span>
            </div>
            <h3 className="text-5xl font-headline font-black text-on-primary-container mb-2">
              1,128
            </h3>
          </div>
          <div className="space-y-3">
            <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-primary rounded-full" />
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase text-on-primary-container">
              <span>Regional Nodes</span>
              <span>75% Capacity</span>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-10 rounded-xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h4 className="text-2xl font-headline font-extrabold mb-1">
                Asset Lifespan Index
              </h4>
              <p className="text-sm text-on-surface-variant">
                Maintenance cycles vs efficiency across 12 product lines.
              </p>
            </div>
            <div className="flex gap-2">
              {["D", "W", "M"].map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg ${
                    chartPeriod === period
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-surface-container"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-64 w-full flex items-end justify-between gap-4">
            <div className="absolute inset-0 border-b border-outline-variant/20 flex flex-col justify-between h-full pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-full h-[1px] bg-outline-variant/10" />
              ))}
            </div>
            {chartData.map((bar, i) => (
              <div
                key={i}
                className="relative group w-full flex flex-col items-center gap-4"
              >
                <div
                  className={`w-full rounded-t-lg transition-all duration-700 ${
                    bar.active
                      ? "bg-primary"
                      : "bg-surface-container-highest group-hover:bg-primary-container"
                  }`}
                  style={{ height: `${bar.height}%` }}
                />
                <span className="text-[10px] font-bold text-on-surface-variant">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-surface-container-highest p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white rounded-lg">
                <span className="material-symbols-outlined text-primary">
                  hub
                </span>
              </div>
              <h4 className="font-bold text-lg">System Health</h4>
            </div>
            <div className="space-y-4">
              {[
                { label: "API Latency", value: "42ms" },
                { label: "Memory Usage", value: "18.4GB" },
                {
                  label: "Uptime",
                  value: "99.99%",
                  valueColor: "text-green-600",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-on-surface-variant">{item.label}</span>
                  <span className={`font-bold ${item.valueColor || ""}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-on-surface text-white text-xs font-bold rounded-lg uppercase tracking-widest hover:opacity-90 transition-all">
              View Logs
            </button>
          </div>
        </div>

        {/* Top Asset Performance Table */}
        <div className="col-span-12 bg-surface-container-low rounded-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center">
            <h4 className="font-headline font-bold text-xl">
              Top Asset Performance
            </h4>
            <button className="text-primary text-sm font-bold flex items-center gap-1">
              Download Report
              <span className="material-symbols-outlined text-sm">
                download
              </span>
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/30">
                {[
                  "Asset Name",
                  "Category",
                  "Utilization",
                  "Yield",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {topAssets.map((asset, i) => (
                <tr
                  key={i}
                  className={`hover:bg-surface-container-highest transition-colors cursor-pointer ${i % 2 === 1 ? "bg-white/40" : ""}`}
                >
                  <td className="px-8 py-5 text-sm font-bold">{asset.name}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">
                    {asset.category}
                  </td>
                  <td className="px-8 py-5 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${asset.util >= 60 ? "bg-primary" : "bg-error"}`}
                          style={{ width: `${asset.util}%` }}
                        />
                      </div>
                      <span>{asset.util}%</span>
                    </div>
                  </td>
                  <td
                    className={`px-8 py-5 text-sm font-bold ${asset.yieldColor}`}
                  >
                    {asset.yield}
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`px-2 py-1 ${asset.statusBg} text-[10px] font-bold uppercase rounded`}
                    >
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
