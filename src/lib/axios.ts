import axios from "axios"

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

instance.interceptors.request.use((config) => { return config })

instance.interceptors.response.use(
    (response) => response,
    (error) => { return Promise.reject(error) }
)

export default instance
