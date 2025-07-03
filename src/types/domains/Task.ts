export interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  isImportant?: boolean;
}

export interface DynamoDBTask {
  taskId: { S: string };
  title: { S: string };
  completed: { BOOL: boolean };
  dueDate: { S: string };
  isImportant: { BOOL: boolean };
}
