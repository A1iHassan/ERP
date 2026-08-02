import axios from "axios"
import type { ActionFunctionArgs } from "react-router"
import { redirect } from "react-router"

export const otpAction = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const otp = formData.get("otp")

	const apiUrl = import.meta.env.API_URL

	try {
		await axios.post(apiUrl + "/auth/otp", { otp }, {
			headers: {
				"Content-Type": "application/json",
			}
		})

		return redirect("/")

	} catch {
		return "OTP Failed"
	}
}
