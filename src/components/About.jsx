import React,{useEffect,useRef} from "react";
import {useNavigate} from "react-router-dom";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Stethoscope,Sparkles} from "lucide-react";
import HeroDoctor from "../assets/HeroDoctor.png";
import {textReveal,fadeUp} from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

export default function About(){

const navigate=useNavigate();

const desktopRefs=useRef([]);
const mobileHeadingRef=useRef(null);
const mobileButtonRef=useRef(null);

const desktopImgRef=useRef(null);
const mobileImgRef=useRef(null);

useEffect(()=>{

const isMobile=window.innerWidth<768;

if(isMobile){

if(mobileHeadingRef.current) fadeUp(mobileHeadingRef.current);

if(mobileButtonRef.current) fadeUp(mobileButtonRef.current);

if(mobileImgRef.current) fadeUp(mobileImgRef.current);

}else{

desktopRefs.current.forEach(el=>{

if(el) textReveal(el);

});


if(desktopImgRef.current){

gsap.fromTo(
desktopImgRef.current,
{
opacity:0,
x:120,
scale:.95
},
{
opacity:1,
x:0,
scale:1,
duration:1.6,
ease:"expo.out",
scrollTrigger:{
trigger:desktopImgRef.current,
start:"top 88%",
toggleActions:"play none none none",
once:true
}
}
);

}

}

const ctx=gsap.context(()=>{

// saari animations

});

return()=>ctx.revert();

},[]);



return(

<section id="about" className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">

<div className="absolute inset-0 overflow-hidden pointer-events-none">

<Sparkles className="absolute top-16 left-[12%] text-cyan-300/30 w-16 h-16"/>

<Stethoscope className="absolute bottom-20 left-8 text-cyan-400/20 w-20 h-20"/>

</div>






{/* DESKTOP */}

<div className="hidden md:block relative z-10">

<section className="pt-35 pb-24 px-20">

<div className="max-w-7xl mx-auto grid grid-cols-2 gap-20 items-center">


<div>

<p

ref={(el)=>(desktopRefs.current[0]=el)}

className="text-teal-500 font-extrabold tracking-wide mb-9"

>

~ ABOUT US

</p>



<h2

ref={(el)=>(desktopRefs.current[1]=el)}

className="text-4xl font-bold text-gray-800 leading-snug mb-6"

>

Welcome To Medcare

<br/>

Central Hospital

</h2>




<p

ref={(el)=>(desktopRefs.current[2]=el)}

className="text-gray-600 mb-8"

>

Being healthy is more than just not getting sick.

</p>





<div

ref={(el)=>(desktopRefs.current[3]=el)}

className="grid grid-cols-2 gap-4 mb-8 text-gray-700"

>

<p>✔ Qualified Doctors</p>
<p>✔ Trusted Treatment</p>
<p>✔ 24/7 Emergency</p>
<p>✔ Modern Equipment</p>
<p>✔ AI Report prediction</p>
<p>✔ Video Calling Consult</p>

</div>





<button

ref={(el)=>(desktopRefs.current[4]=el)}

onClick={()=>navigate("/appointment")}

className="bg-teal-400 text-white px-6 py-3 rounded-lg shadow"

>

Book An Appointment

</button>

</div>






<div className="relative flex justify-center">

<div className="absolute w-[400px] h-[270px] bg-[#5fb6b1] rounded-xl top-[-65px] right-25"/>

<div className="absolute w-[400px] h-[270px] bg-[#4f5db8] rounded-xl bottom-8 right-[-90px]"/>



<img

ref={desktopImgRef}

src={HeroDoctor}

alt="Doctor"

className="absolute w-[500px] top-[-260px] left-36 z-10"

/>

</div>


</div>

</section>

</div>








{/* MOBILE */}

<div className="md:hidden relative z-10 px-6 pt-12 pb-16">


<p className="text-teal-500 font-bold text-center mb-8">

~ ABOUT US

</p>




<div className="relative h-[220px] mb-8 flex justify-center">

<div className="absolute top-2 right-12 w-[220px] h-[150px] bg-[#5561c9] rounded-2xl"/>

<div className="absolute top-24 left-12 w-[220px] h-[150px] bg-[#5fb6b1] rounded-2xl"/>



<img

ref={mobileImgRef}

src={HeroDoctor}

alt="Doctor"

className="absolute top-8 left-1/2 -translate-x-1/2 w-[220px] z-10"

/>



<Sparkles className="absolute top-4 left-10 text-cyan-300/30 w-10 h-10"/>

</div>






<h2

ref={mobileHeadingRef}

className="text-[38px] text-center font-bold text-gray-800 leading-tight mb-5"

>

Welcome To Medcare

<br/>

Central Hospital

</h2>





<p className="text-center text-gray-600 mb-8">

Being healthy is more than just not getting sick.

</p>





<div className="grid grid-cols-2 gap-4 text-gray-700 mb-8">

<p>✔ Qualified Doctors</p>
<p>✔ Trusted Treatment</p>

<p>✔ 24/7 Emergency</p>
<p>✔ Modern Equipment</p>

<p>✔ AI Report prediction</p>
<p>✔ Video Calling Consult</p>

</div>






<div className="flex justify-center">

<button

ref={mobileButtonRef}

onClick={()=>navigate("/appointment")}

className="bg-teal-400 text-white px-8 py-4 rounded-xl shadow"

>

Book An Appointment

</button>

</div>



<Stethoscope className="absolute bottom-0 left-0 text-cyan-300/20 w-16 h-16"/>

</div>


</section>

);

}