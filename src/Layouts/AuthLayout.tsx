import { Outlet } from 'react-router-dom';
import logo from '../assets/logo.png';


const AuthLayout = () => {
    return (
        <div className="authLayout">
            <div className="headerAuth">
                <div className="logo">
                    <div className="imgLogo"> <img className="iconLogo" src={logo} /></div>
                    <h1>14X</h1>
                </div>
                <p>Chào mừng đến với 14X Room</p>
            </div>
            <div className="contentAuth">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout;