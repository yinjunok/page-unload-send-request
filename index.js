const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('@koa/router')
const path = require('path');
const bodyParser = require('koa-bodyparser');
 
const app = new Koa();
const router = new Router();

render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});

router.get('/', async (ctx, next) => {
  await ctx.render('send-beacon')
});

router.get('/keep-alive', async (ctx, next) => {
  await ctx.render('keep-alive')
});

router.all('/logs', (ctx, next) => {
  console.log(ctx.request.method, ctx.request.body)
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
 
app.listen(7001);