import { toast } from "react-toastify";
import Btn from "../btn/Btn";
import useContextData from "../../custom hooks/get context data/useContextData";
import usePostData from "../../custom hooks/post data/usePostData";


const GoogleLogin = () => {
    const { googleLogin } = useContextData();
    const userDataMutation = usePostData({ url: "/users" });
    const handleGoogleLogin = () => {
        googleLogin()
            .then((res) => {
                toast.success("User logged in successfully");
                const userData = {
                    email: res?.user?.email,
                    name: res?.user?.displayName,
                    photo: res?.user?.photoURL,
                    phone: res?.user?.phone || "+880 1745345773",
                }
                userDataMutation.mutateAsync(userData)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                console.log(userData);
            })
            .catch(error => {
                toast.error(error.message)
            })

    }
    return (
        <div onClick={handleGoogleLogin}>
            <Btn text={"Login With Google "} fullWidth={true}></Btn>
        </div>
    );
};

export default GoogleLogin;