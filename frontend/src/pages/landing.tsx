import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";

export function Landing() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#160C28] text-[#EFCB68] min-h-[calc(100vh-64px)] w-full">
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-[#EFCB68] to-[#F3FF70] text-transparent bg-clip-text">
                    Your Second Brain
                </h1>
                <p className="text-lg text-[#EFCB68]/80 max-w-2xl mb-12 leading-relaxed">
                    Store your favorite videos, tweets, and documents in one centralized place. 
                    Never lose track of your digital knowledge again.
                </p>
                <div className="flex gap-4">
                    <Button 
                        title="Get Started" 
                        variant="primary" 
                        size="lg" 
                        fun={() => navigate("/signup")}
                    />
                    <Button 
                        title="Login" 
                        variant="secondary" 
                        size="lg" 
                        fun={() => navigate("/signin")}
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-[#1F1235] py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">Everything you need, all in one place</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <FeatureCard 
                            title="Youtube Videos" 
                            description="Save important educational content, music videos, or tutorials with just a link."
                            icon={
                                <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            }
                        />
                        <FeatureCard 
                            title="Twitter Threads" 
                            description="Keep track of insightful threads, news, and memes without cluttering your bookmarks."
                            icon={
                                <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            }
                        />
                        <FeatureCard 
                            title="Documents" 
                            description="Embed Google Docs and other important files directly into your dashboard."
                            icon={
                                <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
    return (
        <div className="bg-[#160C28] p-8 rounded-2xl flex flex-col items-center text-center hover:transform hover:-translate-y-2 transition-transform duration-300 border border-[#EFCB68]/10 shadow-xl">
            <div className="mb-6 p-4 bg-[#EFCB68]/10 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-[#EFCB68]/60 leading-relaxed">{description}</p>
        </div>
    );
}
