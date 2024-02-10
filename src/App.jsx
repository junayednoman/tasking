import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./sections/navbar/Navbar";
import Footer from "./sections/footer/Footer";
import useContextData from "./custom hooks/get context data/useContextData";

const App = () => {
  const { user } = useContextData();
  return (
    <>
      {
        user ? <Navigate to={"/dashboard/tasks"}></Navigate> : <div>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
      }
    </>
  );
};

export default App;