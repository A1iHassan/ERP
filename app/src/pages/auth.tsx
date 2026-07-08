import { useState } from "react";

const Auth = () => {
	const [auth, setAuth] = useState<"login" | "signup">("login")
	return <form
	    className="flex flex-col items-center justify-center"
	  >
	  <label htmlFor="name">Name</label>
	  <input type="text" name="name" placeholder="Enter your name"
	    className=""
	    onChange={() => {}}
	  />
	  <label htmlFor="email">Email</label>
	  <input type="text" name="email" placeholder="Enter your email"
	    className=""
	    onChange={() => {}}
	  />
	  <label htmlFor="password">Password</label>
	  <input type="text" name="password" placeholder="Chose a strong password"
	    className=""
	    onChange={() => {}}
	  />
	  <button onClick={(e) => {
		  e.preventDefault()
	  }}
	    className="cursor-pointer"
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
}

export default Auth;
