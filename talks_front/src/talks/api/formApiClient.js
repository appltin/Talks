import axios from 'axios'

export const formApiClient = axios.create(
    {
        baseURL: 'http://localhost:8080',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // 確保包含這個標頭
        },
    },
);