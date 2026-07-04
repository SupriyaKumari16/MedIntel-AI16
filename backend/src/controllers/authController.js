import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    });

    // Only for doctor signup:
    // existing Doctor profile is connected automatically using the same name.
    if (role === "doctor") {
      const doctorProfile = await Doctor.findOne({
        name: name.trim(),
      });

      if (!doctorProfile) {
        await User.findByIdAndDelete(user._id);

        return res.status(400).json({
          message:
            "Doctor profile not found. Please use an existing doctor name such as Dr. Diana Ayers.",
        });
      }

      if (doctorProfile.userId) {
        await User.findByIdAndDelete(user._id);

        return res.status(400).json({
          message: "This doctor profile already has a login account.",
        });
      }

      doctorProfile.userId = user._id;
      await doctorProfile.save();
    }

    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== role) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};