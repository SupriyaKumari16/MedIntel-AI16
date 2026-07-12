import Report from "../models/Report.js";

export const createReport = async (req,res)=>{

try{

const {
  symptoms,
  heartRate,
  bp,
  oxygen,
  reportFile,
  aiAnalysis,
} = req.body;

const report = await Report.create({

  patientId: req.user.id,

  symptoms,

  heartRate,

  bp,

  oxygen,

  reportFile,

  aiAnalysis,

});

res.status(201).json({

message:"Report Submitted Successfully",

report

});

}
catch (error) {

  console.log("REPORT ERROR:");
  console.log(error);

  res.status(500).json({
    message: error.message
  });

}

};
export const getMyReports = async (req,res)=>{

try{

const reports = await Report.find({
  patientId:req.user.id
}).sort({createdAt:-1});

res.status(200).json(reports);

}
catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};