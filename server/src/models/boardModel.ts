import mongoose, { Schema, model } from "mongoose";

interface ISubtask {
  _id: string
  title: string
  isCompleted: boolean
}

interface ITask {
  _id?: string
  title: string
  description: string
  status: string
  subtasks: ISubtask[]
}

interface IColumn {
  _id: string 
  title: string
  tasks: ITask[]
}

interface IBoard {
  _id: string
  userId: string
  title: string
  columns: IColumn[]
}

const subTaskSchema = new Schema<ISubtask>({
  title: String,
  isCompleted: {
    type: Boolean,
    default: false
  }
})

const taskSchema = new Schema<ITask>({
  title: String,
  description: String,
  subtasks: [subTaskSchema],
  status: {
    type: String,
    required: true
  }
})

const columnSchema = new Schema<IColumn>({
  title: String,
  tasks: {
    type: [taskSchema],
    default: []
  },
})

const boardSchema = new Schema<IBoard>({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  columns: {
    type: [columnSchema],
    default: []
  }
}, {
  timestamps: true
})

export default model<IBoard>('Board', boardSchema)