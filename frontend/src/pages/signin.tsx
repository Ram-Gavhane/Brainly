import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export function Signin(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post("http://localhost:3000/api/v1/login",{
            username,
            password
        })
        const token = response.data.token;
        localStorage.setItem("token",token);
        if(token!=undefined){
            navigate("/dashboard");
        }
        
    }

    return <div className="h-screen flex justify-center items-center bg-[#160C28]">
        <div className="h-80 w-80 border shadow-md rounded-xl p-8 flex-row justify-center bg-white">
            <h1 className="text-center text-3xl mb-6 mt-4">Signin</h1>
            <div className="flex flex-col gap-3">
                <Input type="text" placeholder="Username" reference={usernameRef}/>
                <Input type="text" placeholder="Password" reference={passwordRef}/>
            </div>
            
            <div className="flex m-3 justify-center">
                <Button title="Signin" variant="primary" size="md" fun={signin}/>
            </div>
            <h1 className="mt-11 ml-3.5">Don't have an account? <Link to="/signup" className="underline">Signup</Link></h1>
        </div>
    </div>
}