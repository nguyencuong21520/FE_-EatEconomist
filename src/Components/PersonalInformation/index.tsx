import { useContext, useRef, useState } from "react";
import { Button, Tabs, TabsProps } from "antd";
import Personal from "./Personal";
import RnE from "./RnE";
import { StoreContext } from "../../../store/ProviderStore";
import "./styles.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import actionRequest from "../../../utils/restApi";

const PersonalInformation = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const store = useContext(StoreContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const user = store.user;

  const handleClickUpdateAvatar = () => {
    inputRef.current?.click();
  };

  const handleUpdateImg = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      const respon = await actionRequest("api/v1/auth/uppdate-avatar", "post", {
        body: formData,
      });
      if (respon.status == 200) {
        toast.success("Cập nhật ảnh đại diện thành công");
        user.handleUser({
          ...user.data,
          avatar: respon.data?.data.avatar,
          loading: false,
        });
      }
    } catch (error) {
      toast.error("Error updating" + error);
    } finally {
      setLoading(false);
    }
  };

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
        <img
          src={file ? URL.createObjectURL(file) : user.data?.avatar}
          className="avatar"
        />
        <div className="acction_upload">
          <Button onClick={handleClickUpdateAvatar}>Chọn ảnh</Button>

          <input
            ref={inputRef}
            id="avatar_id"
            type="file"
            accept="image/*"
            name=""
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
          />
          <Button onClick={handleUpdateImg} type="primary">
            {loading ? <LoadingOutlined /> : "Upload"}
          </Button>
        </div>

        <label>{user.data.fullName as string}</label>
      </div>
      <Tabs rootClassName="tabInformation" defaultActiveKey="1" items={items} />
    </div>
  );
};

export default PersonalInformation;
