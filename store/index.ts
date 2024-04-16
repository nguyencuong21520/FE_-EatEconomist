
import { ContextStore } from "./ProviderStore";

const createHandleState = (keyStore: keyof ContextStore, keyUpdate: string, setState: React.Dispatch<React.SetStateAction<ContextStore>>) => {
    return (dataUpdate: any) => {
        setState((store) => {
            return {
                ...store,
                [keyStore]: {
                    ...store[keyStore],
                    [keyUpdate]: { ...dataUpdate }
                }
            }
        });
    }
}
const intContext: ContextStore = {
    drawer: {
        data: {
            open: false,
        },
        handleDrawer: () => { }
    },
    user: {
        data: {},
        handleUser:() => {

        },
    },
    modal: {
        data: {
            open: false,
        },
        handleModal:() =>{

        },
    },
    transactions: {
        data : {},
        handleTransactions:()=> {
        },
    },
    transactionDetails:{
        data: {},
        handleTransactionDetails:() => {
        },
    },
    accountList : {
        data: {},
        handleAccountList:() => {
        },
    }
}

export {
    createHandleState,
    intContext
}