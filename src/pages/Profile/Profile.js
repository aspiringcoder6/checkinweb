import { useRef, useState } from "react";
import "./Profile.css";
export default function Profile() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const oldPassRef = useRef();
  const newPassRef = useRef();
  const newPass2Ref = useRef();
  const [error, setError] = useState();
  const changePass = async () => {
    if (newPassRef.current.value !== newPass2Ref.current.value) {
      setError("Mật khẩu mới không khớp!");
      return;
    }
    try {
      const response = await fetch(
        "https://checkinbackend.onrender.com/auth/changePass",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user._id,
            newPass: newPassRef.current.value,
            oldPass: oldPassRef.current.value,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        newPassRef.current.value = "";
        newPass2Ref.current.value = "";
        oldPassRef.current.value = "";
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profilePage">
      <h2>Thông tin cá nhân</h2>
      <div style={{ display: "flex", gap: "20px", alignItems: "baseline" }}>
        <h3>Họ và tên:</h3>
        <p>{user.name}</p>
      </div>
      <div style={{ display: "flex", gap: "20px", alignItems: "baseline" }}>
        <h3>Tên đăng nhập:</h3>
        <p>{user.username}</p>
      </div>
      <h2>Thay đổi mật khẩu:</h2>
      <p className="errorMsg">{error}</p>
      <h3>Nhập mật khẩu cũ:</h3>
      <input type="password" ref={oldPassRef} />
      <h3>Nhập mật khẩu mới:</h3>
      <input type="password" ref={newPassRef} />
      <h3>Nhập lại mật khẩu mới:</h3>
      <input type="password" ref={newPass2Ref} />
      <div className="createInteractions">
        <button
          className="warningBtn"
          style={{ fontSize: "15px" }}
          onClick={() => {
            oldPassRef.current.value = "";
            newPassRef.current.value = "";
            newPass2Ref.current.value = "";
          }}
        >
          Hủy bỏ
        </button>
        <button
          className="interactBtn"
          style={{ fontSize: "15px" }}
          onClick={() => {
            changePass();
          }}
        >
          Tạo mật khẩu mới
        </button>
      </div>
    </div>
  );
}
