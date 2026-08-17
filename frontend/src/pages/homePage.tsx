import { Outlet } from "react-router";
import NavBar from "../components/navbar";

const HomePage = () => {
	return <main className="bg-red-200 h-svh">
	  <NavBar />
	  <Outlet />
	</main>
}

export default HomePage;
