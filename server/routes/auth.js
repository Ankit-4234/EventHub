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
    }
});