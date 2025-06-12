import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate =useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post("http://localhost:3000/api/v1/signup",{
            username,
            email,
            password
        })

        alert(JSON.stringify(response.data));
        navigate("/signin")
    }

    return <div className="h-screen w-screen flex justify-center items-center bg-[#160C28]">
        <div className="h-96 w-80 border shadow-md rounded-xl p-8 bg-white">
            <h1 className="text-center text-3xl mb-6 mt-4">Signup</h1>
            <Input type="text" placeholder="Username" reference={usernameRef}/>
            <Input type="text" placeholder="Email" reference={emailRef}/>
            <Input type="text" placeholder="Password" reference={passwordRef}/>
            <div className="flex justify-center m-3">
                <Button title="Signup" variant="primary" size="md" fun={signup}/>
            </div>
            <h1 className="mt-12 ml-3.5">Already have an account? <Link to="/signin" className="underline">Signin</Link></h1>
        </div>
    </div>
}