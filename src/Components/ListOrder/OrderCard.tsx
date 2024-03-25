import React from 'react';
import Tick from '../Icons/Tick';
import './styles.scss';
import Close from '../Icons/Close';

const OrderCard = () => {
    return (
        <div className="orderCard">
            <img src="https://media.istockphoto.com/id/1038355632/vector/hamburger-icon.jpg?s=612x612&w=0&k=20&c=0lwYqfJxkss5KKmDPAFZRJ9_2-z3h1tRAfFyAKpVEYU=" alt="" />
            <p className="title">
                Tên đơn hàng đặt nè....
            </p>
            <p className="price">Tổng: $500.00</p>
            <p>Chủ đơn: NN.Anh</p>
            <button className={`iconStatus unCheck`} >
                {/* <Tick /> */}
                <Close />
            </button>
        </div>
    )
}

export default OrderCard;