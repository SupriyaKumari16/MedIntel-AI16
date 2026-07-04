import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
{
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    symptoms:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        default:"pending"
    }

},
{
    timestamps:true
}
);

export default mongoose.model("Case",caseSchema);