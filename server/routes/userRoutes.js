import User from "../models/userModels.js";
import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // check user exist or not
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "User already Exist" });
    }

    //hashed password

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    //save user

    const newUser = new User({
      name,
      email,
      password: hashedpassword,
    });

    await newUser.save();

    res.status(200).send({ message: "User Registered Successfully" });

    // error handling
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "some error occurred" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // checking user exist or not

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(400).send({ message: "User Doesnt Exist" });
    }

    // checking password of that user
    const isMatch = await bcrypt.compare(password, oldUser.password);
    if (!isMatch) {
      return res.status(400).send({ message: "InCorrect Passsword" });
    }

    res.status(200).send({ message: "User Login successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error in Login" });
  }
});

export default router;
