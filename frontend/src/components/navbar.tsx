import { Bars2Icon, Bars3Icon } from "@heroicons/react/16/solid";

const NavBar = () => {
	return <nav className="fixed left-0 h-full bg-red-100 flex">
	  <div>
	    <Bars2Icon width={28} height={28}/>
	    <ul className="flex flex-col gap-4 items-center">
	      <li>tab 1</li>
	      <li>tab 2</li>
	      <li>tab 3</li>
	      <li>tab 4</li>
	    </ul>
	  </div>
	  <div>
	    <Bars3Icon width={28} height={28}/>
	    <ul className="flex flex-col gap-4 items-center">
	      <li>tab 1</li>
	      <li>tab 2</li>
	      <li>tab 3</li>
	      <li>tab 4</li>
	    </ul>
	  </div>
	</nav>
}

export default NavBar;
