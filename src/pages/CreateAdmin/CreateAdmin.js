import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function CreateAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const nameRef = useRef();
  const usernameRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState();
  const [user, setUser] = useState(false);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(
          `https://checkinbackend.onrender.com/auth/getUser?id=${id}`
        );
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };
    loadUser();
  }, []);
  const createMod = async () => {
    if (nameRef.length == 0 || usernameRef.length == 0 || passRef.length == 0) {
      setError("Không trường nào được phép để trống!");
      return;
    }
    try {
      const response = await fetch(
        "https://checkinbackend.onrender.com/auth/createMod",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameRef.current.value,
            username: usernameRef.current.value,
            password: passRef.current.value,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      alert(data.message);
      navigate("/manage");
    } catch (err) {
      console.log(err);
    }
  };
  const editMod = async () => {
    if (nameRef.length == 0 || usernameRef.length == 0) {
      setError("Không trường nào được phép để trống!");
    } else {
      try {
        const response = await fetch(
          "https://checkinbackend.onrender.com/auth/editMod",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: nameRef.current.value,
              username: usernameRef.current.value,
              id: id,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.message);
          return;
        }
        alert(data.message);
        navigate("/manage");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="eventsPage">
      <h2>Tạo moderator mới</h2>
      <p className="errorMsg">{error}</p>
      <div className="inputGroup">
        <label>Họ và tên:</label>
        <input type="text" ref={nameRef} defaultValue={user.name} />
      </div>
      <div className="inputGroup">
        <label>Username:</label>
        <input type="text" ref={usernameRef} defaultValue={user.username} />
      </div>
      <div className="inputGroup">
        <label>Password:</label>
        <input type="password" ref={passRef} disabled={user} />
      </div>
      <div className="createInteractions">
        <button
          className="warningBtn"
          style={{ fontSize: "15px" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Hủy bỏ
        </button>
        <button
          className="interactBtn"
          style={{ fontSize: "15px" }}
          onClick={(e) => {
            e.preventDefault();
            if (user) {
              editMod();
            } else {
              createMod();
            }
          }}
        >
          {user ? "Chỉnh sửa moderator" : "Tạo moderator"}
        </button>
      </div>
    </div>
  );
}
