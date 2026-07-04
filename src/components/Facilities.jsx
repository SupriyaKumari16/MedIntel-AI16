import React,{useRef,useEffect} from "react";
import {FaUserMd,FaShieldAlt,FaAmbulance,FaStethoscope,FaLaptopMedical} from "react-icons/fa";
import {textReveal} from "../utils/animations";

const Facilities=()=>{

const headingRef=useRef(null);
const textRef=useRef(null);

useEffect(()=>{

textReveal(headingRef.current);
textReveal(textRef.current);

},[]);


return(

<section className="w-full bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 py-16 md:py-20 px-6 md:px-10">

<div className="flex flex-col lg:flex-row gap-12 justify-between items-center lg:items-start w-full">


<div className="max-w-[500px] text-center lg:text-left">

<p className="text-teal-500 text-sm font-semibold mb-2">
OUR FACILITIES
</p>


<h2
ref={headingRef}
className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight"
>
Facilities That We Provide
</h2>


<p
ref={textRef}
className="text-gray-500 text-sm md:text-base leading-8 mb-8"
>
MedIntel AI provides secure healthcare support with AI-powered report analysis,
online consultations, emergency assistance, smart health monitoring, and instant medical insights to help patients access faster and more reliable care.
</p>



<div className="bg-white border border-teal-100 rounded-xl p-5 shadow-sm mb-8">

<p className="font-semibold text-teal-600 mb-4">
How MedIntel AI Works
</p>

<div className="space-y-3 text-sm text-gray-600">

<p>1️⃣ Upload reports or symptoms</p>
<p>2️⃣ Receive AI-powered analysis</p>
<p>3️⃣ Connect with healthcare professionals</p>
<p>4️⃣ Get recommendations & ongoing support</p>

</div>

</div>



<button className="border border-teal-500 text-teal-500 px-6 py-2 rounded-lg hover:bg-teal-500 hover:text-white transition">
View All →
</button>

</div>





<div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto justify-end items-center lg:items-start">

<div className="flex flex-col gap-6">

<div className="group bg-gradient-to-br from-teal-400 to-teal-500 text-white p-6 rounded-xl w-[280px] shadow-md hover:shadow-2xl hover:shadow-teal-200/50 hover:-translate-y-3 hover:scale-105 transition-all duration-300">

<div className="bg-white text-teal-500 p-3 rounded-full w-fit mb-3">
<FaLaptopMedical/>
</div>

<h3 className="font-semibold text-lg">
Online Sessions
</h3>

<p className="text-sm mt-2">
Connect with healthcare professionals through secure AI-assisted consultations.
</p>

</div>



<div className="group bg-teal-400 text-white p-6 rounded-xl w-[280px] shadow-md hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-300">

<div className="bg-white text-teal-400 p-3 rounded-full w-fit mb-3">
<FaAmbulance/>
</div>

<h3 className="font-semibold">
Emergency Care
</h3>

<p className="text-sm mt-2">
Quick emergency response with instant medical support.
</p>

</div>

</div>





<div className="flex flex-col gap-6">

{[
{icon:<FaUserMd/>,title:"Instant Operation",desc:"Immediate healthcare support with faster treatment guidance."},
{icon:<FaShieldAlt/>,title:"Private & Secure",desc:"Patient reports and records remain safe and protected."},
{icon:<FaStethoscope/>,title:"Outdoor Service",desc:"Access healthcare services remotely anytime."}
].map((item,index)=>(

<div
key={index}
className="group bg-teal-400 text-white p-6 rounded-xl w-[280px] shadow-md hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-300"
>

<div className="bg-white text-teal-400 p-3 rounded-full w-fit mb-3">
{item.icon}
</div>

<h3 className="font-semibold">
{item.title}
</h3>

<p className="text-sm mt-2">
{item.desc}
</p>

</div>

))}

</div>

</div>

</div>

</section>

)

}

export default Facilities;