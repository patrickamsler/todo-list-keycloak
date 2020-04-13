import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

const API_URL = `${process.env.REACT_APP_API_HOST}/api/v1`;

export const useApi = () => {
  const [keycloak] = useKeycloak();
  
  const token = keycloak.token;
  
  const axiosConfig =
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
  const getLists = () => {
    return axios.get(`${API_URL}/lists`, axiosConfig);
  };
  
  const createList = (body) => {
    return axios.post(`${API_URL}/lists`, body, axiosConfig);
  };
  
  const createTodo = (listId, todo) => {
    return axios.post(`${API_URL}/lists/${listId}/todos`, todo, axiosConfig);
  };
  
  const updateTodo = (listId, todo) => {
    return axios.put(`${API_URL}/lists/${listId}/todos/${todo._id}`, todo, axiosConfig);
  };
  
  return {getLists, createList, createTodo, updateTodo}
};
