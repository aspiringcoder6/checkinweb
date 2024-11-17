import { NavLink } from "react-router-dom";
import "./sidebar.css";
export default function Sidebar() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="sidebar">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? "sideLink activeLink" : "sideLink"
        }
      >
        <i class="fa-solid fa-bars"></i>Tổng quan
      </NavLink>
      <NavLink
        to={"/events"}
        className={({ isActive }) =>
          isActive ? "sideLink activeLink" : "sideLink"
        }
      >
        <i class="fa-regular fa-calendar-days"></i>Sự kiện
      </NavLink>
      <NavLink
        to={"/check-in"}
        className={({ isActive }) =>
          isActive ? "sideLink activeLink" : "sideLink"
        }
      >
        <i class="fa-solid fa-receipt"></i>Check-in
      </NavLink>
      <NavLink
        to={"/groups"}
        className={({ isActive }) =>
          isActive ? "sideLink activeLink" : "sideLink"
        }
      >
        <i class="fa-solid fa-chart-simple"></i>Tạo nhóm check-in
      </NavLink>
      {user && user.role == "Admin" && (
        <NavLink
          to={"/manage"}
          className={({ isActive }) =>
            isActive ? "sideLink activeLink" : "sideLink"
          }
        >
          <i class="fa-solid fa-list-check"></i>Quản lí thành viên
        </NavLink>
      )}
    </div>
  );
}
