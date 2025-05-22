import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

const jwtSecret = process.env.JWT_SECRET || "your_default_secret";

// Register user
export const registerUser = async (req, res) => {
  const { name, email, password, address, phone } = req.body; // <-- added address & phone

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }


    const user = await User.create({
      name,
      email,
      password ,
      address,
      phone, // <-- added here too
    });

    res.status(201).json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.error("Register error:", error.message, error.errors);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("➡️ Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ success: false, message: "User not found" });
    }

    console.log("🔒 Incoming Password:", password);
    console.log("🧂 Hashed Password in DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.error("Login error:", error.message, error.errors);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
