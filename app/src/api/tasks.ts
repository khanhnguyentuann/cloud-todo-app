import type { NextApiRequest, NextApiResponse } from 'next';
import { createTask, getTasks } from '@/services/todoService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const tasks = await getTasks();
            return res.status(200).json(tasks);
        }

        if (req.method === 'POST') {
            const task = req.body;
            const createdTask = await createTask(task);
            return res.status(201).json(createdTask);
        }

        return res.status(405).json({ message: 'Method Not Allowed' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}
