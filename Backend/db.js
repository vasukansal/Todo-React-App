const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGODB_URI)

const todoschema= new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean,

})

const todo=mongoose.model("todos",todoschema);

module.exports={
    todo
}