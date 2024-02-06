import { useContext } from "react";
import Banner from "./sections/banner/Banner";
import Logos from "./sections/logos/Logos";
import WhoCanUse from "./sections/who can use/WhoCanUse";
import { ContextAPI } from "../../context api/MyContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user, loading } = useContext(ContextAPI);
    const navigate = useNavigate();

    if (loading) {
        return <div className="h-[100vh] flex justify-center">
            <span className="loading loading-spinner loading-lg -mt-36"></span>
        </div>
    }
    if (user) {
        navigate("/dashboard/profile")
    }
    return (
        <div>
            <Banner />
            <Logos />
            <WhoCanUse></WhoCanUse>
        </div>
    );
};

export default Home;