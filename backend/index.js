import express, { response } from 'express';
import mongoose, { get } from 'mongoose';
import User from './modal/users.js';
import bcrypt from 'bcryptjs'
import cors from 'cors';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

const FRONTEND_URL=process.env.FRONTEND_URL;

const PORT=5000;
const app=express();
const JWT_SEC="356d0b7a7926090a4e6768342b3da7f7810f194c4ee3b757d1e517fcaf59085d" ;
const MONGOURI="mongodb+srv://abhaytechhub:abhaytechhub@cluster0.fykwmbk.mongodb.net/trackExpenses?retryWrites=true&w=majority"
app.use(cors());

const transporter = nodemailer.createTransport({
    host: 'gmail',
    auth: {
        user: 'abhayguptaak39@gmail.com',
        pass: 'cnxnswlxhsgpsdtb'
    },
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
});

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

app.get("/api/getUserDetails/:token",async(req,res)=>{
    const {token}=req.params;
    try{
        const decodedId=jwt.verify(token,JWT_SEC);
        if(decodedId){
            const userData=await User.findById(decodedId.id);
            res.json({"message":userData});
        }else{
            res.json({"message":"Invalid token"});
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
            const matchPassword=await bcrypt.compare(password,checkUser.password);
            if(matchPassword){
                const token=jwt.sign({id:checkUser._id},JWT_SEC,{
                    expiresIn:"720h"
                })
                res.status(200).json({
                    message:"Successfully Logged in!!",
                    "token":token
                })
            }else{
                res.status(400).json({
                    message:"Password is incorrect!!"
                })
            }
        }else{
            res.status(400).json({
                message:"Email is invalid!!"
            })
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})

app.post("/api/addIncome",async(req,res)=>{
    const {incomeName,incomeAmount,userId,dateAdded,TimeAdded}=req.body;

    try{
        const user=await User.findById(userId);
        if(user){
            const referenceId=Number(Math.floor(Math.random() * 999999999999) + 1);
            const transactionsReceiver={
                nameOfIncome:incomeName,
                amount:Number(incomeAmount),
                dateAdded:dateAdded,
                TimeAdded:TimeAdded,
                type:'credit',
                referenceId:referenceId,
            }
            const updateIncome=await User.findByIdAndUpdate(userId,{
                $push:{
                    income:transactionsReceiver
                }
            })
            if(updateIncome){
                res.status(202).json({
                    "message":"Income Added Successfully!!"
                })
            }else{
                res.status(403).json({
                    "message":"Error Adding Income"
                })
            }
        }else{
            res.status(404).json({
                "message":"No user found!"
            })
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})


app.post("/api/updateIncome",async(req,res)=>{
    const {incomeName,incomeAmount,userId,reference,dateAdded,TimeAdded}=req.body;

    try{
        const user=await User.findById(userId);
        if(user){
            const referenceId=Number(Math.floor(Math.random() * 999999999999) + 1);
            

            const updatedIncome = await User.updateOne(
                {
                "_id": userId,
                    "income": {
                        $elemMatch: { "referenceId": reference }
                    }
                },
                
                {
                    $set: {
                        "income.$.amount": Number(incomeAmount),
                        "income.$.nameOfIncome": incomeName,
                        "income.$.dateAdded": dateAdded,
                        "income.$.TimeAdded": TimeAdded,
                    }
                }
            );

            if(updatedIncome){
                res.status(202).json({
                    "message":"Income Updated Successfully!!"
                })
            }else{
                res.status(403).json({
                    "message":"Error Updating Income"
                })
            }
            
        }else{
            res.status(404).json({
                "message":"No user found!"
            })
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})


app.delete("/api/deleteIncome",async(req,res)=>{
    const {userId,reference}=req.body;

    try{
        const user=await User.findById(userId);
        if(user){
            const deletedIncome = await User.updateOne(
                {
                  "_id": userId,
                },
                {
                  $pull: {
                    "income": { "referenceId": reference }
                  }
                }
            );

            if(deletedIncome){
                res.status(202).json({
                    "message":"Income Deleted Successfully!!"
                })
            }else{
                res.status(403).json({
                    "message":"Error Deleting Income!!!"
                })
            }
            
        }else{
            res.status(404).json({
                "message":"No user found!"
            })
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})


app.post("/api/updateExpense",async(req,res)=>{
    const {incomeName,incomeAmount,userId,reference,dateAdded,TimeAdded}=req.body;

    try{
        const user=await User.findById(userId);
        if(user){
            const referenceId=Number(Math.floor(Math.random() * 999999999999) + 1);
            
            const updatedIncome = await User.updateOne(
                {
                "_id": userId,
                    "expense": {
                        $elemMatch: { "referenceId": reference }
                    }
                },
                {
                    $set: {
                        "expense.$.amount": Number(incomeAmount),
                        "expense.$.nameOfExpense": incomeName,
                        "expense.$.dateAdded": dateAdded,
                        "expense.$.TimeAdded": TimeAdded
                    }
                }
            );

            if(updatedIncome){
                res.status(202).json({
                    "message":"Expense Updated Successfully!!"
                })
            }else{
                res.status(403).json({
                    "message":"Error Updating Expense!!"
                })
            }
            
        }else{
            res.status(404).json({
                "message":"No user found!"
            })
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})


app.delete("/api/deleteExpense",async(req,res)=>{
    const {userId,reference}=req.body;

    try{
        const user=await User.findById(userId);
        if(user){
            const deletedIncome = await User.updateOne(
                {
                  "_id": userId,
                },
                {
                  $pull: {
                    "expense": { "referenceId": reference }
                  }
                }
            );

            if(deletedIncome){
                res.status(202).json({
                    "message":"Expense Deleted Successfully!!"
                })
            }else{
                res.status(403).json({
                    "message":"Error Deleting Expense!!!"
                })
            }
            
        }else{
            res.status(404).json({
                "message":"No user found!"
            })
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})

app.post("/api/addExpense",async(req,res)=>{
    const {expenseName,expenseAmount,userId,TimeAdded,dateAdded}=req.body;

    try{
        const user=await User.findById(userId);
        if(user){
            const referenceId=Number(Math.floor(Math.random() * 999999999999) + 1);
            const transactionsReceiver={
                nameOfExpense:expenseName,
                amount:Number(expenseAmount),
                dateAdded:dateAdded,
                TimeAdded:TimeAdded,
                type:'debit',
                referenceId:referenceId,
            }
            const updateIncome=await User.findByIdAndUpdate(userId,{
                $push:{
                    expense:transactionsReceiver
                }
            })
            if(updateIncome){
                res.status(202).json({
                    "message":"Expense Added Successfully!!"
                })
            }else{
                res.status(403).json({
                    "message":"Error Adding Expense"
                })
            }
        }else{
            res.status(404).json({
                "message":"No user found!"
            })
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})

app.post("/api/forgotPassword",async(req,res)=>{
    const {email}=req.body;
    try{
        const getId=await User.findOne({
            email:email
        })
        if(getId){
            const token=jwt.sign({id:getId._id},JWT_SEC,{
                expiresIn:"720h"
            })

            const updateUser=await User.findByIdAndUpdate(getId._id,{
                resetPasswordToken:token,
                resetPasswordExpires:Date.now()+3600000
            })
            if(updateUser){
                const mailOptions={
                    from:"abhayguptaak39@gmail.com",
                    to:email,
                    subject:"Reset Password",
                    text:`Click on the link below to reset your password: ${FRONTEND_URL}/resetPassword/${token}`
                }
                transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        // console.log(err)
                    }else{
                        // console.log(info)
                    }
                })
                res.status(202).json({
                    "message":"Password resent link is successfully sent to your Email. Kindly Check your email!!"
                })
            }
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})

await connect()

app.post("/api/updatePassword",async(req,res)=>{
    
    const {token,password}=req.body;
    try{
        const decodedId=jwt.verify(token,JWT_SEC);
        if(decodedId){
            const hashedPassword=await bcrypt.hash(password,10);
            const userData=await User.findByIdAndUpdate(decodedId.id,{
                resetPasswordToken:"",
                resetPasswordExpires:"",
                password:hashedPassword
            });
            res.status(202).json({"message":"password updated successfully!!!"});
        }else{
            res.status(403).json({"message":"Invalid token"});
        }
    }catch(err){
        res.status(403).json({
            message: err.message
        })
    }
})

app.listen(PORT,()=>{
    // console.log(FRONTEND_URL)
    console.log(`Server listening on ${PORT}`)
})