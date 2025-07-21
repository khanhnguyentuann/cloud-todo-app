import type { NextApiRequest, NextApiResponse } from 'next';
import { loginDemoUser } from '@/services/todoService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const user = await loginDemoUser();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
