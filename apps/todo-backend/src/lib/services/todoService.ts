import dynamoDBClient from '@/lib/config/aws';
import { ScanCommand, PutItemCommand, UpdateItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '@cloud-todo/shared';
import { AttributeValue } from '@aws-sdk/client-dynamodb';

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'Todos';

type DynamoDBItem = Record<string, AttributeValue>;

export async function getTodos(): Promise<Todo[]> {
  const command = new ScanCommand({ TableName: TABLE_NAME });
  const response = await dynamoDBClient.send(command);
  
  return response.Items?.map((item: DynamoDBItem) => ({
    id: item.taskId?.S || item.id?.S || '',
    title: item.title?.S || '',
    completed: item.completed?.BOOL || false,
    dueDate: item.dueDate?.S || null,
    reminder: item.reminder?.S || null,
    repeat: item.repeat?.S || null,
    isImportant: item.isImportant?.BOOL || false,
    createdAt: item.createdAt?.S,
    updatedAt: item.updatedAt?.S,
  })) || [];
}

export async function createTodo(todoData: CreateTodoRequest): Promise<Todo> {
  const id = Date.now().toString();
  const now = new Date().toISOString();

  const todo: Todo = {
    id,
    title: todoData.title,
    completed: false,
    dueDate: todoData.dueDate || null,
    reminder: todoData.reminder || null,
    repeat: todoData.repeat || null,
    isImportant: todoData.isImportant || false,
    createdAt: now,
    updatedAt: now,
  };

  const item = {
    taskId: { S: id },
    title: { S: todo.title },
    completed: { BOOL: todo.completed },
    dueDate: todo.dueDate ? { S: todo.dueDate } : { NULL: true },
    reminder: todo.reminder ? { S: todo.reminder } : { NULL: true },
    repeat: todo.repeat ? { S: todo.repeat } : { NULL: true },
    isImportant: { BOOL: todo.isImportant || false },
    createdAt: { S: now },
    updatedAt: { S: now },
  };

  const command = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: item,
  });

  await dynamoDBClient.send(command);
  return todo;
}

export async function updateTodo(id: string, updates: UpdateTodoRequest): Promise<Todo> {
  const now = new Date().toISOString();
  
  // Build update expression dynamically
  const updateExpressions: string[] = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, AttributeValue> = {};

  if (updates.title !== undefined) {
    updateExpressions.push('#title = :title');
    expressionAttributeNames['#title'] = 'title';
    expressionAttributeValues[':title'] = { S: updates.title };
  }

  if (updates.completed !== undefined) {
    updateExpressions.push('#completed = :completed');
    expressionAttributeNames['#completed'] = 'completed';
    expressionAttributeValues[':completed'] = { BOOL: updates.completed };
  }

  if (updates.dueDate !== undefined) {
    updateExpressions.push('#dueDate = :dueDate');
    expressionAttributeNames['#dueDate'] = 'dueDate';
    expressionAttributeValues[':dueDate'] = updates.dueDate ? { S: updates.dueDate } : { NULL: true };
  }

  if (updates.reminder !== undefined) {
    updateExpressions.push('#reminder = :reminder');
    expressionAttributeNames['#reminder'] = 'reminder';
    expressionAttributeValues[':reminder'] = updates.reminder ? { S: updates.reminder } : { NULL: true };
  }

  if (updates.repeat !== undefined) {
    updateExpressions.push('#repeat = :repeat');
    expressionAttributeNames['#repeat'] = 'repeat';
    expressionAttributeValues[':repeat'] = updates.repeat ? { S: updates.repeat } : { NULL: true };
  }

  if (updates.isImportant !== undefined) {
    updateExpressions.push('#isImportant = :isImportant');
    expressionAttributeNames['#isImportant'] = 'isImportant';
    expressionAttributeValues[':isImportant'] = { BOOL: updates.isImportant };
  }

  // Always update updatedAt
  updateExpressions.push('#updatedAt = :updatedAt');
  expressionAttributeNames['#updatedAt'] = 'updatedAt';
  expressionAttributeValues[':updatedAt'] = { S: now };

  const command = new UpdateItemCommand({
    TableName: TABLE_NAME,
    Key: {
      taskId: { S: id }
    },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW'
  });

  const response = await dynamoDBClient.send(command);
  
  if (!response.Attributes) {
    throw new Error('Todo not found');
  }

  return {
    id: response.Attributes.taskId?.S || '',
    title: response.Attributes.title?.S || '',
    completed: response.Attributes.completed?.BOOL || false,
    dueDate: response.Attributes.dueDate?.S || null,
    reminder: response.Attributes.reminder?.S || null,
    repeat: response.Attributes.repeat?.S || null,
    isImportant: response.Attributes.isImportant?.BOOL || false,
    createdAt: response.Attributes.createdAt?.S,
    updatedAt: response.Attributes.updatedAt?.S,
  };
}

export async function deleteTodo(id: string): Promise<void> {
  const command = new DeleteItemCommand({
    TableName: TABLE_NAME,
    Key: {
      taskId: { S: id }
    }
  });

  await dynamoDBClient.send(command);
}
