import Router from 'koa-router'

const router = new Router()

router.get('/api/test', async ctx => {
  ctx.body = {
    test: 12
  }
})

export default router
