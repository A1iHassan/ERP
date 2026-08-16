import { Bars2Icon, Bars3Icon } from "@heroicons/react/16/solid";
import { Link } from "react-router";

const NavBar = () => {
	const mainTabs = [
		{name: "Users", path: "/users"},
		{name: "Accounting", path: "/accounting"},
		{name: "Inventory", path: "/inventory"},
	]
	const subTabs = [
		{name: "", path: ""},
		{name: "", path: ""},
		{name: "", path: ""},
	] 
	return <nav className="fixed left-0 h-full bg-red-100 flex">
	  <div>
	    <Bars2Icon width={28} height={28}/>
	    <ul className="flex flex-col gap-4 items-center">
	    </ul>
	    {
		    mainTabs.map((tab, index) => (
			    <li key={index} className=""><Link to={{pathname: tab.path}}>{tab.name}</Link></li>
		    ))
	    }
	  </div>
	  <div>
	    <Bars3Icon width={28} height={28}/>
	    <ul className="flex flex-col gap-4 items-center">
	    {
		    subTabs.map((tab, index) => (
			    <li key={index} className=""><Link to={{pathname: tab.path}}>{tab.name}</Link></li>
		    ))
	    }
	    </ul>
	  </div>
	</nav>
}

export default NavBar;
