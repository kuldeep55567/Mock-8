const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../Model/UserModel")
const jwt = require("jsonwebtoken");
require("dotenv").config()
const bcrypt = require("bcrypt");

userRouter.post("/signup", async (req, res) => {
    const { email, password } = req.body
    const check = await UserModel.findOne({ email });
    if (check) {
       return res.status(200).json({ "ok": false, "mssg": "User already Exists" })
    }
    bcrypt.hash(password, 9, async (err, hashed) => {
        try {
            const data = new UserModel({ email, password: hashed });
            await data.save();
            res.status(201).json({ "ok": true, "mssg": "User Registered Successfully" })
        } catch (error) {
            res.status(400).json({ "ok": false, "mssg": error.message })
        }
    })
})
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ "ok": false, "mssg": "Register first" })
        }
        const same = await bcrypt.compare(password, user.password);
        if (!same) {
            return res.status(200).json({ "ok": false, "mssg": "Wrong Credentials" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.Secret, { expiresIn: '2hr' });
        const response = {
            "ok": true,
            "token": token,
            "mssg": "Login Successfull",
            "id": user._id
        }
       res.status(201).json(response)
    } catch (error) {
        res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
module.exports = {
    userRouter
}