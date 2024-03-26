import { useContext } from 'react';
import { Tabs, TabsProps } from 'antd';
import Personal from './Personal';
import RnE from './RnE';
import { StoreContext } from '../../../store/ProviderStore';
import './styles.scss';

interface Props {

}
const onChange = (key: string) => {
    console.log(key);
};

const PersonalInformation = (props: Props) => {
    const store = useContext(StoreContext);
    const user = store.user;
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Cá nhân',
            children: <Personal />,
        },
        {
            key: '2',
            label: "Chi tiêu",
            children: <RnE />,
        },
        {
            key: '3',
            label: 'Tài khoản',
            children: 'Content of Tab Pane 3',
        },
    ];
    return (
        <div className="personanlInformation">
            <div className="formItem displayName">
                <img src="https://seeklogo.com/images/D/doraemon-logo-4E89A9406B-seeklogo.com.png" className="avatar" />
                <label>{user.data.fullName as string}</label>
            </div>
            <Tabs
                rootClassName="tabInformation"
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
            />
        </div>
    )
}

export default PersonalInformation;