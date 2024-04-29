import axios from "axios";

let url: string;
if (process.env.NODE_ENV === "production") {
  url = "https://gent-style-backend.onrender.com/api/v1/";
} else {
  // Use the local server URL when in development
  url = "http://localhost:8080/api/v1/";
}

export const axiosApi = axios.create({
  baseURL: url,
});

export { url };
