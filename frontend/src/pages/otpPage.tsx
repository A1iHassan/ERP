import { useState } from "react";
import { Form } from "react-router";

const OtpForm = () => {
  const [otp, setOtp] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip non-numeric characters and limit to 6 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="h-svh flex justify-center items-center">
    <Form method="post" className="flex flex-col items-center justify-around border-slate-50 shadow-lg rounded-2xl p-10 h-1/2">
      <label htmlFor="otp" className="text-2xl self-start font-light mb-10">OTP Code
        <span className="block text-base text-slate-600 mt-4"
          >Enter the 6 digits code that was sent to your email
	</span>
      </label>
      <input
        type="text"
        name="otp"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="\d{6}"
        maxLength={6}
        value={otp}
        onChange={handleChange}
        placeholder="••••••"
        required
        className="w-full p-4 text-center text-2xl tracking-[1em] outline-none rounded-lg border-2 border-solid border-slate-200 focus:border-slate-400 focus:ring-slate-400 transition-all"
      />
      
      <button 
        type="submit" 
        className="mt-4 w-full px-5 py-2 rounded-lg border border-slate-200 hover:bg-slate-600 hover:text-white transition-colors cursor-pointer"
      >
        Verify OTP
      </button>
    </Form>
    </div>
  );
};

export default OtpForm;
