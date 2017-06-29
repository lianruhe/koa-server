import Router from 'koa-router'
import fs from 'fs'
import os from 'os'
import path from 'path'

const router = new Router()

router.get('/api/test', async ctx => {
  ctx.body = {
    test: 12
  }
})

router.post('/api/signin', async ctx => {
  const name = ctx.request.body.name || ''
  const password = ctx.request.body.password || ''
  console.log(`signin with name: ${name}, password: ${password}`)
  if (name === 'koa' && password === '123456') {
    ctx.redirect('/')
  } else {
    ctx.response.status = 403
    ctx.response.body = `<h1>Login failed!</h1>
    <p><a href="/login.html">Try again</a></p>`
  }
})

router.post('/api/upload', async ctx => {
  const file = ctx.request.body.files.file
  const reader = fs.createReadStream(file.path)
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))
  reader.pipe(stream)
  console.log('uploading %s -> %s', file.name, stream.path)
})

export default router
