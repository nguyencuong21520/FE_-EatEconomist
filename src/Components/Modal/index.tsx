import React, { useContext } from 'react';
import { Modal as ModalComponent } from 'antd';
import { StoreContext } from '../../../store/ProviderStore';

const Modal = () => {
    const store = useContext(StoreContext);
    const storeModal = store.modal;
    return (store.modal.data.open && <ModalComponent {...storeModal.data} onCancel={() => {
        store.modal.handleModal({
            open: false
        });
    }} />
    )
}

export default Modal;