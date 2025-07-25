import { authenticateUser, createUser } from '@/lib/services/userService';

export const getOrCreateDemoUser = async () => {
    const demoEmail = 'demo@example.com';
    const demoPassword = 'demo123';
    const demoUsername = 'demo';

    try {
        return await authenticateUser({ email: demoEmail, password: demoPassword });
    } catch {
        return await createUser({
            email: demoEmail,
            password: demoPassword,
            username: demoUsername
        });
    }
};
