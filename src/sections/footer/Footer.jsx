import SectionContainer from "../../components/section container/SectionContainer";
import faceBookImg from "../../assets/facebook.png"
import twitterImg from "../../assets/twitter.png"
import whatsappImg from "../../assets/whatsapp.png"

const Footer = () => {
    return (
        <div className="p-10 bg-[#6788F3]">
            <SectionContainer>
                <footer className="footer text-white font-medium">
                    <nav>
                        <header className="footer-title text-white">Services</header>
                        <a className="link link-hover">Task Management</a>
                        <a className="link link-hover">Task Management</a>
                        <a className="link link-hover">Task Management</a>
                    </nav>
                    <nav>
                        <header className="footer-title text-white">Company</header>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <header className="footer-title text-white">Legal</header>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                    <nav>
                        <header className="footer-title text-white">Contact</header>
                        <a className="link link-hover">hello@tasking.com</a>
                        <a className="link link-hover">+880 XXXXXXXXXX</a>
                        <ul className="flex items-center gap-3">
                            <li><a href="#" target="_blank"><img className="w-[33px] hover:scale-105 duration-300" src={faceBookImg} alt="" /></a></li>
                            <li><a href="#" target="_blank"><img className="w-[33px] hover:scale-105 duration-300" src={twitterImg} alt="" /></a></li>
                            <li><a href="#" target="_blank"><img className="w-[33px] hover:scale-105 duration-300" src={whatsappImg} alt="" /></a></li>
                        </ul>
                    </nav>
                </footer>
                    <p className="md:text-center text-neutral-content mt-7 text-sm">Copyright © 2023 - All right reserved by Tasking. Made with love by Junayed Noman.</p>
            </SectionContainer>
        </div>
    );
};

export default Footer;