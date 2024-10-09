import axios from 'axios'

export const apiClient = axios.create(
    {
        baseURL: 'http://54.226.15.26:8080',
        headers: {
            'Content-Type': 'application/json',
        },
    }
);