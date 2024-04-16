import React from "react";
import { formatMoney } from "../../../utils";

interface Props {
  className?: string;
  content: string;
  totals: number;
}
const Card = (props: Props) => {
  return (
    <div className={`card ${props.className}`}>
      <p className="money">{formatMoney(props.totals)}</p>
      <p className="label">{props.content}</p>
    </div>
  );
};

export default Card;
