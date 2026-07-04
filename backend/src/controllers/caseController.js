import Case from "../models/Case.js";

// CREATE CASE

export const createCase = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      symptoms,
      address,
      age
    } = req.body;

    const newCase = await Case.create({

      patientId: req.user.id,
      name,
      email,
      phone,
      symptoms,
      address,
      age

    });

    res.status(201).json({
      message: "Case Created",
      case: newCase
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// GET MY CASES

export const getMyCases = async (req, res) => {

  try {

    const cases = await Case.find({
      patientId: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(cases);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};