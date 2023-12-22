import logosImg from "../../../../assets/logos.png"
import SectionContainer from "../../../../components/section container/SectionContainer";
import SectionTitle from "../../../../components/section title/SectionTitle";

const Logos = () => {
    return (
        <SectionContainer>
            <div className="text-center md:pb-20 pb-10">
                <SectionTitle title={"Trusted by Leading Companies"} subTitle={"Explore the companies that rely on our robust task management system to drive productivity and results."}></SectionTitle>
                <img className='mx-auto' src={logosImg} alt="" />
            </div>
        </SectionContainer>
    );
};

export default Logos;