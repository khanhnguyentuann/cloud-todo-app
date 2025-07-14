import axios from "@/plugins/axios"
import { toast } from "react-toastify"
import { API_ENDPOINTS } from "@/store/common/endpoint"
import type { User } from "@/types"

export async function loginDemoUser(): Promise<User | null> {
    try {
        const response = await axios.get<User>(API_ENDPOINTS.USER.LOGIN_DEMO)
        const user = response.data

        console.log("✅ Login demo user success:", user)
        return user
    } catch (error) {
        toast.error("Failed to login demo user")
        console.error("❌ Login demo user error:", error)
        return null
    }
}
