import React from 'react';
import logo from '../../assets/logo.png';
import './styles.scss';

interface Props {
    className?: string;
}
const Header = (props: Props) => {
    return (
        <div className="header">
            <div className="logo">
                <div className="imgLogo"> <img className="iconLogo" src={logo} /></div>
                <h1>14X</h1>
            </div>
            <div className="user">
                <img src="https://i.pinimg.com/originals/1e/c8/f4/1ec8f463568b4cfae39a71b3c1b20abc.png" alt="" />
            </div>
        </div>
    )
}

export default Header;