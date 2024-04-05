import React from 'react';
import { DrawerProps } from 'antd';
import { AxiosHeaders, Method, RawAxiosRequestHeaders } from 'axios';
type MethodsHeaders = Partial<{
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
} & { common: AxiosHeaders }>;

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
export interface Data extends Obj {
    success?: boolean;
    message?: string;
    loading?: boolean;
}
export interface Query {
    query?: Obj;
    params?: string[];
    body?: Obj;
    headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
}
