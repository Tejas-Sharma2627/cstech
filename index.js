const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Employee = require("./employee");
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb+srv://tejas:1234@employee.z8fbc.mongodb.net/employee?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION DONE");
  })
  .catch((err) => {
    console.log("MONGO ERROR ERROR ERROR");
    console.log(err);
  });
  app.use(methodOverride("_method"));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database Connected");
});


app.get("/", (req, res) => {
    res.send("Hello");
  });
  
  app.post(
    "/add",
    async (req, res) => {
        const {name, email, salary, desig}= req.query;
        console.log(req.query.name);
        if(!name||!email||!salary||!desig){
            return res.status(422).json({error:"Please fill all the fields"});
        }
        const employeeExist= await Employee.findOne({email:email});
        if(employeeExist){
            return res.status(422).json({error:"Employee Exist"});
        }
            const newEmployee=new Employee({name,email,salary,desig});
            await newEmployee.save();
            return res.status(201).json({message:"Employee Added"});
    }
  );
  app.post("/search",async(req,res)=>{
      const {name, email}= req.query;
      console.log(name);
      const employee= await Employee.findOne({email:email});
      if(!employee){
        return res.status(422).json({error:"Employee Not found"});
      }
      res.send(employee);

  })
app.put("/edit",async(req,res)=>{
    const{name,email,salary,desig}=req.query;
    const result=await Employee.findOneAndUpdate({email:email},{name:name,email:email,salary:salary,desig:desig});
    res.status(201).json({message:"Done"})
})
  app.delete(
    "/delete",
   async (req, res) => {
       const{name, email}=req.query;
      const result = await Employee.findOneAndDelete({email:email});
      res.status(201).json({message:"Done"})
    }
  );

app.listen(8080, () => {
    console.log("Serving on PORT 8080");
  });