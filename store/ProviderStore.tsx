import React, { createContext, useState } from "react";
import { ModalProps } from "antd";
import { Data, Drawer, Obj } from "../src/Global/interface";
import { createHandleState, intContext } from ".";

export interface ContextStore {
  drawer: {
    data: Drawer;
    handleDrawer: (propsDrawer?: Drawer) => void;
  };
  user: {
    data: Data;
    handleUser: (user?: Data) => void;
  };
  modal: {
    data: ModalProps;
    handleModal: (modalOptions?: ModalProps) => void;
  };
  transactions: {
    data: Data;
    handleTransactions: (transactions?: Data) => void;
  };
  transactionDetails: {
    data: Data;
    handleTransactionDetails: (transactionDetails?: Data) => void;
  };
  accountList: {
    data: Data;
    handleAccountList: (accountList?: Data) => void;
  };
}

interface Props {
  children?: React.ReactNode;
}

export const StoreContext = createContext<ContextStore>(intContext);
const ProviderStore = (props: Props) => {
  const [value, setValue] = useState<ContextStore>(intContext);
  const handleDrawer = createHandleState("drawer", "data", setValue);
  const handleModal = createHandleState("modal", "data", setValue);
  const handleUser = createHandleState("user", "data", setValue);
  const handleTransactions = createHandleState(
    "transactions",
    "data",
    setValue
  );
  const handleTransactionDetails = createHandleState(
    "transactionDetails",
    "data",
    setValue
  );
  const handleAccountList = createHandleState("accountList", "data", setValue);
  return (
    <StoreContext.Provider
      value={{
        ...value,
        drawer: {
          ...value.drawer,
          handleDrawer: (data) => handleDrawer(data),
        },
        modal: {
          ...value.modal,
          handleModal: (modalOptions) => handleModal(modalOptions),
        },
        user: {
          ...value.user,
          handleUser: (user) => handleUser(user),
        },
        transactions: {
          ...value.transactions,
          handleTransactions: (transactions) =>
            handleTransactions(transactions),
        },
        transactionDetails: {
          ...value.transactionDetails,
          handleTransactionDetails: (transactionDetails) =>
            handleTransactionDetails(transactionDetails),
        },
        accountList: {
          ...value.accountList,
          handleAccountList: (accountList) => handleAccountList(accountList),
        },
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default ProviderStore;
