import { Helmet } from 'react-helmet-async';
import SectionContainer from '../../components/section container/SectionContainer';
import SectionTitle from '../../components/section title/SectionTitle';
import { useContext } from 'react';
import { ContextAPI } from '../../context api/MyContext';

const Profile = () => {
    const { user } = useContext(ContextAPI)
    return (
        <div className='md:py-20 py-10'>
            <Helmet>
                <title>Profile | Tasking - Task Management Platform</title>
            </Helmet>

            <SectionContainer>
                <div className='text-center'>
                    <SectionTitle title={`Welcome, ${user?.displayName}🤗`} />
                </div>

                <div className='md:w-[600px] rounded-md relative shadow-md bg-[#5D7ADB] py-12 mx-auto text-center text-white mt-[150px]'>
                    <img className='w-[120px] bg-white h-[120px] absolute -top-[25%] left-[calc(60%-120px)] border-2 rounded-full border-[#5D7ADB] mx-auto' src={user?.photoURL} alt="" />
                    <h4 className='md:text-3xl text-2xl mb-4 mt-6'>{user?.displayName}</h4>
                    <p className='capitalize mb-1'><span className='font-semibold'>Phone: </span>+880 XXXXXXXXX</p>
                    <p className=''><span className='font-semibold'>Email: </span>{user?.email}</p>
                </div>
            </SectionContainer>
        </div>
    );
};

export default Profile;