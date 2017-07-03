import Router from 'koa-router'
import fs from 'fs'
import os from 'os'
import path from 'path'

const router = new Router()

router.post('/api/upload', async ctx => {
  const file = ctx.request.body.files.file
  const reader = fs.createReadStream(file.path)
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))
  reader.pipe(stream)
  console.log('uploading %s -> %s', file.name, stream.path)
})

// 整合所有的 route
const moduleContext = require.context('./', true, /^((?!index).)*\.js$/)
moduleContext.keys().map(module => {
  const { method, api, fn } = moduleContext(module)
  router[method](api, fn)
})

export default router
