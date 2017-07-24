import { AccountModel } from '../mongoose'

export default {
  method: 'post',
  api: '/api/signin',
  fn: async ctx => {
    const username = ctx.request.body.username || ''
    const password = ctx.request.body.password || ''
    console.log(`signin with username: ${username}, password: ${password}`)

    try {
      const user = await AccountModel.findOne({ username, password }, 'username')
      if (!user) {
        ctx.response.status = 403
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/login.html">Try again</a></p>`
      } else {
        console.log('user:', user)
        if (user && user.username) {
          ctx.redirect('/')
        }
      }
    } catch (e) {
      console.log(e)
    }

    // , (err, user) => {
    //   if (err) return
    //   console.log('err:', err)
    //   console.log('user:', user)
    //   if (user && user.username) {
    //     ctx.redirect('/')
    //   } else {
    //     ctx.response.status = 403
    //     ctx.response.body = `<h1>Login failed!</h1>
    //     <p><a href="/login.html">Try again</a></p>`
    //   }
    // }
  }
}
