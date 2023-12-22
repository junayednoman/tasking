import { Link } from "react-router-dom";
import SectionContainer from "../../components/section container/SectionContainer";
import logo from "../../assets/logo.png"
import Btn from "../../components/btn/Btn";

const Navbar = () => {
    const menuItems = [
        {
            text: "Home",
            link: "/"
        },
        {
            text: "Home",
            link: "/"
        },
        {
            text: "Home",
            link: "/"
        },
        {
            text: "Home",
            link: "/"
        },
    ]
    return (
        <div>
            <SectionContainer>
                <div className="navbar md:py-4 py-3 px-0">
                    <div className="navbar-start w-[70%] lg:flex-row flex-row-reverse lg:justify-start justify-between">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                                {
                                    menuItems.map(menuItem => <li className="text-[#7b8193] text-lg font-medium" key={menuItem.text}><Link to={menuItem.link}>{menuItem.text}</Link></li>)
                                }
                            </ul>
                        </div>
                        <Link>
                            <img className="md:mt-0 -mt-2" src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {
                                menuItems.map(menuItem => <li className="text-[#7b8193] text-lg font-medium" key={menuItem.text}><Link to={menuItem.link}>{menuItem.text}</Link></li>)
                            }
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <Btn text={"Sign Up"}></Btn>
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
};

export default Navbar;