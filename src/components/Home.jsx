import React,{useEffect,useRef} from "react";
import {useNavigate} from "react-router-dom";
import {gsap} from "gsap";
import {revealLetters} from "../utils/animations";

import bg from "../assets/consult.jpg";
import doctor from "../assets/Doctor.webp";
import patient from "../assets/patient.png";
import location from "../assets/location.png";
import calendar from "../assets/calendar.png";

export default function Home(){

const navigate=useNavigate();
const textRef=useRef([]);
const imgRef=useRef(null);
const welcomeRef=useRef([]);
const headingRef=useRef([]);

useEffect(()=>{

const isMobile=window.innerWidth<768;

if(isMobile)return;

revealLetters(welcomeRef.current);

const tl=gsap.timeline();

tl.fromTo(
headingRef.current,
{
opacity:0,
y:80
},
{
opacity:1,
y:0,
duration:.9,
stagger:.25,
ease:"power4.out"
}
)

.fromTo(
textRef.current[2],
{
opacity:0,
y:30
},
{
opacity:1,
y:0,
duration:.8
},
"-=.4"
)

.fromTo(
textRef.current[3],
{
opacity:0,
y:20
},
{
opacity:1,
y:0,
duration:.6
},
"-=.4"
);



gsap.fromTo(
imgRef.current,
{
opacity:0,
x:120
},
{
opacity:1,
x:40,
duration:1.4,
ease:"power4.out"
}
);

},[]);



return(

<section  id ="home" className="relative min-h-screen overflow-hidden">

<img
src={bg}
className="absolute inset-0 w-full h-full object-cover blur-md opacity-70"
/>

<div className="absolute inset-0 bg-teal-50/50"></div>




<div className="lg:hidden relative z-20 px-5 pt-24 pb-12">

<div className="relative flex justify-center min-h-[320px]">

<div className="absolute top-[-90px] w-[280px] h-[430px] bg-[#58b7b3] rounded-b-[140px] opacity-90"/>

<img
ref={imgRef}
src={doctor}
className="relative z-20 w-[220px] left-[-10px] object-contain"
/>

</div>




<div className="relative mt-[-40px] bg-white shadow-xl rounded-2xl px-4 py-5 z-30 flex justify-between items-center">

<div className="flex-1 text-center">

<img src={patient} className="w-8 mx-auto mb-1"/>

<h3 className="text-blue-700 font-bold text-sm">

Patients

</h3>

</div>


<div className="w-px h-10 bg-gray-300"></div>


<div className="flex-1 text-center">

<img src={location} className="w-8 mx-auto mb-1"/>

<h3 className="text-blue-700 font-bold text-sm">

Accessible

</h3>

</div>


<div className="w-px h-10 bg-gray-300"></div>


<div className="flex-1 text-center">

<img src={calendar} className="w-8 mx-auto mb-1"/>

<h3 className="text-blue-700 font-bold text-sm">

Available

</h3>

</div>

</div>





<div className="text-center mt-10">

<p className="text-2xl font-bold">

{"🛡 WELCOME TO MED INTEL".split("").map((letter,index)=>(

<span
key={index}
ref={(el)=>welcomeRef.current[index]=el}
className="inline-block"
>

{letter===" " ? "\u00A0" : letter}

</span>

))}

</p>



<h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900">

<span ref={(el)=>headingRef.current[0]=el} className="block">

Taking care of

</span>


<span ref={(el)=>headingRef.current[1]=el} className="block">

your health is our

</span>


<span ref={(el)=>headingRef.current[2]=el} className="block">

top priority.

</span>

</h1>



<p
ref={(el)=>(textRef.current[2]=el)}
className="mt-6 text-gray-700"
>

Being healthy is more than just not getting sick.

It includes physical, mental and social well-being.

</p>



<button
ref={(el)=>(textRef.current[3]=el)}
onClick={()=>navigate("/appointment")}
className="mt-8 bg-teal-400 text-white px-8 py-4 rounded-xl"
>

Book Appointment

</button>


</div>

</div>








<div className="hidden lg:flex relative z-20 max-w-[1500px] mx-auto min-h-screen items-center justify-between px-20 pt-10">

<div className="w-1/2">


<p className="flex text-5xl font-bold">

{"🛡 WELCOME TO MED INTEL".split("").map((letter,index)=>(

<span
key={index}
ref={(el)=>welcomeRef.current[index]=el}
className={`inline-block ${index>15?"text-teal-400":"text-blue-700"}`}
>

{letter===" " ? "\u00A0" : letter}

</span>

))}

</p>




<h1 className="mt-6 text-7xl font-bold leading-tight text-gray-900">

<span ref={(el)=>headingRef.current[0]=el} className="block">

Taking care of

</span>


<span ref={(el)=>headingRef.current[1]=el} className="block">

your health is our

</span>


<span ref={(el)=>headingRef.current[2]=el} className="block">

top priority.

</span>

</h1>




<p
ref={(el)=>(textRef.current[2]=el)}
className="mt-8 text-xl text-gray-700"
>

Being healthy is more than just not getting sick.

It includes physical, mental and social well-being.

</p>




<button
ref={(el)=>(textRef.current[3]=el)}
onClick={()=>navigate("/appointment")}
className="mt-10 px-8 py-4 bg-teal-400 text-white rounded-xl shadow-lg"
>

Book Appointment

</button>


</div>





<div className="relative w-1/2 flex justify-center items-end min-h-screen">

<div className="absolute top-[-160px] right-0 w-[560px] h-[980px] bg-[#58b7b3] rounded-b-[320px] opacity-90"/>


<img
ref={imgRef}
src={doctor}
className="relative z-20 w-[540px] left-[15px] object-contain"
/>




<div className="absolute bottom-[10px] left-1/2 -translate-x-[40%] w-[780px] bg-white shadow-xl rounded-2xl px-8 py-8 z-30 flex justify-between items-center">

<div className="flex-1 text-center">

<img src={patient} className="w-12 mx-auto"/>

<h3 className="font-bold text-blue-700">

Patients

</h3>

<p className="text-sm text-gray-600">

More than 10,000 patients trust our services.

</p>

</div>


<div className="w-px h-20 bg-gray-300"></div>


<div className="flex-1 text-center">

<img src={location} className="w-12 mx-auto"/>

<h3 className="font-bold text-blue-700">

Accessible

</h3>

<p className="text-sm text-gray-600">

Available in 15+ locations worldwide.

</p>

</div>


<div className="w-px h-20 bg-gray-300"></div>


<div className="flex-1 text-center">

<img src={calendar} className="w-12 mx-auto"/>

<h3 className="font-bold text-blue-700">

Available

</h3>

<p className="text-sm text-gray-600">

Available 24/7 for your healthcare needs.

</p>

</div>

</div>


</div>


</div>


</section>

);

}