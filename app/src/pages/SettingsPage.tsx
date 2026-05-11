import { useState } from "react";

export default function SettingsPage() {
  const [autoArchive, setAutoArchive] = useState(true);
  const [currency, setCurrency] = useState("USD");

  const configLinks = [
    { icon: "settings_applications", label: "System Core", active: true },
    { icon: "security", label: "Security Ops" },
    { icon: "notifications_active", label: "Notifications" },
    { icon: "database", label: "Data Retention" },
    { icon: "integration_instructions", label: "API & Webhooks" },
  ];

  const securityItems = [
    {
      icon: "vibration",
      title: "Two-Factor Authentication",
      desc: "Require a secondary verification token for all administrative accounts.",
      action: "Configure",
    },
    {
      icon: "history_toggle_off",
      title: "Session Expiry",
      desc: "Automatically terminate inactive sessions after 30 minutes of idle time.",
      action: "Edit",
    },
    {
      icon: "public",
      title: "IP Whitelisting",
      desc: "Restrict dashboard access to specific trusted corporate networks.",
      badge: "DISABLED",
    },
  ];

  const notifications = [
    { label: "Critical Errors", email: true, sms: false, push: false },
    { label: "Daily Reports", email: true, sms: false, push: true },
    { label: "Asset Movements", email: false, sms: false, push: true },
    { label: "Security Alerts", email: true, sms: true, push: true },
  ];

  const auditLogs = [
    {
      time: "2023-11-24 14:22",
      user: "admin_root",
      userDot: "bg-primary",
      action: "Modified auth_timeout from 60 to 30",
      code: "auth_timeout",
      ip: "192.168.1.12",
    },
    {
      time: "2023-11-24 11:05",
      user: "j_miller_ops",
      userDot: "bg-slate-400",
      action: "Downloaded q4_asset_ledger.pdf",
      code: "q4_asset_ledger.pdf",
      ip: "10.0.0.45",
    },
    {
      time: "2023-11-24 09:12",
      user: "admin_root",
      userDot: "bg-primary",
      action: "Bulk user role update: 24 accounts elevated to Lead Auditor",
      ip: "192.168.1.12",
    },
  ];

  return (
    <div className="pt-8 pb-12 px-12">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">
          Settings
        </h2>
        <p className="text-on-surface-variant max-w-2xl">
          Configure your enterprise environment, security protocols, and
          automated notification workflows from a single architectural control
          center.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Config Links */}
        <div className="col-span-3 space-y-6">
          <div className="bg-surface-container-low p-6 rounded-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
              Configuration
            </h3>
            <ul className="space-y-1">
              {configLinks.map((link, i) => (
                <li key={i}>
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left text-sm ${
                      link.active
                        ? "bg-surface-container-lowest shadow-sm text-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      style={
                        link.active
                          ? { fontVariationSettings: "'FILL' 1" }
                          : undefined
                      }
                    >
                      {link.icon}
                    </span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden group bg-primary rounded-xl p-6 text-on-primary">
            <div className="relative z-10">
              <h3 className="font-bold mb-2">Need Assistance?</h3>
              <p className="text-xs text-on-primary/80 mb-4 leading-relaxed">
                Our technical support architects are available 24/7 for
                enterprise configurations.
              </p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-on-primary border border-white/20 py-2 rounded-lg text-sm font-semibold transition-all">
                Open Support Ticket
              </button>
            </div>
            <span className="absolute -right-4 -bottom-4 text-white/10 material-symbols-outlined text-8xl rotate-12">
              support_agent
            </span>
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="col-span-9 space-y-8">
          {/* System Configuration */}
          <section className="bg-surface-container-low rounded-xl overflow-hidden">
            <div className="px-8 py-6 bg-surface-container flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-on-surface font-headline">
                  System Configuration
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Primary operational parameters for the Atheneum core.
                </p>
              </div>
              <button className="bg-primary text-on-primary px-6 py-2 rounded text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-dim transition-all">
                Save Changes
              </button>
            </div>
            <div className="p-8 grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                    Enterprise Name
                  </label>
                  <input
                    className="w-full bg-surface-container-highest border-none rounded p-3 text-sm focus:ring-1 focus:ring-primary transition-all outline-none"
                    type="text"
                    defaultValue="Atheneum Industrial Group"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                    Operational Timezone
                  </label>
                  <select className="w-full bg-surface-container-highest border-none rounded p-3 text-sm focus:ring-1 focus:ring-primary transition-all outline-none">
                    <option>UTC -05:00 Eastern Time (US &amp; Canada)</option>
                    <option>UTC +00:00 Greenwich Mean Time</option>
                  </select>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                    Currency Format
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: "USD", label: "USD ($)", icon: "payments" },
                      { value: "EUR", label: "EUR (€)" },
                      { value: "GBP", label: "GBP (£)" },
                    ].map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setCurrency(c.value)}
                        className={`flex-1 p-3 rounded text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                          currency === c.value
                            ? "bg-surface-container-lowest border border-primary/20 font-bold text-primary"
                            : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
                        }`}
                      >
                        {c.icon && (
                          <span className="material-symbols-outlined text-sm">
                            {c.icon}
                          </span>
                        )}
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded">
                  <div>
                    <p className="text-sm font-bold">Auto-Archive Logs</p>
                    <p className="text-[10px] text-on-surface-variant">
                      Archive logs older than 90 days automatically.
                    </p>
                  </div>
                  <button
                    onClick={() => setAutoArchive(!autoArchive)}
                    className={`w-11 h-6 rounded-full relative transition-colors ${autoArchive ? "bg-primary" : "bg-slate-300"}`}
                  >
                    <div
                      className={`absolute top-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-all ${autoArchive ? "right-[2px]" : "left-[2px]"}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Security & Notifications */}
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-3 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined">
                    verified_user
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-headline">
                    Security Protocols
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Manage authentication and access control.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                {securityItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 hover:bg-surface-container-low rounded-lg transition-all group"
                  >
                    <span className="material-symbols-outlined text-primary mt-1">
                      {item.icon}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    {item.action ? (
                      <button className="text-xs font-bold text-primary hover:underline">
                        {item.action}
                      </button>
                    ) : (
                      <span className="bg-error-container/20 text-error px-2 py-1 rounded text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 bg-surface-container-high p-8 rounded-xl flex flex-col">
              <h3 className="text-lg font-bold mb-6 font-headline">
                Notifications
              </h3>
              <div className="space-y-5 flex-1">
                {notifications.map((notif, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{notif.label}</span>
                    <div className="flex gap-2">
                      {[
                        { key: "email", icon: "mail", active: notif.email },
                        { key: "sms", icon: "sms", active: notif.sms },
                        {
                          key: "push",
                          icon: "notifications",
                          active: notif.push,
                        },
                      ].map((ch) => (
                        <span
                          key={ch.key}
                          className={`material-symbols-outlined cursor-pointer transition-colors ${
                            ch.active ? "text-primary" : "text-slate-400"
                          }`}
                          style={
                            ch.active
                              ? { fontVariationSettings: "'FILL' 1" }
                              : undefined
                          }
                        >
                          {ch.icon}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Logs */}
          <section className="bg-surface-container-low rounded-xl p-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-xl font-bold font-headline">
                  System Audit Logs
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Traceability and compliance history.
                </p>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-all">
                <span className="material-symbols-outlined text-sm">
                  download
                </span>
                Export CSV
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant px-4">
                <div className="col-span-2">Timestamp</div>
                <div className="col-span-2">User</div>
                <div className="col-span-5">Action</div>
                <div className="col-span-3 text-right">IP Address</div>
              </div>
              {auditLogs.map((log, i) => (
                <div
                  key={i}
                  className="bg-surface p-4 rounded-lg grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-2 text-xs text-on-surface-variant">
                    {log.time}
                  </div>
                  <div className="col-span-2 text-xs font-bold flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${log.userDot}`} />
                    {log.user}
                  </div>
                  <div className="col-span-5 text-xs">
                    {log.code ? (
                      <>
                        {log.action.includes("Modified")
                          ? "Modified "
                          : "Downloaded "}
                        <span className="bg-surface-container-highest px-1.5 py-0.5 rounded text-[10px] font-mono">
                          {log.code}
                        </span>
                        {log.action.includes("from") ? " from 60 to 30" : ""}
                      </>
                    ) : (
                      <>
                        Bulk user role update: 24 accounts elevated to{" "}
                        <span className="text-primary font-bold">
                          Lead Auditor
                        </span>
                      </>
                    )}
                  </div>
                  <div className="col-span-3 text-right text-xs text-on-surface-variant">
                    {log.ip}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-xs font-bold text-on-surface-variant hover:text-on-surface bg-surface-container-highest rounded-lg transition-all">
              View All Activity Logs
            </button>
          </section>
        </div>
      </div>

      {/* Floating Footer */}
      <footer className="fixed bottom-6 right-6 left-72 glass-panel border border-white/20 rounded-2xl p-4 shadow-xl z-50 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-xs font-bold">System Status: Optimal</p>
          </div>
          <div className="h-4 w-[1px] bg-slate-300" />
          <div className="flex gap-4">
            <div className="text-[10px]">
              <span className="text-on-surface-variant block">Uptime</span>
              <span className="font-bold">99.998%</span>
            </div>
            <div className="text-[10px]">
              <span className="text-on-surface-variant block">
                Active Sessions
              </span>
              <span className="font-bold">14</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-xs font-bold text-on-surface hover:bg-surface-container rounded-lg transition-all">
            Discard Changes
          </button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-lg text-xs font-bold shadow-lg shadow-primary/25 hover:bg-primary-dim transition-all">
            Publish Configuration
          </button>
        </div>
      </footer>
    </div>
  );
}
