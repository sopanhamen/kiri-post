import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const api = axios.create({
    baseURL: `${process.env.BaseURL}`,
    // baseURL: `${process.env.BaseURL}v2`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})

// Interceptors
api.interceptors.request.use(function (config: AxiosRequestConfig)
{
    // Do something before request is sent
    return config;
}, function (error)
{
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response: AxiosResponse)
{
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error)
{
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export const defaultHeader = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}

export default api
