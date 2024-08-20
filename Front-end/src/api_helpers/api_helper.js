import axios from "axios";

const token = localStorage.getItem("token");

export const API_URL = "https://shopper-backend-api.vercel.app";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = "Bearer " + token;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, params, config = {}) {
  if (params) {
    var queryString = params
      ? Object.keys(params)
          .map((key) => key + "=" + params[key])
          .join("&")
      : "";
    return axiosApi
      .get(`${url}?${queryString}`, { ...config })
      .then((response) => response.data);
  } else {
    return axiosApi
      .get(`${url}`, { ...config })
      .then((response) => response.data);
  }
}


export async function post(url, data, config = {}) {
  let headers = {
    'Content-Type': 'application/json',
    ...config.headers,
  };

  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  return axiosApi
    .post(url, data, { ...config, headers })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  let headers = {
    'Content-Type': 'application/json',
    ...config.headers,
  };

  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  return axiosApi
    .put(url, data, { ...config, headers })
    .then((response) => response.data)
    .catch((err) => err.response);
}

export async function del(url, config = {}) {
  return axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
