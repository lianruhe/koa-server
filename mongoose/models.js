import mongoose, { Schema } from 'mongoose'

const db = mongoose.createConnection('mongodb://localhost/koa-server')
// const connect = mongoose.connection
// connect.on('error', console.error.bind(console, 'connection error:'))
// connect.once('openUri', () => {
//   console.log('connect success!!!')
// })

/**
 * 登陆用户的模型
 * User Model
 */
const userSchema = new Schema({ username: String, password: String })
export const User = db.model('account', userSchema)
