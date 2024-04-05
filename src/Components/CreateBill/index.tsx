import React, { useContext, useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Obj } from "../Global/interface";
import Order from "./Order";
import "./styles.scss";
import actionRequest from "../../../utils/restApi";
import { StoreContext } from "../../../store/ProviderStore";
import { format } from "date-fns";
import { formatMoney } from "../../../utils/index.ts";

interface Props {
  isView?: boolean;
  data?: Obj;
}
const CreateBill = (props: Props) => {
  const [orders, setOrders] = useState<Array<unknown>>([]);
  const store = useContext(StoreContext);
  const transactionDetails = store.transactionDetails as Obj;
  const handleCreateNewOrder = () => {
    setOrders([...orders, 1]);
  };

  const transaction = props.data;

  const getAllTransactions = async () => {
    const data = await actionRequest("api/v1/transaction/detail", "get", {
      query: {
        id: transaction?.transactionId._id,
      },
    });

    transactionDetails.handleTransactionDetails({
      ...transactionDetails.data,
      ...data.data,
      loading: false,
    });
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  console.log("alo", transactionDetails);

  return (
    <Form className="formCreateBill">
      {props.isView ? (
        <>
          <p>
            {" "}
            <b>Tên đơn:</b> {transactionDetails?.data?.transaction?.description}
          </p>
          <p>
            <b>Thời gian:</b>{" "}
            {transactionDetails?.data?.transaction?.createdAt &&
              format(
                new Date(transactionDetails?.data?.transaction?.createdAt),
                "dd/MM/yyyy"
              )}
          </p>
        </>
      ) : (
        <Form.Item>
          <Input className="input" />
        </Form.Item>
      )}

      <p style={{ fontSize: "1.6rem" }}>
        {props.isView ? (
          <>
            {" "}
            <b>Người tham gia</b>:{" "}
            {transactionDetails.data?.loading ||
            !transactionDetails?.data?.detail?.length ? (
              <LoadingOutlined />
            ) : (
              transactionDetails?.data?.detail?.length
            )}{" "}
            Người
            <p>
              <b>Chủ đơn: </b>
              {transactionDetails?.data?.transaction?.owner?.fullName}
            </p>
          </>
        ) : (
          <>
            {" "}
            <b style={{ fontSize: "1.6rem" }}>Danh sách Order</b>:{" "}
            {transactionDetails?.data?.detail?.length}{" "}
            <Button
              onClick={handleCreateNewOrder}
              style={{ width: "fit-content", display: "inline" }}
            >
              <PlusOutlined />
            </Button>
          </>
        )}
      </p>
      <div className="listOrder">
        {!props.isView ? (
          orders.map((_, idx) => {
            return (
              <Order
                key={idx}
                handleDeleteOrder={() => {
                  orders.splice(idx, 1);
                  setOrders([...orders]);
                }}
              />
            );
          })
        ) : transactionDetails.data?.loading ||
          !transactionDetails?.data?.detail ? (
          <LoadingOutlined />
        ) : (
          (transactionDetails?.data?.detail as Obj[])?.map((item, idx) => {
            return <Order key={idx} isView data={item} />;
          })
        )}
      </div>
      {props.isView ? (
        <>
          <label>Discount tổng đơn</label>
          <h2 style={{ color: "green" }}>
            {transactionDetails?.data?.transaction?.discount &&
              formatMoney(transactionDetails?.data?.transaction?.discount)}
          </h2>{" "}
          <hr />
          <b>
            <p style={{ fontSize: "1.6rem" }}>
              Tổng tiền:{" "}
              {transactionDetails?.data?.transaction?.amount &&
                formatMoney(transactionDetails?.data?.transaction?.amount)}
            </p>
          </b>
        </>
      ) : (
        <>
          {" "}
          <label>Discount tổng đơn</label>
          <Input type="number" className="input" />
          <b>
            <p style={{ fontSize: "1.6rem" }}>Tổng tiền:</p>
          </b>
          <Button className="btnCreateBill" disabled={!orders.length}>
            Lên đơn
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateBill;
