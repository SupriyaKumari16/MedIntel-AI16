import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
{
  patientId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
},

doctorId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Doctor",
  required:true
},

  doctorName:{
    type:String,
    required:true
  },

  slot:{
    type:String,
    required:true
  },

  appointmentType:{
    type:String,
    enum:["hospital","video"],
    required:true
  },

  reportId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Report"
  },

  status:{
    type:String,
    enum:[
      "pending",
      "accepted",
      "completed",
      "cancelled"
    ],
    default:"pending"
  }

},
{
  timestamps:true
}
);

export default mongoose.model(
  "Appointment",
  appointmentSchema
);