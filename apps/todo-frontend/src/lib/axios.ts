import axios from "axios"
import { HTTP, isErrorStatus, getStatusMessage } from "./constants/httpStatus"

const TOKEN_KEY = "token"

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status
            const statusMessage = getStatusMessage(status)

            console.error(`HTTP Error ${status}: ${statusMessage}`, error.response.data)

            error.statusCode = status
            error.statusMessage = statusMessage
            error.isClientError = isErrorStatus(status) && status < HTTP.INTERNAL_SERVER_ERROR
            error.isServerError = status >= HTTP.INTERNAL_SERVER_ERROR
        }

        return Promise.reject(error)
    }
)

export default instance
