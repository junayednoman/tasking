
const SectionTitle = ({ title, subTitle }) => {
    return (
        <div className="md:mb-5 mb-3">
            <h3 className="font-semibold md:text-[38px] mb-2 text-2xl">{title}</h3>
            <p className="md:mx-[320px] text-[#7b8193]">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;