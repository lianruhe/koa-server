// import { Schema } from 'mongoose'
// const loginSchema = new Schema({ username: String, password: String })
// const User = global.db.model('account', loginSchema)
import { User } from '../mongoose/models'

export default {
  method: 'post',
  api: '/api/signin',
  fn: async ctx => {
    const name = ctx.request.body.name || ''
    const password = ctx.request.body.password || ''
    console.log(`signin with name: ${name}, password: ${password}`)

    const user = new User({ username: name, password })

    if (user) {
      ctx.redirect('/')
    } else {
      ctx.response.status = 403
      ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/login.html">Try again</a></p>`
    }
  }
}
