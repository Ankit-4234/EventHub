import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.router();
const generateToken = (id) => 
jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"30d"});

router.post("/register",async(req,res)=>{
    try{
        const {name,email,password}= req.body;
        if(!name || !email || !password){
            return res.staus(400).json({message: "all fields are required"});
        }
        const existing = await User.findone({email: email.toLowerCase()});
        if(existing){
            return res.status(400).json({message:"Email already registered"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name,email, password:hashedPassword});
        res.status(201).json({
            token: generateToken(user._id),
            user: {id: user._id, name: user.name, email: user.email},
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
router.post('/login', async(req,res)=>{
    try{
        
    }
})