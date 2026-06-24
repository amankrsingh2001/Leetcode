import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
});

export const api = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  patch: instance.patch,
  delete: instance.delete,
};