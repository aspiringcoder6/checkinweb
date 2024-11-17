import "./authenticate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [userFocused, setUserFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [username, setUsername] = useState("");
  const [validUser, setValidUser] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [pass, setPass] = useState("");
  const login = async () => {
    try {
      const response = await fetch(
        "https://checkinbackend.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password: pass,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        setUsername("");
        setPass("");
        return;
      }
      sessionStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="loginPage">
      <div className="navBar">
        <h2>Event checkin web</h2>
      </div>
      <form>
        <h1>ĐĂNG NHẬP</h1>
        <p className="errorMsg">{error}</p>
        <p>Tên đăng nhập</p>
        <div className="inputGroup">
          <i
            class="fa-regular fa-user"
            style={{
              position: "absolute",
              top: "24px",
              left: "7.5%",
              color: `${userFocused ? "#7cc8e6" : "black"}`,
              transition: "color 0.3s ease",
            }}
          ></i>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            onFocus={() => {
              setUserFocused(true);
            }}
            onBlur={() => setUserFocused(false)}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <p>Mật khẩu đăng nhập</p>
        <div className="inputGroup">
          <i
            class="fa-solid fa-lock"
            style={{
              position: "absolute",
              top: "24px",
              left: "7.5%",
              color: `${passFocused ? "#7cc8e6" : "black"}`,
              transition: "color 0.3s ease",
            }}
          ></i>
          <input
            type="password"
            placeholder="Mật khẩu đăng nhập"
            onFocus={() => setPassFocused(true)}
            onBlur={() => setPassFocused(false)}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            value={pass}
          />
        </div>
        <button
          className="submitButton"
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          TIẾP TỤC
        </button>
        <p className="hintText">
          Chưa có tài khoản đăng nhập? Hãy liên hệ với admin để tạo tài khoản
          của mình
        </p>
      </form>
    </div>
  );
}
