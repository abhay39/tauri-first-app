import express from 'express';
import mongoose from 'mongoose';
import User from './modal/users.js';
import bcrypt from 'bcryptjs'
import cors from 'cors';

const PORT=5000;
const app=express();
const JWT_SEC="356d0b7a7926090a4e6768342b3da7f7810f194c4ee3b757d1e517fcaf59085d" ;
const MONGOURI="mongodb+srv://abhaytechhub:abhaytechhub@cluster0.fykwmbk.mongodb.net/trackExpenses?retryWrites=true&w=majority"
app.use(cors());

app.use(express.json({
    limit:'10mb'
}));


const connect=async()=>{
    try{
        await mongoose.connect(MONGOURI);
        console.log('MongoDB Connected');
    }catch(err){
        console.log("Error connecting to MongoDB",err);
    }
}

await connect()

app.get("/",(req, res) => {
    res.json({
        "message":"Backend is working!!!"
    })
})

app.post("/api/register",async(req, res) => {
    const {username,password,email}=req.body;
    try{
        const checkUser=await User.findOne({
            email: email
        });
        if(checkUser){
            res.status(400).json({
                message:"User account is already in use."
            })
        }else{
            const hashedPassword=await bcrypt.hash(password,10);
            // const hashedUsername=await bcrypt.hash(username,10);
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword
            })
            await newUser.save()
            res.status(200).json({
                message:"Account created successfully!!!"
            })
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})

app.post("/api/login",async(req, res) => {
    const {password,email}=req.body;
    try{
        const checkUser=await User.findOne({
            email: email
        });
        if(checkUser){
            res.status(400).json({
                message:"User account is already in use."
            })
        }else{
            const hashedPassword=await bcrypt.hash(password,10);
            // const hashedUsername=await bcrypt.hash(username,10);
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword
            })
            await newUser.save()
            res.status(200).json({
                message:"Account created successfully!!!"
            })
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`)
})