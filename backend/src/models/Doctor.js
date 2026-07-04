import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
{
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  name:{
    type:String,
    required:true
  },

  specialization:{
    type:String,
    required:true
  },
  
  education:{
  type:String,
  required:true
},

  experience:{
    type:String,
    required:true
  },

  fees:{
    type:Number,
    required:true
  },

  about:{
    type:String
  },

  profileImage:{
    type:String
  }
},
{
  timestamps:true
}
);

export default mongoose.model(
  "Doctor",
  doctorSchema
);