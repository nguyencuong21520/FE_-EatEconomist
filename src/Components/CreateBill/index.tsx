import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Obj } from '../Global/interface';
import Order from './Order';
import './styles.scss';

interface Props {
    isView?: boolean;
    data?: Obj[];
}
const CreateBill = (props: Props) => {
    const [orders, setOrders] = useState<Array<any>>([]);
    const handleCreateNewOrder = () => {
        setOrders([...orders, 1]);
    }
    return (
        <Form className="formCreateBill">
            <Form.Item
            >
                <label>Tên đơn</label>
                <Input className="input" />
            </Form.Item>
            <p style={{ fontSize: '1.6rem' }}><b style={{ fontSize: '1.6rem' }}>Danh sách Order</b>: {orders.length} <Button onClick={handleCreateNewOrder} style={{ width: 'fit-content', display: 'inline' }}><PlusOutlined /></Button></p>
            <div className="listOrder">
                {orders.map((_, idx) => {
                    return <Order key={idx} handleDeleteOrder={() => {
                        orders.splice(idx, 1);
                        setOrders([...orders]);
                    }} />
                })}
            </div>
            <label>Discount tổng đơn</label>
            <Input type="number" className="input" />
            <b><p style={{ fontSize: '1.6rem' }}>Tổng tiền:</p></b>
            <Button className="btnCreateBill" disabled={!orders.length}>
                Lên đơn
            </Button>
        </Form>
    )
}

export default CreateBill;