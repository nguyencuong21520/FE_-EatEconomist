import React, { useContext, useState } from "react";
import { Button } from "antd";

import "./styles.scss";
import { Obj } from "../Global/interface";
import { formatMoney } from "accounting";
import { format } from "date-fns";
import actionRequest from "../../../utils/restApi";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { StoreContext } from "../../../store/ProviderStore";

interface Props {
  data: Obj;
}

const TransactionDetail = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const store = useContext(StoreContext);
  const transaction = store.transactions;
  const data = props.data;

  const updateTransactionDetailAffterMap = (
    transaction: Obj[],
    transactionDetailUpdate: Obj
  ) => {
    const transactionDetailAffterMap = transaction.map((item: Obj) => {
      return {
        ...item,
        transactionDetailAffterMap: item.transactionDetailAffterMap?.map(
          (tran: Obj) => {
            if (tran._id === transactionDetailUpdate._id) {
              return transactionDetailUpdate;
            } else {
              return tran;
            }
          }
        ),
      };
    });
    return transactionDetailAffterMap;
  };

  const handleChangeStatus = () => {
    setLoading(true);
    updateTransactionDetail();
  };

  const updateTransactionDetail = async () => {
    try {
      const updateRespon = await actionRequest(
        `api/v1/transaction/update-detail`,
        "put",
        {
          query: {
            id: data?._id,
          },
          body: {
            status: "done",
          },
        }
      );
      if (updateRespon.status === 200) {
        toast.success("Cập nhật thành công");
        const newData = updateTransactionDetailAffterMap(
          transaction.data?.transaction,
          updateRespon?.data?.transactionDetail
        );

        transaction.handleTransactions({
          ...transaction.data,
          transaction: newData,
          loading: false,
        });
      }
    } catch (error) {
      toast.error("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`transactionDetail ${
        data.status === "done" ? "done-transaction" : ""
      }`}
    >
      <div className="top">
        <div className="owner">
          <div className="avatar">
            <img src={data?.user.avatar} alt="" />
          </div>
          <p style={{ fontSize: "13px" }}>{data.user.fullName}</p>
        </div>
        <div className="info">
          <p>
            <b>Tên Món: </b> {data.name}
          </p>
          <p>
            <b>Số lượng: </b> {data.amount}
          </p>
          <div className="price">
            <p>
              <b>Giá: </b>
            </p>
            <div>
              <p>{formatMoney(data?.debitAmount)}</p>
              <p style={{ fontSize: "10px", textDecoration: "line-through" }}>
                {formatMoney(data?.moneyDetail)}
              </p>
            </div>
          </div>
          <p>
            <b>Lastest update: </b>{" "}
            {data?.updatedAt && format(new Date(data?.updatedAt), "dd/MM/yyyy")}
          </p>
        </div>
      </div>
      <div className="bottom">
        {data.status === "done" ? (
          ""
        ) : (
          <Button
            className="success-button"
            size="small"
            onClick={handleChangeStatus}
          >
            {loading ? <LoadingOutlined /> : "Done"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TransactionDetail;
