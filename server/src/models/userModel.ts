import mongoose, { Schema, model } from "mongoose";


interface IUser {
  name: string
  password: string
  email: string
}

const userSchema = new Schema<IUser>({
  name: String,
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
})

export default model('User', userSchema)