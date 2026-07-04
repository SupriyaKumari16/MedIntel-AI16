import React,{useEffect,useRef} from "react";
import {FaHeartbeat,FaTint,FaUser} from "react-icons/fa";
import {useLocation,useNavigate} from "react-router-dom";
import gsap from "gsap";

const PatientCasePage=()=>{

const needleRef=useRef(null);
const containerRef=useRef(null);
const navigate=useNavigate();

const patient=
location.state||
JSON.parse(localStorage.getItem("currentPatient"));


useEffect(()=>{

gsap.fromTo(
needleRef.current,
{rotation:0},
{
rotation:
patient?.risk==="LOW"
?
20
:
patient?.risk==="MEDIUM"
?
45
:
65,

duration:1.5,
ease:"power3.out",
transformOrigin:"center bottom"
}
);


gsap.fromTo(
containerRef.current.children,
{
opacity:0,
y:40
},
{
opacity:1,
y:0,
duration:0.8,
stagger:0.15
}
);

},[]);



return(

<div className="min-h-screen bg-[#eef4f7] pt-[90px] sm:pt-[100px] px-4 pb-8 flex justify-center">

<div
ref={containerRef}
className="bg-white w-full max-w-[1100px] rounded-2xl shadow-xl p-4 sm:p-6 space-y-5"
>


<div className="flex flex-col sm:flex-row justify-between gap-4">

<h1 className="text-xl sm:text-2xl font-semibold">

Patient Case

</h1>


<button
onClick={()=>
navigate(
"/doctor-dashboard",
{
state:patient
}
)
}
className="bg-teal-500 text-white px-5 py-2 rounded w-full sm:w-auto"
>

Case Review ✔

</button>

</div>





<div className="bg-[#f5f8fb] rounded-xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

<div className="flex gap-4 items-center">

<img
src="https://i.pravatar.cc/80"
className="w-16 h-16 rounded-full"
/>


<div>

<p className="font-semibold text-lg">

{patient?.name||"Patient"}

</p>


<p className="text-sm text-gray-500">

PT-0935

</p>

</div>

</div>





<div className="space-y-1">

<p><b>Slot:</b> {patient?.slot||"N/A"}</p>

<p><b>Appointment:</b> {patient?.appointmentType||"N/A"}</p>

<p><b>Risk:</b> {patient?.risk}</p>

</div>





<div>

<h3 className="font-semibold mb-2">

Symptoms

</h3>

<p>

{patient?.symptoms||"No symptoms"}

</p>

</div>





<div>

<h3 className="font-semibold mb-2">

Vitals

</h3>


<ul className="space-y-2 text-sm">

<li className="flex gap-2">

<FaHeartbeat/>

{patient?.heartRate||"N/A"} bpm

</li>


<li className="flex gap-2">

<FaTint/>

{patient?.bp||"N/A"}

</li>


<li>

💧 {patient?.oxygen||"N/A"} %

</li>

</ul>

</div>

</div>






<div className="grid grid-cols-1 md:grid-cols-3 gap-5">

<div className="md:col-span-2 space-y-4">


<div className="bg-[#f5f8fb] rounded-xl p-5 text-center">

<p>

Risk Level:

<span className="text-red-500 font-semibold ml-2">

{patient?.risk}

</span>

</p>



<div className="flex justify-center">

<svg
className="w-[180px] sm:w-[250px]"
viewBox="0 0 200 100"
>

<path
d="M20 100 A80 80 0 0 1 180 100"
stroke="#e5e7eb"
strokeWidth="18"
fill="none"
/>


<line
ref={needleRef}
x1="100"
y1="100"
x2="100"
y2="30"
stroke="#333"
strokeWidth="5"
/>

</svg>

</div>

</div>





<div className="bg-[#f5f8fb] p-5 rounded-xl">

<h3 className="font-semibold mb-2">

AI Explanation

</h3>


<p>

Based on:

{patient?.symptoms}

AI predicts:

<b>

{patient?.risk}

</b>

risk.

</p>

</div>


</div>






<div className="bg-[#f5f8fb] rounded-xl p-5">

<h3 className="font-semibold mb-3">

Patient Info

</h3>


<p className="flex gap-2">

<FaUser/>

{patient?.name}

</p>


<p className="mt-2">

Doctor:

{patient?.doctor||"N/A"}

</p>


<p>

Risk:

{patient?.risk}

</p>


<p>

Slot:

{patient?.slot}

</p>


</div>


</div>

</div>

</div>

)

}

export default PatientCasePage;