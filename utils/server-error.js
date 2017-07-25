import { serverError } from 'config/error'

/**
 * 统一处理服务器错误
 * @param  {object} ctx 请求上下文
 * @param  {error} err  抛出的错误
 */
export default (ctx, error) => {
  console.log(error)
  const { status, code, message } = serverError
  ctx.response.status = status
  ctx.response.body = {
    code,
    message,
    error
  }
}
