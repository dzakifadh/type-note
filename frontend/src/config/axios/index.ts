/* eslint-disable no-mixed-spaces-and-tabs */
import axios, { AxiosError } from "axios";
import { removeCookie } from "typescript-cookie";

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL_API,
	withCredentials: true,
});

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		console.log("Interceptors response success", response);
		return response;
	},
	function (error) {
		const err = error as AxiosError;
		if (axios.isAxiosError(err)) {
			const errorCode = err.response?.status;
			if (errorCode === 401) {
				removeCookie("notex");
				window.location.href = "/sign-in";
			}
		}

		return Promise.reject(error);
	}
);

export default instance;
