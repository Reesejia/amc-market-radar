import * as axios from "axios";
declare module "axios" {
    export interface AxiosResponse<T> {
        statusCode: number,
        success: boolean
      }
  }

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: string;
  }
}

export interface QianKunProps {
  container: HTMLDivElement,
  routerBase: string
}
  declare module "antd" {
       interface FilterValue {
      [propName: string]: string
    }
  }
