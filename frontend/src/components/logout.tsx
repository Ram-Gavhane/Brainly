import { useNavigate } from "react-router-dom";

export function Logout(){
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || "User";

    return (
        <div className="absolute right-2 top-14 w-48 bg-[#EFCB68] rounded-xl shadow-xl border-2 border-[#160C28]/10 overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-[#160C28]/10">
                <p className="text-sm text-[#160C28]/70">Signed in as</p>
                <p className="text-sm font-bold text-[#160C28] truncate" title={username}>{username}</p>
            </div>
            <div className="py-1">
                <button 
                    className="w-full text-left px-4 py-2 text-sm text-[#160C28] hover:bg-[#160C28]/10 transition-colors flex items-center gap-2"
                    onClick={()=>{
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        window.dispatchEvent(new Event("authChange"));
                        navigate("/signin");
                    }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
}