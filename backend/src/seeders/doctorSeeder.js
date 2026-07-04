import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Doctor from "../models/Doctor.js";

dotenv.config();

connectDB();

const doctors = [

{
name:"Dr. Diana Ayers",
specialization:"Cardiologist",
education:"MBBS, MD Cardiology",
experience:"25 Years",
fees:1500,
about:"Experienced Cardiologist",
profileImage:"https://randomuser.me/api/portraits/women/44.jpg"
},

{
name:"Dr. Tracy Mckay",
specialization:"Cardiologist",
education:"MBBS, DM Cardiology",
experience:"18 Years",
fees:1200,
about:"Heart Specialist",
profileImage:"https://randomuser.me/api/portraits/women/65.jpg"
},

{
name:"Dr. Jeffrey Davis",
specialization:"Cardiologist",
education:"MBBS, MD Medicine",
experience:"20 Years",
fees:1800,
about:"Senior Cardiologist",
profileImage:"https://randomuser.me/api/portraits/men/32.jpg"
}

];

const seedDoctors = async () => {

try{

await Doctor.deleteMany();

await Doctor.insertMany(doctors);

console.log("Doctors Seeded ✅");

process.exit();

}
catch(error){

console.log(error);

process.exit(1);

}

};

seedDoctors();