import React,{useRef,useEffect} from "react";
import {FaQuoteLeft,FaChevronLeft,FaChevronRight} from "react-icons/fa";
import {textReveal} from "../utils/animations";

const Testimonial=()=>{

const headingRef=useRef(null);
const cardsRef=useRef([]);
const mobileScrollRef=useRef(null);

const data=[
{quote:"This platform has been a game-changer for my health journey.",author:"Sarah Johnson",role:"Patient"},
{quote:"I’ve learned more about my body in a month than in years.",author:"Priya Patel",role:"Patient"},
{quote:"The experience is smooth and the guidance is very helpful.",author:"Maria Garcia",role:"Patient"},
{quote:"Amazing support and clean interface. Loved it!",author:"Neha Sharma",role:"Patient"},
{quote:"Highly professional doctors and very helpful staff.",author:"Rohit Mehta",role:"Patient"},
];

useEffect(()=>{

textReveal(headingRef.current);

},[]);



const scroll=(dir)=>{
mobileScrollRef.current?.scrollBy({
left:dir==="left"?-320:320,
behavior:"smooth"
});
};



return(

<section className="bg-[#e6f4f1] overflow-hidden py-16 md:py-20 px-4 sm:px-6">

<div className="text-center mb-12 md:mb-14">

<h2
ref={headingRef}
className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3"
>
What Our Patients Say
</h2>

<div className="w-20 md:w-24 h-1 bg-teal-500 mx-auto rounded-full"/>

</div>



{/* DESKTOP */}

<div className="hidden lg:flex gap-6 sm:gap-8 md:gap-10 justify-center">

{data.map((item,index)=>{

const isBig=index%2===0;

return(

<div
key={index}

className={`
${isBig?"w-[340px] h-[340px]":"w-[300px] h-[300px]"}
bg-white
rounded-2xl
p-5 sm:p-6
shadow-[0_20px_60px_rgba(0,0,0,0.15)]
hover:shadow-[0_35px_90px_rgba(0,0,0,0.22)]
transition-all
duration-500
hover:-translate-y-2
hover:scale-[1.03]
flex
flex-col
justify-between
cursor-pointer
`}
>

<div>

<FaQuoteLeft className="text-teal-400 text-xl sm:text-2xl opacity-30 mb-4"/>

<p className="text-gray-700 italic text-sm sm:text-base leading-relaxed">
"{item.quote}"
</p>

</div>



<div className="flex items-center mt-6">

<div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
{item.author.charAt(0)}
</div>



<div className="ml-3">

<p className="font-semibold text-gray-900 text-sm sm:text-base">
{item.author}
</p>

<p className="text-xs sm:text-sm text-gray-500">
{item.role}
</p>

</div>

</div>

</div>

);

})}

</div>




{/* MOBILE */}

<div className="lg:hidden">

<div
ref={mobileScrollRef}
className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4 px-2"
>

{data.map((item,index)=>(

<div
key={index}
className="w-[220px] sm:w-[240px] h-[340px] sm:h-[360px] bg-white rounded-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col justify-between flex-shrink-0 snap-center transition-all duration-500 hover:scale-[1.02]"
>

<div>

<FaQuoteLeft className="text-teal-400 text-2xl opacity-30 mb-4"/>

<p className="text-gray-700 italic leading-relaxed">
"{item.quote}"
</p>

</div>



<div className="flex items-center">

<div className="h-11 w-11 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-600">
{item.author.charAt(0)}
</div>



<div className="ml-3">

<p className="font-semibold">
{item.author}
</p>

<p className="text-sm text-gray-500">
{item.role}
</p>

</div>

</div>

</div>

))}

</div>




<div className="flex justify-center gap-4 mt-6">

<button
onClick={()=>scroll("left")}
className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-teal-600 hover:scale-110 transition"
>

<FaChevronLeft/>

</button>



<button
onClick={()=>scroll("right")}
className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-teal-600 hover:scale-110 transition"
>

<FaChevronRight/>

</button>

</div>

</div>

</section>

);

};

export default Testimonial;
