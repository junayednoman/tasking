
const Btn = ({ text, fullWidth }) => {
    return (
        <div>
            <button style={{ width: fullWidth && "100%", padding: fullWidth && "10px 24px" }} className='bg-[#6788f3] hover:bg-[#5d7adb] text-white text-base md:text-lg py-2 px-6 font-medium duration-300 rounded-md'>{text}</button>
        </div>
    );
};

export default Btn;