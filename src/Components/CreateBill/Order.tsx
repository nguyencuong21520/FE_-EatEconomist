import React from "react";
import { Input, Popover } from "antd";
import { EditOutlined, MinusCircleFilled } from "@ant-design/icons";
import CheckedUser from "../CheckedUser";
import "./styles.scss";
import { Order as InterfaceOrder } from "./index.tsx";
interface Props {
  handleDeleteOrder?: () => void;
  isView?: boolean;
  data?: InterfaceOrder;
  index?: number;
  handleChange?: (index?: number, data?: InterfaceOrder) => void;
}
const Order = (props: Props) => {
  return (
    <div className={`order`}>
      <>
        <button className="minus" onClick={() => props.handleDeleteOrder?.()}>
          <MinusCircleFilled />
        </button>
        <div className="infor">
          <img
            src="https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU="
            alt=""
          />
          <div className="values">
            <div className="item">
              <b>Món:</b>{" "}
              <Input
                type="text"
                size="small"
                onChange={(e) => {
                  const newData: InterfaceOrder = {
                    ...(props.data as InterfaceOrder),
                    name: e.target.value,
                  };
                  props.handleChange?.(props.index, newData);
                }}
              />
            </div>
            <div className="item">
              <b>Giá:</b>{" "}
              <Input
                type="number"
                size="small"
                className="price"
                onChange={(e) => {
                  const newData: InterfaceOrder = {
                    ...(props.data as InterfaceOrder),
                    moneyDetail: Number(e.target.value),
                  };
                  props.handleChange?.(props.index, newData);
                }}
              />
            </div>
            <div className="item">
              <b>Số lượng:</b>{" "}
              <Input
                type="number"
                size="small"
                className="price"
                onChange={(e) => {
                  const newData: InterfaceOrder = {
                    ...(props.data as InterfaceOrder),
                    amount: Number(e.target.value),
                  };
                  props.handleChange?.(props.index, newData);
                }}
              />
            </div>
          </div>
        </div>
      </>

      <div className="userEnrolled">
        <b>Thành viên</b>
        <Popover
          content={
            <CheckedUser
              handleChange={props.handleChange}
              index={props.index}
              data={props.data}
            />
          }
          trigger={["click"]}
        >
          <EditOutlined />
        </Popover>
      </div>
    </div>
  );
};

export default Order;
