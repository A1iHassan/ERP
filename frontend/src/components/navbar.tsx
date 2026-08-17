import { Bars2Icon, Bars3Icon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link } from "react-router";

const NavBar = () => {
	const [activeTab, setActiveTab] = useState("Users")
	const mainTabs = [
		{
			name: "Users",
			path: "/users", 
			subTabs: [
				{name: "Employees", path: "/employees"},
				{name: "Shareholders", path: "/shareholders"},
				{name: "Branches", path: "/branches"}
			]
		},
		{
			name: "Accounting",
			path: "/accounting",
			subTabs: [
				{name: "Invoices", path: "/invoices"},
				{name: "Credit Sale", path: "/credit-sale"},
				{name: "Receivables", path: "/receivables"},
				{name: "Store Tab", path: "/store-tab"},
				{name: "Reports", path: "/reports"},
				{name: "Receivables", path: "/receivables"},
				{name: "Receivables", path: "/receivables"},
			]
		},
		{
			name: "Inventory",
			path:"/inventory",
			subTabs: [
				{name: "Employees", path: "/employees"},
				{name: "Shareholders", path: "/shareholders"},
				{name: "Branches", path: "/branches"}
			]
		},
	]
	return <nav className="fixed left-0 h-full bg-red-100 flex">
	  <div>
	    <Bars2Icon width={28} height={28}/>
	    <ul className="flex flex-col gap-4 items-center">
	    {
		    mainTabs.map((tab, index) => (
			    <li key={index} className="" onClick={() => {setActiveTab(tab.name)}}><Link to={{pathname: tab.path}}>{tab.name}</Link></li>
		    ))
	    }
	    </ul>
	  </div>
	  <div>
	    <Bars3Icon width={28} height={28}/>
	    <ul className="flex flex-col gap-4 items-center">
	    {
		    mainTabs.map((item) => (
			    item.subTabs.map((tab, index) => (
				    <li className={`${activeTab === item.name ? "" : "hidden"}`} key={index} ><Link to={{pathname: tab.path}}>{tab.name}</Link></li>
			    ))
		    ))
	    }
	    </ul>
	  </div>
	</nav>
}

export default NavBar;
