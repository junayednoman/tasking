import logosImg from "../../../../assets/logos.png"
import SectionContainer from "../../../../components/section container/SectionContainer";
import SectionTitle from "../../../../components/section title/SectionTitle";

const Logos = () => {
    return (
        <SectionContainer>
            <div className="text-center md:pb-24 pb-10 my_logos">
                <SectionTitle title={"Trusted by"} subTitle={"Explore the companies that rely on our robust task management system to drive productivity and results."}></SectionTitle>
                <div className="lg:overflow-x-hidden overflow-auto">
                    <img className='mx-auto min-w-[1080px]' src={logosImg} alt="" />
                </div>
            </div>
        </SectionContainer>
    );
};

export default Logos;