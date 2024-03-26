import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import { StoreContext } from '../../../store/ProviderStore';
import './styles.scss';

const Personal = () => {
    const store = useContext(StoreContext);
    const user = store.user;
    const { values } = useFormik({
        initialValues: {
            fullName: user.data.fullName as string,
            phoneNumber: user.data.phoneNumber as string,
            bankName: user.data.bankName as string,
            bankNumber: user.data.bankNumber as string,
            bankHolderName: user.data.bankHolderName as string,
        },
        onSubmit(values) {

        }
    });
    return (
        <div className="personal">
            <Form>
                <Form.Group>
                    <Form.Label>
                        Họ tên
                    </Form.Label>
                    <Input size="small" value={values.fullName} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Số điện thoại
                    </Form.Label>
                    <Input size="small" value={values.phoneNumber} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Ngân hàng
                    </Form.Label>
                    <Input size="small" value={values.bankName} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Số tài khoản
                    </Form.Label>
                    <Input size="small" value={values.bankName} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Chủ tài khoản
                    </Form.Label>
                    <Input size="small" value={values.bankHolderName} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Mã QR
                    </Form.Label>
                    <Input size="small" />
                </Form.Group>
                <div className="groupBtn">
                    <Button size="small">
                        Cập nhật
                    </Button>
                    <Button size="small">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Personal