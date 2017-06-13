// import path from 'path';
import Koa from 'koa'
// import mount from 'koa-mount';
// import graphQLHTTP from 'koa-graphql';
// import convert from 'koa-convert';
import serve from 'koa-static'
import config, { paths } from './config'

// import * as middleware from './middleware';
// import schema from './graphql';
// import publish from './publish';

const app = new Koa()

const PORT = config.server_port

app.use(serve('.'))

app.use((ctx, next) => {
  return next().then(() => {
    if ('/' == ctx.path) {
      ctx.body = 'Try GET /package.json'
    }
  });
})

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
// app.use(ctx => {
//   ctx.body = 'Hello Koa'
// })

app.on('error', function(err) {
	console.log('server error:', err);
})

app.listen(PORT, () => {
	console.log(`Server is running, port: ${PORT}`)
})
