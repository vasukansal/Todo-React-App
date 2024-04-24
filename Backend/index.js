const express = require("express");
const app = express();
const { createtodo } = require("./types");
const { completetodo } = require("./types");
const { todo } = require("./db");
// const cors=require('cors')
require("dotenv").config()
// app.use(cors())
app.use(express.json());
const PORT =process.env.PORT || 3000
//inputs-                              FOR ZOD VALIDATION( SO WE WILL CREATE A NEW FILE FOR ZOD VALIDATION NAMED TYPE.JS )
//title : string
//description:string

app.post("/todo", async function (req, res) {
  const createdata = req.body;
  const checkdata = createtodo.safeParse(createdata);
  if (!checkdata.success) {
    res.status(411).send("Wrong input");
  } else {
    await todo.create({
      title: createdata.title,
      description: createdata.description,
      completed: false,
    });
    res.send("Todo Created" );
  }
});

app.get("/todos", async function (req, res) {
  const alltodos = await todo.find({});
  res.send(alltodos);
});

app.put("/completed", async function (req, res) {
  const uploaded = req.body;

  const chechuploaded = completetodo.safeParse(uploaded);
  if (!chechuploaded.success) {
    res.status(411).send("Wrong id");
    return;
  }
  const found = await todo.findOne({
    _id: req.body.id,
  });
  if (found) {
    await todo.updateOne(
      {
        _id: req.body.id,
      },
      {
        completed: true,
      }
    );
    res.json({success: true})
  } else {
    res.send("Invalid Todo Requested");
  }
});

app.put("/uncheck", async function (req, res) {
  const uploaded = req.body;
  const chechuploaded = completetodo.safeParse(uploaded);
  if (!chechuploaded.success) {
    res.status(411).send("Wrong id");
  } else {
    try {
      const uptodo = await todo.findByIdAndUpdate(
        req.body.id,
        { completed: false },
        { new: true }
      );
      if (uptodo == null) {
        res.status(411).send("Wrong id");
        return;
      }
      console.log(uptodo);
      res.json({ msg: "UnChecked Successfully" });
    } catch (err) {
      console.log(err);
      console.log("It seems like we F***** up :(");
      return;
    }
  }
});

app.delete("/deletetodo",async function(req,res){
  const input=req.body
  const parsedd=completetodo.safeParse(input)
  if(!parsedd.success){
    res.json({msg:"Wrong id"})
  }
  else{
    try{
      const idd=req.body.id
      const remove=await todo.findByIdAndDelete(idd)
      if(!remove){
        res.json({msg:"Todo not found"})
      }
      else{
        res.json({msg:"Todo delted"})
      }
    }
    catch(e){
      console.log(e)
      res.json({msg:"Server Error"})
    }
  }
})
// console.log(process.env)
app.listen(PORT,);
