import React,{
useEffect,
useRef
}
from "react";

import{
FaHeartbeat,
FaVial,
FaXRay,
FaDownload
}
from "react-icons/fa";

import{
useLocation,
useNavigate
}
from "react-router-dom";

import gsap from "gsap";


const ReportPage=()=>{

const needleRef=
useRef(null);

const location=
useLocation();

const navigate=
useNavigate();


const patient=

location.state ||

JSON.parse(

localStorage.getItem(

"latestPatient"

)

);



const type=
patient?.type ||

"initial";


const risk=
patient?.risk ||

"HIGH";


const symptoms=
patient?.symptoms ||

"N/A";


const bp=
patient?.bp ||

"N/A";


const oxygen=
patient?.oxygen ||

"N/A";


const heartRate=
patient?.heartRate ||

"N/A";




useEffect(()=>{

localStorage.setItem(

"latestPatient",

JSON.stringify(

patient

)

);



gsap.fromTo(

needleRef.current,

{

rotation:0

},

{

rotation:

risk==="LOW"

?

20

:

risk==="MEDIUM"

?

45

:

65,

duration:1.5,

transformOrigin:
"center bottom"

}

)


},[]);






const handleDownload=()=>{

const content=`

MEDINTEL REPORT

Symptoms:
${symptoms}

Risk:
${risk}

BP:
${bp}

Oxygen:
${oxygen}

Heart:
${heartRate}

`;


const blob=
new Blob(

[content],

{

type:
"text/plain"

}

);


const url=
URL.createObjectURL(
blob
);


const a=
document.createElement(
"a"
);


a.href=url;

a.download=
"report.txt";

a.click();


};





return(

<div className="
min-h-screen
bg-gradient-to-br
from-[#e0f7f6]
to-[#f5f9ff]
pt-20
px-3
flex
justify-center
">


<div className="
bg-white/70
backdrop-blur-xl
max-w-[1150px]
w-full
rounded-3xl
shadow-xl
p-6
">



<h2 className="
text-2xl
font-semibold
mb-5
">

AI Assessment

</h2>






<div className="
bg-white
rounded-xl
p-5
text-center
mb-5
">

<p>

Risk:

<span className="
text-red-500
font-semibold
">

{

risk

}

</span>

</p>




<div className="
flex
justify-center
">

<svg
className="
w-[250px]
"

viewBox="
0 0 200 100
"
>

<path

d="
M20 100
A80 80
0 0 1
180 100
"

stroke="#ddd"

strokeWidth="18"

fill="none"
/>



<line

ref={needleRef}

x1="100"

y1="100"

x2="100"

y2="30"

stroke="#111"

strokeWidth="5"

/>


</svg>


</div>


</div>







<div className="
grid
md:grid-cols-3
gap-5
">



<div className="
md:col-span-2
space-y-4
">



<div className="
bg-white
rounded-xl
p-5
">

<h3>

AI Explanation

</h3>


<p>

Based on

{

symptoms

}


analysis completed.

</p>


</div>






{

type==="initial"

&&

(

<div>

<h3 className="
font-semibold
">

Suggested Tests

</h3>




{

[

{

icon:
<FaHeartbeat/>,

title:
"ECG"

},

{

icon:
<FaVial/>,

title:
"Blood Test"

},

{

icon:
<FaXRay/>,

title:
"X-Ray"

}

]

.map(

(

item,

i

)=>(

<div

key={i}

className="
bg-white
p-4
rounded-xl
mt-2
flex
gap-4
"

>

{

item.icon

}


{

item.title

}


</div>

)

)

}



</div>

)

}









{

type==="final"

&&

risk==="LOW"

&&

(

<div className="
bg-green-100
p-5
rounded-xl
">

<h3>

Self Care

</h3>


<p>

Rest,
Hydration,
Monitor symptoms

</p>


</div>

)

}










{

type==="final"

&&

risk!=="LOW"

&&

(

<div className="
bg-red-100
p-5
rounded-xl
">

<h3>

Doctor Consultation Required

</h3>




<button

onClick={()=>

navigate(

"/doctor/1",

{

state:

patient

}

)

}

className="
mt-3
bg-teal-500
text-white
px-5
py-2
rounded
"

>

Consult Doctor

</button>



</div>

)

}



</div>







<div className="
bg-white
rounded-xl
p-5
">

<h3>

Patient Info

</h3>



<p>

Symptoms:

{

symptoms

}

</p>



{

type==="final"

&&

<>

<p>

BP:

{

bp

}

</p>



<p>

Heart:

{

heartRate

}

</p>



<p>

Oxygen:

{

oxygen

}

</p>

</>

}



</div>



</div>







<div className="
flex
justify-center
gap-4
mt-6
">

<button

onClick={()=>

navigate("/")

}

className="
bg-teal-500
text-white
px-5
py-2
rounded
"

>

Back Home

</button>





<button

onClick={
handleDownload
}

className="
border
px-5
py-2
rounded
flex
gap-2
"

>

<FaDownload/>

Download

</button>



</div>



</div>


</div>

)

}


export default
ReportPage;