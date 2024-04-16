import { useContext, useEffect } from "react";
import { Checkbox } from "antd";
import "./styles.scss";
import actionRequest from "../../../utils/restApi";
import { StoreContext } from "../../../store/ProviderStore";
import { Obj } from "../Global/interface";
import { LoadingOutlined } from "@ant-design/icons";
import { Order as InterfaceOrder } from "../CreateBill/index";

interface Props {
  handleChange?: (index?: number, data?: InterfaceOrder) => void;
  handleUserPicked: (avatar: string, fullName: string) => void;
  index?: number;
  data?: InterfaceOrder;
}
const CheckedUser = (props: Props) => {
  const store = useContext(StoreContext);
  const accountList = store.accountList;

  const getInitials = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
  };

  const getAccountList = async () => {
    if (!Object.keys(accountList.data).length) {
      try {
        accountList.handleAccountList({
          ...accountList.data,
          loading: true,
        });
        const data = await actionRequest("api/v1/auth/user-list", "get");
        if (data) {
          accountList.handleAccountList({
            ...accountList,
            data: data.data?.data,
            loading: false,
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    getAccountList();
  }, []);
  return (
    <div className="checkedUser">
      <Checkbox.Group>
        {accountList.data?.loading ? (
          <LoadingOutlined />
        ) : (
          accountList.data?.data &&
          accountList.data?.data.map((item: Obj) => {
            return (
              <div className="itemUser" key={item._id}>
                <img src={item.avatar} alt="" className="imgUser" />
                <p>{item.fullName && getInitials(item.fullName)}</p>
                <Checkbox
                  value={item}
                  onChange={(e) => {
                    const newData: InterfaceOrder = {
                      ...(props.data as InterfaceOrder),
                      user: e.target.value._id,
                    };
                    props.handleChange?.(props.index, newData);
                    props.handleUserPicked(
                      e.target.value.avatar,
                      e.target.value.fullName
                    );
                  }}
                />
              </div>
            );
          })
        )}
      </Checkbox.Group>
    </div>
  );
};

export default CheckedUser;
