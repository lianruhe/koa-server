export default {
  method: 'get',
  api: '/api/test',
  fn: async ctx => {
    ctx.body = {
      test: 123
    }
  }
}
