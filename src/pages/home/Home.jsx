import Banner from "./sections/banner/Banner";
import Logos from "./sections/logos/Logos";
import WhoCanUse from "./sections/who can use/WhoCanUse";

const Home = () => {
    return (
        <div>
            <Banner />
            <Logos />
            <WhoCanUse></WhoCanUse>
        </div>
    );
};

export default Home;