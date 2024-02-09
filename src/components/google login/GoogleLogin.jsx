import { toast } from "react-toastify";
import Btn from "../btn/Btn";
import useContextData from "../../custom hooks/get context data/useContextData";


const GoogleLogin = () => {
    const { googleLogin } = useContextData()
    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("User logged in successfully")
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