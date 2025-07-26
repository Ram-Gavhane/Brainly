import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navBar";
import  Footer  from "../components/footer";

export function Layout(){
    return <div>
        <div>
            <Navbar/>
        </div>
        <Outlet/>
        <div>
            <Footer/>
        </div>
    </div>
}