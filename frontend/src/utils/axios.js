import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-application-s3ml.onrender.com/api",
  withCredentials: true,
});

export default instance;
