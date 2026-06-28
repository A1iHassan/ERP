const Sales = () => {
  const statusBg: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-800",
    amber: "bg-amber-100 text-amber-800",
    slate: "bg-slate-100 text-slate-800",
  };

  const statusDot: Record<string, string> = {
    emerald: "bg-emerald-600",
    amber: "bg-amber-600",
    slate: "bg-slate-500",
  };
  const assets = [
    {
      name: "MacBook Pro M3 Max",
      desc: "Design Department - 64GB RAM",
      icon: "laptop_mac",
      id: "AST-7729-X",
      category: "Computing",
      status: "Active",
      statusColor: "emerald",
      location: "San Francisco HQ",
      audit: "Oct 12, 2023",
      auditBy: "Verified by J. Smith",
    },
    {
      name: "Dell PowerEdge R750",
      desc: "Server Rack B-12 - Core infra",
      icon: "dns",
      id: "AST-8812-S",
      category: "Infrastructure",
      status: "Maintenance",
      statusColor: "amber",
      location: "New York DC",
      audit: "Jan 05, 2024",
      auditBy: "Overdue 2 days",
    },
    {
      name: "Sony A7 IV Kit",
      desc: "Marketing Studio - 24-70mm Lens",
      icon: "videocam",
      id: "AST-1042-M",
      category: "Media",
      status: "Active",
      statusColor: "emerald",
      location: "Austin Creative Hub",
      audit: "Dec 20, 2023",
      auditBy: "Verified by R. Chen",
    },
    {
      name: "HP LaserJet Enterprise",
      desc: "Finance Wing - 3rd Floor",
      icon: "print",
      id: "AST-3112-O",
      category: "Office Equip.",
      status: "In Storage",
      statusColor: "slate",
      location: "Central Warehouse",
      audit: "Nov 14, 2023",
      auditBy: "Legacy Unit",
    },
    {
      name: "Cisco Meraki MX450",
      desc: "Enterprise Security Gateway",
      icon: "router",
      id: "AST-9921-N",
      category: "Networking",
      status: "Active",
      statusColor: "emerald",
      location: "San Francisco HQ",
      audit: "Feb 01, 2024",
      auditBy: "Verified by T. Hall",
    },
  ];

	return (

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-[11px] font-black uppercase tracking-wider text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    Asset Name
                    <span className="material-symbols-outlined text-xs">
                      arrow_downward
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-on-surface-variant">
                  Asset ID
                </th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-on-surface-variant">
                  Category
                </th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-on-surface-variant">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-on-surface-variant">
                  Location
                </th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-on-surface-variant text-right">
                  Last Audit
                </th>
                <th className="px-8 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {assets.map((asset, i) => (
                <tr
                  key={i}
                  className={`hover:bg-surface transition-colors ${i % 2 === 1 ? "bg-surface-container-low/30" : ""}`}
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">
                          {asset.icon}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">
                          {asset.name}
                        </p>
                        <p className="text-[10px] text-on-surface-variant font-medium">
                          {asset.desc}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-secondary bg-surface-container-highest px-2 py-1 rounded">
                      {asset.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-on-surface">
                      {asset.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${statusBg[asset.statusColor]}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusDot[asset.statusColor]}`}
                      />
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span className="material-symbols-outlined text-sm text-on-surface-variant">
                        location_on
                      </span>
                      {asset.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-xs font-bold text-on-surface">
                      {asset.audit}
                    </p>
                    <p className="text-[10px] text-on-surface-variant">
                      {asset.auditBy}
                    </p>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
	) 
		
}

export default Sales;
