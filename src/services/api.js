import axios from 'axios';

const api = axios.create({
    baseURL: "https://my-project-backend-zqbc.onrender.com/api/",
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401
            && !originalRequest._retry
            && !originalRequest.url.includes('login/') // Always retry for other endpoints but login
            && !originalRequest.url.includes('register/')
            && !originalRequest.url.includes('refresh/')
        ) {
            originalRequest._retry = true;

            try {
                await api.post('refresh/');
                return api(originalRequest);
            } catch (refreshError) {
                // Instead of redirecting, reject the error and let React handle logout/redirection
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
