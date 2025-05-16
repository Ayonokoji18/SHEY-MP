import User from "../models/userModels.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password, cpassword } = req.body;

  // check user exist or not
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "User already Exist" });
    }

    //hashed password
    if (password !== cpassword) {
      return res.status(400).send({
        status: false,
        message: "Password didnt match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    //save user

    const newUser = new User({
      name,
      email,
      password: hashedpassword,
    });

    await newUser.save();

    res.status(200).send({
      success: true,
      message: "User Registered Successfully",
    });

    // error handling
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "some error occurred",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // checking user exist or not

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(400).send({
        success: false,
        message: "User Doesnt Exist",
      });
    }

    // checking password of that user
    const isMatch = await bcrypt.compare(password, oldUser.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "InCorrect Passsword",
      });
    }

    //sending jsonwebtoken

    const token = jwt.sign({ userid: oldUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      message: "User Login successfully",
      success: true,
      data: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Login",
    });
  }
});

export default router;
