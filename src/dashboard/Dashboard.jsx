import { Helmet } from 'react-helmet-async';
import { Link, NavLink, Navigate, Outlet } from 'react-router-dom';
import { FaHome, FaTasks, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png"
import { TbLogout } from "react-icons/tb";
import useContextData from '../custom hooks/get context data/useContextData';
import { ToastContainer, toast } from 'react-toastify';


const Dashboard = () => {
    const { logOut } = useContextData();
    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success("User logged out successfully");
                Navigate("/login")
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div>
            <div className="flex myDashboard">
                <Helmet>
                    <title>Dashboard | Tasking - Task Management Platform</title>
                </Helmet>

                <div className="w-[280px] h-[100vh] sticky top-0 border-r border-[#cccccc5f] py-10 px-5">
                    <div className="mb-7 px-5">
                        <Link to={"/"}>
                            <img className='w-[160px]' src={logo} alt="" />
                        </Link>
                    </div>

                    {/* for general users */}
                    <div>
                        <ul className="text-[#60636c] space-y-3 menu">
                            <li><NavLink to='/dashboard/profile' className='flex gap-1 items-center font-medium'><FaUserCircle className='text-lg'></FaUserCircle>My Profile</NavLink></li>
                            <li><NavLink to='/dashboard/tasks' className='flex gap-1 items-center font-medium'><FaTasks className='text-lg'></FaTasks>My Tasks</NavLink></li>
                        </ul>
                    </div>
                    <div className="py-10" >
                        <hr />
                    </div>

                    {/* common menu */}
                    <div>
                        <ul className="text-[#60636c] space-y-3">
                            <li><NavLink to='/' className='flex gap-1 items-center font-medium'><FaHome />Home</NavLink></li>
                            <li onClick={handleSignOut}><NavLink to='/' className='flex gap-1 items-center font-medium'><TbLogout />Log Out</NavLink></li>
                        </ul>
                    </div>
                </div>

                <div className="w-[calc(100%-280px)] overflow-x-auto md:py-16 py-10 dashboardOutlet">
                    <Outlet>
                        <ToastContainer></ToastContainer>
                    </Outlet>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;