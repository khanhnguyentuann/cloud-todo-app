import type { NextApiRequest, NextApiResponse } from 'next';
import { getTodos, createTodo } from '@/services/todoService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const todos = await getTodos();
        return res.status(200).json(todos);
    }

    if (req.method === 'POST') {
        const newTodo = req.body;
        const createdTodo = await createTodo(newTodo);
        return res.status(201).json(createdTodo);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
