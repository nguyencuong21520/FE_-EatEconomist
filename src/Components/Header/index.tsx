import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../store/ProviderStore";

interface Props {
  className?: string;
}
const Header = (props: Props) => {
  const store = useContext(StoreContext);
  const user = store.user;

  const nav = useNavigate();
  return (
    <div className="header">
      <div
        className="logo"
        onClick={() => {
          nav("/");
        }}
      >
        <div className="imgLogo">
          {" "}
          <img className="iconLogo" src={logo} />
        </div>
        <h1>14X</h1>
      </div>
      <div className="user">
        <img src={user.data?.avatar} alt="" />
      </div>
    </div>
  );
};

export default Header;
