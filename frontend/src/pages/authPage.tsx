import { Form } from "react-router"

const AuthPage = () => {
	return (
		<div className="flex justify-center items-center h-svh">
		<Form className="flex flex-col justify-center items-start gap-4 border border-slate-50 shadow-lg p-16 rounded-2xl">
		  <label className="text-2xl font-light" htmlFor="name">Name</label>
		  <input className="outline-none rounded-lg border-2 border-solid border-slate-200 focus:border-slate-400 p-2" type="text" name="name" id="name" placeholder="Enter your name" />
		  <label className="text-2xl font-light" htmlFor="email">Email</label>
		  <input className="outline-none rounded-lg border-2 border-solid border-slate-200 focus:border-slate-400 p-2" type="email" name="email" id="email" placeholder="Enter your email" />
		  <label className="text-2xl font-light" htmlFor="password">Password</label>
		  <input className="outline-none rounded-lg border-2 border-solid border-slate-200 focus:border-slate-400 p-2" type="password" name="password" id="password" placeholder="Enter your password" />
		  <button 
		  type="submit"
		  className="px-5 py-2 rounded-lg border border-slate-200 hover:border-slate-600 hover:bg-slate-600 hover:text-white
			     transition-color duration-200 cursor-pointer self-center mt-10">{"button"}</button>
		  <span className="text-slate-600 font-light">
		    this is where users chose to Log in or Sign up
		  </span>
		</Form>
		</div>
	)
}

export default AuthPage;
