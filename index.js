const express = require("express");
const app  = express();
const {connection} = require("./Config/db")
const {userRouter} = require("./Controller/userRoute")
const {adRouter} = require("./Controller/adRoute")
require("dotenv").config();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
try {
    res.status(200).json({"mssg":"Welcome to Backend of Mock-8"})
} catch (error) {
    res.status(400).json({"mssg":error.message})
}
})
app.use("/api",userRouter)
app.use("/api",adRouter)
app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Database Connected Succesfully");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running at port ${process.env.PORT}`)
})