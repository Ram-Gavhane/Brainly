import { useRecoilValue } from "recoil"
import { modal } from "../utils/modalState"
import { Modal } from "../components/modal";
import { Card }  from "../components/card";
import { useContent } from "../utils/useContents";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard(){
    const navigate = useNavigate();
    if(!localStorage.getItem('token')){
        alert("login in")
        navigate("/signin");
    }
    
    const {content, getContents} = useContent();
    const modalValue = useRecoilValue(modal);

    useEffect(()=>{
        getContents();
    },[modalValue]);

    return <div className="bg-[#160C28] text-[#EFCB68] min-h-screen w-full">
        <div
            style={{
                paddingTop: "1.5rem",
                paddingBottom: "1.5rem",
            }}
        >
            <div
                className="grid gap-6 place-items-start justify-items-center"
                style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 400px))",
                    width: "100%",
                    maxWidth: "100%",
                    margin: "0 auto",
                    padding: "0 1rem",
                    justifyContent: "center",
                }}
            >
                {content.map(({ title, link, type }) => (
                    <Card
                        key={link}
                        title={title}
                        link={link}
                        type={type}
                    />
                ))}
            </div>
        </div>
        {modalValue && <Modal></Modal>}
    </div>
}