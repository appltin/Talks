import { apiClient } from "./ApiClient";

export const executeAuthenticationService
    = (username, password) => 
        apiClient.post(`/login`,{username,password})