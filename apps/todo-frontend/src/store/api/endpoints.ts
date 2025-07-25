export const API_ENDPOINTS = {
    TASK: {
        FETCH_TASKS: '/api/todos',
        CREATE_TASK: '/api/todos',
        UPDATE_TASK: (id: string) => `/api/todos/${id}`,
        DELETE_TASK: (id: string) => `/api/todos/${id}`
    },
    USER: {
        LOGIN_DEMO: '/api/demo-user',
    },
    NOTIFICATION: {
        FETCH_NOTIFICATIONS: '/api/notifications',
        MARK_AS_READ: (id: string) => `/api/notifications/${id}/read`,
        MARK_ALL_AS_READ: '/api/notifications/read-all',
        DELETE_NOTIFICATION: (id: string) => `/api/notifications/${id}`,
    }
}
