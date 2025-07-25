import { StatusCodes, ReasonPhrases } from 'http-status-codes';

// Export all status codes for easy use
export const HTTP_STATUS = StatusCodes;

// Export reason phrases for detailed error messages
export const HTTP_REASON = ReasonPhrases;

// Common status codes for quick access
export const HTTP = {
    // Success
    OK: StatusCodes.OK,
    CREATED: StatusCodes.CREATED,
    NO_CONTENT: StatusCodes.NO_CONTENT,

    // Client Errors
    BAD_REQUEST: StatusCodes.BAD_REQUEST,
    UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
    FORBIDDEN: StatusCodes.FORBIDDEN,
    NOT_FOUND: StatusCodes.NOT_FOUND,
    CONFLICT: StatusCodes.CONFLICT,
    UNPROCESSABLE_ENTITY: StatusCodes.UNPROCESSABLE_ENTITY,

    // Server Errors
    INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
    BAD_GATEWAY: StatusCodes.BAD_GATEWAY,
    SERVICE_UNAVAILABLE: StatusCodes.SERVICE_UNAVAILABLE,
} as const;

// Type for HTTP status codes
export type HttpStatusCode = typeof StatusCodes[keyof typeof StatusCodes];

// Helper functions for checking status code ranges
export const isSuccessStatus = (status: number): boolean => status >= 200 && status < 300;
export const isClientErrorStatus = (status: number): boolean => status >= 400 && status < 500;
export const isServerErrorStatus = (status: number): boolean => status >= 500 && status < 600;
export const isErrorStatus = (status: number): boolean => status >= 400;

// Helper function to get status message
export const getStatusMessage = (status: number): string => {
    return Object.values(ReasonPhrases)[Object.values(StatusCodes).indexOf(status)] || 'Unknown Status';
};
