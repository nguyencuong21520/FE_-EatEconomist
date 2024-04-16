import { useContext, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select } from "antd";
import Order from "./Order";
import "./styles.scss";
import { useFormik } from "formik";
import { formatMoney } from "../../../utils";
import actionRequest from "../../../utils/restApi";
import { toast } from "react-toastify";
import { StoreContext } from "../../../store/ProviderStore";

export interface Order {
  user: string;
  moneyDetail: number;
  status: "inprocess" | "done";
  name: string;
  amount: number;
}
const CreateBill = () => {
  const store = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const transaction = store.transactions;
  const [amountMoney, setAmountMoney] = useState(0);

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      amount: 0,
      discount: 0,
      type: "uneven",
      description: "",
      date: new Date(),
      transactionDetail: [],
      status: "inprocess",
    },
    async onSubmit(values) {
      try {
        setLoading(true);
        const createRespon = await actionRequest(
          "api/v1/transaction/create",
          "post",
          {
            body: values,
          }
        );
        if (createRespon.status == 201) {
          toast.success("Tạo đơn thành công");
          const data = await actionRequest("api/v1/transaction/byUser", "get");
          transaction.handleTransactions({
            ...transaction.data,
            ...data.data,
            loading: false,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });
  const handleCreateNewOrder = () => {
    const newOrder: Order = {
      user: "",
      moneyDetail: 0,
      status: "inprocess",
      name: "",
      amount: 0,
    };
    setFieldValue("transactionDetail", [...values.transactionDetail, newOrder]);
  };

  return (
    <Form className="formCreateBill" onFinish={handleSubmit}>
      <Form.Item>
        <label htmlFor="">Tên Đơn</label>
        <Input
          className="input"
          onChange={(e) => {
            setFieldValue("description", e.target.value);
          }}
        />
      </Form.Item>
      <div className="pick-wrapper">
        <Form.Item>
          <label htmlFor="">Kiểu đơn</label>{" "}
          <Select
            defaultValue="Chia lẻ"
            style={{ width: 120 }}
            onChange={(e) => {
              setFieldValue("type", e);
            }}
            options={[
              { value: "uneven", label: "Chia lẻ" },
              { value: "uniform", label: "Chia đều" },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <label htmlFor="">Ngày</label>{" "}
          <DatePicker
            onChange={(e) => {
              setFieldValue("date", e);
            }}
            picker="week"
          />
        </Form.Item>
      </div>

      <p style={{ fontSize: "1.6rem" }}>
        <>
          {" "}
          <b style={{ fontSize: "1.6rem" }}>Danh sách Order</b>:{" "}
          {values.transactionDetail.length}{" "}
          <Button
            onClick={handleCreateNewOrder}
            style={{ width: "fit-content", display: "inline" }}
          >
            <PlusOutlined />
          </Button>
        </>
      </p>
      <div className="listOrder">
        {values.transactionDetail.map((transaction, idx) => {
          return (
            <Order
              data={transaction}
              index={idx}
              key={idx}
              handleDeleteOrder={() => {
                values.transactionDetail.splice(idx, 1);
                setFieldValue("transactionDetail", [
                  ...values.transactionDetail,
                ]);
              }}
              handleChange={(idx, transaction) => {
                (values.transactionDetail[Number(idx)] as any) = transaction;
                setFieldValue("transactionDetail", [
                  ...values.transactionDetail,
                ]);

                setAmountMoney(() => {
                  let sumMoney = 0;

                  values.transactionDetail.forEach((e: Order) => {
                    sumMoney += e.moneyDetail;
                  });

                  return sumMoney;
                });
                setFieldValue("amount", amountMoney);
              }}
            />
          );
        })}
      </div>

      <>
        {" "}
        <label>Discount tổng đơn</label>
        <Input
          type="number"
          className="input"
          onChange={(e) => {
            setFieldValue("discount", Number(e.target.value));
          }}
        />
        <b>
          <p style={{ fontSize: "1.6rem" }}>
            Tổng tiền: {amountMoney && formatMoney(amountMoney)}
          </p>
        </b>
        <Button
          className="btnCreateBill"
          disabled={!values.transactionDetail.length}
          htmlType="submit"
        >
          {loading ? <LoadingOutlined /> : "Lên đơn"}
        </Button>
      </>
    </Form>
  );
};

export default CreateBill;
