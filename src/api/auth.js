import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000",
  withCredentials: true,
});

export function registerUser(data) {
  return API.post("/auth/register", data);
}

export function loginUser(data) {
  return API.post("/auth/login", data);
}

export function logoutUser() {
  return API.post("/auth/logout");
}

export function fetchMe() {
  return API.get("/auth/me");
}