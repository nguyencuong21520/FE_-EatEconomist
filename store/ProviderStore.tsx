import React, { createContext, useState } from 'react';
import { ModalProps } from 'antd';
import { Data, Drawer } from '../src/Global/interface';
import { createHandleState, intContext } from '.';

export interface ContextStore {
    drawer: {
        data: Drawer;
        handleDrawer: (propsDrawer?: Drawer) => void
    },
    user: {
        data: Data;
        handleUser: (user?: Data) => void;
    },
    modal: {
        data: ModalProps;
        handleModal: (modalOptions?: ModalProps) => void;
    }
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
    return (
        <StoreContext.Provider value={{
            ...value,
            drawer: {
                ...value.drawer,
                handleDrawer: (data) => handleDrawer(data)
            },
            modal: {
                ...value.modal,
                handleModal: (modalOptions) => handleModal(modalOptions),
            },
            user: {
                ...value.user,
                handleUser: (user) => handleUser(user)
            }
        }}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default ProviderStore;