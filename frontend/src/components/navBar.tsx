import { AddIcon } from "../assets/addIcon";
import { ShareIcon } from "../assets/shareIcon";
import { Button } from "./button";
import { useRecoilState } from "recoil";
import { modal } from "../utils/modalState";
import { ProfileIcon } from "../assets/profileIcon";
import { useNavigate } from "react-router-dom";
import { Logout } from "./logout";
import { useState, useRef, useEffect } from "react";
// ... imports

export function Navbar(){
    const [modalValue, setModalValue] = useRecoilState(modal);
    const [showLogout, setShowLogout] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Check auth state on mount and update on events
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };
        
        checkAuth();

        const handleAuthChange = () => {
            checkAuth();
            setShowLogout(false);
        };

        window.addEventListener('authChange', handleAuthChange);
        return () => window.removeEventListener('authChange', handleAuthChange);
    }, []);

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowLogout(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return <div className="bg-[#EFCB68] h-16 flex justify-between items-center px-8 shadow-lg relative z-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}>
            {/* Logo Icon could go here */}
            <div className="font-bold text-3xl text-[#160C28] tracking-tight">
                Brainly
            </div>
        </div>

        <div className="flex gap-4 items-center">
            {isLoggedIn ? (
                <>
                    <Button variant="primary" size="md" fun={()=>{
                        setModalValue(val => !val);
                    }} title="Add Content" startSymbol={<AddIcon/>}/>
                    <Button variant="secondary" size="md" fun={()=>{}} title="Share Brain" startSymbol={<ShareIcon/>}/>
                    
                    <div className="relative ml-2" ref={dropdownRef}>
                        <div 
                            className="bg-[#160C28] text-[#EFCB68] p-2 rounded-full cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => setShowLogout(!showLogout)}
                        >
                            <ProfileIcon/>
                        </div>
                        {showLogout && <Logout/>}
                    </div>
                </>
            ) : (
                <div className="flex gap-4">
                     <button 
                        onClick={() => navigate("/signin")}
                        className="text-[#160C28] font-semibold hover:text-[#160C28]/70 transition-colors"
                     >
                        Login
                     </button>
                     <button 
                        onClick={() => navigate("/signup")}
                        className="bg-[#160C28] text-[#EFCB68] px-5 py-2 rounded-lg font-semibold hover:bg-[#160C28]/90 transition-transform active:scale-95 shadow-md"
                     >
                        Join Now
                     </button>
                </div>
            )}
        </div>
    </div>
}