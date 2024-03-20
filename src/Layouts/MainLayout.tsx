import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { StoreContext } from '../../store/ProviderStore';
import Home from '../Components/Icons/Home';
import ArrowDouble from '../Components/Icons/ArrowDouble';
import User from '../Components/Icons/User';
import Plus from '../Components/Icons/Plus';
import Header from '../Components/Header';
import IconSetting from '../Components/Icons/Setting';
import TitleDrawer from '../Components/Drawer/TitleDrawer';
import Setting from '../Components/Setting';
import './layout.scss';

const MainLayout = () => {
    const store = useContext(StoreContext);
    const handleDrawer = (type: "SETTING") => {
        switch (type) {
            case "SETTING":
                store.drawer.handleDrawer({
                    ...store.drawer.data,
                    open: true,
                    title: <TitleDrawer />,
                    children: <Setting />,
                    closeIcon: <ArrowRightOutlined />,
                    rootClassName: "settingDrawer"
                });
                break;
            default:
                break;
        }
    }
    return (
        <div className="mainLayout">
            <div className="containerMainContent">
                <Header />
                <Outlet />
            </div>
            <div className="menuBar">
                <div className="groupMenu">
                    <div className="divIcon">
                        <Home className="icon" />
                    </div>
                    <div className="divIcon">
                        <ArrowDouble className="icon" />
                    </div>
                    <div className="divIcon iconCenter">
                        <Plus className="icon" />
                    </div>
                    <div className="divIcon">
                        <User className="icon" />
                    </div>
                    <div className="divIcon">
                        <IconSetting className="icon" onClick={() => handleDrawer("SETTING")} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout;