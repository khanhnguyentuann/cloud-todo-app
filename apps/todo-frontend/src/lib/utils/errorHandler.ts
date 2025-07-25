import { HTTP, getStatusMessage, isClientErrorStatus, isServerErrorStatus } from '../constants/httpStatus';

export interface ApiErrorResponse {
    success: boolean;
    error: {
        message: string;
        stack?: string;
    };
}

export interface ApiError extends Error {
    statusCode?: number;
    statusMessage?: string;
    isClientError?: boolean;
    isServerError?: boolean;
    response?: {
        data: ApiErrorResponse;
        status: number;
    };
}

// Helper function to format error messages based on status codes
export const getErrorMessage = (error: ApiError): string => {
    const status = error.statusCode || error.response?.status;

    if (!status) {
        return error.message || 'An unexpected error occurred';
    }

    // Custom messages for common status codes
    switch (status) {
        case HTTP.UNAUTHORIZED:
            return 'Authentication required. Please log in.';
        case HTTP.FORBIDDEN:
            return 'You do not have permission to perform this action.';
        case HTTP.NOT_FOUND:
            return 'The requested resource was not found.';
        case HTTP.CONFLICT:
            return 'This action conflicts with existing data.';
        case HTTP.UNPROCESSABLE_ENTITY:
            return 'The provided data is invalid.';
        case HTTP.INTERNAL_SERVER_ERROR:
            return 'Internal server error. Please try again later.';
        case HTTP.BAD_GATEWAY:
            return 'Service temporarily unavailable. Please try again later.';
        case HTTP.SERVICE_UNAVAILABLE:
            return 'Service unavailable. Please try again later.';
        default:
            // Try to get message from response data
            if (error.response?.data?.error?.message) {
                return error.response.data.error.message;
            }
            return error.message || getStatusMessage(status);
    }
};

// Helper function to determine error severity
export const getErrorSeverity = (error: ApiError): 'error' | 'warning' | 'info' => {
    const status = error.statusCode || error.response?.status;

    if (!status) return 'error';

    if (isServerErrorStatus(status)) return 'error';
    if (isClientErrorStatus(status)) {
        if (status === HTTP.UNAUTHORIZED || status === HTTP.FORBIDDEN) {
            return 'warning';
        }
        return 'info';
    }

    return 'error';
};

// Helper function to check if error should redirect to login
export const shouldRedirectToLogin = (error: ApiError): boolean => {
    const status = error.statusCode || error.response?.status;
    return status === HTTP.UNAUTHORIZED;
};

// Helper function to check if error is retryable
export const isRetryableError = (error: ApiError): boolean => {
    const status = error.statusCode || error.response?.status;

    if (!status) return false;

    return (
        status >= HTTP.INTERNAL_SERVER_ERROR ||
        status === HTTP.BAD_GATEWAY ||
        status === HTTP.SERVICE_UNAVAILABLE
    );
};
