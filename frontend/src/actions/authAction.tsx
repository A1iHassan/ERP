import axios from "axios";
import { redirect, type ActionFunctionArgs } from "react-router"

export const authenticationAction = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const name = formData.get("name")
	const email = formData.get("email")
	const password = formData.get("password")
	const state = formData.get("state")

	const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080"

	try {
		await axios.post(apiUrl + "/auth/" + state, { name, email, password }, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		})

		const url = new URL(request.url);
    		const redirectTo = url.searchParams.get('redirectTo') || '/';
		return redirect(redirectTo)
	} catch {
		return "Authentication failed"
	}
}
