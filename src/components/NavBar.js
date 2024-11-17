import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const [dropDownOpen, setDropDownOpen] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="navBar">
        <h2>Event checkin web</h2>
        <div className="interaction">
          <i class="fa-regular fa-bell"></i>
          <div
            className="avatarGroup"
            onClick={() => {
              setDropDownOpen((prev) => {
                return !prev;
              });
            }}
          >
            <div className="avatar">
              <p>{user && user.username[0]}</p>
            </div>
            <p>{user && user.username}</p>
          </div>
        </div>
      </div>
      {dropDownOpen && (
        <div className="dropdown">
          <p
            onClick={() => {
              navigate("/profile");
            }}
          >
            <i class="fa-regular fa-user"></i>Tài khoản
          </p>
          <p>
            <i class="fa-solid fa-gear"></i>Cài đặt
          </p>
          <p
            onClick={() => {
              sessionStorage.clear();
              navigate("/login");
            }}
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất
          </p>
        </div>
      )}
    </>
  );
}
