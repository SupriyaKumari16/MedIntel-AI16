import React,{useEffect,useRef} from "react";
import {FaHeart,FaBrain,FaTooth,FaLungs,FaXRay,FaUserMd} from "react-icons/fa";
import dnaImage from "../assets/dna.png";
import {textReveal,staggerCards} from "../utils/animations";

const services=[
{icon:<FaHeart/>,title:"Cardiology"},
{icon:<FaBrain/>,title:"Neurology"},
{icon:<FaTooth/>,title:"Urology"},
{icon:<FaLungs/>,title:"Pulmonary"},
{icon:<FaXRay/>,title:"Radiology"},
{icon:<FaUserMd/>,title:"Hypnotherapy"},
];

export default function Services(){

const headingRef=useRef(null);
const textRef=useRef(null);
const cardsRef=useRef([]);

useEffect(()=>{

textReveal(headingRef.current);
textReveal(textRef.current);
staggerCards(cardsRef.current);

},[]);

return(

<section
  id="services"
  className="bg-gradient-to-br from-[#f7f9fb] via-[#eef8f7] to-[#67e9de] pt-24 pb-16 px-4 sm:px-6 md:px-10 relative overflow-hidden -mt-16"
>

<img
src={dnaImage}
alt="dna"
className="absolute left-[-220px] top-1/2 -translate-y-1/2 w-[850px] opacity-60 pointer-events-none hidden md:block"
/>

<div className="max-w-[1800px] mx-auto">

<div className="text-center mb-12 mt-12">

<p
ref={textRef}
className="text-teal-400 font-semibold mb-2"
>
~ MEDICAL SERVICES ~
</p>

<h2
ref={headingRef}
className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800"
>
Find Out More About Our Services
</h2>

</div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[115px] gap-y-16 justify-items-center lg:ml-[430px]">

{services.map((service,index)=>(

<div
key={index}
ref={(el)=>cardsRef.current[index]=el}
className="group w-full max-w-[300px] lg:w-[300px] aspect-square p-5 rounded-xl transition-all duration-300 cursor-pointer flex flex-col justify-center items-center text-center bg-[#eaf6f5] shadow-md border border-white/50 hover:shadow-2xl hover:bg-[#1f4e8c] hover:text-white hover:-translate-y-3 hover:scale-105"
>

<div className="text-3xl mb-4 text-teal-400 group-hover:text-white transition">

{service.icon}

</div>

<h3 className="text-lg font-semibold mb-2">

{service.title}

</h3>

<p className="text-sm text-gray-600 group-hover:text-white transition">

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat pellentesque aliquam.

</p>

</div>

))}

</div>

</div>

</section>

)

}