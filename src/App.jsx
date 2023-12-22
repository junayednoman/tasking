import { Outlet } from "react-router-dom";
import Navbar from "./sections/navbar/Navbar";
import Footer from "./sections/footer/Footer";

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default App;