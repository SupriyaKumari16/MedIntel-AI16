import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({autoRefreshEvents:"load,DOMContentLoaded"});
gsap.defaults({
  overwrite: "auto",
});
ScrollTrigger.defaults({
  fastScrollEnd: true,
  invalidateOnRefresh: true,
});

export const fadeUp=(el)=>{

if(!el)return;

const isMobile=window.innerWidth<768;

gsap.fromTo(
el,
{
opacity:0,
y:isMobile?40:80,
willChange: "transform, opacity",
force3D: true,
},
{
opacity:1,
y:0,
duration:isMobile?.7:1,
ease:"power3.out",
clearProps:"willChange",
scrollTrigger:{
trigger:el,
start:"top bottom-=100",
once:true,
}
}
);

};



export const staggerCards=(cards)=>{

if(!cards?.length)return;

const isMobile=window.innerWidth<768;

gsap.fromTo(
cards,
{
opacity:0,
y:isMobile?20:30,
scale:.98,
willChange: "transform, opacity",
force3D: true,
},
{
opacity:1,
y:0,
scale:1,
duration:isMobile?.45:.55,
stagger:.06,
ease:"power2.out",
clearProps:"willChange",
scrollTrigger:{
trigger:cards[0],
start:"top bottom-=50",
once:true,
}
}
);

};



export const revealLetters=(letters)=>{

if(!letters?.length)return;

gsap.fromTo(
letters,
{
opacity:0,
y:80,
rotateX:50
},
{
opacity:1,
y:0,
rotateX:0,
duration:.9,
stagger:.06,
ease:"power3.out",
scrollTrigger:{
trigger:letters[0],
start:"top 95%",
once:true
}
}
);

};



export const revealWords=(words)=>{

if(!words?.length)return;

gsap.fromTo(
words,
{
opacity:0,
y:40
},
{
opacity:1,
y:0,
duration:.9,
stagger:.1,
ease:"power3.out",
scrollTrigger:{
trigger:words[0],
start:"top 95%",
once:true
}
}
);

};



export const maskReveal=(el)=>{

if(!el)return;

gsap.fromTo(
el,
{
clipPath:"inset(0 100% 0 0)",
opacity:0
},
{
clipPath:"inset(0 0% 0 0)",
opacity:1,
duration:1,
ease:"power3.out",
scrollTrigger:{
trigger:el,
start:"top 90%",
once:true
}
}
);

};



export const textReveal=(el)=>{

if(!el)return;

const isMobile=window.innerWidth<768;

gsap.fromTo(
el,
{
opacity:0,
y:isMobile?40:120,
willChange: "transform, opacity",
force3D: true,
},
{
opacity:1,
y:0,
duration:isMobile?.65:1.1,
ease:"power2.out",
clearProps:"willChange",
scrollTrigger:{
trigger:el,
start:"top bottom-=100",
once:true,
}
}
);

};



export const hoverCard=(card)=>{

if(!card)return;

card.addEventListener("mouseenter",()=>{

gsap.to(
card,
{
  overwrite: true,
y:-10,
scale:1.03,
duration:.35,
ease:"power2.out"
}
);

});



card.addEventListener("mouseleave",()=>{

gsap.to(
card,
{
  overwrite: true,
y:0,
scale:1,
duration:.35,
ease:"power2.out"
}
);

});

};



// setTimeout(()=>{

// ScrollTrigger.refresh();

// },500);