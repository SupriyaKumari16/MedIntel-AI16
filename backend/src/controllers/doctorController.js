import Doctor from "../models/Doctor.js";

export const getAllDoctors = async (req,res) => {

  try {

    const doctors = await Doctor.find();

    res.status(200).json(doctors);

  } catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

};


export const getDoctorById = async (req,res) => {

  try {

    const doctor = await Doctor.findById(
      req.params.id
    );

    if(!doctor){

      return res.status(404).json({
        message:"Doctor Not Found"
      });

    }

    res.status(200).json(doctor);

  } catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

};