import { Link } from 'react-router-dom';
import Btn from '../../../../components/btn/Btn';
import SectionContainer from '../../../../components/section container/SectionContainer';
import bannerImg from "../../../../assets/workspace-img.png"

const Banner = () => {
    return (
        <div className='text-center md:py-20 py-8'>
            <SectionContainer>
                <h1 className='font-semibold md:text-6xl text-4xl md:leading-[75px]'> Effortless Task Management <br className='lg:block hidden' /> <span className='text-[#5D7ADB]'>Made Simple</span></h1>
                <p className='md:my-3 my-2 md:mb-5 mb-3'>Experience the power of efficient task management <br className='md:block hidden' /> with our intuitive and user-friendly app.</p>
                <Link to={"/login"}>
                    <Btn text={"Let’s Explore"}></Btn>
                </Link>
                <img className='mx-auto md:mt-16 mt-8' src={bannerImg} alt="" />

                
            </SectionContainer>
        </div>
    );
};

export default Banner;