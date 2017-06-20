// import path from 'path';
import Koa from 'koa'
import middlewares from './middleware'
import router from './router'
// import mount from 'koa-mount';
// import graphQLHTTP from 'koa-graphql';
// import convert from 'koa-convert';
import serve from 'koa-static'
import config from './config'

// const html = require('public')
// console.log(html, 111100000000)

// import * as middleware from './middleware';
// import schema from './graphql';
// import publish from './publish';

const app = new Koa()

app.use(middlewares)

app.use(async (ctx, next) => {
  const { response, request } = ctx
  response.append('Access-Control-Allow-Origin', request.origin)
  response.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  response.append('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,TRACE')
  response.append('Access-Control-Allow-Credentials', true)
  if (request.method.toLocaleLowerCase() === 'options') {
    ctx.status = 200
  } else {
    await next()
  }
})

app.use(serve(config.dir_public))
app.use(router.routes())

// app.use(middleware.serverErrorHandler);
// app.use(middleware.pageNotFound);
// app.use(middleware.responseTime);
// app.use(middleware.logger);

// koa graphql
// app.use(mount('/graphql', convert(graphQLHTTP({ schema, pretty: true }))));

// Publish service
// app.use(mount('/publish', publish));

// if (config.globals.__DEV__) {
// koa static
// app.use(staticServer);
//
// const devMiddleware = require('./middleware/webpack-middleware').devMiddleware;
// const hotMiddleware = require('./middleware/webpack-middleware').hotMiddleware;
//
// app.use(devMiddleware);
// app.use(hotMiddleware);
// }

// server render
// app.use(middleware.serverRender);
//

// app.use(async (ctx, next) => {
//   try {
//     await next()
//   } catch (err) {
//     // some errors will have .status
//     // however this is not a guarantee
//     ctx.status = err.status || 500
//     ctx.type = 'html'
//     ctx.body = '<p>Something <em>exploded</em>, please contact Maru.</p>'
//
//     // since we handled this manually we'll
//     // want to delegate to the regular app
//     // level error handling as well so that
//     // centralized still functions correctly.
//     ctx.app.emit('error', err, ctx)
//   }
// })
//
// app.on('error', err => {
//   console.error('Server error:', err)
// })

const PORT = config.server_port
app.listen(PORT, () => {
  console.log(`Server is running, port: ${PORT}`)
})
