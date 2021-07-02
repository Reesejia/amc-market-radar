import * as axios from "axios";

declare module "axios" {
    export interface AxiosResponse<T> {
        statusCode: number,
        success: boolean
      }
  }

  declare module "antd" {
       interface FilterValue {
      [propName: string]: string
    }
  }
