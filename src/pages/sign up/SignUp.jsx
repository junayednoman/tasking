import { useForm } from "react-hook-form"
import { Link, Navigate } from "react-router-dom";
import Btn from "../../components/btn/Btn";
import SectionContainer from "../../components/section container/SectionContainer";
import loginImg from "../../assets/login.png"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from "../../components/google login/GoogleLogin";
import usePostData from "../../custom hooks/post data/usePostData";
import useContextData from "../../custom hooks/get context data/useContextData";


const SignUp = () => {
  const { signUp, updateUserProfile, user } = useContextData();
  console.log(user);
  const {
    register,
    handleSubmit
  } = useForm()
  const userDataMutation = usePostData({ url: "/users" });
  if (user) {
    return <Navigate to={"/"}></Navigate>
  }

  const handleSignUp = (data) => {
    signUp(data.email, data.password)
      .then(result => {
        if (result.user) {
          updateUserProfile(data.name, data.image)
            .then(() => {
              delete data.password;
              userDataMutation.mutateAsync(data)
                .then(res => {
                  if (res?.data?.insertedId) {
                    toast.success("user has created successfully😊")
                  }
                })
                .catch(error => {
                  toast.error(error.message)
                })
              console.log("sign-up", data);
            })
            .catch(error => {
              console.log(error);
            })
        }
      })
      .catch(error => {
        if (error) {
          toast.error(error.message)
        }
      })
  }

  return (
    <SectionContainer>
      <div className="flex justify-center lg:flex-row flex-col-reverse gap-0 md:gap-12 items-center py-10">
        <div>
          <img className="md:w-[80%] lg:block  hidden w-[230px] mt-0 md:mt-6 ml-auto" src={loginImg} alt="" />
        </div>

        <div className="w-full lg:w-[50%] border-0 md:border rounded-md">
          <form onSubmit={handleSubmit(handleSignUp)} className="card-body md:px-10 px-0 md:py-6 py-0">
            <div className="md:my-2 my-0">
              <h4 className="text-[28px] md:text-[38px] text-center font-semibold">Sign Up Now</h4>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input {...register('name')} type="text" placeholder="Name" className="input input-bordered rounded-[4px]" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input {...register('image')} type="text" placeholder="Image..." className="input input-bordered rounded-[4px]" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input {...register('phone')} type="text" placeholder="Phone..." className="input input-bordered rounded-[4px]" required />
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
              <Btn fulWidth={true} text='Sign Up' fullWidth={true} ></Btn>
            </div>
            <div className="divider">OR</div>
            <div><GoogleLogin></GoogleLogin></div>
            <div className="mt-2">
              <p>Already have an account? <Link className="font-semibold text-[#5D7ADB] underline" to='/login'>Login</Link></p>
            </div>
          </form>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </SectionContainer>
  );
};

export default SignUp;