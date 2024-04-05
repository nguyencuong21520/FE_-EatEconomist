import React from "react";
import { Input, Popover } from "antd";
import { EditOutlined, MinusCircleFilled } from "@ant-design/icons";
import { Obj } from "../Global/interface";
import CheckedUser from "../CheckedUser";
import "./styles.scss";
import { formatMoney } from "../../../utils/index.ts";
import { format } from "date-fns";

interface Props {
  handleDeleteOrder?: () => void;
  isView?: boolean;
  data?: Obj;
}
const Order = (props: Props) => {
  return (
    <div
      className={`order ${
        props.isView && props.data?.status == "done" ? "done-transition" : ""
      }`}
    >
      {props.isView ? (
        <>
          <h1 style={{ textAlign: "center" }}>{props.data?.user.fullName}</h1>
          <div className="infor">
            <img
              src={
                props.data?.user?.avatar ??
                "https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU="
              }
              alt=""
            />
            <div className="values">
              <div className="item">
                <p>
                  <b>Món:</b> {props.data?.name}
                </p>
              </div>
              <div className="item">
                <p>
                  <b>Giá: </b>
                  {props.data?.debitAmount &&
                    formatMoney(props.data?.debitAmount)}
                </p>
              </div>
              <div className="item">
                <p>
                  <b>Số lượng: </b>
                  {props.data?.amount}
                </p>
              </div>
              <div className="item">
                <p>
                  <b>Cập nhật mới: </b>
                  {props.data?.updatedAt &&
                    format(props.data?.updatedAt, "dd/MM/yyyy")}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
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
                <b>Món:</b> <Input size="small" />
              </div>
              <div className="item">
                <b>Giá:</b>{" "}
                <Input type="number" size="small" className="price" />
              </div>
              <div className="item">
                <b>Số lượng:</b>{" "}
                <Input type="number" size="small" className="price" />
              </div>
            </div>
          </div>
        </>
      )}

      {props.isView ? (
        ""
      ) : (
        <div className="userEnrolled">
          <b>Thành viên</b>
          <Popover content={<CheckedUser />} trigger={["click"]}>
            <EditOutlined />
          </Popover>
        </div>
      )}
    </div>
  );
};

export default Order;
