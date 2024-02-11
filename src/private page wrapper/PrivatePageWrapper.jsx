import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import useContextData from "../custom hooks/get context data/useContextData";

const PrivatePageWrapper = ({ children }) => {
    const { user, loading } = useContextData();
    if (loading) {
        return <p>Loading...</p>
    } else if (!user) {
        return <Navigate to={"/"}></Navigate>
    }
    return children;
};

PrivatePageWrapper.propTypes = {
    children: PropTypes.node
}

export default PrivatePageWrapper;