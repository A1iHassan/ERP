import { useQuery} from "@tanstack/react-query";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
	const {data, isLoading} = useQuery({
		queryKey: ['auth'],
		queryFn: async () => {
			const response = await axios.get("http://localhost:8080/auth/me", {
				withCredentials: true,
			})
			console.log(response.data)
			return response
		}
	})
	if (isLoading) return <div>Checking user data...</div>
	return data?.status === 200 ? <Outlet /> : <Navigate to="/auth" replace />
}

export default Protected;
