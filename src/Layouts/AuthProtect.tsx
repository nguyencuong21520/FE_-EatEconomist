import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import actionRequest from '../../utils/restApi';
import { StoreContext } from '../../store/ProviderStore';
import './layout.scss';

interface Props {
    children: React.ReactNode;
}

const AuthProtect = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const nav = useNavigate();
    const store = useContext(StoreContext);
    const user = store.user;

    const getUserInfo = async () => {
        const userInfo = await actionRequest("/api/v1/auth/current-user", "get");
        user.handleUser({
            ...user.data,
            ...userInfo.data.data,
            message: userInfo.data.message as string
        });
    }

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            nav('/auth/login');
        } else {
            getUserInfo();
        }
    }, []);
    useEffect(() => {
        if (user.data._id) {
            setLoading(false);
        }
    }, [user.data]);
    if (loading) return <div className="loadingAuth"><LoadingOutlined size={150} /></div>
    return (
        props.children
    )
}

export default AuthProtect;