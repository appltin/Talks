import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

//1: Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2: Share the created context with other components
export default function AuthProvider({ children }) {

    //3: Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    // function login(username, password) {
    //     if(username==='in28minutes' && password==='dummy'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true            
    //     } else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }        
    // }

    // async function login(username, password) {

    //     const baToken = 'Basic ' + window.btoa( username + ":" + password )

    //     try {

    //         const response = await executeBasicAuthenticationService(baToken)

    //         if(response.status==200){
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     config.headers.Authorization = baToken
    //                     return config
    //                 }
    //             )

    //             return true            
    //         } else {
    //             logout()
    //             return false
    //         }    
    //     } catch(error) {
    //         logout()
    //         return false
    //     }
    // }


    async function login(username, password) {
        try {
            const response = await apiClient.post('/login', { username, password })
            // 處理成功回應
            if (response.data.status === 'success') {
                console.log('Login successful')
                // 登入成功 -> 回傳true
                setAuthenticated(true)
                return true
            } else {
                console.log('Login failed')
                logout()
                return false;
                // 在這裡處理失敗的情況
            }
        } catch (error) {
            // 處理錯誤
            console.error('Error during login:', error)
        }
    }


    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token}  }>
            {children}
        </AuthContext.Provider>
    )
} 

