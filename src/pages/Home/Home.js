import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="pageContent">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
