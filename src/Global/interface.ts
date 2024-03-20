import { DrawerProps } from 'antd';
import React from 'react';

export interface CardData {
    bankname?: string;
    bankHolderName?: string;
    bankNumber?: string;
    QR?: string;
}
export interface Obj {
    [k: string]: any;
}
export interface Drawer extends DrawerProps {
    component?: React.ReactNode;
}
export interface Data {
    data?: Obj;
    success?: boolean;
    message?: string;
}