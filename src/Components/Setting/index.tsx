import React, { useContext } from 'react';
import Order from '../Icons/Order';
import User from '../Icons/User';
import Logout from '../Icons/Logout';
import { StoreContext } from '../../../store/ProviderStore';
import './styles.scss';

const Setting = () => {
    const store = useContext(StoreContext);
    const listSetting = [
        {
            label: "Thông tin cá nhân",
            icon: <User className="icon" />
        },
        {
            label: "Danh sách đơn hàng",
            icon: <Order className="icon" />
        },
    ]
    return (
        <div className="setting">
            {listSetting.map((item, idx) => {
                return <div key={idx} className="itemSetting">{item.icon} {item.label}</div>
            })}
            <button className="btnLogout" onClick={() => {
                store.modal.handleModal({
                    open: true,
                    title: "Bạn muốn đăng xuất?",
                    cancelText: "Huỷ",
                    okText: "Đồng ý",
                    wrapClassName: "modalLogout",
                    centered: true,
                    onOk() {
                        window.location.assign("/auth/login");
                    }
                });
            }}>
                <Logout /> Đăng xuất
            </button>
        </div>
    )
}
export default Setting;
