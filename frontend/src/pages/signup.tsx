import { useRef, useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Response } from "../components/response";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // Basic validation
        if (!username || !email || !password) {
            setMessage("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/api/v1/signup",{
                username,
                email,
                password
            });
            setMessage(response.data.message || "Account created successfully!");
            // Clear form fields on success
            if (usernameRef.current) usernameRef.current.value = "";
            if (emailRef.current) emailRef.current.value = "";
            if (passwordRef.current) passwordRef.current.value = "";
            // Optionally navigate to signin after a delay
            setTimeout(() => {
                navigate("/signin");
            }, 2000);
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data?.message || "An error occurred";
                
                if (status === 403) {
                    setMessage("Email already exists. Please use a different email or sign in.");
                } else if (status === 400) {
                    setMessage(errorMessage || "Invalid input. Please check your details.");
                } else {
                    setMessage(errorMessage || "Signup failed. Please try again.");
                }
            } else {
                setMessage("Network error. Please check your connection and try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return <div className="h-screen  flex justify-center items-center bg-[#160C28]">
        {message && <Response message={message} onClose={() => setMessage("")} />}
        <div className="h-96 w-80 border shadow-md rounded-xl p-8 bg-white">
            <h1 className="text-center text-3xl mb-6 mt-4">Signup</h1>
            <div className="flex flex-col gap-3">
                <Input type="text" placeholder="Username" reference={usernameRef} size="md"/>
                <Input type="text" placeholder="Email" reference={emailRef} size="md"/>
                <Input type="text" placeholder="Password" reference={passwordRef} size="md"/>
            </div>
            <div className="flex justify-center m-3">
                <Button title={!loading ? "Signup" : "Signing up..."} variant="primary" size="md" fun={signup}/>
            </div>
            <h1 className="mt-12 ml-3.5">Already have an account? <Link to="/signin" className="underline">Signin</Link></h1>
        </div>
    </div>
}