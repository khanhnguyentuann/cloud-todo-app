import dynamoDBClient from '@/config/aws';
import { ScanCommand, PutItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { Todo } from '@/types/todo';
import { AttributeValue } from '@aws-sdk/client-dynamodb';

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'Todos';

type DynamoDBItem = Record<string, AttributeValue>;

export async function getTodos(): Promise<Todo[]> {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const response = await dynamoDBClient.send(command);
    return response.Items?.map((item: DynamoDBItem) => ({
        id: item.id.S || '',
        title: item.title.S || '',
        completed: item.completed.BOOL || false,
    })) || [];
}

export async function createTodo(todo: Todo): Promise<Todo> {
    const command = new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
            id: { S: todo.id },
            title: { S: todo.title },
            completed: { BOOL: todo.completed },
        },
    });
    await dynamoDBClient.send(command);
    return todo;
}

export async function loginDemoUser(): Promise<{ id: string; name: string; email: string; phone: string; timezone: string; avatar: string; preferences: { emailNotifications: boolean; pushNotifications: boolean; weeklyDigest: boolean; taskReminders: boolean } }> {
    const params = {
        TableName: 'Users',
        Key: {
            userId: { S: 'demo-123' },
        },
    };

    const result = await dynamoDBClient.send(new GetItemCommand(params));

    if (!result.Item) {
        throw new Error('User not found');
    }

    return {
        id: result.Item.userId?.S || '',
        name: result.Item.name?.S || '',
        email: result.Item.email?.S || '',
        phone: result.Item.phone?.S || '',
        timezone: result.Item.timezone?.S || '',
        avatar: result.Item.avatar?.S || '',
        preferences: {
            emailNotifications: result.Item.preferences?.M?.emailNotifications?.BOOL || false,
            pushNotifications: result.Item.preferences?.M?.pushNotifications?.BOOL || false,
            weeklyDigest: result.Item.preferences?.M?.weeklyDigest?.BOOL || false,
            taskReminders: result.Item.preferences?.M?.taskReminders?.BOOL || false,
        },
    };
}

export async function createTask(task: Todo): Promise<Todo> {
    const id = Date.now().toString();

    const item = {
        taskId: { S: id },
        title: { S: task.title },
        completed: { BOOL: task.completed ?? false },
        dueDate: task.dueDate ? { S: task.dueDate } : { NULL: true },
        reminder: task.reminder ? { S: task.reminder } : { NULL: true },
        repeat: task.repeat ? { S: task.repeat } : { NULL: true },
        isImportant: { BOOL: task.isImportant ?? false },
    };

    const command = new PutItemCommand({
        TableName: TABLE_NAME,
        Item: item,
    });

    await dynamoDBClient.send(command);

    return { ...task, id };
}

export async function getTasks(): Promise<Todo[]> {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const response = await dynamoDBClient.send(command);

    return response.Items?.map((item: DynamoDBItem) => ({
        id: item.taskId.S || '',
        title: item.title.S || '',
        completed: item.completed.BOOL || false,
        dueDate: item.dueDate?.S || null,
        reminder: item.reminder?.S || null,
        repeat: item.repeat?.S || null,
        isImportant: item.isImportant?.BOOL || false,
    })) || [];
}
