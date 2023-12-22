import { Link } from "react-router-dom";
import SectionContainer from "../../components/section container/SectionContainer";
import Btn from "../../components/btn/Btn";
import { useForm } from "react-hook-form";
import loginImg from "../../assets/login.png"
import { useContext } from "react";
import { ContextAPI } from "../../context api/MyContext";
import { ToastContainer, toast } from "react-toastify";
import GoogleLogin from "../../components/google login/GoogleLogin";

const Login = () => {
    const { signIn } = useContext(ContextAPI);
    const {
        register,
        handleSubmit
    } = useForm()
    const handleSignIn = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                if (result.user) {
                    toast.success("user logged in successfully")
                }
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <SectionContainer>
            <div className="flex justify-center lg:flex-row flex-col-reverse gap-0 md:gap-14 items-center py-6 pb-12">
                <div>
                    <img className="md:w-[400px] lg:block hidden w-[230px] mt-0 md:mt-0 ml-auto" src={loginImg} alt="" />
                </div>

                <div className="w-full lg:w-[45%] border-0 md:border rounded-md">
                    <form onSubmit={handleSubmit(handleSignIn)} className="card-body md:px-8 px-0 py-0 md:py-6">
                        <div className="py-0 md:my-2">
                            <h4 className="text-[30px] md:text-[38px] text-center my-2 font-semibold">{`${location.state?.from ? "Login to visit the private page" : 'Login Now'}`}</h4>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register('email')} type="email" placeholder="email" className="input input-bordered rounded-[4px]" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register('password')} type="password" placeholder="password" className="input input-bordered rounded-[4px]" required />
                        </div>
                        <div className="form-control mt-5">
                            <Btn text='Login' fullWidth={true} ></Btn>
                        </div>
                         <div className="divider">OR</div>
                        <GoogleLogin></GoogleLogin>
                        <div className="mt-3">
                            <p>Do not have an account? <Link className="font-semibold text-[#5D7ADB] underline" to='/sign-up'>Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </SectionContainer>
    );
};

export default Login;