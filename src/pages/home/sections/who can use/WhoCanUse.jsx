import exampleImg from "../../../../assets/example.png"
import SectionContainer from "../../../../components/section container/SectionContainer";
import SectionTitle from "../../../../components/section title/SectionTitle";
import solutionImg from "../../../../assets/solution.png"
import { Link } from "react-router-dom";
import Btn from "../../../../components/btn/Btn";
import useContextData from "../../../../custom hooks/get context data/useContextData";

const WhoCanUse = () => {
    const { user } = useContextData();
    return (
        <SectionContainer>
            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-16 items-center md:pb-24 pb-12">
                <div>
                    <SectionTitle tag={"Solutions"} tagIcon={solutionImg} title={"Tailored for Every Profession"}></SectionTitle>
                    <p className="mb-4">Our task management website is a versatile solution embraced by developers for streamlined coding, corporate professionals for enhanced collaboration, bankers for meticulous financial processes, and individuals across diverse fields for its universal adaptability. </p>
                    <Link to={user ? "/dashboard/tasks" : "/sign-up"}>
                        <Btn text={"Get Started Now"}></Btn>
                    </Link>
                </div>
                <img src={exampleImg} alt="" />
            </div>
        </SectionContainer>
    );
};

export default WhoCanUse;