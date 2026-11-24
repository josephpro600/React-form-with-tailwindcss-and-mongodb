
const express = require("express");
const router = express.Router();

const User = require("../models/User");

// POST: Create a new user
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, age, course } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !course) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields"
      });
    }

    // Create user
    const newUser = new User({
      firstName,
      lastName,
      email,
      age: age ? Number(age) : undefined,
      course
    });

    // Save to MongoDB
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: savedUser
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

// GET: Retrieve all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
