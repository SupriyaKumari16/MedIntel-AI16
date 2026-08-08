import axios from "axios";
import { useState } from "react";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import { useNavigate,useLocation } from "react-router-dom";

export default function DoctorSchedule({ doctor }){

const navigate=useNavigate();
const location=useLocation();

const patient=
location.state||
JSON.parse(localStorage.getItem("latestPatient"));
console.log("CURRENT PATIENT:", patient);

const [activeTab,setActiveTab]=useState("hospital");
const [selectedDate,setSelectedDate]=useState(0);
const [monthIndex,setMonthIndex]=useState(0);
const [selectedSlot,setSelectedSlot]=useState(null);

const months=[
{name:"May 2026",days:["Tue 05","Wed 06","Thu 07","Fri 08","Sat 09","Sun 10"]},
{name:"June 2026",days:["Mon 01","Tue 02","Wed 03","Thu 04","Fri 05","Sat 06"]}
];

const scheduleData={

hospital:[
{morning:["9 AM","9:30 AM"],afternoon:["2 PM","2:30 PM"]},
{morning:["10 AM"],afternoon:["3 PM"]},
{morning:["11 AM"],afternoon:["4 PM"]},
{morning:["9:15 AM"],afternoon:["2:15 PM"]},
{morning:["10:30 AM"],afternoon:["3:30 PM"]},
{morning:["11:30 AM"],afternoon:["4:30 PM"]}
],

video:[
{morning:["8 AM"],afternoon:["1 PM"]},
{morning:["9 AM"],afternoon:["2 PM"]},
{morning:["10 AM"],afternoon:["3 PM"]},
{morning:["11 AM"],afternoon:["4 PM"]},
{morning:["8:30 AM"],afternoon:["1:30 PM"]},
{morning:["9:30 AM"],afternoon:["2:30 PM"]}
]

};

const currentDays=
months[monthIndex].days;

const slots=
scheduleData[activeTab][selectedDate];

return(

<div className="space-y-5 w-full overflow-hidden">

<div className="flex flex-col sm:flex-row gap-3 justify-between">

<h2 className="text-lg sm:text-xl font-semibold">
Schedule Appointment
</h2>

<button className="bg-teal-500 text-white px-5 py-2 rounded w-full sm:w-auto">
Upload Final Report
</button>

</div>



<div className="flex border rounded overflow-hidden">

<button
onClick={()=>setActiveTab("hospital")}
className={`flex-1 py-2 text-sm ${activeTab==="hospital"?"bg-teal-500 text-white":""}`}
>

Hospital

</button>


<button
onClick={()=>setActiveTab("video")}
className={`flex-1 py-2 text-sm ${activeTab==="video"?"bg-teal-500 text-white":""}`}
>

Video

</button>

</div>




<div className="flex justify-center items-center gap-5">

<button
onClick={()=>setMonthIndex(Math.max(monthIndex-1,0))}
>

<FaChevronLeft/>

</button>


<h3 className="font-medium text-sm sm:text-base">

{months[monthIndex].name}

</h3>


<button
onClick={()=>setMonthIndex(Math.min(monthIndex+1,months.length-1))}
>

<FaChevronRight/>

</button>

</div>






<div className="flex gap-2 overflow-x-auto pb-2 w-full">

{

currentDays.map((d,i)=>(

<button

key={i}

onClick={()=>setSelectedDate(i)}

className={`min-w-[90px] px-4 py-2 rounded border whitespace-nowrap flex-shrink-0 text-sm ${
selectedDate===i
?
"bg-teal-500 text-white"
:
"bg-white"
}`}

>

{d}

</button>

))

}

</div>







<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

{

[...slots.morning,...slots.afternoon]

.map((slot,i)=>(

<button

key={i}

onClick={()=>setSelectedSlot(slot)}

className={`border p-2 rounded text-sm ${
selectedSlot===slot
?
"bg-teal-500 text-white"
:
"bg-white"
}`}

>

{slot}

</button>

))

}

</div>








<button
  onClick={async () => {

    try {

      if (!selectedSlot) {
        alert("Please Select A Slot");
        return;
      }

    const latestReportId = localStorage.getItem("latestReportId");
     const bookedPatient = { ...patient, reportId: latestReportId, doctorId: doctor._id, doctorName: doctor.name || doctor.specialization, slot: selectedSlot, appointmentType: activeTab, status: "pending", };

      const token = localStorage.getItem("token");

     const response = await axios.post( `${import.meta.env.VITE_API_URL}/api/appointments/create`, { doctorId: doctor._id, doctorName: doctor.name || doctor.specialization, slot: selectedSlot, appointmentType: activeTab, reportId: latestReportId, },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

bookedPatient.appointmentId =
  response.data.appointment._id;

alert("Appointment Booked Successfully");

localStorage.setItem(
  "currentPatient",
  JSON.stringify(bookedPatient)
);

navigate("/");

    } catch (error) {

      console.log(error);

      alert("Failed To Book Appointment");

    }

  }}
  className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600"
>
  Schedule Appointment
</button>

</div>

)

}