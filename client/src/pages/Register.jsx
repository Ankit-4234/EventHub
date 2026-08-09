import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Register =()=>{
    const {register} =useAuth;
    const navigate = useNavigate();
    const [form,setForm] = useState({name="",email="",password=""});
    const [error,setError] = useState("");

    const submit = async(e)=>{
        e.preventDefault();
        try{
            await register(form.name, form.email, form.password);
            navigate("/");
        }catch(err){
            setError(err.response?.data?.message || "Registration failed");
        }
    }
}