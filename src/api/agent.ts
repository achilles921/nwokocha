import axios, { AxiosResponse } from 'axios';

import { betDirection } from '../utils/enums';

import { Response } from '../utils/models';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T> (url: string) => axios.get<T>(url).then(responseBody),
  post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

export const bet = (password: string, amount: number, betDirection: betDirection, epoch: number) => {
  return requests.post<Response>("/bet", {
    password: password,
    amount: amount,
    direction: betDirection, 
    epoch: epoch
  }).catch(e => {
    return {
      success: false,
      error: "Failed"
    }
  });
}