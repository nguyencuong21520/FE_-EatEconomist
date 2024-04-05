import React from "react";
import Tick from "../Icons/Tick";
import "./styles.scss";
import Close from "../Icons/Close";
import { Obj } from "../Global/interface";
import Time from "../Icons/Time";
import { format } from "date-fns";
import { formatMoney } from "../../../utils";

interface Props {
  data?: Obj;
}

const OrderCard = (props: Props) => {
  return (
    <div className="orderCard">
      <img
        src="https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU="
        alt=""
      />
      <h2 className="title">{props.data?.name}</h2>
      <p className="price">
        Tổng:{" "}
        {props.data?.moneyDetail * props.data?.amount &&
          formatMoney(props.data?.moneyDetail * props.data?.amount)}
      </p>
      <p className="time">
        <Time style={{ width: "30px", height: "30px" }} />{" "}
        {format(new Date(props.data?.createdAt), "dd/MM/yyyy")}
      </p>
      <button
        className={`iconStatus ${
          props.data?.status == "done" ? "check" : "unCheck"
        }`}
      >
        {props.data?.status == "done" ? <Tick /> : <Close />}
      </button>
    </div>
  );
};

export default OrderCard;
