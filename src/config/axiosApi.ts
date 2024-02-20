import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
});
