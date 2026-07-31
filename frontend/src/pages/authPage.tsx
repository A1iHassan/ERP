import { Form } from "react-router"

const AuthPage = () => {
	return (
		<Form>
		  <label htmlFor="name">Name</label>
		  <input type="text" name="name" id="name" placeholder="Enter your name" />
		  <label htmlFor="email">Email</label>
		  <input type="email" name="email" id="email" placeholder="Enter your email" />
		  <label htmlFor="password">Password</label>
		  <input type="password" name="password" id="password" placeholder="Enter your password" />
		</Form>
	)
}

export default AuthPage;
