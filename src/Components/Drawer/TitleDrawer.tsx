import React, { useContext } from 'react';
import './styles.scss';
import { StoreContext } from '../../../store/ProviderStore';

const TitleDrawer = () => {
    const store = useContext(StoreContext);
    const user = store.user;

    return (
        <div className="titleDrawer">
            <span>{user.data.fullName as string}</span>
            <img src="https://i.pinimg.com/736x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg" alt="" />
        </div>
    )
}

export default TitleDrawer;