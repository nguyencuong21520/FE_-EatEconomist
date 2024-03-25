import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import Card from '../../Components/Card';
import Bill from '../../Components/BillCard';
import CardFriend from '../../Components/CardFriend';
import './styles.scss';

const Home = () => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const nav = useNavigate();
    return (
        <div className="homeTab">
            <div className="cards">
                <Card className="itemCard" />
                <Card className="itemCard" />
            </div>
            <div className="bills">
                <p className="par">
                    <span className="title">Pending Bills</span>
                    <span onClick={() => {
                        nav('/list-order');
                    }}>View All</span>
                </p>
                <div className="listBill">
                    <Bill />
                    <Bill />
                </div>
            </div>
            <div className={`friends ${showMore ? "show" : ""}`}>
                <button className="btnUpMore" onClick={() => {
                    setShowMore(!showMore);
                }}>
                    {showMore ? <DownOutlined /> : <UpOutlined />}
                </button>
                <p className="titleUser">Thành viên X Room</p>
                <CardFriend />
                <CardFriend />
                <CardFriend />
                <CardFriend />
                <CardFriend />
                <CardFriend />
                <CardFriend />
                <CardFriend />
                <CardFriend />
                <CardFriend />
            </div>
        </div>
    )
}

export default Home;