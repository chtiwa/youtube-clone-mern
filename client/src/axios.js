import axios from 'axios'

export const axiosInstance = axios.create({
  withCredentials: true,
  // baseURL: "http://localhost:5000/api"
  baseURL: process.env.REACT_APP_SERVER
})