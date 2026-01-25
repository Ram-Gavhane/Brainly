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

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#160C28] to-[#2D1B4E] p-4">
            {message && <Response message={message} onClose={() => setMessage("")} />}
            <div className="w-full max-w-sm border border-[#EFCB68]/20 shadow-2xl rounded-2xl p-8 bg-[#160C28]/80 backdrop-blur-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#EFCB68] tracking-tight">Join Brainly</h1>
                    <p className="text-gray-400 mt-2">Start building your second brain today</p>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <Input size="md" type="text" placeholder="Username" reference={usernameRef}/>
                    </div>
                    <div className="space-y-1">
                        <Input size="md" type="text" placeholder="Email" reference={emailRef}/>
                    </div>
                    <div className="space-y-1">
                        <Input size="md" type="text" placeholder="Password" reference={passwordRef}/>
                    </div>
                </div>
                
                <div className="mt-8">
                    <Button 
                        title={!loading ? "Sign up" : "Creating Account..."} 
                        variant="primary" 
                        size="md" 
                        fun={signup}
                        fullWidth
                    />
                </div>
                
                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account? <Link to="/signin" className="text-[#EFCB68] hover:underline font-semibold">Sign in</Link>
                </p>
            </div>
        </div>
    );
}