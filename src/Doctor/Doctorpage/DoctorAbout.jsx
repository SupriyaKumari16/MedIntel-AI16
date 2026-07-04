import { useState } from "react";
import { FaUser,FaGraduationCap } from "react-icons/fa";

export default function DoctorAbout({doctor}){

const [expanded,setExpanded]=useState(false);

return(

<div className="space-y-4">

<div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition">

<div className="flex items-center gap-2 mb-3">

<FaUser className="flex-shrink-0"/>

<h3 className="font-semibold text-base sm:text-lg">
About
</h3>

</div>


<p className="text-sm sm:text-base text-gray-600 leading-6">

{
expanded
?
doctor.about
:
doctor.about?.slice(0,120)+"..."
}

</p>


<button
onClick={()=>setExpanded(!expanded)}
className="text-teal-500 mt-2 text-sm hover:underline"
>

{
expanded
?
"Read Less"
:
"Read More"
}

</button>

</div>




<div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition">

<div className="flex items-center gap-2 mb-3">

<FaGraduationCap className="flex-shrink-0"/>

<h3 className="font-semibold text-base sm:text-lg">
Education
</h3>

</div>


<p className="text-sm sm:text-base text-gray-600 leading-6">

{
doctor.education
}

</p>

</div>

</div>

);

}