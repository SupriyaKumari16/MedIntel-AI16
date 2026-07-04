import {useEffect,useRef} from "react";
import {staggerCards} from "../utils/animations";

export default function Stats(){

const cardsRef=useRef([]);

useEffect(()=>{

staggerCards(cardsRef.current);

},[]);

return(

<section
className="hidden md:flex pt-28 pb-0 justify-center relative overflow-hidden z-20 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50"
>

<div
className="p-[4px] bg-teal-500 w-full max-w-[2500px]"
style={{
clipPath:
"polygon(5% 0%,95% 0%,100% 50%,95% 100%,5% 100%,0% 50%)"
}}
>

<div
className="bg-blue-400 text-white py-8 md:py-7 px-6 md:px-10"
style={{
clipPath:
"polygon(5% 0%,95% 0%,100% 50%,95% 100%,5% 100%,0% 50%)"
}}
>

<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-8 gap-x-4 text-center">

{[
{value:"35+",label:"National Awards"},
{value:"125+",label:"Expert Doctors"},
{value:"5k+",label:"Satisfied Patients"},
{value:"8k+",label:"Operation Success"},
{value:"15k+",label:"Medical Departments"},
{value:"300k+",label:"Daily Patients"}
].map((item,index)=>(

<div
key={index}
ref={(el)=>cardsRef.current[index]=el}
className="transition-all duration-300 hover:scale-110 cursor-pointer"
>

<h1 className="text-3xl md:text-4xl font-bold">
{item.value}
</h1>

<p className="text-xs md:text-sm opacity-80 mt-1 leading-tight">
{item.label}
</p>

</div>

))}

</div>

</div>

</div>

</section>

)

}