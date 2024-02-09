
import useContextData from "../../custom hooks/get context data/useContextData";
import Banner from "./sections/banner/Banner";
import Logos from "./sections/logos/Logos";
import WhoCanUse from "./sections/who can use/WhoCanUse";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user, loading } = useContextData();
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