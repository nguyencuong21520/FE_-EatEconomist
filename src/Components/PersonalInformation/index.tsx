import { useContext } from "react";
import { Tabs, TabsProps } from "antd";
import Personal from "./Personal";
import RnE from "./RnE";
import { StoreContext } from "../../../store/ProviderStore";
import "./styles.scss";

const PersonalInformation = () => {
  const store = useContext(StoreContext);
  const user = store.user;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Cá nhân",
      children: <Personal />,
    },
    {
      key: "2",
      label: "Chi tiêu",
      children: <RnE />,
    },
    {
      key: "3",
      label: "Tài khoản",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div className="personanlInformation">
      <div className="formItem displayName">
        <img src={user.data?.avatar} className="avatar" />
        <label>{user.data.fullName as string}</label>
      </div>
      <Tabs rootClassName="tabInformation" defaultActiveKey="1" items={items} />
    </div>
  );
};

export default PersonalInformation;
