import { useContext, useEffect, useState } from "react";
import { Input } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { StoreContext } from "../../../store/ProviderStore";
import BarsFilter from "../Icons/BarsFilter";
import OrderCard from "./OrderCard";
import "./styles.scss";
import actionRequest from "../../../utils/restApi";
import { Obj } from "../Global/interface";
import ViewDetailTransaction from "../ViewDetailTransaction";

const ListOrder = () => {
  const store = useContext(StoreContext);
  const [searchValue, setSearchValue] = useState("");
  const drawer = store.drawer;
  const transaction = store.transactions;

  const handleOpenDetailOrder = (item: Obj) => {
    drawer.handleDrawer({
      open: true,
      children: <ViewDetailTransaction data={item} />,
      title: "Detail đơn order",
      placement: "right",
      size: "default",
    });
  };

  const getTransaction = async () => {
    if (!Object.keys(transaction.data).length) {
      const data = await actionRequest("api/v1/transaction/byUser", "get");
      transaction.handleTransactions({
        ...transaction.data,
        ...data.data,
        loading: false,
      });
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div className="listOrder">
      <div className="filterBar">
        <Input
          prefix={<SearchOutlined />}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          value={searchValue}
        />
        <BarsFilter className="iconFilter" />
      </div>
      <p className="titleResult">
        {transaction.data.loading || !transaction.data?.transaction ? (
          <LoadingOutlined />
        ) : (
          transaction.data?.pagination?.totalItems + " Kết quả"
        )}
      </p>
      <div className="list">
        <div className="parent">
          {!transaction.data.loading &&
            (transaction?.data?.transaction as any[])
              ?.filter((item: Obj) =>
                item?.description
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              ?.map((item: Obj) => {
                return (
                  <div
                    key={item._id}
                    className={`itemCard`}
                    onClick={() => {
                      handleOpenDetailOrder(item);
                    }}
                  >
                    <OrderCard data={item} />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
