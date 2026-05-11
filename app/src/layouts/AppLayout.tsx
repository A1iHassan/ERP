import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/assets", icon: "inventory_2", label: "Assets" },
  { to: "/users", icon: "group", label: "Users" },
  { to: "/statistics", icon: "monitoring", label: "Statistics" },
  { to: "/customization", icon: "tune", label: "Customization" },
  { to: "/settings", icon: "settings", label: "Settings" },
];

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-100 flex flex-col py-6 z-50">
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white">
              architecture
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 font-headline leading-tight">
              Atheneum ERP
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Precision Architect
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded transition-colors duration-200 ${
                  isActive
                    ? "text-blue-700 font-semibold border-r-2 border-blue-700 bg-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-6 pt-6 mt-auto border-t border-slate-200/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg">
                person
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">Marcus Thorne</p>
              <p className="text-[10px] text-on-surface-variant uppercase">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Top Bar */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/50 shadow-sm flex justify-between items-center h-16 px-8">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              search
            </span>
            <input
              className="w-full bg-surface-container-highest/50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-outline outline-none"
              placeholder="Search system entities..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-slate-500">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-slate-500">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <div className="h-8 w-[1px] bg-slate-200 mx-2" />
          <span className="text-xl font-black tracking-tight text-slate-900 font-headline">
            The Precision Architect
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
