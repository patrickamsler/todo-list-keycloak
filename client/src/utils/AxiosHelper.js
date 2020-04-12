import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_HOST}/api/v1`;

const axiosConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
};

export const getLists = (token) => {
  return axios.get(`${API_URL}/lists`, axiosConfig(token));
};

export const createList = (token, body) => {
  return axios.post(`${API_URL}/lists`, body, axiosConfig(token));
};
