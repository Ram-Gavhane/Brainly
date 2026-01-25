import { useRecoilValue } from "recoil"
import { modal } from "../utils/modalState"
import { Modal } from "../components/modal";
import { Card } from "../components/card";
import { useContent } from "../utils/useContents";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const navigate = useNavigate();
    if (!localStorage.getItem('token')) {
        alert("login in")
        navigate("/signin");
    }

    const { content, getContents } = useContent();
    const modalValue = useRecoilValue(modal);

    useEffect(() => {
        getContents();
    }, [modalValue]);

    return (
        <div className="bg-[#160C28] text-[#EFCB68] min-h-screen w-full">
            <div
                style={{
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                }}
            >
                <div
                    className={`
                    w-full max-w-[1600px] mx-auto px-4
                    columns-1 sm:columns-2 lg:columns-4 xl:columns-5 2xl:columns-6
                    gap-4 space-y-4
                `}
                >
                    {content.map(({ title, link, type }, index) => {
                        return <Card key={index} title={title} link={link} type={type} />;
                    })}
                </div>
            </div>
            {modalValue && <Modal></Modal>}
        </div>
    );
}