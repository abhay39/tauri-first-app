import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minLength:6,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    income:[],
    expense:[],
},{timestamps:true})

const User=mongoose.model("User",UserSchema);
export default User;