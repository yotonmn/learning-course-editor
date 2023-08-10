import SERVER_SETTINGS from "@lib/serverSettings";
import axios from "axios";
import { configure } from "axios-hooks";
import LRU from "lru-cache";
import { getAccessToken, getRefreshToken, saveToken } from "./auth";

const BACKEND_URL = SERVER_SETTINGS.baseURL;

const instance = axios.create({
    baseURL: BACKEND_URL,
    // withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            return axios
                .post(`${BACKEND_URL}/api/users/refresh-access-token`, {
                    refreshToken: getRefreshToken(),
                })
                .then((res) => {
                    if (res.status === 200) {
                        saveToken(res.data);
                        return instance(originalRequest);
                    }
                })
                .catch((error) => {});
        }

        // return Promise.reject(error);
        return error.response;
    }
);

const cache = new LRU({ max: 10 });

configure({ axios: instance, cache });
export default instance;
