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
                if (username) localStorage.setItem("username", username);
                
                // Notify Navbar of auth change
                window.dispatchEvent(new Event("authChange"));
                
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

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#160C28] to-[#2D1B4E] p-4">
            {message && <Response message={message} onClose={() => setMessage("")} />}
            <div className="w-full max-w-sm border border-[#EFCB68]/20 shadow-2xl rounded-2xl p-8 bg-[#160C28]/80 backdrop-blur-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#EFCB68] tracking-tight">Welcome Back</h1>
                    <p className="text-gray-400 mt-2">Sign in to continue to Brainly</p>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <Input size="md" type="text" placeholder="Username" reference={usernameRef}/>
                    </div>
                    <div className="space-y-1">
                        <Input size="md" type="text" placeholder="Password" reference={passwordRef}/>
                    </div>
                </div>
                
                <div className="mt-8">
                    <Button 
                        title={!loading ? "Signin" : "Loading..."} 
                        variant="primary" 
                        size="md" 
                        fun={signin}
                        fullWidth
                    />
                </div>
                
                <p className="mt-6 text-center text-gray-400 text-sm">
                    Don't have an account? <Link to="/signup" className="text-[#EFCB68] hover:underline font-semibold">Sign up</Link>
                </p>
            </div>
        </div>
    );
}