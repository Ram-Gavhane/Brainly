import { useNavigate } from "react-router-dom";

export function Logout(){
    const navigate = useNavigate();

    return <div className="fixed hover:bg-[#f3ff70]  bg-[#EFCB68] right-4 top-14 h-9  px-3 rounded-2xl py-1 text-[#160C28]">
        <button  onClick={()=>{
            localStorage.removeItem('token');
            navigate("/signin");
        }}>
            Logout
        </button>
        </div>
}