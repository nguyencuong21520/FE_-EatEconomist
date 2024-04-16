import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Order from "../Icons/Order";
import User from "../Icons/User";
import { StoreContext } from "../../../store/ProviderStore";
import Logout from "../Icons/Logout";
import "./styles.scss";

const Setting = () => {
  const store = useContext(StoreContext);
  const nav = useNavigate();
  const listSetting = [
    {
      label: "Thông tin cá nhân",
      icon: <User className="icon" />,
      onClick() {
        nav("/personal-information");
        store.drawer.handleDrawer({
          ...store.drawer.data,
          open: false,
        });
      },
    },
    {
      label: "Danh sách đơn hàng",
      icon: <Order className="icon" />,
      onClick() {},
    },
  ];
  return (
    <div className="setting">
      {listSetting.map((item, idx) => {
        return (
          <div key={idx} className="itemSetting" onClick={item.onClick}>
            {item.icon} {item.label}
          </div>
        );
      })}
      <button
        className="btnLogout"
        onClick={() => {
          store.modal.handleModal({
            open: true,
            title: "Bạn muốn đăng xuất?",
            cancelText: "Huỷ",
            okText: "Đồng ý",
            wrapClassName: "modalLogout",
            centered: true,
            onOk() {
              localStorage.removeItem("access_token");
              window.location.assign("/auth/login");
            },
          });
        }}
      >
        <Logout /> Đăng xuất
      </button>
    </div>
  );
};
export default Setting;
