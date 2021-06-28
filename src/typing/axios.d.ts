import * as axios from "axios";

declare module "axios" {
    export interface AxiosResponse<T> {
        statusCode: number,
        success: boolean
      }
  }
