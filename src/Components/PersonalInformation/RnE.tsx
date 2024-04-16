import { useContext, useState } from "react";
import Form from "antd/es/form/Form";
import { Button, Input } from "antd";
import "./styles.scss";
import { StoreContext } from "../../../store/ProviderStore";
import actionRequest from "../../../utils/restApi";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

const RnE = () => {
  const store = useContext(StoreContext);
  const user = store.user;
  const [budget, setBudget] = useState(user.data?.budget);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const respon = await actionRequest("api/v1/auth/current-user", "put", {
        body: { budget },
      });

      if (respon.status === 200) {
        toast.success("Cập nhật thành công");
        user.handleUser({
          ...user.data,
          ...respon.data?.data,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="rne">
      <Form>
        <label>Budget</label>
        <Input
          size="small"
          value={budget}
          onChange={(e) => {
            setBudget(e.target.value);
          }}
        />
        <div className="groupBtn">
          <Button size="small" onClick={handleSubmit}>
            {loading ? <LoadingOutlined /> : "Cập nhật"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RnE;
