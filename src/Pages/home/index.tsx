import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DownOutlined, LoadingOutlined, UpOutlined } from "@ant-design/icons";
import Card from "../../Components/Card";
import Bill from "../../Components/BillCard";
import CardFriend from "../../Components/CardFriend";
import "./styles.scss";
import actionRequest from "../../../utils/restApi";
import { StoreContext } from "../../../store/ProviderStore";
import { Obj } from "../../Global/interface";
import ViewDetailTransaction from "../../Components/ViewDetailTransaction";

const Home = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const store = useContext(StoreContext);
  const user = store.user;
  const drawer = store.drawer;
  const transaction = store.transactions;
  const nav = useNavigate();

  const getTransaction = async () => {
    if (!Object.keys(transaction.data).length) {
      transaction.handleTransactions({
        ...transaction.data,
        loading: true,
      });
      const data = await actionRequest("api/v1/transaction/byUser", "get");
      transaction.handleTransactions({
        ...transaction.data,
        ...data.data,
        loading: false,
      });
    }
  };
  const getBudget = async () => {};

  const handleOpenDetailOrder = (item: Obj) => {
    drawer.handleDrawer({
      open: true,
      children: <ViewDetailTransaction data={item} />,
      title: "Detail đơn order",
      placement: "right",
      size: "default",
    });
  };
  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div className="homeTab">
      <div className="cards">
        <Card
          content="Debit"
          totals={user.data?.amountDebit}
          className="itemCard"
        />
        <Card
          content="Budget"
          totals={user.data?.budget}
          className="itemCard"
        />
      </div>
      <div className="bills">
        <p className="par">
          <span className="title">Đơn hàng</span>
          <span
            onClick={() => {
              nav("/list-order");
            }}
          >
            View All
          </span>
        </p>
        <div className="listBill">
          {transaction.data?.loading ? (
            <div>
              <LoadingOutlined />
            </div>
          ) : (
            transaction.data?.transaction &&
            transaction.data?.transaction?.slice(0, 4).map((tran: Obj) => {
              return (
                <div
                  key={tran._id}
                  onClick={() => {
                    handleOpenDetailOrder(tran);
                  }}
                >
                  <Bill data={tran} user={user} />
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* <div className={`friends ${showMore ? "show" : ""}`}>
        <button
          className="btnUpMore"
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {showMore ? <DownOutlined /> : <UpOutlined />}
        </button>
        <p className="titleUser">Thành viên X Room</p>
        <CardFriend />
        <CardFriend />
        <CardFriend />
        <CardFriend />
        <CardFriend />
        <CardFriend />
        <CardFriend />
        <CardFriend />
        <CardFriend />
        <CardFriend />
      </div> */}
    </div>
  );
};

export default Home;
