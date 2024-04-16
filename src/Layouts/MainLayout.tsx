import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ArrowDownOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { StoreContext } from "../../store/ProviderStore";
import Home from "../Components/Icons/Home";
import ArrowDouble from "../Components/Icons/ArrowDouble";
import User from "../Components/Icons/User";
import Plus from "../Components/Icons/Plus";
import Header from "../Components/Header";
import IconSetting from "../Components/Icons/Setting";
import TitleDrawer from "../Components/Drawer/TitleDrawer";
import Setting from "../Components/Setting";
import CreateBill from "../Components/CreateBill";
import "./layout.scss";

const MainLayout = () => {
  const store = useContext(StoreContext);
  const nav = useNavigate();
  const handleDrawer = (type: "SETTING" | "CREATE_BILL" | "HOME") => {
    switch (type) {
      case "SETTING":
        store.drawer.handleDrawer({
          ...store.drawer.data,
          open: true,
          title: <TitleDrawer />,
          children: <Setting />,
          closeIcon: <ArrowRightOutlined />,
          rootClassName: "settingDrawer",
          placement: "right",
          size: "default",
        });
        break;
      case "CREATE_BILL":
        store.drawer.handleDrawer({
          open: true,
          title: (
            <div className="titleCreateBill">
              <img
                src="https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU="
                alt=""
              />{" "}
              Lên đơn nào!
            </div>
          ),
          children: <CreateBill />,
          closeIcon: <ArrowDownOutlined />,
          rootClassName: "createBillDrawer",
          placement: "bottom",
          size: "large",
        });
        break;
      case "HOME":
        nav("/");
        break;
      default:
        break;
    }
  };
  return (
    <div className="mainLayout">
      <div className="containerMainContent">
        <Header />
        <Outlet />
      </div>
      <div className="menuBar">
        <div className="groupMenu">
          <div className="divIcon" onClick={() => handleDrawer("HOME")}>
            <Home className="icon" />
          </div>
          <div className="divIcon">
            <ArrowDouble className="icon" />
          </div>
          <div
            className="divIcon iconCenter"
            onClick={() => handleDrawer("CREATE_BILL")}
          >
            <Plus className="icon" />
          </div>
          <div
            className="divIcon"
            onClick={() => {
              nav("/personal-information");
            }}
          >
            <User className="icon" />
          </div>
          <div className="divIcon" onClick={() => handleDrawer("SETTING")}>
            <IconSetting className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
