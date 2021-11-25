const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    desig:{
        type:String,
        required:true
    },
});


module.exports=mongoose.model('Employee',employeeSchema);