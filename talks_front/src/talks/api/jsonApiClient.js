import axios from 'axios'

export const jsonApiClient = axios.create(
    {
        baseURL: 'http://localhost:8080',
        headers: {
            'Content-Type': 'application/json' // 確保包含這個標頭
        },
    },
);