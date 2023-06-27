import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3333/v1",
  timeout: 10000,
  withCredentials: true,
});

export default instance;