const mongoose = require("mongoose")
const AdSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
   category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
})
const AdModel = mongoose.model("Ad",AdSchema);
module.exports={AdModel}