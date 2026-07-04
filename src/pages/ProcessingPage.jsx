import React,{useEffect,useState} from "react";
import Lottie from "lottie-react";
import doctorAnim from "../assets/doctor.json";
import {useNavigate,useLocation} from "react-router-dom";

const ProcessingPage=()=>{

const navigate=useNavigate();
const location=useLocation();

const patient=
location.state||
JSON.parse(localStorage.getItem("latestPatient"));

const type=patient?.type||"initial";
const symptoms=patient?.symptoms||"Not provided";
const heartRate=patient?.heartRate||"N/A";
const bp=patient?.bp||"N/A";
const oxygen=patient?.oxygen||"N/A";

const [progress,setProgress]=useState({
symptoms:20,
reports:10,
vitals:5
});

const [text,setText]=useState(
"Analyzing Symptoms..."
);

const getRisk=()=>{
if(
Number(oxygen)<95||
Number(heartRate)>100||
bp.includes("150")
)return "HIGH";

if(
Number(oxygen)<97||
Number(heartRate)>85
)return "MEDIUM";

return "LOW";
};
const risk=
type==="initial"
?
"HIGH"
:
getRisk();

useEffect(()=>{
const interval=
setInterval(()=>{
setProgress(prev=>({
symptoms:
Math.min(
prev.symptoms+10,
100
),

reports:
Math.min(
prev.reports+8,
100
),

vitals:
Math.min(
prev.vitals+6,
100
)
}));
},800);
return()=>clearInterval(interval);
},[]);

useEffect(()=>{
const messages=[
"Analyzing Symptoms...",
"Reading Reports...",
"Evaluating Vitals...",
"Generating AI Report..."
];

let i=0;
const interval=
setInterval(()=>{
setText(
messages[i]
);
i=
(i+1)
%
messages.length;
},2000);
return()=>clearInterval(interval);
},[]);

useEffect(()=>{
const timer=
setTimeout(()=>{
const reportData={
...patient,
risk,
symptoms,
heartRate,
bp,
oxygen,
type

};

localStorage.setItem(
"latestPatient",
JSON.stringify(reportData)
);

navigate(
"/report",
{
state:
reportData
}
);},3500);

return()=>clearTimeout(timer);
},[]);

return(

<div className="min-h-screen bg-gray-100 flex justify-center items-start pt-[90px] sm:pt-[100px] md:pt-[85px] px-4 pb-6">
<div className="bg-white w-full max-w-[720px] rounded-3xl shadow-xl p-5 sm:p-6">
<h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
Processing Patient Data
</h2>

<p className="text-center text-gray-500 text-sm sm:text-base mb-6">
{text}
</p>

<div className="flex justify-center mb-6">
<div className="bg-teal-50 rounded-full p-3">
<Lottie
animationData={doctorAnim}
loop
className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40"
/>
</div>
</div>

<div className="space-y-4">
<div>
<p className="text-sm mb-2">
Analyzing Symptoms
</p>
<div className="bg-gray-200 rounded-full h-3">
<div
className="bg-teal-500 h-3 rounded-full"
style={{
width:
`${progress.symptoms}%`
}}
/>
</div>
</div>
<div>

<p className="text-sm mb-2">
Reading Reports
</p>

<div className="bg-gray-200 rounded-full h-3">
<div
className="bg-teal-500 h-3 rounded-full"
style={{
width:
`${progress.reports}%`
}}
/>
</div>
</div>
<div>

<p className="text-sm mb-2">
Evaluating Vitals
</p>

<div className="bg-gray-200 rounded-full h-3">
<div
className="bg-teal-500 h-3 rounded-full"
style={{
width:
`${progress.vitals}%`
}}
/>
</div>
</div>
</div>

<div className="mt-8 text-center">
<p className="text-gray-500 text-sm">
Current AI Prediction:
</p>

<p className={`font-bold text-2xl sm:text-3xl ${
risk==="HIGH"
?
"text-red-500"
:
risk==="MEDIUM"
?
"text-orange-500"
:
"text-green-500"
}`}>
{risk}
</p>
</div>
</div>
</div>
)}
export default ProcessingPage;