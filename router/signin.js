import { AccountModel } from '../mongoose'
import { loginError } from 'config/error'
import catchError from 'utils/server-error'

export default {
  method: 'post',
  api: '/api/signin',
  fn: async ctx => {
    const { username, password } = ctx.request.body
    console.log(`signin with username: ${username}, password: ${password}`)

    try {
      const user = await AccountModel.findOne({ username, password }, 'username')
      if (!user) {
        const { status, code, message } = loginError
        ctx.response.status = status
        ctx.response.body = {
          code,
          message
        }
      } else {
        if (user && user.username) {
          // ctx.redirect('/')
          ctx.response.status = 200
          ctx.response.body = {
            username: user.username
          }
        }
      }
    } catch (e) {
      catchError(ctx, e)
    }
  }
}
