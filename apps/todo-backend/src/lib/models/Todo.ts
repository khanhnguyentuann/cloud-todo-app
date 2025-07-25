import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  id: string;
  title: string;
  completed: boolean;
  userId: mongoose.Types.ObjectId;
  dueDate?: string | null;
  reminder?: string | null;
  repeat?: string | null;
  isImportant: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const TodoSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dueDate: {
    type: String,
    default: null,
  },
  reminder: {
    type: String,
    default: null,
  },
  repeat: {
    type: String,
    default: null,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
