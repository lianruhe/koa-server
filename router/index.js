import fs from 'fs'
import Router from 'koa-router'
const debug = require('debug')('server:router')

// import os from 'os'
// import path from 'path'

const router = new Router()

// router.post('/api/upload', async ctx => {
//   const file = ctx.request.body.files.file
//   const reader = fs.createReadStream(file.path)
//   const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))
//   reader.pipe(stream)
//   console.log('uploading %s -> %s', file.name, stream.path)
// })
router.get('/', async ctx => {
  ctx.response.status = 200
  ctx.response.body = fs.readFileSync('public/index.html')
})

// 整合所有的 route
const moduleContext = require.context('./', true, /^((?!index).)*\.js$/)

moduleContext.keys().map(path => {
  const module = moduleContext(path)
  const api = path.slice(1, -3)
  Object.keys(module).map(method => {
    debug(`[${method}]${api}`)
    router[method](api, module[method])
  })
})

export default router
