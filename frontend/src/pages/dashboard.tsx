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
                className="grid gap-12 place-items-center"
                style={{
                    gridTemplateColumns: "repeat(4, minmax(250px, 1fr))",
                    width: "100%",
                    margin: "0 auto",
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