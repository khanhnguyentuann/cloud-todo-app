import axios from "@/lib/axios"
import { toast } from "react-toastify"
import { API_ENDPOINTS } from "@/store/api/endpoints"
import type { User } from "@/types"
import { getErrorMessage, getErrorSeverity, ApiError } from "@/lib/utils/errorHandler"

export async function loginDemoUser(): Promise<User | null> {
    try {
        const response = await axios.get<User>(API_ENDPOINTS.USER.LOGIN_DEMO)
        const user = response.data

        console.log("✅ Login demo user success:", user)
        return user
    } catch (error) {
        const apiError = error as ApiError;
        const errorMessage = getErrorMessage(apiError);
        const severity = getErrorSeverity(apiError);
        
        if (severity === 'error') {
            toast.error(errorMessage);
        } else {
            toast.warn(errorMessage);
        }
        
        console.error("❌ Login demo user error:", error);
        return null;
    }
}
