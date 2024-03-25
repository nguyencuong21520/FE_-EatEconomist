import React from 'react';
import Form from 'antd/es/form/Form';
import { Input } from 'antd';
import './styles.scss';

const RnE = () => {
    return (
        <div className="rne">
            <Form>
                <label>Budget</label>
                <Input size="small" />
            </Form>
        </div>
    )
}

export default RnE;