import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

import DoctorHeader from "./DoctorHeader";
import DoctorAbout from "./DoctorAbout";
import DoctorSchedule from "./DoctorSchedule";
import FAQSection from "./FAQSection";

import Footer from "../../components/Footer";

export default function DoctorDetailPage(){

const { id } = useParams();

const [doctor,setDoctor] = useState(null);

const [error,setError] = useState("");

useEffect(()=>{

const fetchDoctor = async()=>{

try{

const res = await axios.get(
`${import.meta.env.VITE_API_URL}/api/doctors/${id}`
);

setDoctor(res.data);

}
catch(error){

console.error(
"Doctor Fetch Error:",
error
);

setError("Doctor not found");

}

};

fetchDoctor();

},[id]);

if(!doctor){

return(

<div className="min-h-screen flex justify-center items-center">

Loading Doctor...

</div>

);

}
if(error){

return(

<div className="min-h-screen flex justify-center items-center text-red-500">

{error}

</div>

);

}

return(

<div className="bg-[#f5f6f7] min-h-screen pt-[90px] sm:pt-[100px] md:pt-[90px]">

{/* HEADER */}

<DoctorHeader doctor={doctor}/>

{/* MAIN */}

<div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8">

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

{/* LEFT */}

<div className="space-y-5">

<DoctorAbout doctor={doctor}/>

</div>

{/* RIGHT */}

<div>

<DoctorSchedule doctor={doctor}/>

</div>

</div>

</div>

{/* FAQ */}

<div className="px-4 sm:px-6 md:px-10 lg:px-16">

<FAQSection/>

</div>

{/* FOOTER */}

<Footer/>

</div>

);

}