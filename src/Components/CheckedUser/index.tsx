import React from 'react';
import { Checkbox } from 'antd';
import './styles.scss';

interface Props {

}
const CheckedUser = (props: Props) => {
    const listUser = [
        {
            id: 1,
            userName: "NV.A"
        },
        {
            id: 2,
            userName: "NV.A"
        },
        {
            id: 3,
            userName: "NV.A"
        },
        {
            id: 4,
            userName: "NV.A"
        },
    ]
    return (
        <div className="checkedUser">
            <Checkbox.Group>
                {listUser.map((item) => {
                    return <div className="itemUser" key={item.id}>
                        <img src="https://res.cloudinary.com/dxo374ch8/image/upload/v1710487616/blob14e91f66-faeb-40cb-aeda-49f10b1f7ac8.webp" alt="" className="imgUser" />
                        <p>NV.A</p>
                        <Checkbox value={item.id} />
                    </div>
                })}
            </Checkbox.Group>
        </div>
    )
}

export default CheckedUser;