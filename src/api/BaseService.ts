import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { API_URL } from "../const"
import { getAccessToken } from "../utils"

export class ApiService {
  static get<ResponseType>(path: string, config?: AxiosRequestConfig<any>) {
    return axios.get<ResponseType>(`${API_URL}/api/${path}`, {
      ...config,
      headers: config?.headers ?? {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
  }

  static post<ResponseType>(
    path: string,
    data: any,
    config?: AxiosRequestConfig<any>
  ) {
    return axios.post<any, AxiosResponse<ResponseType>>(
      `${API_URL}/api/${path}`,
      data,
      {
        ...config,
        headers: config?.headers ?? {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    )
  }

  static put<ResponseType>(
    path: string,
    data: any,
    config?: AxiosRequestConfig<any>
  ) {
    return axios.put<any, AxiosResponse<ResponseType>>(
      `${API_URL}/api/${path}`,
      data,
      {
        ...config,
        headers: config?.headers ?? {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    )
  }

  static delete<ResponseType>(path: string, config?: AxiosRequestConfig<any>) {
    return axios.delete<ResponseType>(`${API_URL}/api/${path}`, {
      ...config,
      headers: config?.headers ?? {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
  }
}
