export default function DoctorHeader({doctor}){

return(

<div className="bg-white/90 backdrop-blur-md border-b px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8 shadow-sm relative">

<div className="flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center">


{/* LEFT */}

<div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">

<img
src={doctor.profileImage}
alt={doctor.name}
className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover border shadow"
/>


<div>

<h1 className="text-xl sm:text-2xl font-bold">

{doctor.name}

</h1>


<p className="text-gray-500 text-sm mt-1">

{doctor.specialization}

</p>



<div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">

<span className="bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 rounded-md text-xs">

{doctor.specialization}

</span>

</div>


</div>

</div>




{/* RIGHT */}

<div className="bg-white shadow-xl border rounded-xl p-4 sm:p-5 w-full sm:w-[280px]">

<div className="border-b pb-3">

<p className="text-lg font-semibold">

{doctor.experience}

</p>

<p className="text-sm text-gray-500">

Experience

</p>

</div>



<div className="pt-3">

<p className="text-lg font-semibold">

₹{doctor.fees}

</p>

<p className="text-sm text-gray-500">

Fees

</p>

</div>


</div>

</div>





{/* CTA */}

<div className="mt-6 flex justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-[120px]">

<button className="shake-cta bg-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-full shadow-2xl hover:bg-teal-600 transition hover:scale-105">

Schedule Consultation

</button>

</div>


</div>

);

}