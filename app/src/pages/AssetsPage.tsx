import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import assetsApi from "../api/assetsApi";

interface Assets {
	id: number,
	name: string,
	count: number,
}

export default function AssetsPage() {
	const [newAsset, setNewAsset] = useState<Assets>({id: 0, name: "", count: 0})
	console.log(newAsset)
	const [adding, setAdding] = useState<boolean>(false)
	const queryClient = useQueryClient()
	const {data, isLoading, error} = useQuery<Assets[], Error>({
		queryKey: ['assets'],
		queryFn: async () => {
			const response = await assetsApi.get<Assets[]>("/")
			return response.data
		}
	})

	const { mutate: saveNewAsset } = useMutation({
		mutationFn: async () => {
			await assetsApi.post("/", newAsset)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['assets']})
		},
		onError: (error) => {
			console.log(error.message)
		}
	})

	if (isLoading) return <div>Loading data...</div>
	if (error) return <div>Failed fetching data</div>

  return (
    <div className="p-10 space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-semibold mb-2">
            <span className="hover:text-primary cursor-pointer">DASHBOARD</span>
            <span className="material-symbols-outlined text-[10px]">
              chevron_right
            </span>
            <span className="text-primary">ASSETS INVENTORY</span>
          </nav>
          <h2 className="font-headline font-extrabold text-4xl tracking-tight text-on-surface">
            Inventory Management
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-highest text-on-surface font-semibold rounded-md hover:bg-surface-container-high transition-all flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            Export Report
          </button>
          <button 
	  className="px-5 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dim transition-all flex items-center gap-2 text-sm shadow-md shadow-primary/20"
	  onClick={() => {setAdding(prev => !prev)}}
	  >
	{
	    adding
	    ? ("Cancel")
            : 
	    (<>
		<span className="material-symbols-outlined text-lg">add</span>
            New Asset
	     </>
	    )
	  }
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
            Total Assets
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-on-surface">1,284</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              +4%
            </span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-amber-500">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
            In Maintenance
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-on-surface">42</h3>
            <span className="text-xs font-bold text-amber-600">
              Requires Attention
            </span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-blue-400">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
            Deployment Rate
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-on-surface">92.4%</h3>
            <span className="text-xs font-bold text-on-surface-variant">
              Optimal
            </span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-slate-300">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
            Inventory Value
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-on-surface">$240k</h3>
            <span className="text-xs font-bold text-on-surface-variant">
              USD
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
        {/* Filter Bar */}
        <div className="px-8 py-5 flex items-center justify-between border-b border-surface-container-low">
          <div className="flex gap-4">
            {["Status: All", "Category", "Location"].map((label, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-surface-container-low rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {i === 0
                    ? "filter_list"
                    : i === 1
                      ? "category"
                      : "location_on"}
                </span>
                {label}
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto custom-scrollbar">
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
                 Count
                </th>
		<th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-on-surface-variant w-10">
		  Action
		</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
	    <tr className={adding ? `table-row  hover:bg-surface transition-colors bg-surface-container-low/30` : "hidden"}>
	      
	      <td  className="px-8 py-4">
		<input type="text" name="name" id="assetName" 
		className="bg-white rounded outline-none focus:ring-2 focus:ring-slate-400 px-2 py-1"
		 onChange={
		 (e: ChangeEvent<HTMLInputElement>) => {
  			setNewAsset(prev => ({
    	  		...prev,
    	  		name: e.target.value // Correctly updates the specific key based on input 'name' attribute
  	  	}))
		}}
		/>
	      </td>
	      <td className="px-6 py-4" >
	        <input type="number" name="id" id="assetId"
		className="bg-white rounded outline-none focus:ring-2 focus:ring-slate-400 px-2 py-1 w-40"
		onChange={
		 (e: ChangeEvent<HTMLInputElement>) => {
  			setNewAsset(prev => ({
    	  		...prev,
    	  		id: Number(e.target.value) // Correctly updates the specific key based on input 'name' attribute
  	  	}))
		}}
		/>
	      </td>
	      <td  className="px-6 py-4">
		<input type="number" name="count" id="assetCount" 
		 className="bg-white rounded outline-none focus:ring-2 focus:ring-slate-400 px-2 py-1 w-20"
		 onChange={
		 (e: ChangeEvent<HTMLInputElement>) => {
  			setNewAsset(prev => ({
    	  		...prev,
    	  		count: Number(e.target.value) // Correctly updates the specific key based on input 'name' attribute
  	  	}))
		}}
		/>
	      </td>
	       
	      <td  className="px-8 py-4">
	        <button
		  onClick={() => saveNewAsset()}
		>
		  <span className="material-symbols-outlined text-sm">
		    save
		  </span>
		</button>
	      </td>
	    </tr>
              {data?.map((asset, i) => (
                <tr
                  key={i}
                  className={`hover:bg-surface transition-colors ${i % 2 === 1 ? "bg-surface-container-low/30" : ""}`}
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                        <p className="text-sm font-bold text-on-surface">
                          {asset.name}
                        </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-secondary bg-surface-container-highest px-2 py-1 rounded">
                      {asset.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-on-surface">
                      {asset.count}
                    </span>
                  </td>
		  <td>
		    <span className="material-symbols-outlined">
		      more_vert
		    </span>
		  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-5 border-t border-surface-container-low flex justify-between items-center bg-surface-container-lowest">
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-bold text-xs">
              1
            </button>
            {[2, 3].map((n) => (
              <button
                key={n}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-low font-bold text-xs text-on-surface-variant"
              >
                {n}
              </button>
            ))}
            <span className="w-8 h-8 flex items-center justify-center text-xs text-on-surface-variant">
              ...
            </span>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-low font-bold text-xs text-on-surface-variant">
              12
            </button>
          </div>
          <div className="flex gap-3">
            <button className="px-3 py-1.5 border border-outline-variant/30 rounded text-xs font-bold text-on-surface-variant hover:bg-surface transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                chevron_left
              </span>{" "}
              Previous
            </button>
            <button className="px-3 py-1.5 border border-outline-variant/30 rounded text-xs font-bold text-on-surface-variant hover:bg-surface transition-colors flex items-center gap-1">
              Next{" "}
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary-dim rounded-xl p-8 text-on-primary flex justify-between items-center relative overflow-hidden group shadow-lg">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,1)_1px,_transparent_0)] [background-size:20px_20px]" />
          <div className="relative z-10 space-y-3">
            <h4 className="text-2xl font-black tracking-tight leading-tight">
              Generate Quarterly
              <br />
              Asset Health Report
            </h4>
            <p className="text-sm text-primary-fixed/80 max-w-sm">
              Detailed analysis of depreciation, maintenance costs, and
              lifecycle projection for current infrastructure.
            </p>
            <button className="mt-4 px-6 py-2.5 bg-white text-primary font-bold rounded-lg text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Compile Executive Summary
            </button>
          </div>
          <div className="relative z-10 hidden md:block">
            <span className="material-symbols-outlined text-[120px] opacity-20">
              analytics
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm space-y-4 border border-outline-variant/5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black uppercase tracking-widest text-on-surface-variant">
              Recent Activity
            </h4>
            <span className="material-symbols-outlined text-on-surface-variant text-lg">
              history
            </span>
          </div>
          <div className="space-y-4">
            {[
              {
                color: "bg-blue-500",
                title: "Audit Completed",
                desc: "San Francisco HQ inventory verified by Marcus K.",
                time: "2 hours ago",
              },
              {
                color: "bg-amber-500",
                title: "Maintenance Alert",
                desc: "Server AST-8812-S reported fan failure.",
                time: "5 hours ago",
              },
              {
                color: "bg-emerald-500",
                title: "Asset Onboarded",
                desc: "50 new MacBook Air M3 units added to stock.",
                time: "Yesterday",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-[3px] h-auto ${item.color} rounded-full`} />
                <div>
                  <p className="text-xs font-bold text-on-surface">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-on-surface-variant">
                    {item.desc}
                  </p>
                  <p className="text-[10px] font-semibold text-primary mt-1">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
