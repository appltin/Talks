import axios from 'axios'

export const jsonApiClient = axios.create(
    {
        baseURL: 'http://54.226.15.26:8080',
        headers: {
            'Content-Type': 'application/json' // 確保包含這個標頭
        },
    },
);