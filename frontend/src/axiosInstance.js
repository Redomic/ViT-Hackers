import axios from "axios";

const baseURL = "http://localhost:5000/";

export const axiosUser = axios.create({
  withCredentials: true,
  baseURL: baseURL,
});
