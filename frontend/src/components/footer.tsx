export default function Footer(){
    return (
    <footer className="bg-[#EFCB68] text-[#160C28] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
                <span className="font-semibold text-lg">Brainly</span>
                <span className="ml-2 text-sm">© {new Date().getFullYear()} All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
                <a href="/about" className="hover:text-white transition">About</a>
                <a href="/contact" className="hover:text-white transition">Contact</a>
                <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            </div>
        </div>
    </footer>
    )
}