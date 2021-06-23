import { Dispatch, Store } from "redux";
import {AxiosResponse} from 'axios'
export interface TypeAction {
    type: string;
    payload: any
}

export interface TypeAnyObject {
    [propName: string]: any
}

export interface TypeThunkFunction {
    (dispatch:Dispatch, getState: Store['getState']): void
}

export interface CusAxiosResponse extends AxiosResponse {
    statusCode: number
}

