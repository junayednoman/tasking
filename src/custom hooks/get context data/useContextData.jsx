import { useContext } from "react";
import { ContextAPI } from "../../context api/MyContext";

const useContextData = () => {
    const contextInfo = useContext(ContextAPI)
    return contextInfo;
};

export default useContextData;