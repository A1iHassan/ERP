import { Form } from "react-router"
import { useState } from "react";

const AuthPage = () => {
	const [state, setState] = useState<"login" | "signup">("login")
	return (
		<div className="flex justify-center items-center h-svh">
		<Form method="post"
		  className="flex flex-col justify-center items-center gap-4 border border-slate-50 shadow-lg p-16 rounded-2xl min-w-1/4">
		  <label className="text-2xl font-light self-start" htmlFor="name">Name</label>
		  <input className="outline-none w-full rounded-lg border-2 border-solid border-slate-200 focus:border-slate-400 p-2" type="text" name="name" id="name" placeholder="Enter your name" />
		  <label className="text-2xl font-light self-start" htmlFor="email">Email</label>
		  <input className="outline-none w-full rounded-lg border-2 border-solid border-slate-200 focus:border-slate-400 p-2" type="email" name="email" id="email" placeholder="Enter your email" />
		  <label className="text-2xl font-light self-start" htmlFor="password">Password</label>
		  <input className="outline-none w-full rounded-lg border-2 border-solid border-slate-200 focus:border-slate-400 p-2" type="password" name="password" id="password" placeholder="Enter your password" />
		  <button 
		  type="submit"
		  className="px-5 py-2 rounded-lg border border-slate-200 hover:border-slate-600 hover:bg-slate-600 hover:text-white
			     transition-color duration-200 cursor-pointer mt-10">{state === "login" ? "Log in" : "Sign up"}</button>
		  <span className="text-slate-600 font-light">
		  <input type="text" name="state" id="state" className="hidden" value={state}/>
		    {state === "login" ? "Don't have an account yet?" : "Already have an account"}
		    <span className="text-blue-500 cursor-pointer"
		    	  onClick={() => {setState(prev => prev === "login" ? "signup" : "login")}}
		    >
		      {state === "login" ? " Sign up now" : " Log in"}
		    </span>
		  </span>
		</Form>
		</div>
	)
}

export default AuthPage;
