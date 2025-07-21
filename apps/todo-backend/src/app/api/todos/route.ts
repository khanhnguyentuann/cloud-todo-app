import { NextRequest, NextResponse } from 'next/server';
import { getTodos, createTodo } from '@/lib/services/todoService';
import { CreateTodoRequest, ApiResponse, Todo } from '@cloud-todo/shared';

export async function GET(): Promise<NextResponse<ApiResponse<Todo[]>>> {
  try {
    const todos = await getTodos();
    return NextResponse.json({
      success: true,
      data: todos
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch todos'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Todo>>> {
  try {
    const body: CreateTodoRequest = await request.json();
    const newTodo = await createTodo(body);
    
    return NextResponse.json({
      success: true,
      data: newTodo
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create todo'
    }, { status: 500 });
  }
}
