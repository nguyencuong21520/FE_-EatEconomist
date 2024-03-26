import { Obj, Query } from "../src/Global/interface";
import httpClient from "./axios";

export default async function actionRequest(uri: string, method: 'get' | 'post' | 'put' | 'delete', request?: Query) {
    try {
        let response: any;
        let parseUri = uri;
        const listReqParams = request?.params as Array<string>;
        if (listReqParams && !parseUri.includes('$params')) {
            throw new Error('Missing $params item');
        }
        else if (listReqParams && parseUri.includes('$params')) {
            listReqParams.forEach((_, idx) => {
                parseUri = parseUri.replace('$params', (listReqParams)[idx] as string);
            });
        }
        switch (method) {
            case 'get':
                response = httpClient.get(parseUri as string, { params: request?.query }).then(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        return error.response;
                    }
                );
                break;
            case 'post':
                response = httpClient.post(parseUri as string, request?.body, { params: request?.query, ...request?.headers ? { headers: request?.headers } : {} }).then(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        return error.response;
                    }
                );
                break;
            case 'put':
                response = httpClient.put(parseUri as string, request?.body, { params: request?.query, ...request?.headers ? { headers: request?.headers } : {} }).then(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        return error.response;
                    }
                );
                break;
            case 'delete':
                response = httpClient.delete(parseUri as string, { params: request?.query }).then(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        return error.response;
                    }
                );
                break;
        }
        return response;
    } catch (error) {
        return {
            data: {
                isLoading: false,
                message: (error as Obj).message as string,
                status: false
            }
        }
    }
}