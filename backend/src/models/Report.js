import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(

{
  patientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  symptoms:{
    type:String,
    required:true
  },

  heartRate:{
    type:String,
    default:"N/A"
  },

  bp:{
    type:String,
    default:"N/A"
  },

  oxygen:{
    type:String,
    default:"N/A"
  },

  reportFile:{
    type:String,
    default:""
  },

  riskLevel:{
    type:String,
    default:"pending"
  },

  status:{
    type:String,
    default:"submitted"
  }

},

{
  timestamps:true
}

);

export default mongoose.model(
  "Report",
  reportSchema
);