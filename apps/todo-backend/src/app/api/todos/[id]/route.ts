import { NextRequest, NextResponse } from 'next/server';
import { updateTodo, deleteTodo } from '@/lib/services/todoService';
import { UpdateTodoRequest, ApiResponse, Todo } from '@cloud-todo/shared';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Todo>>> {
  try {
    const body: UpdateTodoRequest = await request.json();
    const updatedTodo = await updateTodo(params.id, body);
    
    return NextResponse.json({
      success: true,
      data: updatedTodo
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update todo'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    await deleteTodo(params.id);
    
    return NextResponse.json({
      success: true,
      data: null
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete todo'
    }, { status: 500 });
  }
}
