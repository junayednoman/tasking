import { useContext } from "react";
import { ContextAPI } from "../../context api/MyContext";
import { toast } from "react-toastify";
import Btn from "../btn/Btn";


const GoogleLogin = () => {
    const { googleLogin } = useContext(ContextAPI)
    const handleGoogleLogin = () => {
        googleLogin()
            .then(reslut => {
                toast.success("User logged in successfully")
            })
            .catch(error => {
                toast.error(error.message)
            })

    }
    return (
        <div onClick={handleGoogleLogin} className="border-2">
            <Btn text={"Login With Google "} fullWidth={true}></Btn>
        </div>
    );
};

export default GoogleLogin;