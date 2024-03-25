import React from 'react';
import './styles.scss';
import { Form } from 'react-bootstrap';
import { Button, Input } from 'antd';

const Personal = () => {
    return (
        <div className="personal">
            <Form>
                <Form.Group>
                    <Form.Label>
                        Họ tên
                    </Form.Label>
                    <Input size="small" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Số điện thoại
                    </Form.Label>
                    <Input size="small" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Ngân hàng
                    </Form.Label>
                    <Input size="small" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Số tài khoản
                    </Form.Label>
                    <Input size="small" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Chủ tài khoản
                    </Form.Label>
                    <Input size="small" />
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