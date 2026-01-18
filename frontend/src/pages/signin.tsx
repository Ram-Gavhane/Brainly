import { useRef, useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Response } from "../components/response";


export function Signin(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        // Basic validation
        if (!username || !password) {
            setMessage("Please enter both username and password");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/api/v1/login",{
                username,
                password
            });
            
            const token = response.data.token;
            if (token) {
                localStorage.setItem("token", token);
                setMessage("Login successful! Redirecting...");
                // Clear form fields on success
                if (usernameRef.current) usernameRef.current.value = "";
                if (passwordRef.current) passwordRef.current.value = "";
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } else {
                setMessage("Login failed. Please try again.");
            }
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data?.message || "An error occurred";
                
                if (status === 401) {
                    setMessage("Incorrect password. Please try again.");
                } else if (status === 404) {
                    setMessage("User not found. Please check your username or sign up.");
                } else if (status === 400) {
                    setMessage(errorMessage || "Invalid input. Please check your details.");
                } else {
                    setMessage(errorMessage || "Login failed. Please try again.");
                }
            } else {
                setMessage("Network error. Please check your connection and try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return <div className="h-screen flex justify-center items-center bg-[#160C28]">
        {message && <Response message={message} onClose={() => setMessage("")} />}
        <div className="h-80 w-80 border shadow-md rounded-xl p-8 flex-row justify-center bg-white">
            <h1 className="text-center text-3xl mb-6 mt-4">Signin</h1>
            <div className="flex flex-col gap-3">
                <Input size="md" type="text" placeholder="Username" reference={usernameRef}/>
                <Input size="md" type="text" placeholder="Password" reference={passwordRef}/>
            </div>
            
            <div className="flex m-3 justify-center">
                <Button title={!loading ? "Signin" : "Loading.."} variant="primary" size="md" fun={signin}/>
            </div>
            <h1 className="mt-11 ml-3.5">Don't have an account? <Link to="/signup" className="underline">Signup</Link></h1>
        </div>
    </div>
}