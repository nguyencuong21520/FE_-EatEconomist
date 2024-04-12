import React, { useContext } from "react";
import Tick from "../Icons/Tick";
import "./styles.scss";
import Close from "../Icons/Close";
import { Obj } from "../Global/interface";
import Time from "../Icons/Time";
import { format } from "date-fns";
import { StoreContext } from "../../../store/ProviderStore";
import { formatMoney } from "../../../utils/index.ts";

interface Props {
  data?: Obj;
}

const OrderCard = (props: Props) => {
  const store = useContext(StoreContext);
  const user = store.user;

  const transactionDetailOfOwner = props.data?.transactionDetailAffterMap.find(
    (item: Obj) => item.user?._id === user.data._id
  );

  return (
    <div className="orderCard">
      <img src={props.data?.owner.avatar} alt="" />
      <h2>
        {transactionDetailOfOwner?.debitAmount &&
          formatMoney(transactionDetailOfOwner?.debitAmount)}
      </h2>
      <h2 className="title">{props.data?.description}</h2>
      <p className="price">Chủ đơn: {props.data?.owner.fullName}</p>
      <p className="time">
        <Time style={{ width: "25px", height: "25px" }} />{" "}
        {format(new Date(props.data?.createdAt), "dd/MM/yyyy")}
      </p>
      <button
        className={`iconStatus ${
          transactionDetailOfOwner?.status == "done" ? "check" : "unCheck"
        }`}
      >
        {transactionDetailOfOwner?.status == "done" ? <Tick /> : <Close />}
      </button>
    </div>
  );
};

export default OrderCard;
