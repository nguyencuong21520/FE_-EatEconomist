import React from "react";
import { Alert, Avatar } from "antd";
import { Obj } from "../Global/interface";
import "./styles.scss";
import { format } from "date-fns";
import { formatMoney } from "../../../utils";

interface Props {
  data?: Obj;
  user?: Obj;
  status?: "owed" | "paid";
}
const Bill = (props: Props) => {
  const data = props.data || {};

  const currentTransaction = data?.transactionDetailAffterMap.find(
    (item: Obj) => item.user?._id === props.user?.data._id
  );

  return (
    <div className="bill">
      <div className="overviewBill">
        <div className="img">
          <img src={data.owner?.avatar} alt="" />
        </div>
        <div className="content">
          <p className="title">{data.description}</p>
          <p className="date">
            {data.date && format(new Date(data?.date), "dd/MM/yyyy")}
          </p>
        </div>
        <div className="totalMustPay">
          {data.amount && formatMoney(data.amount)}
        </div>
      </div>
      <hr />
      <div className="infoUserEnrolled">
        <Avatar.Group className="usersEnrolled">
          {data?.transactionDetailAffterMap &&
            data?.transactionDetailAffterMap?.map((tran: Obj) => {
              return <Avatar key={tran.user?._id} src={tran.user?.avatar} />;
            })}
        </Avatar.Group>
        {currentTransaction && currentTransaction?.status === "done" ? (
          <Alert message="Bạn đã thanh toán " type="success" showIcon />
        ) : (
          <Alert message="Bạn chưa thanh toán " type="warning" showIcon />
        )}
      </div>
    </div>
  );
};

export default Bill;
