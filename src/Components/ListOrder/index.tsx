import React, { useContext } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../store/ProviderStore';
import BarsFilter from '../Icons/BarsFilter';
import OrderCard from './OrderCard';
import CreateBill from '../CreateBill';
import './styles.scss';

const ListOrder = () => {
    const store = useContext(StoreContext);
    const drawer = store.drawer;
    const handleOpenDetailOrder = () => {
        drawer.handleDrawer({
            open: true,
            children: <CreateBill />,
            title: "Detail đơn order",
            placement: "right",
            size: "default"
        });
    }
    return (
        <div className="listOrder">
            <div className="filterBar">
                <Input prefix={<SearchOutlined />} />
                <BarsFilter className="iconFilter" />
            </div>
            <p className="titleResult">250 Kết quả</p>
            <div className="list">
                <div className="parent">
                    {[1, 2, 3, 4, 5].map((item) => {
                        return <div key={item} className={`itemCard`} onClick={() => {
                            handleOpenDetailOrder();
                        }}>
                            <OrderCard />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ListOrder;