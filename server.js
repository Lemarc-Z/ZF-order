var Koa = require("koa");
var compress = require("koa-compress");
var helmet = require("koa-helmet");
var logger = require("koa-logger");
var send = require("koa-send");
var app = new Koa();

app.use(helmet());
app.use(compress());

app.use(logger());

app.use(async ctx => {
  let sendOpts = {
    root: __dirname + "build",
    maxage: 7 * 24 * 3600 * 1000
  };
  await send(ctx, "index.html", sendOpts);
});

// Listen to port 3000
app.listen(process.env.PORT || 3000);
