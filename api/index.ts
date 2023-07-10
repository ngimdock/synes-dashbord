import axios from "axios";

export const baseURL = "http://localhost:3333/v1";

const instance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});


export default instance;