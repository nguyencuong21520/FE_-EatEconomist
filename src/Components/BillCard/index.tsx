import React from 'react';
import { Avatar } from 'antd';
import { Obj } from '../Global/interface';
import './styles.scss';

interface Props {
    data?: Obj;
    status?: 'owed' | 'paid';
}
const Bill = (props: Props) => {
    return (
        <div className="bill">
            <div className="overviewBill">
                <div className="img">
                    <img src="https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU=" alt="" />
                </div>
                <div className="content">
                    <p className="title">Ăn trưa</p>
                    <p className="date">T5, 26/3/2024</p>
                </div>
                <div className="totalMustPay">
                    $ 1500.00
                </div>
            </div>
            <hr />
            <div className="infoUserEnrolled">
                <Avatar.Group className="usersEnrolled">
                    <Avatar src="https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU=" />
                    <Avatar src="https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU=" />
                    <Avatar src="https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU=" />
                    <Avatar src="https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU=" />
                </Avatar.Group>
                <div className={`statusPurchase ${props.status ?? 'owed'}`}>
                    <span>Bạn đã thanh toán</span>
                    <span className="money">$ 500.00</span>
                </div>
            </div>
        </div>
    )
}

export default Bill;