import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const categories = ["Music","Sports","Tech","Education","Community","Food","Other"];
const CreateEvent = () =>{
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title:"", description: "", category: "Community",
        date:"", time:"", location:"",image:"",capacity:0,
    });
    const [error,setError] = useState("");
    const submit = async (e)=>{
        e.
    }
}