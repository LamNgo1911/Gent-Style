import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://gent-style-backend.onrender.com/api/v1/",
});
