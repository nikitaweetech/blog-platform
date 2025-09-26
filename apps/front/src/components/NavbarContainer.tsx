import { PropsWithChildren } from "react";
import DesktopNavBar from "./desktopNavbar";
import MobileNavbar from "./mobileNavbar";

type Props=PropsWithChildren;
const NavbarContainer=(props:Props)=>{
    return(
        <div className="relative "> 
            <DesktopNavBar>{props.children}</DesktopNavBar>
            <MobileNavbar>{props.children}</MobileNavbar>
        </div>
    )
}
export default NavbarContainer;