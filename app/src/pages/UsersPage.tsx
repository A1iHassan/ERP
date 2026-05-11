export default function UsersPage() {
  const users = [
    {
      name: "Elena Vance",
      email: "elena.v@atheneum.io",
      role: "Architecture Lead",
      roleBg: "bg-blue-50 text-blue-700",
      permissions: ["visibility", "edit", "security"],
      status: "Online Now",
      statusColor: "green",
      dotColor: "bg-green-500",
    },
    {
      name: "Julian Kars",
      email: "j.kars@atheneum.io",
      role: "Data Engineer",
      roleBg: "bg-slate-100 text-slate-700",
      permissions: ["visibility", "database"],
      status: "2 hours ago",
      statusColor: "gray",
      dotColor: "bg-surface-dim",
      ip: "from IP 192.168.1.45",
    },
    {
      name: "Xavier Grant",
      email: "x.grant@atheneum.io",
      role: "Compliance Officer",
      roleBg: "bg-purple-50 text-purple-700",
      permissions: ["visibility", "gavel"],
      status: "Suspended",
      statusColor: "red",
      dotColor: "bg-red-500",
    },
    {
      name: "Li Wei",
      email: "li.wei@atheneum.io",
      role: "Security Operative",
      roleBg: "bg-emerald-50 text-emerald-700",
      permissions: ["visibility", "lock_open"],
      status: "Online Now",
      statusColor: "green",
      dotColor: "bg-green-500",
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-10">
      {/* Page Header */}
      <div className="mb-12 pl-12 border-l-2 border-primary-dim">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">
          User Directory
        </h1>
        <p className="text-on-surface-variant max-w-2xl font-body">
          Manage system access hierarchies, audit permission clusters, and
          monitor real-time operative status across the organizational
          architecture.
        </p>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-12 gap-6 mb-12">
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-primary p-2 bg-primary-container/30 rounded-lg">
              group
            </span>
            <span className="text-xs font-bold text-primary bg-primary-container px-2 py-1 rounded">
              +12.5%
            </span>
          </div>
          <div className="text-3xl font-black font-headline">1,284</div>
          <div className="text-sm font-medium text-on-surface-variant">
            Total Managed Users
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-secondary p-2 bg-secondary-container/30 rounded-lg">
              verified_user
            </span>
          </div>
          <div className="text-3xl font-black font-headline">94.2%</div>
          <div className="text-sm font-medium text-on-surface-variant">
            Identity Compliance Score
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-primary p-8 rounded-xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-on-primary/80 text-xs font-bold uppercase tracking-widest mb-4">
              System Load
            </div>
            <div className="text-3xl font-black text-on-primary font-headline">
              Normal
            </div>
            <div className="text-sm text-on-primary/70 mt-2">
              All operative protocols are within architecture limits.
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <span
              className="material-symbols-outlined text-[160px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              architecture
            </span>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-surface-container rounded-2xl p-1 overflow-hidden">
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
          {/* Filter Bar */}
          <div className="px-8 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-surface-container-high/50">
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-surface-container-highest rounded-lg text-sm font-bold flex items-center gap-2 text-on-surface hover:bg-surface-dim transition-colors">
                <span className="material-symbols-outlined text-sm">
                  filter_list
                </span>
                Filter
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface">
                Active
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface">
                Suspended
              </button>
            </div>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-dim transition-all shadow-md active:scale-[0.98]">
              <span className="material-symbols-outlined text-sm">
                person_add
              </span>
              Provision New User
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    User Profile
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Security Role
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Permissions Cluster
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Activity Status
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/30">
                {users.map((user, i) => (
                  <tr
                    key={i}
                    className="hover:bg-surface-container-low/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-lg bg-primary-container/40 flex items-center justify-center text-primary font-bold text-sm">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 ${user.dotColor} border-2 border-white rounded-full`}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-on-surface">
                            {user.name}
                          </div>
                          <div className="text-xs text-on-surface-variant">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded ${user.roleBg} text-[11px] font-bold uppercase tracking-wider`}
                      >
                        {user.role}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex -space-x-2">
                        {user.permissions.map((perm, j) => (
                          <div
                            key={j}
                            className={`w-6 h-6 rounded-full border-2 border-surface-container-lowest flex items-center justify-center ${
                              perm === "security"
                                ? "bg-primary-container"
                                : "bg-surface-container-highest"
                            }`}
                          >
                            <span
                              className={`material-symbols-outlined text-[12px] ${perm === "security" ? "text-primary" : ""}`}
                            >
                              {perm}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {user.status === "Suspended" ? (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="text-xs font-bold text-red-700 uppercase tracking-tighter">
                            Suspended
                          </span>
                        </div>
                      ) : user.ip ? (
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-on-surface-variant">
                            {user.status}
                          </span>
                          <span className="text-[10px] text-outline">
                            {user.ip}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <span className="text-xs font-semibold text-on-surface">
                            {user.status}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant">
                        <span className="material-symbols-outlined">
                          more_vert
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-6 flex items-center justify-between border-t border-surface-container-high/50 bg-surface-container-low/30">
            <span className="text-xs text-on-surface-variant font-medium">
              Showing 1-4 of 1,284 operatives
            </span>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded hover:bg-surface-container-highest text-on-surface-variant disabled:opacity-30">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary text-xs font-bold">
                1
              </button>
              {[2, 3].map((n) => (
                <button
                  key={n}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-highest text-on-surface text-xs font-bold"
                >
                  {n}
                </button>
              ))}
              <span className="text-on-surface-variant px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-highest text-on-surface text-xs font-bold">
                128
              </button>
              <button className="p-2 rounded hover:bg-surface-container-highest text-on-surface-variant">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
