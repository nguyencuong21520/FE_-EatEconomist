import React from 'react';
import { Input, Popover } from 'antd';
import { EditOutlined, MinusCircleFilled } from '@ant-design/icons';
import CheckedUser from '../CheckedUser';
import './styles.scss';

interface Props {
    handleDeleteOrder?: () => void;
}
const Order = (props: Props) => {
    return (
        <div className="order">
            <button className="minus" onClick={()=>props.handleDeleteOrder?.()}><MinusCircleFilled /></button>
            <div className="infor">
                <img src="https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU=" alt="" />
                <div className="values">
                    <div className="item">
                        <b>Món:</b> <Input size="small" />
                    </div>
                    <div className="item">
                        <b>Giá:</b> <Input type="number" size="small" className="price" />
                    </div>
                    <div className="item">
                        <b>Số lượng:</b> <Input type="number" size="small" className="price" />
                    </div>
                </div>
            </div>
            <div className="userEnrolled">
                <b>Thành viên</b>
                <Popover content={<CheckedUser />} trigger={["click"]}>
                    <EditOutlined />
                </Popover>
            </div>
        </div >
    )
}

export default Order;