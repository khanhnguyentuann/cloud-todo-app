export const API_ENDPOINTS = {
    TASK: {
        FETCH_TASKS: '/api/todos',
        CREATE_TASK: '/api/todos',
        UPDATE_TASK: (id: string) => `/api/todos/${id}`,
        DELETE_TASK: (id: string) => `/api/todos/${id}`
    },
    USER: {
        LOGIN_DEMO: '/api/demo-user',
    }
}
