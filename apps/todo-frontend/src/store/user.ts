import axios from "@/lib/axios"
import { toast } from "react-toastify"
import { API_ENDPOINTS } from "@/store/api/endpoints"
import type { User } from "@/types"
import { getErrorMessage, getErrorSeverity, ApiError } from "@/lib/utils/errorHandler"

interface BackendUser {
    _id: string;
    username: string;
    email: string;
    phone?: string;
    timezone?: string;
    createdAt: string;
    updatedAt: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: BackendUser;
        token: string;
    };
}

export async function loginDemoUser(): Promise<User | null> {
    try {
        const response = await axios.get<LoginResponse>(API_ENDPOINTS.USER.LOGIN_DEMO)
        const responseData = response.data

        // Extract user and token from response
        const backendUser = responseData.data?.user
        const token = responseData.data?.token

        // Save token to localStorage if available
        if (token) {
            localStorage.setItem('token', token);
            console.log("✅ Token saved to localStorage");
        }

        // Map backend user data to frontend User interface
        if (backendUser) {
            const user: User = {
                id: backendUser._id,
                name: backendUser.username || 'Demo User',
                email: backendUser.email,
                phone: backendUser.phone || '',
                timezone: backendUser.timezone || 'UTC'
            }
            
            localStorage.setItem('user', JSON.stringify(user));
            console.log("✅ User data saved to localStorage");
            return user;
        }

        console.log("✅ Login demo user success:", backendUser)
        return null
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

export function logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("✅ Token and user data removed from localStorage");
}

export function getAuthToken(): string | null {
    return localStorage.getItem('token');
}

export function isAuthenticated(): boolean {
    return !!getAuthToken();
}
