import { useContext, useState } from "react";
import "./styles.scss";
import copyIcon from "../../assets/copy-two-paper-sheets-interface-symbol.png";
import { Obj } from "../Global/interface";
import { Avatar, Alert, Button, Modal, message } from "antd";
import { format } from "date-fns";
import TransactionDetail from "./TransactionDetail";
import { formatMoney } from "../../../utils/index.ts";
import { StoreContext } from "../../../store/ProviderStore.tsx";

interface Props {
  data?: Obj;
}

const ViewDetailTransaction = (props: Props) => {
  const store = useContext(StoreContext);
  const user = store.user;
  const data = props.data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState({
    bankName: false,
    bankNumber: false,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied((prev) => {
          return {
            ...prev,
            [type]: true,
          };
        });
        message.success("Đã copy vào clipboard");
      })
      .catch(() => {
        setCopied((prev) => {
          return {
            ...prev,
            [type]: false,
          };
        });
        message.error("Copy Lỗi");
      });
    setTimeout(() => {
      setCopied((prev) => {
        return {
          ...prev,
          [type]: false,
        };
      });
    }, 3000);
  };

  const currentTransaction = data?.transactionDetailAffterMap.find(
    (item: Obj) => item.user?._id === user.data._id
  );

  return (
    <>
      <div className="info-wrapper">
        <h1>{data?.description}</h1>
        <p>{data?.date && format(new Date(data?.date), "dd/MM/yyyy")}</p>
        <div className="group-member">
          <p>
            <b>Người tham gia:</b> {data?.members && data?.members.length}
          </p>
          <Avatar.Group>
            {data?.transactionDetailAffterMap &&
              data?.transactionDetailAffterMap?.map((tran: Obj) => {
                return <Avatar key={tran.user?._id} src={tran.user?.avatar} />;
              })}
          </Avatar.Group>
        </div>
        <div className="owner">
          <span>
            {" "}
            <b>Chủ Đơn:</b> {data?.owner?.fullName}
          </span>
        </div>
        {currentTransaction && currentTransaction?.status === "done" ? (
          <Alert message="Bạn đã thanh toán " type="success" showIcon />
        ) : (
          <Alert
            message="Bạn chưa thanh toán "
            type="warning"
            showIcon
            action={
              <Button size="small" type="primary" onClick={showModal}>
                Thanh toán
              </Button>
            }
          />
        )}
      </div>
      <div className="listOrder">
        {data?.transactionDetailAffterMap &&
          data?.transactionDetailAffterMap.map((tran: Obj) => {
            return <TransactionDetail key={tran?._id} data={tran} />;
          })}
      </div>
      <div className="payment-info">
        <p>
          <b>Tổng tiền:</b> {formatMoney(data?.amount)}
        </p>
        <p style={{ color: "green" }}>
          <b>Giảm giá:</b> {formatMoney(data?.discount)}
        </p>
        <div className="line"></div>
        <h2>{formatMoney(data?.amount - data?.discount)}</h2>
      </div>
      <Modal
        title="Thông tin thanh toán"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="payment-info-wrapper">
          <div className="qr">
            <img src={user.data?.qr} alt="" />
          </div>
          <div className="bank-info">
            <h3>{user.data.fullName}</h3>
            <div>
              {" "}
              <p>
                {user.data.bankNumber}{" "}
                <img
                  onClick={() => {
                    handleCopy(user.data.bankNumber, "bankNumber");
                  }}
                  src={copyIcon}
                  alt=""
                />
              </p>
              {copied.bankNumber && <span>Đã copy </span>}
            </div>

            <div>
              {" "}
              <p>
                {user.data.bankName}{" "}
                <img
                  onClick={() => {
                    handleCopy(user.data.bankName, "bankName");
                  }}
                  src={copyIcon}
                  alt=""
                />
              </p>
              {copied.bankName && <span>Đã copy </span>}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewDetailTransaction;
