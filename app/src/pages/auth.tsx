import { useState } from "react";

const Auth = () => {
	const [auth, setAuth] = useState<"login" | "signup">("login")
	return <div className="w-svw h-svh flex justify-center items-center">
	<form
	    className="flex flex-col gap-3 items-start justify-center border border-solid border-slate-300 rounded-2xl p-10"
	  >
	  <label htmlFor="name"
	    className="text-3xl"
	  >Name</label>
	  <input type="text" name="name" placeholder="Enter your name"
	    className="px-3 py-1 outline-none focus:border-slate-400 rounded-lg border-solid border-2 border-slate-200 mb-3"
	    onChange={() => {}}
	  />
	  <label htmlFor="email"
	    className="text-3xl"
	  >Email</label>
	  <input type="text" name="email" placeholder="Enter your email"
	    className="px-3 py-1 outline-none focus:border-slate-400 rounded-lg border-solid border-2 border-slate-200 mb-3"
	    onChange={() => {}}
	  />
	  <label htmlFor="password"
	    className="text-3xl"
	  >Password</label>
	  <input type="text" name="password" placeholder="Chose a strong password"
	    className="px-3 py-1 outline-none focus:border-slate-400 rounded-lg border-solid border-2 border-slate-200 mb-3"
	    onChange={() => {}}
	  />
	  <button onClick={(e) => {
		  e.preventDefault()
	  }}
	    className="cursor-pointer m-auto text-slate-600 text-xl px-5 py-2 rounded-lg hover:bg-slate-600 hover:text-white transition-all duration-200"
	  >
	    {auth === "login" ? "Log in" : "Sign up"}
	  </button>

	  <span className="">
	    {auth === "login" ? "Don't have an account? " : "Already have an account? "}
	    <span className="cursor-pointer"
	      onClick={() => {setAuth(prev => prev === "login" ? "signup" : "login")}}
	    >
	      {auth === "login" ? "Sign up" : "Log in"}
	    </span>
	  </span>

	</form>
	</div>
}

export default Auth;
