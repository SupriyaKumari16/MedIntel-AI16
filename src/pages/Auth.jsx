import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import doctor from "../assets/Doctor.webp";
import bg from "../assets/loginbackground.jpg";

export default function Auth(){

const navigate=useNavigate();

const [isSignup,setIsSignup]=useState(false);
const [name,setName]=useState("");
const [phone,setPhone]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [role,setRole]=useState("patient");
const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

const handleLogin = async () => {

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        role
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful");

    if (data.user.role === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/");
    }

  } catch (error) {

    console.log(error);
    alert("Server Error");

  }

};
const handleSignup = async () => {
  if (!name || !phone || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        password,
        role,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    alert("Account Created Successfully. Please login.");

    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setRole("patient");

    setIsSignup(false);

  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
};



return(

<div
className="min-h-screen flex items-start justify-center bg-cover bg-center relative pt-20 md:pt-24 lg:pt-28 px-4"
style={{backgroundImage:`url(${bg})`}}
>

<div className="relative w-[92%] sm:w-[90%] max-w-[1000px] h-auto lg:h-[610px] bg-transparent rounded-3xl border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.35)] p-2 md:p-4 z-10">

<div className="relative w-full h-full border border-white/10 rounded-[24px] overflow-hidden bg-transparent shadow-[0_20px_80px_rgba(0,0,0,0.25)]">


{/* FORM */}

<div className={`relative lg:absolute top-0 w-full lg:w-1/2 h-auto lg:h-full px-6 md:px-10 lg:px-16 py-8 lg:py-12 transition-all duration-700 ${isSignup?"lg:left-0":"lg:left-1/2"}`}>

{

!isSignup?

<>

<h2 className="text-xl md:text-2xl font-semibold mb-6">

<span className="text-teal-500 font-bold">

MedIntel

</span>

Login

</h2>


<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border rounded-lg p-3 md:p-4 mb-4 w-full text-sm md:text-base bg-white/10"
/>


<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border rounded-lg p-3 md:p-4 mb-4 w-full text-sm md:text-base bg-white/10"
/>


<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="border rounded-lg p-3 md:p-4 mb-6 w-full bg-white/10"
>

<option value="patient">

Patient

</option>

<option value="doctor">

Doctor

</option>

</select>


<button
onClick={handleLogin}
className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-3 rounded-full w-full"
>

Login

</button>


<p className="text-sm mt-6 text-center">

Don't have an account?

<span
onClick={()=>setIsSignup(true)}
className="text-teal-500 ml-1 cursor-pointer"
>

Sign Up

</span>

</p>

</>

:

<>

<h2 className="text-xl md:text-2xl font-semibold mb-6">

<span className="text-teal-500 font-bold">

MedIntel

</span>

Sign Up

</h2>


<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border rounded-lg p-3 md:p-4 mb-4 w-full bg-white/10"
/>


<input
type="text"
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="border rounded-lg p-3 md:p-4 mb-4 w-full bg-white/10"
/>


<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border rounded-lg p-3 md:p-4 mb-4 w-full bg-white/10"
/>


<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border rounded-lg p-3 md:p-4 mb-4 w-full bg-white/10"
/>


<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="border rounded-lg p-3 md:p-4 mb-6 w-full bg-white/10"
>

<option value="patient">

Patient

</option>

<option value="doctor">

Doctor

</option>

</select>


<button
  onClick={handleSignup}
  className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-3 rounded-full w-full"
>
  Create Account
</button>


<p className="text-sm mt-6 text-center">

Already have an account?

<span
onClick={()=>setIsSignup(false)}
className="text-teal-500 ml-1 cursor-pointer"
>

Login

</span>

</p>

</>

}

</div>



{/* DOCTOR PANEL */}

<div className={`hidden lg:block absolute top-0 h-full w-1/2 bg-gradient-to-br from-teal-200 to-teal-400 transition-all duration-700 ${isSignup?"left-1/2":"left-0"}`}>

<div className={`absolute -top-24 w-[420px] h-[300px] bg-white rounded-[120px] ${isSignup?"-right-24":"-left-24"}`}></div>

<div className={`absolute -bottom-32 w-[320px] h-[320px] bg-teal-500 rounded-full ${isSignup?"-right-24":"-left-24"}`}></div>


<div className="relative z-10 p-16">

<h1 className="text-5xl font-bold">

{isSignup?"JOIN":"HELLO"}

<span className="text-teal-500">

{isSignup?" US":"!"}

</span>

</h1>


<p className="mt-4 max-w-[260px]">

{isSignup
?"Create your account to access medical services"
:"Please enter your details to continue"}

</p>

</div>


<img
src={doctor}
alt="doctor"
className={`absolute bottom-0 w-[300px] ${isSignup?"left-0":"right-0"}`}
/>

</div>


</div>

</div>

</div>

);

}