import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import "./layout.scss";

const AuthLayout = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const nav = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      nav("/");
    } else {
      setLoading(false);
    }
  }, []);
  if (loading)
    return (
      <div className="loadingAuth">
        <LoadingOutlined size={150} />
      </div>
    );
  return (
    <div className="authLayout">
      <div className="headerAuth">
        <div className="logo">
          <div className="imgLogo">
            {" "}
            <img className="iconLogo" src={logo} />
          </div>
          <h1>14X</h1>
        </div>
        <p>Chào mừng đến với 14X Room</p>
      </div>
      <div className="contentAuth">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
