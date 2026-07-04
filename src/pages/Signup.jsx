import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import doctor from "../assets/doctor.png";

export default function Signup() {

const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [role,setRole] = useState("patient");

const handleSignup = (e)=>{
e.preventDefault();
console.log(name,phone,email,password,role);
}

return (

<motion.div
initial={{ x: 150, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
exit={{ x: -150, opacity: 0 }}
transition={{ duration: 0.5 }}
className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600"
>

<div className="w-[90%] max-w-[1500px] h-[750px] bg-white rounded-3xl shadow-2xl flex overflow-hidden">

{/* LEFT SIDE FORM */}

<div className="w-1/2 p-20 flex flex-col justify-center">

<h2 className="text-2xl font-semibold mb-10">
<span className="text-teal-500 font-bold">MedIntel</span> Sign Up
</h2>

<form onSubmit={handleSignup}>

<label className="text-sm text-gray-500">
Full Name
</label>

<input
type="text"
placeholder="Enter your name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border rounded-lg p-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
/>

<label className="text-sm text-gray-500">
Phone Number
</label>

<input
type="tel"
placeholder="Enter phone number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="border rounded-lg p-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
/>

<label className="text-sm text-gray-500">
Email
</label>

<input
type="email"
placeholder="example@gmail.com"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border rounded-lg p-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
/>

<label className="text-sm text-gray-500">
Password
</label>

<input
type="password"
placeholder="********"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border rounded-lg p-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
/>

<label className="text-sm text-gray-500">
Role
</label>

<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="border rounded-lg p-4 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
>
<option value="patient">Patient</option>
<option value="doctor">Doctor</option>
</select>

<button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-4 rounded-full w-full shadow-md hover:opacity-90">
Create Account
</button>

<p className="text-sm text-gray-500 mt-4 text-center">
If you have already registered?
<Link
to="/login"
className="text-teal-500 ml-1 cursor-pointer"
>
Login
</Link>
</p>

</form>

</div>

{/* RIGHT SIDE */}

<div className="w-1/2 relative bg-gradient-to-br from-teal-200 to-teal-400 p-16 overflow-hidden">

<div className="absolute -top-24 -right-24 w-[420px] h-[300px] bg-white rounded-[120px]"></div>

<div className="absolute -bottom-32 -right-24 w-[320px] h-[320px] bg-teal-500 rounded-full"></div>

<div className="relative z-10">

<h1 className="text-6xl font-bold text-gray-800">
JOIN <span className="text-teal-500">US</span>
</h1>

<p className="text-gray-600 mt-4 w-[300px]">
Create your account to access medical services
</p>

</div>

<img
src={doctor}
alt="doctor"
className="absolute bottom-0 left-0 w-[420px] z-10"
/>

</div>

</div>

</motion.div>

  );
}