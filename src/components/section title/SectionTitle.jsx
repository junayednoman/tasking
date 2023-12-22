
const SectionTitle = ({ title, subTitle, tag, tagIcon }) => {
    return (
        <div className="md:mb-5 mb-3">
            {tag && <div className="py-1 px-3 rounded-md bg-[#5d7adb2f] mb-3 text-[#4a62af] font-medium inline-block">
                <div className="flex items-center gap-1">
                    <img className="w-[25px]" src={tagIcon} alt="" />
                    <p className="">{tag}</p>
                </div>
            </div>}
            <h3 className="font-semibold md:text-[38px] mb-2 text-2xl">{title}</h3>
            <p className="lg:mx-[320px] mx-0 text-[#7b8193]">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;